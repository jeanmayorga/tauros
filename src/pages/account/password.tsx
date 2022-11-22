import { withAuth } from "../../hooks";
import { PasswordPage } from "../../modules/account";

export default function Page() {
  return <PasswordPage />;
}
export const getServerSideProps = withAuth;
