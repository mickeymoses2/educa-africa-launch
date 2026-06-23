import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/supplier")({
  component: () => <Outlet />,
});