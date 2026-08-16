import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { TScreenDefinitionsProps } from "../AppRoutes";
import { Theme } from "../shared/themes/Theme";

export const Home = () => {
    const navigation = useNavigation<TScreenDefinitionsProps>();

  return (
    <View>

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
        <TouchableOpacity style={ styles.primaryButton }>
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
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
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
});