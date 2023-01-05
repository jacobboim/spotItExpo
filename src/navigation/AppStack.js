import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens";
import OneMinuteGame from "../screens/OneMinuteGame";
import FiveSecondGame from "../screens/FiveSecondGame";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OneMinuteGame"
        component={OneMinuteGame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FiveSecondGame"
        component={FiveSecondGame}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
