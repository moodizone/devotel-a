import { Navigate, useParams } from "react-router";

import { useGetForms } from "@/hooks/queries";
import { ROUTES } from "@/router/routes";
import DynamicForm from "./formBuilder";

function FormDetails() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetForms();
  const details = id ? data?.find((d) => d.formId === id) : undefined;

  if (!details) {
    return <Navigate to={ROUTES._404} />;
  }

  return (
    <div className="w-full max-w-[480px] me-auto">
      <DynamicForm formSchema={details} />
    </div>
  );
}

export default FormDetails;
