import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { signOut } from "firebase/auth";

import { useAuth } from "../hooks/useAuth";
import { auth } from "../config";

import { Fontisto, Feather } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("OneMinuteGame")}>
        <Fontisto name="stopwatch" size={70} color="black" />
        <Text style={{ fontSize: 50, color: "black" }}>1 MIN</Text>
      </Pressable>

      {/* <Button title="Sign Out" onPress={handleLogout} /> */}

      <Pressable onPress={handleLogout}>
        <Feather name="log-out" size={50} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
});
