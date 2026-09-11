import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons' 

import { TScreenDefinitionsProps } from "../AppRoutes";
import { Theme } from "../shared/themes/Theme";

export const Settings = () => {
    const navigation = useNavigation<TScreenDefinitionsProps>();

  return (
    <View style={ styles.header}>

        <TouchableOpacity 
          style={ styles.settingsButton } 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="close"
            size={28} 
            color={Theme.colors.divider}  
          />      
        </TouchableOpacity>
        <View style={ styles.container }>
          
          <View style={ styles.titleContainer }>
            <Text style={ styles.titleText }>
              Configurações
            </Text>
          </View>
          
          <View style={ styles.formContainer }>

            <View style={ styles.formFieldContainer }>
              <Text style={ styles.formFieldLabel }>
                Período de foco
              </Text>

              <View style={ styles.formFieldButtons }>
                <TouchableOpacity style={ styles.secondaryButton }>
                  <Text style={ styles.secondaryButtonText }>
                    15 min
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={ styles.primaryButton }>
                  <Text style={ styles.primaryButtonText }>
                    25 min
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={ styles.primaryButton }>
                  <Text style={ styles.primaryButtonText }>
                    35 min
                  </Text>
              </TouchableOpacity>
              </View>
            </View>

            <View style={ styles.formFieldContainer }>
              <Text style={ styles.formFieldLabel }>
                Pausa curta
              </Text>

              <View style={ styles.formFieldButtons }>
                <TouchableOpacity style={ styles.secondaryButton }>
                  <Text style={ styles.secondaryButtonText }>
                    3 min
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={ styles.primaryButton }>
                    <Text style={ styles.primaryButtonText }>
                      5 min
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={ styles.primaryButton }>
                    <Text style={ styles.primaryButtonText }>
                      7 min
                    </Text>
                </TouchableOpacity>
              </View>
            </View>

          <View style={ styles.formFieldContainer }>
            <Text style={ styles.formFieldLabel }>
              Pausa longa
            </Text>

            <View style={ styles.formFieldButtons }>
              <TouchableOpacity style={ styles.secondaryButton }>
                <Text style={ styles.secondaryButtonText }>
                  10 min
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={ styles.primaryButton }>
                  <Text style={ styles.primaryButtonText }>
                    15 min
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={ styles.primaryButton }>
                  <Text style={ styles.primaryButtonText }>
                    20 min
                  </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={ styles.formFieldContainer }>
            <Text style={ styles.formFieldLabel }>
              Notificações
            </Text>

            <View style={ styles.formFieldButtons }>
              <TouchableOpacity style={ styles.secondaryButton }>
                <Text style={ styles.secondaryButtonText }>
                  Desativado
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={ styles.primaryButton }>
                  <Text style={ styles.primaryButtonText }>
                    Ativado
                  </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: Theme.colors.divider,
    borderColor: Theme.colors.primary,
  },

  secondaryButtonText: {
    fontFamily: 'InterRegular',
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.text,
  },

  formContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
    width: '80%',
    maxWidth: 300,
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

  formFieldContainer: {
    gap: 8,
    width: '100%',

  },

  formFieldLabel: {
    fontFamily: 'InterRegular',
    fontSize: Theme.fontSizes.large,
    color: Theme.colors.text,
  },

  formFieldButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});