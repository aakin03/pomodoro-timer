import { useState, useEffect } from "react";
import { BreakTodoList } from "./breakTodoList";

function playBeep() {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5 tone
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.8);
    oscillator.onended = () => ctx.close();
}

export function Pomodoro() {
    const defaultTimers = {
        workTime: 25 * 60,
        shortBreakTime: 5 * 60,
        longBreakTime: 15 * 60,
    }
    const [timers, setTimers] = useState(defaultTimers);
    const [customTimers, setCustomTimers] = useState(defaultTimers);
    type TimerType = "workTime" | "shortBreakTime" | "longBreakTime";
    const [currentTimerType, setCurrentTimerType] = useState<TimerType>("workTime");
    const [isRunning, setIsRunning] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);

    const resetTimer = () => {
        setIsRunning(false);
        setCurrentTimerType("workTime");
        setSessionsCompleted(0);
        setTimers(customTimers);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const openSettings = () => {
        setIsSettingsOpen(true);
        setIsRunning(false);
    };

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimers(prevTimers => ({
                    ...prevTimers,
                    [currentTimerType]: prevTimers[currentTimerType] - 1,
                }));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, currentTimerType]);

    useEffect(() => {
        if (currentTimerType === "workTime") {
            if (timers[currentTimerType] === 0 && !isSettingsOpen) {
                playBeep();
                setIsRunning(false);

                if ((sessionsCompleted + 1) % 4 === 0) {
                    setCurrentTimerType("longBreakTime");
                    setIsRunning(true);
                } else {
                    setCurrentTimerType("shortBreakTime");
                    setIsRunning(true);
                }

                setSessionsCompleted(prevSessions => prevSessions + 1);
                setTimers(prevTimers => ({
                    ...prevTimers,
                    workTime: customTimers.workTime,
                    shortBreakTime: customTimers.shortBreakTime,
                    longBreakTime: customTimers.longBreakTime,
                }));
            }
        } else {
            if (timers[currentTimerType] === 0 && !isSettingsOpen) {
                playBeep();
                setIsRunning(false);
                setCurrentTimerType("workTime");
                setIsRunning(true);
                setTimers(prevTimers => ({
                    ...prevTimers,
                    workTime: customTimers.workTime,
                    shortBreakTime: customTimers.shortBreakTime,
                    longBreakTime: customTimers.longBreakTime,
                }));
            }
        }
    }, [currentTimerType, timers[currentTimerType]]);

    return (
        <div className="timer">
            <h1 className="text-4xl font-bold">
                Pomodoro Timer - {currentTimerType === "workTime" ? "Focus" : "Break"}
            </h1>
            <h2 className="text-2xl font-bold">
                Sessions Completed: {sessionsCompleted}
            </h2>
            <p className="text-4xl font-bold">
                {Math.floor(timers[currentTimerType] / 60).toString().padStart(2, '0')}:
                {Math.floor(timers[currentTimerType] % 60).toString().padStart(2, '0')}
            </p>
            <div className="flex gap-2">
                <button className={isRunning ? "pause w-24 text-center" : "start w-24 text-center"} onClick={toggleTimer}>
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button className="reset w-24 text-center" onClick={resetTimer}>
                    Reset
                </button>
                <button className="settings w-24 text-center" onClick={openSettings}>
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
                                value={customTimers.workTime / 60}
                                onChange={(e) => setCustomTimers(prevTimers => ({
                                    ...prevTimers,
                                    workTime: Number(e.target.value) * 60,
                                }))}
                            />
                        </div>
                        <div className="settings-modal-content-item">
                            <label htmlFor="short-break-time">Short Break Time</label>
                            <input
                                type="number"
                                id="short-break-time"
                                value={customTimers.shortBreakTime / 60}
                                onChange={(e) => setCustomTimers(prevTimers => ({
                                    ...prevTimers,
                                    shortBreakTime: Number(e.target.value) * 60,
                                }))}
                            />
                        </div>
                        <div className="settings-modal-content-item">
                            <label htmlFor="long-break-time">Long Break Time</label>
                            <input
                                type="number"
                                id="long-break-time"
                                value={customTimers.longBreakTime / 60}
                                onChange={(e) => setCustomTimers(prevTimers => ({
                                    ...prevTimers,
                                    longBreakTime: Number(e.target.value) * 60,
                                }))}
                            />
                        </div>
                        <button className="btn reset w-56 text-center mt-4" onClick={() => {
                            setCustomTimers(defaultTimers);
                            setTimers(defaultTimers);
                        }}>
                            Reset to default
                        </button>
                        <button className="btn close w-56 text-center" onClick={() => {
                            setTimers(customTimers);
                            setIsSettingsOpen(false);
                        }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center space-y-4">
                <hr className="w-full border-gray-200 dark:border-gray-900" />
                <p className="text-lg text-center">
                    Things to do during your break
                </p>
                <p className="text-sm text-center">
                    We recommend resting your eyes, stretching, or doing something you enjoy.
                    <br />
                    But if you want to be productive, feel free to add some tasks below!
                </p>
                <BreakTodoList />
            </div>
        </div>
    );
}