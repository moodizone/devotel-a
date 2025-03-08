import { useGerSubmissions } from "@/hooks/queries";

function SubmissionsList() {
  const { data } = useGerSubmissions();
  console.log(data);

  return <div>subs content goes here</div>;
}

export default SubmissionsList;
