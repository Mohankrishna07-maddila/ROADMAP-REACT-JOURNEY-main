# Profile Setup Guide

## 🚀 Enhanced Profile Features

Your profile page now has the following new features:

### ✅ **1. Profile Photo Upload**
- Click the camera icon when editing profile
- Supports JPEG, PNG, GIF images
- Maximum file size: 5MB
- Automatic upload to Supabase Storage

### ✅ **2. Export Data Functionality**
- Click "Export" button in Data Management
- Downloads JSON file with all your profile data
- Includes: personal info, professional details, social links, timestamps

### ✅ **3. Delete Account Functionality**
- Click "Delete" button in Data Management
- Confirmation dialog to prevent accidental deletion
- Permanently removes account and all data

## 🔧 Database Setup Required

### **Step 1: Add Missing Columns to Profiles Table**

Run this SQL in your Supabase SQL Editor:

```sql
-- Add missing columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS github TEXT,
ADD COLUMN IF NOT EXISTS linkedin TEXT;

-- Update existing profiles to have default values for new columns
UPDATE profiles 
SET 
  location = COALESCE(location, ''),
  website = COALESCE(website, ''),
  github = COALESCE(github, ''),
  linkedin = COALESCE(linkedin, '')
WHERE location IS NULL OR website IS NULL OR github IS NULL OR linkedin IS NULL;
```

### **Step 2: Set Up Storage for Profile Photos**

Run this SQL in your Supabase SQL Editor:

```sql
-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Create storage policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
);

-- Create storage policy for users to update their own avatars
CREATE POLICY "Users can update own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policy for users to delete their own avatars
CREATE POLICY "Users can delete own avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## 🎯 How to Use the New Features

### **Profile Photo Upload:**
1. Go to your Profile page
2. Click "Edit Profile"
3. Click the camera icon on your avatar
4. Select an image file (JPEG, PNG, GIF)
5. The photo will upload automatically
6. Click "Save Changes"

### **Export Your Data:**
1. Go to Profile → Settings tab
2. Scroll down to "Data Management"
3. Click "Export" button
4. A JSON file will download with all your data

### **Delete Your Account:**
1. Go to Profile → Settings tab
2. Scroll down to "Data Management"
3. Click "Delete" button
4. Confirm the action in the dialog
5. Your account will be permanently deleted

## 🔍 Troubleshooting

### **Profile Update Fails:**
- Make sure you've run the SQL scripts above
- Check that all columns exist in your profiles table
- Verify your Supabase connection is working

### **Photo Upload Fails:**
- Ensure the storage bucket 'avatars' exists
- Check that storage policies are set up correctly
- Verify file size is under 5MB
- Make sure file type is an image (JPEG, PNG, GIF)

### **Export/Delete Not Working:**
- Check browser console for errors
- Ensure you're logged in
- Verify Supabase permissions are correct

## 📱 Features Overview

### **Enhanced Profile Fields:**
- ✅ First Name, Last Name, Email
- ✅ Bio (multi-line text)
- ✅ Current Role, Experience Level
- ✅ Interests (add/remove tags)
- ✅ Location
- ✅ Social Links (Website, GitHub, LinkedIn)

### **Security & Privacy:**
- ✅ Password Change with validation
- ✅ Two-Factor Authentication toggle
- ✅ Profile Visibility settings
- ✅ Notification preferences

### **Data Management:**
- ✅ Export all profile data as JSON
- ✅ Delete account with confirmation
- ✅ Profile photo upload/management

### **Activity Tracking:**
- ✅ Recent activity timeline
- ✅ Learning progress tracking
- ✅ Achievement badges

## 🎉 Success!

After running the SQL scripts, all profile features should work perfectly:

1. **Profile updates** will save successfully
2. **Photo uploads** will work with proper validation
3. **Data export** will download your complete profile
4. **Account deletion** will work with confirmation dialog

Your profile page is now fully functional with enterprise-level features! 🚀 