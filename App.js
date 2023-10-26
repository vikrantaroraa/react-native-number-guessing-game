import { StyleSheet, View, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = () => {
    setGameIsOver(true);
  };

  let screen = <StartGameScreen onConfirmNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  return (
    <View style={styles.rootScreen}>
      {/* Note the SafeAreaView  will cut the image from the notch if there is a notch i.e, in iPhone so it should be used
      inside of ImageBackground component but since it does not affect the android since there is no notch we
      are using it above ImageBackground component because inside ImageBackground it adds the backgroundColor: "#abcea1"" 
      to entire screen and image goes away*/}
      <SafeAreaView style={styles.rootScreen}>
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          {screen}
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    backgroundColor: "#abcea1",
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.55,
  },
});
