import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

import { View, TextInput, Button, FormErrorMessage } from "../components";
import { Images, Colors, auth } from "../config";
import { useTogglePasswordVisibility } from "../hooks";
import { signupValidationSchema } from "../utils";

import { db } from "../config/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  function addUser(newUser) {
    const docRef = doc(db, "users", newUser);

    setDoc(docRef, {
      username: newUser,
      highScore: 0,
      FiveSecondGameScore: 0,
    });
  }

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    const { email, password } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addUser(user.email);
      })
      .catch((error) => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.container}>
      <LinearGradient
        colors={["#607D8B", "#546E7A", "#455A64", "#37474F", "#263238"]}
        style={styles.linearGradient}
      >
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            {/* <Logo uri={Images.logo} /> */}
            <Text style={styles.screenTitle}>Create a new account!</Text>
          </View>
          {/* Formik Wrapper */}
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupValidationSchema}
            onSubmit={(values) => handleSignup(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name="email"
                  leftIconName="email"
                  placeholder="Enter email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <TextInput
                  name="password"
                  leftIconName="key-variant"
                  placeholder="Enter password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType="newPassword"
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                <TextInput
                  name="confirmPassword"
                  leftIconName="key-variant"
                  placeholder="Enter password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={confirmPasswordVisibility}
                  textContentType="password"
                  rightIcon={confirmPasswordIcon}
                  handlePasswordVisibility={handleConfirmPasswordVisibility}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                />
                <FormErrorMessage
                  error={errors.confirmPassword}
                  visible={touched.confirmPassword}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Signup button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Signup</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* Button to navigate to Login screen */}
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={"Already have an account?"}
            onPress={() => navigation.navigate("Login")}
          />
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: "50%",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.white,
    paddingTop: 20,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#818384",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "109%",
    padding: 20,
    flex: 1,
  },
});
