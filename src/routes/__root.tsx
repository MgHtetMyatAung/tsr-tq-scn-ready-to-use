import UIProvider from "@/providers/ui-provider";
import type { RouterContext } from "@/route-context";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import "../index.css";

const RootLayout = () => (
  <UIProvider>
    <Outlet />
  </UIProvider>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
