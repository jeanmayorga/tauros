import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env";

export const supabase = createClient(env.X_SUPABASE_URL, env.X_PUBLIC_ANON_KEY);
