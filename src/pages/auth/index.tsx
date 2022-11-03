import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AccountView } from "../../views";

export default AccountView;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/signin" });
