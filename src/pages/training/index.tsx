import { withAuth } from "../../hooks/withAuth";
import { TrainingPage } from "../../modules/training";

export default function Page() {
  return <TrainingPage />;
}
export const getServerSideProps = withAuth;
