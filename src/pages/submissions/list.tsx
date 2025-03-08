import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { useGerSubmissions } from "@/hooks/queries";
import { DataTable } from "@/pages/submissions/table";
import { Submission } from "@/services/type";
import { ROUTES } from "@/router/routes";
import { DataTableColumnHeader } from "@/pages/submissions/table/sort";

function SubmissionsList() {
  const navigate = useNavigate();
  const { data } = useGerSubmissions();
  const columns: ColumnDef<Submission>[] = React.useMemo(() => {
    if (data.columns) {
      return data.columns.map((key) => ({
        accessorKey: key,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={key} />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue(key)}</div>,

        // since `male` phrase is subset of female, it makes gender filter useless
        filterFn: "arrIncludes",
      }));
    }
    return [];
  }, [data.columns]);
  function onRowClick(id: string) {
    navigate(ROUTES.submissions.details.replace(":id", id));
  }

  //================================
  // Render
  //================================
  return (
    <DataTable
      data={data.data ?? []}
      columns={columns}
      onRowClick={onRowClick}
    />
  );
}

export default SubmissionsList;
