import { withNoAuth } from "../../hooks";
import { SignUpPage } from "../../modules/auth";

export default SignUpPage;

export const getServerSideProps = withNoAuth;
