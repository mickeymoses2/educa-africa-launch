import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/schools")({
  component: () => <Outlet />,
});