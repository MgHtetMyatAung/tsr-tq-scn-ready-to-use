import { ComponentExample } from "@/components/component-example";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/use-auth-store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const auth = useAuthStore();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <ComponentExample />
      <Button onClick={() => auth.login("htet")}>Login</Button>
    </div>
  );
}
