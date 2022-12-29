import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const defaultUserDeck = [
  { id: 1, emoji: "😀" },
  { id: 2, emoji: "😃" },
  { id: 3, emoji: "😄" },
];

// const gameDecks = [
//   [
//     { id: 1, emoji: "😘" },
//     { id: 2, emoji: "😃" },
//     { id: 3, emoji: "😅" },
//   ],
//   [
//     { id: 2, emoji: "😃" },
//     { id: 1, emoji: "😘" },
//     { id: 4, emoji: "😁" },
//   ],
//   [
//     { id: 1, emoji: "😘" },
//     { id: 4, emoji: "😁" },
//     { id: 5, emoji: "😆" },
//   ],
//   [
//     { id: 4, emoji: "😁" },
//     { id: 5, emoji: "😆" },
//     { id: 1, emoji: "😘" },
//   ],
//   [
//     { id: 4, emoji: "😁" },
//     { id: 5, emoji: "😆" },
//     { id: 1, emoji: "😘" },
//   ],
// ];

const gameDecks = [
  [
    { id: 1, emoji: "😘", rotation: 45 },
    { id: 2, emoji: "😃", rotation: 90 },
    { id: 3, emoji: "😅", rotation: 135 },
  ],
  [
    { id: 2, emoji: "😃", rotation: 180 },
    { id: 1, emoji: "😘", rotation: 225 },
    { id: 4, emoji: "😁", rotation: 270 },
  ],
  [
    { id: 1, emoji: "😘", rotation: 315 },
    { id: 4, emoji: "😁", rotation: 0 },
    { id: 5, emoji: "😆", rotation: 45 },
  ],
  [
    { id: 4, emoji: "😁", rotation: 90 },
    { id: 5, emoji: "😆", rotation: 135 },
    { id: 1, emoji: "😘", rotation: 180 },
  ],
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [userDeck, setUserDeck] = useState(defaultUserDeck);
  const [score, setScore] = useState(0);
  const [gameDeck, setGameDeck] = useState(gameDecks);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [notInDeck, setNotInDeck] = useState(false);

  useEffect(() => {
    if (notInDeck) {
      const timeout = setTimeout(() => {
        setNotInDeck(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [notInDeck]);

  const handleClick = (clickedEmoji) => {
    if (gameDeck[currentIndex].some((emoji) => emoji.id === clickedEmoji.id)) {
      setUserDeck([...gameDeck[currentIndex]]);
      setScore(score + 1);
      console.log(currentIndex, "currentIndex");

      if (currentIndex === gameDeck.length - 1) {
        const beforeShuffle = gameDeck;
        shuffleArray(beforeShuffle);
        setGameDeck(beforeShuffle);
        console.log(gameDeck, "gameDeck");

        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setNotInDeck(true);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        duration={15}
        colors={["#003300", "#FFFF00", "#FF3333"]}
        colorsTime={[15, 7, 0]}
        strokeWidth={15}
        trailStrokeWidth={7}
        size={150}
        onComplete={() => {
          setGameOver(true);
        }}
      >
        {({ remainingTime }) => (
          <Text style={{ fontSize: 40 }}>{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {!gameOver && (
          <>
            <View style={{ flexDirection: "row" }}>
              {gameDeck[currentIndex].map((emoji, index) => (
                <Text
                  style={{
                    fontSize: 50,
                    transform: [{ rotate: `${emoji.rotation}deg` }],
                  }}
                  key={index}
                >
                  {emoji.emoji}
                </Text>
              ))}
            </View>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {userDeck.map((emoji, index) => (
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
              ))}
            </View>
          </>
        )}
      </View>

      {gameOver && <Text style={{ fontSize: 50 }}>Game Over</Text>}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 50 }}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
