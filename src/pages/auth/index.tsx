import { useSession } from "@supabase/auth-helpers-react";
import { AccountView, SignInView } from "../../views";

export default function Auth() {
  const session = useSession();

  if (session) {
    return <AccountView />;
  }

  return <SignInView />;
}
