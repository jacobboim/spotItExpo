import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Pressable,
  Button,
  FlatList,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

import {
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { useAuth } from "../hooks/useAuth";
import { db } from "../config/firebase";

import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutRight,
  BounceIn,
  FadeIn,
  FadeOut,
  FadeOutRight,
  BounceOutDown,
  BounceOut,
} from "react-native-reanimated";

const defaultUserDeck = [
  { id: 1, emoji: "😀" },
  { id: 2, emoji: "😃" },
  { id: 3, emoji: "😄" },
  { id: 1, emoji: "😘" },
  { id: 2, emoji: "😃" },
  { id: 7, emoji: "😅" },
];

const gameDecks = [
  [
    { id: 1, emoji: "😘", rotation: 45 },
    { id: 2, emoji: "😃", rotation: 90 },
    { id: 3, emoji: "😅", rotation: 135 },
    { id: 4, emoji: "😘", rotation: 45 },
    { id: 5, emoji: "😃", rotation: 90 },
    { id: 8, emoji: "😅", rotation: 135 },
  ],
  [
    { id: 1, emoji: "😃", rotation: 180 },
    { id: 2, emoji: "😘", rotation: 225 },
    { id: 3, emoji: "😁", rotation: 270 },
    { id: 4, emoji: "😘", rotation: 45 },
    { id: 5, emoji: "😃", rotation: 90 },
    { id: 7, emoji: "😇", rotation: 135 },
  ],
  [
    { id: 1, emoji: "😘", rotation: 315 },
    { id: 2, emoji: "😁", rotation: 0 },
    { id: 3, emoji: "😆", rotation: 45 },
    { id: 4, emoji: "😘", rotation: 45 },
    { id: 5, emoji: "😃", rotation: 90 },
    { id: 6, emoji: "😅", rotation: 135 },
  ],
  [
    { id: 1, emoji: "😁", rotation: 90 },
    { id: 2, emoji: "😆", rotation: 135 },
    { id: 3, emoji: "😘", rotation: 180 },
    { id: 4, emoji: "😘", rotation: 45 },
    { id: 5, emoji: "😃", rotation: 90 },
    { id: 6, emoji: "😅", rotation: 135 },
  ],
];

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

console.log(screenHeight, "screenheight");
export default function FiveSecondGame({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [userDeck, setUserDeck] = useState(defaultUserDeck);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState();
  const [loading, setLoading] = useState(false);

  const [gameDeck, setGameDeck] = useState(gameDecks);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [notInDeck, setNotInDeck] = useState(false);
  const [roundOver, setRoundOver] = useState(true);
  const [roundWon, setRoundWon] = useState(false);
  const [roundOverForUser, setRoundOverForUser] = useState(true);
  const [playAgain, setPlayAgain] = useState(false);
  const [goHome, setGoHome] = useState(false);

  const { user } = useAuth();

  async function getHighScore() {
    const userQuery = collection(db, "users");

    onSnapshot(userQuery, (docsSnap) => {
      docsSnap.forEach((doc) => {
        if (doc.id === user?.email) {
          setHighScore(doc.data().FiveSecondGameScore);
          //   console.log(highScore, "highScore");
        }
      });
    });
  }
  getHighScore();

  useEffect(() => {
    if (notInDeck) {
      const timeout = setTimeout(() => {
        setNotInDeck(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [notInDeck]);

  //make a reset function
  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setGameOver(false);
    setTimeRemaining(5);
  };

  function handleButtonPress() {
    const docRef = doc(db, "users", user?.email);

    setScore(score + 1);
    if (score + 1 > highScore) {
      updateDoc(docRef, {
        FiveSecondGameScore: score + 1,
      });
    }
  }

  function addTime() {
    if (score <= 5) {
      setTimeRemaining(timeRemaining - timeRemaining + 5);
    } else if (score <= 10) {
      setTimeRemaining(timeRemaining - timeRemaining + 4);
    } else {
      setTimeRemaining(timeRemaining - timeRemaining + 3);
    }
  }
  const resetTimer = () => {
    if (score <= 5) {
      setTimeRemaining(5);
    } else if (score <= 10) {
      setTimeRemaining(4);
    } else {
      setTimeRemaining(3);
    }
  };

  const handleClick = (clickedEmoji) => {
    if (gameDeck[currentIndex].some((emoji) => emoji.id === clickedEmoji)) {
      setUserDeck([...gameDeck[currentIndex]]);
      handleButtonPress();
      console.log(userDeck, "userDeck");

      setRoundOver(false);
      setRoundOverForUser(false);
      setRoundWon(true);
      addTime();

      setTimeout(() => setRoundOver(true), 500);
      setTimeout(() => setRoundOverForUser(true), 500);

      if (currentIndex === gameDeck.length - 1) {
        const beforeShuffle = gameDeck;
        shuffleArray(beforeShuffle);
        setGameDeck(beforeShuffle);

        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setNotInDeck(true);
    }
  };

  useEffect(() => {
    if (roundOver) {
      const timeout = setTimeout(() => {
        setRoundOver(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [roundOver]);

  useEffect(() => {
    if (roundOverForUser) {
      const timeout = setTimeout(() => {
        setRoundOverForUser(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [roundOverForUser]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  console.log(timeRemaining, "timeRemaining");
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#607D8B", "#546E7A", "#455A64", "#37474F", "#263238"]}
        style={styles.linearGradient}
      >
        <View style={styles.highScoreContainer}>
          <Text style={styles.highScoreText}>High Score</Text>
          <Text style={styles.highScoreText}>{highScore}</Text>
        </View>
        {!gameOver && (
          <View style={styles.timerContainer}>
            {roundOver && (
              <CountdownCircleTimer
                isPlaying={!gameOver}
                duration={timeRemaining}
                colors={["#003300", "#FFFF00", "#FF3333"]}
                colorsTime={[15, 7, 0]}
                strokeWidth={15}
                trailStrokeWidth={7}
                size={150}
                onComplete={() => {
                  //   resetTimer();

                  if (!roundWon) {
                    setRoundWon(false);
                  } else {
                    setGameOver(true);
                  }
                  return {
                    shouldRepeat: roundWon ? true : false,
                    delay: 1,
                  };
                }}
              >
                {({ remainingTime }) => (
                  <Animated.Text
                    entering={FadeIn.duration(1000).delay(700)}
                    style={{ fontSize: 40, color: "white" }}
                  >
                    {remainingTime}
                  </Animated.Text>
                )}
              </CountdownCircleTimer>
            )}
            {/* <CountdownCircleTimer
              isPlaying={!gameOver}
              duration={timeRemaining}
              colors={["#003300", "#FFFF00", "#FF3333"]}
              colorsTime={[15, 7, 0]}
              strokeWidth={15}
              trailStrokeWidth={7}
              size={150}
              onComplete={() => {
                if (roundWon) {
                  setRoundWon(false);
                } else {
                  setGameOver(true);
                }
                return { shouldRepeat: roundWon ? true : false, delay: 1 };
              }}
            >
              {({ remainingTime }) => (
                <Animated.Text
                  entering={FadeIn.duration(1000).delay(700)}
                  style={{ fontSize: 40, color: "white" }}
                >
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer> */}
          </View>
        )}

        <View
          style={[
            styles.gameContainer,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          {!gameOver && (
            <>
              {roundOver && (
                <Animated.View
                  entering={FadeIn.duration(1000).delay(700)}
                  exiting={SlideOutRight.duration(1000).springify().mass(0.5)}
                  style={[styles.gameDeckContainer]}
                >
                  {gameDeck[currentIndex].map((emoji, index) => (
                    <Animated.Text
                      // entering={BounceIn.delay(index * 350)}
                      style={{
                        fontSize: 50,
                        transform: [{ rotate: `${emoji.rotation}deg` }],
                      }}
                      key={index}
                    >
                      {emoji.emoji}
                    </Animated.Text>
                  ))}
                </Animated.View>
              )}

              <View style={[styles.userDeckContainerList]}>
                {roundOverForUser && (
                  <Animated.FlatList
                    entering={FadeIn.duration(1000)}
                    data={userDeck}
                    numColumns={3}
                    scrollEnabled={false}
                    contentContainerStyle={{ alignItems: "center" }}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        disabled={gameOver === true || notInDeck ? true : false}
                        key={item.id}
                        onPress={() => handleClick(item.id)}
                        style={{
                          padding: 10,
                          margin: 10,
                        }}
                      >
                        <Animated.Text
                          entering={BounceIn.delay(index * 200)}
                          style={{
                            fontSize: 50,
                            backgroundColor: notInDeck ? "red" : "transparent",
                            opacity: gameOver === true ? 0.5 : 1,

                            // borderRadius: 50,
                            // shadowColor: "white",
                            // textShadowRadius: 20,
                            // textShadowColor: "white",
                            // // textShadowOffset: { width: 10, height: 10 },
                            // shadowOpacity: 0.5,
                          }}
                        >
                          {item.emoji}
                        </Animated.Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  />
                )}

                {/* {userDeck.map((emoji, index) => (
                <TouchableOpacity
                  disabled={gameOver === true || notInDeck ? true : false}
                  key={index}
                  onPress={() => handleClick(emoji)}
                >
                  <Text
                    style={{
                      fontSize: 50,
                      backgroundColor: notInDeck ? "red" : "white",
                      opacity: gameOver === true ? 0.5 : 1,
                    }}
                  >
                    {emoji.emoji}
                  </Text>
                </TouchableOpacity>
              ))} */}
              </View>
            </>
          )}
        </View>

        {gameOver && (
          <View style={styles.gameOverContainer}>
            <View style={styles.gameOverContainerOptions}>
              <Pressable
                onPress={() => navigation.navigate("Home")}
                onTouchStart={() => setGoHome(!goHome)}
                onTouchEnd={() => setGoHome(false)}
                style={{
                  backgroundColor: goHome ? "darkgray" : "#818384",
                  padding: 15,
                  borderRadius: 50,
                }}
              >
                <Entypo name="home" size={70} color="white" />
              </Pressable>
              <Pressable
                onPress={resetGame}
                onTouchStart={() => setPlayAgain(!playAgain)}
                onTouchEnd={() => setPlayAgain(false)}
                style={{
                  backgroundColor: playAgain ? "darkgray" : "#818384",
                  padding: 15,
                  borderRadius: 50,
                }}
              >
                {/* <AntDesign name="playcircleo" size={75} color="white" /> */}
                <Ionicons
                  name="play"
                  size={65}
                  color="white"
                  style={{ paddingLeft: 5 }}
                />
              </Pressable>
            </View>

            <Text style={{ fontSize: 50, marginTop: 180, color: "white" }}>
              Game Over
            </Text>
          </View>
        )}
        <View style={[styles.scoreContainer]}>
          <Text style={{ fontSize: 50, color: "white" }}>{score}</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gameOverContainerOptions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: screenWidth,
    top: 40,
  },
  gameOverContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  highScoreContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 40,
    right: 17,
  },
  highScoreText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },

  timerContainer: {
    marginTop: 70,
  },
  gameContainer: {
    marginTop: -10,
  },
  gameDeckContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: screenHeight / 6.9,
    // backgroundColor: "yellow",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 40,
    width: "95%",
    height: "30%",
  },
  userDeckContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: screenHeight / 3,
    backgroundColor: "blue",
    borderColor: "black",
  },
  userDeckContainerList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: screenHeight / 3,
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 720,
    // marginTop: screenHeight / 3,
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "130%",
    // flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
