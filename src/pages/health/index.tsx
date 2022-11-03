import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { HomeHealthView } from "../../views";

export default HomeHealthView;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/signin" });
