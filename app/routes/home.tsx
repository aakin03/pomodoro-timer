import type { Route } from "./+types/home";
import { Dashboard } from "../features/dashboard/dashboard";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "A simple dashboard" },
  ];
}

export default function Home() {
  return <Dashboard />;
}
