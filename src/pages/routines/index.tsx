import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { HomeRoutinesView } from "../../views";

export default HomeRoutinesView;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/signin" });
