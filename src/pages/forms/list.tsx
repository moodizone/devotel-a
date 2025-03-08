import { Link } from "react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetForms } from "@/hooks/queries";
import { ROUTES } from "@/router/routes";

function FormsList() {
  const { data } = useGetForms();

  return (
    <div className="flex flex-wrap gap-4">
      {data?.map(({ formId, title, fields }) => {
        const to = ROUTES.forms.details.replace(":id", formId);
        return (
          <Link to={to} key={formId}>
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{`${fields.length} fields`}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default FormsList;
