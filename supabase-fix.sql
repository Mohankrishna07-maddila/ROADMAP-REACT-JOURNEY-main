-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create better RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to insert their profile during signup
CREATE POLICY "Enable insert for authenticated users only" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Drop and recreate other table policies
DROP POLICY IF EXISTS "Users can manage own skills" ON skills;
DROP POLICY IF EXISTS "Users can manage own roadmap progress" ON roadmap_progress;
DROP POLICY IF EXISTS "Users can manage own assessment results" ON assessment_results;

CREATE POLICY "Users can manage own skills" ON skills
    FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Users can manage own roadmap progress" ON roadmap_progress
    FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Users can manage own assessment results" ON assessment_results
    FOR ALL USING (auth.uid() = profile_id); 