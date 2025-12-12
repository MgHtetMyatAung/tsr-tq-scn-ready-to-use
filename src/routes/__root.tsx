import UIProvider from "@/providers/ui-provider";
import type { RouterContext } from "@/route-context";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

const RootLayout = () => (
  <UIProvider>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </div>
    <hr />
    <Outlet />
  </UIProvider>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
