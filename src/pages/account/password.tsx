import { withAuth } from "../../hooks/withAuth";
import { PasswordPage } from "../../modules/account";

export default function Page() {
  return <PasswordPage />;
}
export const getServerSideProps = withAuth;
