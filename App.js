import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./src/providers";

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;

// import * as React from "react";
// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import OneMinuteGame from "./src/screens/OneMinuteGame";

// import RootNavigation from "./src/navigation";
// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <RootNavigation />
//     // <NavigationContainer>
//     //   <Stack.Navigator>
//     //     <Stack.Screen
//     //       name="OneMinuteGame"
//     //       component={OneMinuteGame}
//     //       options={{ headerShown: false }}
//     //     />
//     //   </Stack.Navigator>
//     // </NavigationContainer>
//   );
// }

// export default App;

// // import React, { useState, useEffect } from "react";
// // import { StatusBar } from "expo-status-bar";
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   Dimensions,
// //   FlatList,
// // } from "react-native";
// // import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // import Animated, {
// //   SlideInLeft,
// //   SlideInRight,
// //   SlideOutRight,
// //   BounceIn,
// //   FadeIn,
// //   FadeOut,
// // } from "react-native-reanimated";

// // const defaultUserDeck = [
// //   { id: 1, emoji: "😀" },
// //   { id: 2, emoji: "😃" },
// //   { id: 3, emoji: "😄" },
// //   { id: 1, emoji: "😘" },
// //   { id: 2, emoji: "😃" },
// //   { id: 7, emoji: "😅" },
// // ];

// // const gameDecks = [
// //   [
// //     { id: 1, emoji: "😘", rotation: 45 },
// //     { id: 2, emoji: "😃", rotation: 90 },
// //     { id: 3, emoji: "😅", rotation: 135 },
// //     { id: 4, emoji: "😘", rotation: 45 },
// //     { id: 5, emoji: "😃", rotation: 90 },
// //     { id: 7, emoji: "😅", rotation: 135 },
// //   ],
// //   [
// //     { id: 1, emoji: "😃", rotation: 180 },
// //     { id: 2, emoji: "😘", rotation: 225 },
// //     { id: 3, emoji: "😁", rotation: 270 },
// //     { id: 4, emoji: "😘", rotation: 45 },
// //     { id: 5, emoji: "😃", rotation: 90 },
// //     { id: 7, emoji: "😇", rotation: 135 },
// //   ],
// //   [
// //     { id: 1, emoji: "😘", rotation: 315 },
// //     { id: 2, emoji: "😁", rotation: 0 },
// //     { id: 3, emoji: "😆", rotation: 45 },
// //     { id: 4, emoji: "😘", rotation: 45 },
// //     { id: 5, emoji: "😃", rotation: 90 },
// //     { id: 6, emoji: "😅", rotation: 135 },
// //   ],
// //   [
// //     { id: 1, emoji: "😁", rotation: 90 },
// //     { id: 2, emoji: "😆", rotation: 135 },
// //     { id: 3, emoji: "😘", rotation: 180 },
// //     { id: 4, emoji: "😘", rotation: 45 },
// //     { id: 5, emoji: "😃", rotation: 90 },
// //     { id: 6, emoji: "😅", rotation: 135 },
// //   ],
// // ];

// // const screenWidth = Dimensions.get("screen").width;
// // const screenHeight = Dimensions.get("screen").height;

// // console.log(screenHeight, "screenheight");
// // export default function App() {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const [userDeck, setUserDeck] = useState(defaultUserDeck);
// //   const [score, setScore] = useState(0);
// //   const [gameDeck, setGameDeck] = useState(gameDecks);
// //   const [timeRemaining, setTimeRemaining] = useState(20);
// //   const [gameOver, setGameOver] = useState(false);
// //   const [notInDeck, setNotInDeck] = useState(false);
// //   const [roundOver, setRoundOver] = useState(true);
// //   const [roundOverForUser, setRoundOverForUser] = useState(true);

// //   useEffect(() => {
// //     if (notInDeck) {
// //       const timeout = setTimeout(() => {
// //         setNotInDeck(false);
// //       }, 1000);
// //       return () => clearTimeout(timeout);
// //     }
// //   }, [notInDeck]);

// //   const handleClick = (clickedEmoji) => {
// //     if (gameDeck[currentIndex].some((emoji) => emoji.id === clickedEmoji)) {
// //       setUserDeck([...gameDeck[currentIndex]]);
// //       setScore(score + 1);
// //       console.log(userDeck, "userDeck");

// //       //set round over to false only for 1 second

// //       setRoundOver(false);
// //       setRoundOverForUser(false);

// //       setTimeout(() => setRoundOver(true), 500);
// //       setTimeout(() => setRoundOverForUser(true), 500);

// //       if (currentIndex === gameDeck.length - 1) {
// //         const beforeShuffle = gameDeck;
// //         shuffleArray(beforeShuffle);
// //         setGameDeck(beforeShuffle);

// //         setCurrentIndex(0);
// //       } else {
// //         setCurrentIndex(currentIndex + 1);
// //       }
// //     } else {
// //       setNotInDeck(true);
// //     }
// //   };

// //   useEffect(() => {
// //     if (roundOver) {
// //       const timeout = setTimeout(() => {
// //         setRoundOver(true);
// //       }, 500);
// //       return () => clearTimeout(timeout);
// //     }
// //   }, [roundOver]);

// //   useEffect(() => {
// //     if (roundOverForUser) {
// //       const timeout = setTimeout(() => {
// //         setRoundOverForUser(true);
// //       }, 500);
// //       return () => clearTimeout(timeout);
// //     }
// //   }, [roundOverForUser]);

// //   const shuffleArray = (array) => {
// //     for (let i = array.length - 1; i > 0; i--) {
// //       const j = Math.floor(Math.random() * (i + 1));
// //       [array[i], array[j]] = [array[j], array[i]];
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <LinearGradient
// //         colors={["#607D8B", "#546E7A", "#455A64", "#37474F", "#263238"]}
// //         style={styles.linearGradient}
// //       >
// //         <View style={styles.timerContainer}>
// //           <CountdownCircleTimer
// //             isPlaying
// //             duration={60}
// //             colors={["#003300", "#FFFF00", "#FF3333"]}
// //             colorsTime={[15, 7, 0]}
// //             strokeWidth={15}
// //             trailStrokeWidth={7}
// //             size={150}
// //             onComplete={() => {
// //               setGameOver(true);
// //             }}
// //           >
// //             {({ remainingTime }) => (
// //               <Animated.Text
// //                 entering={FadeIn.duration(1000).delay(700)}
// //                 style={{ fontSize: 40, color: "white" }}
// //               >
// //                 {remainingTime}
// //               </Animated.Text>
// //             )}
// //           </CountdownCircleTimer>
// //         </View>

// //         <View
// //           style={[
// //             styles.gameContainer,
// //             { alignItems: "center", justifyContent: "center" },
// //           ]}
// //         >
// //           {!gameOver && (
// //             <>
// //               {roundOver && (
// //                 <Animated.View
// //                   entering={FadeIn.duration(1000).delay(700)}
// //                   // exiting={FadeOut.duration(1000)}
// //                   style={[styles.gameDeckContainer]}
// //                 >
// //                   {gameDeck[currentIndex].map((emoji, index) => (
// //                     <Animated.Text
// //                       // entering={BounceIn.delay(index * 350)}
// //                       style={{
// //                         fontSize: 50,
// //                         transform: [{ rotate: `${emoji.rotation}deg` }],
// //                       }}
// //                       key={index}
// //                     >
// //                       {emoji.emoji}
// //                     </Animated.Text>
// //                   ))}
// //                 </Animated.View>
// //               )}

// //               <View style={[styles.userDeckContainerList]}>
// //                 {roundOverForUser && (
// //                   <Animated.FlatList
// //                     entering={FadeIn.duration(1000)}
// //                     data={userDeck}
// //                     numColumns={3}
// //                     contentContainerStyle={{ alignItems: "center" }}
// //                     renderItem={({ item, index }) => (
// //                       <TouchableOpacity
// //                         disabled={gameOver === true || notInDeck ? true : false}
// //                         key={item.id}
// //                         onPress={() => handleClick(item.id)}
// //                         style={{ padding: 10, margin: 10 }}
// //                       >
// //                         <Animated.Text
// //                           entering={BounceIn.delay(index * 200)}
// //                           style={{
// //                             fontSize: 50,
// //                             backgroundColor: notInDeck ? "red" : "",
// //                             opacity: gameOver === true ? 0.5 : 1,
// //                           }}
// //                         >
// //                           {item.emoji}
// //                         </Animated.Text>
// //                       </TouchableOpacity>
// //                     )}
// //                     keyExtractor={(item) => item.id.toString()}
// //                   />
// //                 )}

// //                 {/* {userDeck.map((emoji, index) => (
// //                 <TouchableOpacity
// //                   disabled={gameOver === true || notInDeck ? true : false}
// //                   key={index}
// //                   onPress={() => handleClick(emoji)}
// //                 >
// //                   <Text
// //                     style={{
// //                       fontSize: 50,
// //                       backgroundColor: notInDeck ? "red" : "white",
// //                       opacity: gameOver === true ? 0.5 : 1,
// //                     }}
// //                   >
// //                     {emoji.emoji}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))} */}
// //               </View>
// //             </>
// //           )}
// //         </View>

// //         {gameOver && (
// //           <Text style={{ fontSize: 50, marginTop: 180, color: "white" }}>
// //             Game Over
// //           </Text>
// //         )}
// //         <View style={[styles.scoreContainer]}>
// //           <Text style={{ fontSize: 50, color: "white" }}>{score}</Text>
// //         </View>
// //       </LinearGradient>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "flex-start",
// //   },
// //   timerContainer: {
// //     marginTop: 50,
// //   },
// //   gameContainer: {
// //     marginTop: 20,
// //   },
// //   gameDeckContainer: {
// //     display: "flex",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     position: "absolute",
// //     top: screenHeight / 6.9,
// //     // backgroundColor: "yellow",
// //     backgroundColor: "rgba(255, 255, 255, 0.5)",
// //     borderRadius: 40,
// //     width: "95%",
// //     height: "30%",
// //   },
// //   userDeckContainer: {
// //     display: "flex",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     position: "absolute",
// //     top: screenHeight / 3,
// //     backgroundColor: "blue",
// //     borderColor: "black",
// //   },
// //   userDeckContainerList: {
// //     display: "flex",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     top: screenHeight / 3,
// //   },
// //   scoreContainer: {
// //     display: "flex",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     position: "absolute",
// //     top: 720,
// //     // marginTop: screenHeight / 3,
// //   },
// //   linearGradient: {
// //     position: "absolute",
// //     left: 0,
// //     right: 0,
// //     top: 0,
// //     height: "130%",
// //     // flex: 1,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "flex-start",
// //   },
// // });
