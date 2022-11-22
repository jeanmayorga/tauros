import { WithAuth, withAuth } from "../hooks/withAuth";
import { HomePage } from "../modules/home";

export default function Page(props: WithAuth) {
  return <HomePage {...props} />;
}

export const getServerSideProps = withAuth;
