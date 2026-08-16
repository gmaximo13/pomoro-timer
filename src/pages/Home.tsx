import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

import { TScreenDefinitionsProps } from "../AppRoutes";

export const Home = () => {
    const navigation = useNavigation<TScreenDefinitionsProps>();

  return (
    <View>
      <Text style={{ fontFamily: 'InterRegular' }}>Home Page</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text>Settings</Text>
        </TouchableOpacity>
    </View>
  );
};