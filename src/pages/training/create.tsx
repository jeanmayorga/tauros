import { withAuth } from "../../hooks";
import { CreateTrainingPage } from "../../modules/training";

export default function Page() {
  return <CreateTrainingPage />;
}
export const getServerSideProps = withAuth;
