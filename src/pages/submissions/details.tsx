import { Navigate, useParams } from "react-router";

import { useGerSubmissions } from "@/hooks/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/router/routes";

function SubmissionDetails() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGerSubmissions();
  const details = id ? data?.data.find((d) => d.id === id) : undefined;

  if (!details) {
    return <Navigate to={ROUTES._404} />;
  }

  return (
    <div className="flex gap-4">
      <div className="max-w-[480px] me-auto flex-grow-1 flex-shrink-1">
        <Card>
          <CardHeader>
            <CardTitle>{"Submission Details"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <pre className="mt-2 rounded-md p-2 dark:bg-zinc-800 bg-zinc-200 ">
              <code className="dark:text-white whitespace-pre-wrap">
                {JSON.stringify(details, null, 2)}
              </code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SubmissionDetails;
