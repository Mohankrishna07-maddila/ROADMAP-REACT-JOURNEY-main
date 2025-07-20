import { supabase } from "@/lib/supabase";

export type ActivityType =
  | "enroll_course"
  | "join_roadmap"
  | "profile_update"
  | "assessment"
  | "community_join"
  | "contact"
  | "custom";

export interface UserActivity {
  id: string;
  user_id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: string;
  metadata?: any;
}

export async function logUserActivity({
  user_id,
  type,
  title,
  description,
  metadata
}: {
  user_id: string;
  type: ActivityType;
  title: string;
  description?: string;
  metadata?: any;
}) {
  const { error } = await supabase.from("user_activities").insert([
    {
      user_id,
      type,
      title,
      description,
      metadata,
    },
  ]);
  if (error) throw error;
}

export async function fetchUserActivities(user_id: string): Promise<UserActivity[]> {
  const { data, error } = await supabase
    .from("user_activities")
    .select("*")
    .eq("user_id", user_id)
    .order("timestamp", { ascending: false });
  if (error) throw error;
  return data as UserActivity[];
} 