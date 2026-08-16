import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { TScreenDefinitionsProps } from "../AppRoutes";
import { Theme } from "../shared/themes/Theme";

export const Home = () => {
    const navigation = useNavigation<TScreenDefinitionsProps>();

  return (
    <View style={ styles.container }>

      <View style={ styles.titleContainer }>
        <Text style={ styles.titleText }>
          Pomodoro
        </Text>
      </View>

      <View style={ styles.stateContainer }>
        <Text style={ styles.stateText }>
          Hora de se concentrar!
        </Text>
{/* 
        <Text style={ styles.stateText }>
          Pausa curta
        </Text>

        <Text style={ styles.stateText }>
          Pausa longa
        </Text>

        <Text style={ styles.stateText }>
          Cronômetro em pausa
        </Text> */}
      </View>

      <View style={ styles.progressContainer }>
        <AnimatedCircularProgress
          size={160}
          width={7}
          fill={90}
          tintColor={Theme.colors.primary}
          backgroundColor={Theme.colors.divider} 
          rotation={0}
          children={() => (
            <Text style={ styles.progressText }>
              12:45
            </Text>
          )}
        />
      </View>
      

      
      <View style={ styles.buttonContainer }>
        <TouchableOpacity style={ styles.primaryButton }>
            <Text style={ styles.primaryButtonText }>Iniciar</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.buttonContainer }>
        {/* <TouchableOpacity style={ styles.primaryButton }>
            <Text style={ styles.primaryButtonText }>Pausar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.secondaryButton }>
            <Text style={ styles.secondaryButtonText }>Parar</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.buttonContainer }>
        <TouchableOpacity style={ styles.primaryButton }>
            <Text style={ styles.primaryButtonText }>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.secondaryButton }>
            <Text style={ styles.secondaryButtonText }>Reiniciar</Text>
        </TouchableOpacity> */}
      </View>
      
      <View style={ styles.pomodoroIndicatorContainer }>
        <Text style={ styles.pomodoroIndicatorText }>Pomodoros:</Text>

        <View style={ styles.pomodoroIndicatorComplete } />
        <View style={ styles.pomodoroIndicatorComplete } />
        <View style={ styles.pomodoroIndicator } />
        <View style={ styles.pomodoroIndicator } />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 36,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleGroup: {
    gap:24
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