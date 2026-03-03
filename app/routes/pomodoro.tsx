import type { Route } from "./+types/pomodoro";
import { Pomodoro } from "../features/pomodoro/pomodoro";

export function loader({ }: Route.LoaderArgs) {
    return {};
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Pomodoro Timer" },
        { name: "description", content: "A simple pomodoro timer" },
    ];
}

export default function PomodoroRoute() {
    return <Pomodoro />;
}