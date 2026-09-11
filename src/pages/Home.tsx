import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

import { TScreenDefinitionsProps } from '../AppRoutes';
import { Theme } from '../shared/themes/Theme';

export const Home = () => {
  const navigation = useNavigation<TScreenDefinitionsProps>();

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pomodoroStepCount, setPomodoroStepCount] = useState(0);

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
            {!isPaused && (
              <Text style={styles.stateText}>
                Hora de se concentrar!
              </Text>
            )}

            {isPaused && (
              <Text style={styles.stateText}>
                Cronômetro em pausa
              </Text>
            )}

            {/* {(
              <Text style={styles.stateText}>
                Pausa curta
              </Text>
            )}

            {(
              <Text style={styles.stateText}>
                Pausa longa
              </Text>
            )} */}
          </>)}
        </View>

        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={160}
            width={7}
            fill={90}
            tintColor={Theme.colors.primary}
            backgroundColor={Theme.colors.divider}
            rotation={0}
            children={() => <Text style={styles.progressText}>12:45</Text>}
          />
        </View>

        {!isRunning && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setIsRunning(true)}
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
              onPress={() => setIsPaused(true)}
            >
              <Text style={styles.primaryButtonText}>
                Pausar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setIsRunning(false);
                setPomodoroStepCount(0);
              }}
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
              onPress={() => setIsPaused(false)}
            >
              <Text style={styles.primaryButtonText}>
                Continuar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setIsRunning(false);
                setIsPaused(false);
                setPomodoroStepCount(0);
              }}
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

          <View style={pomodoroStepCount > 0 ? styles.pomodoroIndicatorComplete : styles.pomodoroIndicator} />
          <View style={pomodoroStepCount > 1 ? styles.pomodoroIndicatorComplete : styles.pomodoroIndicator} />
          <View style={pomodoroStepCount > 2 ? styles.pomodoroIndicatorComplete : styles.pomodoroIndicator} />
          <View style={pomodoroStepCount > 3 ? styles.pomodoroIndicatorComplete : styles.pomodoroIndicator} />

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
