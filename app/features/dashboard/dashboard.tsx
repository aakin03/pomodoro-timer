import { Link } from "react-router";

export function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-2xl font-bold">
                Welcome to your dashboard!
            </div>
            <div className="flex gap-2 flex-col items-center justify-center">
                <p className="text-lg">
                    Here you can start a pomodoro timer and track your progress.
                </p>
                <Link to="/pomodoro" className="btn start w-56 text-center">
                    Start Pomodoro
                </Link>
            </div>
            <hr className="w-full border-gray-200 dark:border-gray-900" />
            <p className="text-lg text-center"> Keep checking back for more features!</p>
        </div>
    );
}