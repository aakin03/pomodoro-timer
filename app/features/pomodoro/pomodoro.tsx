import { useState, useEffect } from "react";
import { BreakTodoList } from "./breakTodoList";

export function Pomodoro() {
    const [workTime, setWorkTime] = useState(25 * 60);
    const [shortBreakTime, setShortBreakTime] = useState(5 * 60);
    const [longBreakTime, setLongBreakTime] = useState(15 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const resetTimer = () => {
        setIsRunning(false);
        setWorkTime(25 * 60);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const openSettings = () => {
        setIsSettingsOpen(true);
    };

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setWorkTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    return (
        <div className="timer">
            <h1 className="text-4xl font-bold">Pomodoro Timer</h1>
            <p className="text-4xl font-bold">
                {Math.floor(workTime / 60).toString().padStart(2, '0')}:
                {Math.floor(workTime % 60).toString().padStart(2, '0')}
            </p>
            <div className="flex gap-2">
                <button className={isRunning ? "pause" : "start"} onClick={toggleTimer}>
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button className="reset" onClick={resetTimer}>
                    Reset
                </button>
                <button className="settings" onClick={openSettings}>
                    Settings
                </button>
            </div>
            {isSettingsOpen && (
                <div className="settings-modal">
                    <div className="settings-modal-content">
                        <h2>Settings</h2>
                        <div className="settings-modal-content-item">
                            <label htmlFor="work-time">Work Time</label>
                            <input
                                type="number"
                                id="work-time"
                                value={workTime / 60}
                                onChange={(e) => setWorkTime(Number(e.target.value) * 60)}
                            />
                        </div>
                        <div className="settings-modal-content-item">
                            <label htmlFor="short-break-time">Short Break Time</label>
                            <input
                                type="number"
                                id="short-break-time"
                                value={(shortBreakTime / 60).toString().padStart(1, '0')}
                                onChange={(e) => setShortBreakTime(Number(e.target.value) * 60)}
                            />
                        </div>
                        <div className="settings-modal-content-item">
                            <label htmlFor="long-break-time">Long Break Time</label>
                            <input
                                type="number"
                                id="long-break-time"
                                value={(longBreakTime / 60).toString().padStart(1, '0')}
                                onChange={(e) => setLongBreakTime(Number(e.target.value) * 60)}
                            />
                        </div>
                        <button className="close" onClick={() => setIsSettingsOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center space-y-4">
                <hr className="w-full border-gray-200 dark:border-gray-900" />
                <p className="text-lg text-center">
                    What should you do during your break?
                </p>
                <p className="text-sm text-center">
                    Add your break ideas below
                </p>
                <BreakTodoList />
            </div>
        </div>
    );
}