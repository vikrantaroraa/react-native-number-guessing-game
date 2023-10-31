import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onConfirmNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  const confirmInputHandler = () => {
    const userEnteredNumber = parseInt(enteredNumber);

    if (
      isNaN(userEnteredNumber) ||
      userEnteredNumber <= 0 ||
      userEnteredNumber > 99
    ) {
      Alert.alert("Invalid Number", "Enter a number between 0 and 100!", [
        { text: "OK", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    onConfirmNumber(userEnteredNumber);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const marginTopDistance = height < 400 ? 50 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <View style={styles.title}>
            <Title>Guess Number</Title>
          </View>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              placeholder="num"
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 400 ? 50 : 100,
  },
  title: {
    marginHorizontal: 24,
  },
  numberInput: {
    height: 50,
    width: 80,
    textAlign: "center",
    fontSize: 32,
    borderBottomColor: Colors.accentColor,
    borderBottomWidth: 2,
    color: Colors.accentColor,
    marginVertical: 8,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    // backgroundColor: "lightgreen",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
