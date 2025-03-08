import { useGetForms } from "@/hooks/queries";

function FormsList() {
  const { data } = useGetForms();
  console.log(data);

  return <div>forms content goes here</div>;
}

export default FormsList;
