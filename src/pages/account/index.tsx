import { withAuth } from "../../hooks";
import { AccountPage } from "../../modules/account";

export default function Page() {
  return <AccountPage />;
}
export const getServerSideProps = withAuth;
