import { withAuth, WithAuthProps } from "../../hooks";
import { InformationPage } from "../../modules/account";

export default function Page(props: WithAuthProps) {
  return <InformationPage {...props} />;
}
export const getServerSideProps = withAuth;
