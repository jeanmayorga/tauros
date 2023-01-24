import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Database } from "../../types";

export function useMuscles() {
  const supabase = useSupabaseClient<Database>();

  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await supabase.from("muscles").select("*");
      return data;
    },
  });
}
