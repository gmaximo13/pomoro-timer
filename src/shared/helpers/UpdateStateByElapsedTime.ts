interface IAppstate {
    currentStatus: "break" | "focus" | "shortBreak" | "longBreak";
    time: number;
    counterFocusTime: number;
    currentFocusTime: number;
    currentShortBreakTime: number;
    currentLongBreakTime: number;
    pomodoroStepCount: number;
    isRunning: boolean;
    isPaused: boolean;
}

export const updateStateByElapsedTime = (appState: IAppstate): IAppstate => {

    if (!appState.isRunning || !appState.isPaused) return appState;

    const now = Date.now();
    const elapsedTime = Math.floor((now - (appState.time ?? now)) / 1000); // Calculate elapsed time in seconds
    if (elapsedTime <= 0) return appState;

    let remaining = appState.counterFocusTime;
    let timeLeft = remaining - elapsedTime;
    let currentStatus = appState.currentStatus;
    let step = appState.pomodoroStepCount;

    const advanceCycle = () => {
        if (currentStatus === 'focus') {
            if (step < 4) {
                step = (step + 1) as 1 | 2 | 3 | 4;
                currentStatus = 'shortBreak';
                return appState.currentShortBreakTime;
            } else {
                step = 1;
                currentStatus = 'longBreak';
                return appState.currentLongBreakTime;
            }
        }

        if (currentStatus === 'shortBreak' || currentStatus === 'longBreak') {
            currentStatus = 'focus';
            return appState.currentFocusTime;
        }

        return remaining;
    };

    while (timeLeft <= 0) {
        const overflow = Math.abs(timeLeft);
        const nextTime = advanceCycle();

        timeLeft = nextTime - overflow;
    }

    return {
        ...appState,
        pomodoroStepCount: step,
        time: now,
        currentStatus,
        counterFocusTime: timeLeft,
    };
}