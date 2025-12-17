import { DataTable } from "@/components/table/data-table";
import { createFileRoute } from "@tanstack/react-router";
import data from "@/data/table-data.json";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="@container/main">
      <DataTable data={data} />
    </div>
  );
}
