import { withAuth } from "../../hooks/withAuth";
import { CreateTrainingPage } from "../../modules/training";

export default function Page() {
  return <CreateTrainingPage />;
}
export const getServerSideProps = withAuth;
