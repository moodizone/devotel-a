import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { useGerSubmissions } from "@/hooks/queries";
import { DataTable } from "@/pages/submissions/table";
import { Submission } from "@/services/type";

function SubmissionsList() {
  const { data } = useGerSubmissions();
  const columns: ColumnDef<Record<keyof Submission, unknown>>[] =
    React.useMemo(() => {
      if (data.columns) {
        return data.columns.map((key) => ({
          accessorKey: key,
          header: () => <span className="capitalize">{key}</span>,
          cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue(key)}</div>
          ),
        }));
      }
      return [];
    }, [data.columns]);

  return <DataTable data={data.data ?? []} columns={columns} />;
}

export default SubmissionsList;
