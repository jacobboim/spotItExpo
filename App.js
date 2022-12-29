import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const defaultUserDeck = [
  { id: 1, emoji: "😀" },
  { id: 2, emoji: "😃" },
  { id: 3, emoji: "😄" },
];

const gameDecks = [
  [
    { id: 1, emoji: "😘" },
    { id: 2, emoji: "😃" },
    { id: 3, emoji: "😅" },
    { id: 4, emoji: "1" },
  ],
  [
    { id: 2, emoji: "😃" },
    { id: 1, emoji: "😘" },
    { id: 4, emoji: "😁" },
    { id: 4, emoji: "2" },
  ],
  [
    { id: 1, emoji: "😘" },
    { id: 4, emoji: "😁" },
    { id: 5, emoji: "😆" },
    { id: 4, emoji: "3" },
  ],
  [
    { id: 4, emoji: "😁" },
    { id: 5, emoji: "😆" },
    { id: 1, emoji: "😘" },
    { id: 4, emoji: "5" },
  ],
  [
    { id: 4, emoji: "😁" },
    { id: 5, emoji: "😆" },
    { id: 1, emoji: "😘" },
    { id: 4, emoji: "6" },
  ],
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [userDeck, setUserDeck] = useState(defaultUserDeck);
  const [score, setScore] = useState(0);
  const [gameDeck, setGameDeck] = useState(gameDecks);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [gameOver, setGameOver] = useState(false);

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
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timeRemaining === 0) {
      setGameOver(true);
    }
  }, [timeRemaining]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 50 }}> Time remaining: {timeRemaining}</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ flexDirection: "row" }}>
          {gameDeck[currentIndex].map((emoji, index) => (
            <Text style={{ fontSize: 50 }} key={index}>
              {emoji.emoji}
            </Text>
          ))}
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {userDeck.map((emoji, index) => (
            <TouchableOpacity
              disabled={timeRemaining === 0 ? true : false}
              key={index}
              onPress={() => handleClick(emoji)}
            >
              <Text
                style={{ fontSize: 50, opacity: timeRemaining === 0 ? 0.5 : 1 }}
              >
                {emoji.emoji}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Render the score */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 50 }}>Score: {score}</Text>
        </View>
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
