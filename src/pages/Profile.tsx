import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Mail, MapPin, Briefcase, Calendar, Edit, Save, X, Camera, Shield, Bell, Globe, Lock, Eye, EyeOff, Trash2, Download, Upload, Map, ClipboardCheck } from "lucide-react";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/services/supabaseApi";
import { supabase } from "@/lib/supabase";

const Profile = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    currentRole: "",
    experienceLevel: "",
    interests: [] as string[],
    location: "",
    website: "",
    github: "",
    linkedin: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    profileVisibility: "public",
    twoFactorAuth: false,
  });
  const [newInterest, setNewInterest] = useState("");

  // Initialize profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        bio: user.bio || "",
        currentRole: user.current_role || "",
        experienceLevel: user.experience_level || "",
        interests: user.interests || [],
        location: user.location || "",
        website: user.website || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingPhoto(true);
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `profile-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new photo URL
      const result = await updateProfile({
        profile_picture: publicUrl
      });

      if (result.success) {
        toast({
          title: "Photo Updated",
          description: "Your profile photo has been updated successfully.",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const result = await updateProfile({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        email: profileData.email,
        bio: profileData.bio,
        current_role: profileData.currentRole,
        experience_level: profileData.experienceLevel,
        interests: profileData.interests,
        location: profileData.location,
        website: profileData.website,
        github: profileData.github,
        linkedin: profileData.linkedin,
      });
      
      if (result.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        setIsEditing(false);
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await authAPI.resetPassword(passwordData.newPassword);
      
      if (result.success) {
        toast({
          title: "Password Updated",
          description: "Your password has been updated successfully.",
        });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw new Error(result.message || "Failed to update password");
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    if (!user) return;

    try {
      // Create user data object
      const userData = {
        profile: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          bio: user.bio,
          current_role: user.current_role,
          experience_level: user.experience_level,
          interests: user.interests,
          location: user.location,
          website: user.website,
          github: user.github,
          linkedin: user.linkedin,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
        export_date: new Date().toISOString(),
        platform: "CareerPath"
      };

      // Convert to JSON and create download
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `careerpath-data-${user.id}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: "Your data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) return;

    try {
      // Delete user data from Supabase
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (error) throw error;

      // Sign out the user
      await logout();

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        bio: user.bio || "",
        currentRole: user.current_role || "",
        experienceLevel: user.experience_level || "",
        interests: user.interests || [],
        location: user.location || "",
        website: user.website || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
      });
    }
    setIsEditing(false);
  };

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
  };

  // Generate intelligent activity based on user status
  const generateUserActivity = () => {
    const hasProfileData = user?.bio || user?.location || user?.website || user?.github || user?.linkedin;
    const hasRoleInfo = user?.current_role || user?.experience_level;
    const hasInterests = user?.interests && user.interests.length > 0;
    
    // Check if user is new (no profile data, no role info, no interests)
    const isNewUser = !hasProfileData && !hasRoleInfo && !hasInterests;
    
    // Check if user has some activity but not much
    const hasSomeActivity = hasProfileData || hasRoleInfo || hasInterests;
    
    if (isNewUser) {
      return [
        {
          id: 1,
          type: "welcome",
          title: "Welcome to Your Learning Journey! 🎉",
          description: "Start by exploring roadmaps and completing your profile to get personalized recommendations",
          timestamp: "Just now",
          icon: "🚀",
          color: "text-blue-500"
        },
        {
          id: 2,
          type: "profile_setup",
          title: "Complete Your Profile",
          description: "Add your bio, location, and professional information to get started",
          timestamp: "Next step",
          icon: "👤",
          color: "text-purple-500"
        },
        {
          id: 3,
          type: "explore_roadmaps",
          title: "Explore Learning Roadmaps",
          description: "Browse through different development roadmaps to find your path",
          timestamp: "Get started",
          icon: "🗺️",
          color: "text-green-500"
        },
        {
          id: 4,
          type: "take_assessment",
          title: "Take Skill Assessment",
          description: "Assess your current skills to get personalized learning recommendations",
          timestamp: "Recommended",
          icon: "📊",
          color: "text-orange-500"
        }
      ];
    } else if (hasSomeActivity) {
      return [
        {
          id: 1,
          type: "profile_updated",
          title: "Profile Updated",
          description: hasProfileData ? "You've added information to your profile" : "Keep building your profile",
          timestamp: "Recently",
          icon: "✏️",
          color: "text-purple-500"
        },
        {
          id: 2,
          type: "next_steps",
          title: "Next Steps",
          description: "Explore roadmaps and take skill assessments to continue your learning journey",
          timestamp: "Continue learning",
          icon: "🎯",
          color: "text-blue-500"
        },
        {
          id: 3,
          type: "recommendations",
          title: "Get Recommendations",
          description: "Complete your profile to receive personalized learning recommendations",
          timestamp: "Enhance experience",
          icon: "💡",
          color: "text-green-500"
        }
      ];
    } else {
      // User has significant activity - show mock achievements (for demo purposes)
      return [
        {
          id: 1,
          type: "roadmap_completed",
          title: "Completed Frontend Development Roadmap",
          description: "You've successfully completed the Frontend Development learning path",
          timestamp: "2 hours ago",
          icon: "🎯",
          color: "text-green-500"
        },
        {
          id: 2,
          type: "skill_assessment",
          title: "Took JavaScript Skill Assessment",
          description: "Scored 85% on JavaScript fundamentals assessment",
          timestamp: "1 day ago",
          icon: "📊",
          color: "text-blue-500"
        },
        {
          id: 3,
          type: "badge_earned",
          title: "Earned React Master Badge",
          description: "Congratulations! You've earned the React Master badge",
          timestamp: "3 days ago",
          icon: "🏆",
          color: "text-yellow-500"
        },
        {
          id: 4,
          type: "profile_updated",
          title: "Updated Profile Information",
          description: "You updated your professional information",
          timestamp: "1 week ago",
          icon: "✏️",
          color: "text-purple-500"
        }
      ];
    }
  };

  const userActivity = generateUserActivity();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Please sign in to view your profile.
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.profile_picture} alt={user?.first_name} />
                    <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 rounded-full p-0"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                      >
                        {isUploadingPhoto ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold">
                      {user?.first_name} {user?.last_name}
                    </h1>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{user?.email}</p>
                  {user?.current_role && (
                    <Badge variant="secondary" className="mb-2">
                      {user.current_role}
                    </Badge>
                  )}
                  {user?.experience_level && (
                    <Badge variant="outline" className="ml-2">
                      {user.experience_level}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="City, Country"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentRole">Current Role</Label>
                      <Input
                        id="currentRole"
                        name="currentRole"
                        value={profileData.currentRole}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., Frontend Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel">Experience Level</Label>
                      <Select
                        value={profileData.experienceLevel}
                        onValueChange={(value) => 
                          setProfileData(prev => ({ ...prev, experienceLevel: value }))
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Interests</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {profileData.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {interest}
                            {isEditing && (
                              <button
                                onClick={() => removeInterest(interest)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2">
                          <Input
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            placeholder="Add new interest"
                            onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                          />
                          <Button size="sm" onClick={addInterest}>
                            Add
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Social Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={profileData.website}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        name="github"
                        value={profileData.github}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={profileData.linkedin}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Member Since</Label>
                      <p className="font-medium">
                        {user?.created_at 
                          ? new Date(user.created_at).toLocaleDateString()
                          : "N/A"
                        }
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Last Updated</Label>
                      <p className="font-medium">
                        {user?.updated_at 
                          ? new Date(user.updated_at).toLocaleDateString()
                          : "N/A"
                        }
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Account Status</Label>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Basic Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your learning progress
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingsChange('emailNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get push notifications for new content and achievements
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingsChange('pushNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and promotions
                      </p>
                    </div>
                    <Switch
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) => handleSettingsChange('marketingEmails', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>
                    Control your profile visibility and privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => handleSettingsChange('profileVisibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can view</SelectItem>
                        <SelectItem value="private">Private - Only you can view</SelectItem>
                        <SelectItem value="friends">Friends - Only friends can view</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingsChange('twoFactorAuth', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  {/* Change Password */}
                  <div className="space-y-4">
                    <div>
                      <Label>Change Password</Label>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button onClick={handlePasswordUpdate} disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>
                    Manage your account data and privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Export Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of your data
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-destructive">Delete Account</Label>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove all your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              {/* Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Activity Summary
                  </CardTitle>
                  <CardDescription>
                    Your learning journey progress and status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {user?.bio ? "✅" : "⏳"}
                      </div>
                      <div className="text-sm font-medium mt-2">Profile Status</div>
                      <div className="text-xs text-muted-foreground">
                        {user?.bio ? "Complete" : "Incomplete"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {user?.current_role ? "✅" : "⏳"}
                      </div>
                      <div className="text-sm font-medium mt-2">Professional Info</div>
                      <div className="text-xs text-muted-foreground">
                        {user?.current_role ? "Added" : "Not Added"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {user?.interests && user.interests.length > 0 ? "✅" : "⏳"}
                      </div>
                      <div className="text-sm font-medium mt-2">Interests</div>
                      <div className="text-xs text-muted-foreground">
                        {user?.interests && user.interests.length > 0 ? `${user.interests.length} Added` : "None Added"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest learning activities and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {userActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className={`text-2xl ${activity.color}`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </p>
                          {/* Action buttons for new user activities */}
                          {activity.type === "profile_setup" && !isEditing && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => setIsEditing(true)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Profile
                            </Button>
                          )}
                          {activity.type === "explore_roadmaps" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => window.location.href = '/explore'}
                            >
                              <Map className="mr-2 h-4 w-4" />
                              Explore Roadmaps
                            </Button>
                          )}
                          {activity.type === "take_assessment" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => window.location.href = '/assessment'}
                            >
                              <ClipboardCheck className="mr-2 h-4 w-4" />
                              Take Assessment
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Edit Actions */}
          {isEditing && (
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile; 