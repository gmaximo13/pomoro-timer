import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

import { TScreenDefinitionsProps } from "../AppRoutes";
import { Theme } from "../shared/themes/Theme";

export const Home = () => {
    const navigation = useNavigation<TScreenDefinitionsProps>();

  return (
    <View>
      <Text style={{ fontFamily: 'InterRegular', color: Theme.colors.text }}>Home Page</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={{ fontFamily: 'InterRegular', color: Theme.colors.text }} >Settings</Text>
        </TouchableOpacity>
    </View>
  );
};