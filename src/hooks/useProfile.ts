import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Profile } from "../modules/profile";
import { Database } from "../types";

export function useProfile() {
  const [profile, setProfile] = useState<Profile>();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  useEffect(() => {
    async function getProfile() {
      const response = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id);
      const currentProfile = response.data;
      if (currentProfile) {
        setProfile(currentProfile[0]);
      }
    }

    getProfile();
  }, [supabase, user]);

  return profile;
}
