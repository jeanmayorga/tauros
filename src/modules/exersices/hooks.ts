import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Database } from "../../types";

export function useExercises() {
  const supabase = useSupabaseClient<Database>();

  return useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const { data } = await supabase.from("exercises").select("*");
      return data;
    },
  });
}
