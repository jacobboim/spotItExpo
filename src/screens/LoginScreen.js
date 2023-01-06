import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

import { View, TextInput, Button, FormErrorMessage } from "../components";
import { Images, Colors, auth } from "../config";
import { useTogglePasswordVisibility } from "../hooks";
import { loginValidationSchema } from "../utils";

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setErrorState(error.message)
    );
  };
  return (
    <>
      <View isSafe style={styles.container}>
        <LinearGradient
          colors={["#607D8B", "#546E7A", "#455A64", "#37474F", "#263238"]}
          style={styles.linearGradient}
        >
          <KeyboardAwareScrollView enableOnAndroid={true}>
            <View style={styles.logoContainer}>
              <Text style={styles.screenTitle}>Welcome back!</Text>
            </View>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginValidationSchema}
              onSubmit={(values) => handleLogin(values)}
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
                    textContentType="password"
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
                  {/* Display Screen Error Mesages */}
                  {errorState !== "" ? (
                    <FormErrorMessage error={errorState} visible={true} />
                  ) : null}
                  {/* Login button */}
                  <Button style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                  </Button>
                </>
              )}
            </Formik>
            {/* Button to navigate to SignupScreen to create a new account */}
            <Button
              style={styles.borderlessButtonContainer}
              borderless
              title={"Create a new account?"}
              onPress={() => navigation.navigate("Signup")}
            />
            <Button
              style={styles.borderlessButtonContainer}
              borderless
              title={"Forgot Password"}
              onPress={() => navigation.navigate("ForgotPassword")}
            />
          </KeyboardAwareScrollView>
        </LinearGradient>
      </View>
    </>
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
    marginTop: "60%",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.white,
    paddingTop: 20,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.orange,
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
