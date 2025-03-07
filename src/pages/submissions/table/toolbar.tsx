import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/pages/submissions/table/view-options";
import { DataTableFacetedFilter } from "@/pages/submissions/table/faceted-filter";
import { Gender } from "@/services/type";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn("Full Name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("Full Name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("Gender") && (
          <DataTableFacetedFilter
            column={table.getColumn("Gender")}
            title="Gender"
            options={[
              { label: Gender.female, value: Gender.female },
              { label: Gender.male, value: Gender.male },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {"Reset"}
            <Cross2Icon className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
