import { GetServerSidePropsContext } from "next";

export const withNoAuth = async (ctx: GetServerSidePropsContext) => {
  const profileCached = ctx.req.cookies?.["profile"];
  const supabaseAuthToken = ctx.req.cookies?.["supabase-auth-token"];

  if (profileCached && supabaseAuthToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
