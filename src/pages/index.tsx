import { WithAuthProps, withAuth } from "../hooks";
import { HomePage } from "../modules/home";

export default function Page(props: WithAuthProps) {
  return <HomePage {...props} />;
}

export const getServerSideProps = withAuth;
