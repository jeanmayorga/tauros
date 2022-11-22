import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { serialize } from "cookie";
import { Profile } from "../modules/profile";

export interface WithAuthProps {
  profile: Profile;
}
export const withAuth = async (ctx: GetServerSidePropsContext) => {
  const profileCached = ctx.req.cookies?.["profile"];
  const supabaseAuthToken = ctx.req.cookies?.["supabase-auth-token"];

  if (profileCached && supabaseAuthToken) {
    console.log("auth get info from cache");
    return {
      props: {
        profile: JSON.parse(profileCached),
        session: supabaseAuthToken,
      },
    };
  }

  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id)
    .single();

  ctx.res.setHeader("set-cookie", [
    serialize("profile", JSON.stringify(profile), {
      maxAge: 60 * 60,
      path: "/",
    }),
  ]);

  console.log("auth makes two requests");

  return {
    props: {
      profile,
      session: session.access_token,
    },
  };
};
