import { withAuth } from "../../hooks/withAuth";
import { AccountPage } from "../../modules/account";

export default function Page() {
  return <AccountPage />;
}
export const getServerSideProps = withAuth;
