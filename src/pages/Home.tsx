import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';

import { TScreenDefinitionsProps } from '../AppRoutes';
import { Theme } from '../shared/themes/Theme';

export const Home = () => {
  const navigation = useNavigation<TScreenDefinitionsProps>();

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pomodoroStepCount, setPomodoroStepCount] = useState<number>(0);
  const [counterFocusTime, setCounterFocusTime] = useState<number>(25 * 60);
  const [currentStatus, setCurrentStatus] = useState<'break' | 'focus' | 'shortBreak' | 'longBreak'>('break');

  const [currentFocusTime] = useState<number>(25 * 60);
  const [currentShortBreakTime] = useState<number>(5 * 60);
  const [currentLongBreakTime] = useState<number>(15 * 60);

  const handleStart = () => {
    setIsRunning(true);
    setPomodoroStepCount(1);
    setCurrentStatus('focus');
  }

  const handlePause = () => {
    setIsPaused(true);
  }

  const handleContinue = () => {
    setIsPaused(false);
  }

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCounterFocusTime(currentFocusTime);
    setPomodoroStepCount(0);
    setCurrentStatus('break');
  }

  const getProgressFill = useMemo(() => {
    switch (currentStatus) {
      case 'focus':
        return (100 - (counterFocusTime / currentFocusTime) * 100);
      case 'shortBreak':
        return (100 - (counterFocusTime / currentShortBreakTime) * 100);
      case 'longBreak':
        return (100 - (counterFocusTime / currentLongBreakTime) * 100);
      default:
        return 0;
    }
  }, [counterFocusTime, currentStatus, currentFocusTime, currentShortBreakTime, currentLongBreakTime]);

  useEffect(() => {
    if (!isRunning || isPaused) return;
    const interval = setInterval(() => {
      setCounterFocusTime(old => old <= 0 ? old : old - 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  useEffect(() => {
    switch (currentStatus) {
      case 'focus': {
        if (counterFocusTime > 0) break;

        if (pomodoroStepCount < 4) {
          setCurrentStatus('shortBreak');
          setCounterFocusTime(currentShortBreakTime);
        } else if (pomodoroStepCount >= 4) {
          setPomodoroStepCount(0);
          setCurrentStatus('longBreak');
          setCounterFocusTime(currentLongBreakTime);
        }

        break;
      }

      case 'shortBreak':
      case 'longBreak': {
        if (counterFocusTime <= 0) {
          setPomodoroStepCount(old => old + 1);
          setCurrentStatus('focus');
          setCounterFocusTime(currentFocusTime);
        }
        break;
      }
    }
  }, [counterFocusTime, currentStatus, currentShortBreakTime, currentLongBreakTime, currentFocusTime, pomodoroStepCount]);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <MaterialIcons name="settings" size={28} color={Theme.colors.divider} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Pomodoro</Text>
        </View>

        <View style={styles.stateContainer}>
          {!isRunning && !isPaused && (
            <Text style={styles.stateText}>
              Vamos nos concentrar?
            </Text>
          )}

          {isRunning && (<>
            {!isPaused && currentStatus === 'focus' && (
              <Text style={styles.stateText}>
                Hora de se concentrar!
              </Text>
            )}

            {isPaused && (
              <Text style={styles.stateText}>
                Cronômetro em pausa
              </Text>
            )}

            {!isPaused && currentStatus === 'shortBreak' && (
              <Text style={styles.stateText}>
                Pausa curta
              </Text>
            )}

            {!isPaused && currentStatus === 'longBreak' && (
              <Text style={styles.stateText}>
                Pausa longa
              </Text>
            )}
          </>)}
        </View>

        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={160}
            width={7}
            fill={getProgressFill}
            tintColor={Theme.colors.divider}
            backgroundColor={Theme.colors.primary}
            rotation={0}
            children={() => (
              <Text style={styles.progressText}>
                {Math.floor(counterFocusTime / 60)}:{String(counterFocusTime % 60).padStart(2, '0')}
              </Text>
            )}
          />
        </View>

        {!isRunning && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStart}
            >
              <Text style={styles.primaryButtonText}>
                Iniciar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isRunning && !isPaused && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handlePause}
            >
              <Text style={styles.primaryButtonText}>
                Pausar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleReset}
            >
              <Text style={styles.secondaryButtonText}>
                Parar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isRunning && isPaused && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
            >
              <Text style={styles.primaryButtonText}>
                Continuar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleReset}
            >
              <Text style={styles.secondaryButtonText}>
                Reiniciar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.pomodoroIndicatorContainer}>
          <Text style={styles.pomodoroIndicatorText}>
            Pomodoros:
          </Text>

          <View style={pomodoroStepCount >= 1 ? styles.pomodoroIndicatorComplete : styles.pomodoroIndicator} />
          <View style={pomodoroStepCount >= 2 ? styles.pomodoroIndicatorComplete : styles.pomodoroIndicator} />
          <View style={pomodoroStepCount >= 3 ? styles.pomodoroIndicatorComplete : styles.pomodoroIndicator} />
          <View style={pomodoroStepCount >= 4 ? styles.pomodoroIndicatorComplete : styles.pomodoroIndicator} />

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  container: {
    gap: 36,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingsButton: {
    alignSelf: 'flex-end',
  },

  titleGroup: {
    gap: 24,
  },

  primaryButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 55,
  },

  primaryButtonText: {
    fontFamily: 'InterRegular',
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.text,
  },

  secondaryButton: {
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 55,
    borderColor: Theme.colors.primary,
  },

  secondaryButtonText: {
    fontFamily: 'InterRegular',
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.text,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },

  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressText: {
    fontFamily: 'InterBold',
    fontSize: Theme.fontSizes.extraLarge,
    color: Theme.colors.text,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    fontFamily: 'InterBold',
    fontSize: Theme.fontSizes.extraLarge,
    color: Theme.colors.text,
  },

  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  stateText: {
    fontFamily: 'InterRegular',
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.text,
  },

  pomodoroIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  pomodoroIndicatorText: {
    fontFamily: 'InterRegular',
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.text,
  },

  pomodoroIndicator: {
    width: 20,
    height: 20,
    borderRadius: '100%',
    backgroundColor: Theme.colors.divider,
  },

  pomodoroIndicatorComplete: {
    width: 20,
    height: 20,
    borderRadius: '100%',
    backgroundColor: Theme.colors.primary,
  },
});
