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
            <p className="absolute bottom-0 flex flex-col items-center w-full p-4 text-xs text-gray-500 dark:text-gray-400" onClick={() => alert("What are you looking for? o_O")}>
                version 0.0.1
            </p>
        </nav>
    );
}   