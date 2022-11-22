import { withAuth } from "../../hooks/withAuth";
import { InformationPage } from "../../modules/account";
import { Profile } from "../../modules/profile";

export default function Page(props: { profile: Profile }) {
  return <InformationPage {...props} />;
}
export const getServerSideProps = withAuth;
