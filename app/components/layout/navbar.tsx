import { NavLink } from "react-router";

export function Navbar() {
    return (
        <nav className="flex flex-col items-center gap-4 p-4 bg-gray-100 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-900 h-screen w-64">
            <div className="flex flex-col items-center gap-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "btn active w-56 text-center" : "btn start w-56 text-center"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/pomodoro"
                    className={({ isActive }) =>
                        isActive ? "btn active w-56 text-center" : "btn start w-56 text-center"
                    }
                >
                    Pomodoro
                </NavLink>
            </div>
        </nav>
    );
}   