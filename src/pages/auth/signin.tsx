import { withNoAuth } from "../../hooks";
import { SignInPage } from "../../modules/auth";

export default SignInPage;

export const getServerSideProps = withNoAuth;
