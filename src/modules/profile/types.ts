import { Database, NoUndefinedField } from "../../types";

export type ProfileNotNull = NoUndefinedField<
  Database["public"]["Tables"]["profiles"]["Row"]
>;

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
