import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AccountPage } from "../../modules/account";

export default AccountPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/signin" });
