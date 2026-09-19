import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { updateStateByElapsedTime } from '../shared/helpers/UpdateStateByElapsedTime';

notifee.onBackgroundEvent(async (event) => {
    if (event.type !== EventType.DISMISSED && event.type !== EventType.DELIVERED) return;

    await new Promise((resolve) => setTimeout(() => resolve({}), 1000));

    const pomodoroState = await AsyncStorage.getItem('POMODORO_STATE').then(value => JSON.parse(value || 'null'));
    if (!pomodoroState) return;

    const updatedPomodoState = updateStateByElapsedTime(pomodoroState);

    const getNotificationTitle = () => {
        switch (updatedPomodoState.currentStatus) {
            case 'focus': return 'Hora de se concentrar'
            case 'longBreak': return 'Pausa Longa'
            case 'shortBreak': return 'Pausa Curta'
            default: return 'Iniciando Pomodoro'
        }
    }


    const maxTime = () => {
        switch (updatedPomodoState.currentStatus) {
            case 'focus': return updatedPomodoState.currentFocusTime
            case 'longBreak': return updatedPomodoState.currentLongBreakTime
            case 'shortBreak': return updatedPomodoState.currentShortBreakTime
            default: return updatedPomodoState.currentFocusTime
        }
    }

    const getMaxTime = maxTime();

    await notifee.displayNotification({
        id: 'pomodoro_progress',
        title: getNotificationTitle(),
        body: `${Math.floor(updatedPomodoState.counterFocusTime / 60)}:${String(updatedPomodoState.counterFocusTime % 60).padStart(2, '0')}`,

        android: {
            channelId: 'pomodoro_channel',
            ongoing: true,
            timeoutAfter: 1000,
            progress: {
                max: getMaxTime,
                current: getMaxTime - updatedPomodoState.counterFocusTime,
            }
        }
    })
});

const requestPermission = async () => {
    const { authorizationStatus } = await notifee.requestPermission();

    if (authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
        Alert.alert(
            'Permissão de notificação negada',
            'É necessária a permissão de notificação para que este aplicativo funcione corretamente. Ative as notificações nas configurações do seu dispositivo.',
        );
    }
}

const activateNotification = async () => {
    await notifee.createChannel({
        id: 'pomodoro_channel',
        name: 'Pomodoro Notifications',
    });

    notifee.displayNotification({
        id: 'pomodoro_progress',
        title: 'Pomodoro',
        body: 'Iniciando Notifcações',

        android: {
            channelId: 'pomodoro_channel',
            ongoing: true,
            timeoutAfter: 1000,
            progress: {
                max: 1,
                current: 1,
                indeterminate: true,
            }
        }
    })
}

const deactivateNotification = async () => {
    await notifee.cancelAllNotifications();
}

export const NotificationService = {
    requestPermission,
    activateNotification,
    deactivateNotification,
};