import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/parent")({
  component: () => <Outlet />,
});