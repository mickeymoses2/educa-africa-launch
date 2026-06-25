import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logistics")({
  head: () => ({ meta: [{ title: "EDUCA Logistics" }] }),
  component: () => <Outlet />,
});