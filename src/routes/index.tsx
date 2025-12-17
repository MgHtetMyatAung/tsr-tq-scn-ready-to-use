import { ComponentExample } from "@/components/component-example";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const router = Route.useNavigate();
  return (
    <div className="p-2">
      <h3 className=" text-center text-2xl lg:text-4xl 2xl:text-6xl py-10 font-medium">
        TS Stack
      </h3>
      <div className=" flex justify-center">
        <Button
          className=" cursor-pointer"
          onClick={() => router({ to: "/dashboard" })}
        >
          Dashboard
        </Button>
      </div>
      <ComponentExample />
    </div>
  );
}
