import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import Loginscrean from "./screens/Loginscrean";
import Home from "./screens/Home";
import ProfileAccount from "./screens/ProfileAccount";
import Tabnavigation from "./navigation/Tabnavigation";
import PersonalChat from "./screens/PersonalChat";
import ProfileFriend from "./screens/ProfileFriend";
import Addcontacts from "./screens/Addcontacts";
import { Provider, useSelector } from "react-redux";
import store from "./store/index";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="/" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Loginscrean" component={Loginscrean} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileAccount" component={ProfileAccount} options={{ headerShown: false }} />
          <Stack.Screen name="Tabnavigation" component={Tabnavigation} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="PersonalChat" component={PersonalChat} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileFriend" component={ProfileFriend} options={{ headerShown: false }} />
          <Stack.Screen name="Addcontacts" component={Addcontacts} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function WelcomeScreen() {
  const navigation = useNavigation();
  const { authenticate } = useSelector((state) => state.auth);
  useEffect(() => {
    if (authenticate) {
      navigation.navigate("Tabnavigation");
    }
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 38,
            textAlign: "center",
            marginTop: 30,
            fontFamily: "Helvetica",
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          Welcome
        </Text>
        <Image style={styles.image} source={require("./assets/images/welcome.png")} />

        <View style={styles.containerbutton}>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("Loginscrean")}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    width: 363,
    height: 415,
    left: 30,
    borderRadius: 100,
  },
  button1: {
    marginTop: 20,
    width: 350,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(112, 11, 239, 1)", // Màu nền của button
    shadowOffset: {
      width: 0,
      height: "Spacing",
    },
    shadowOpacity: 3.3,
  },
  button2: {
    marginTop: 20,
    width: 350,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(112, 11, 239, 0.3)", // Màu nền của button
    shadowOffset: {
      width: 0,
      height: "Spacing",
    },
    shadowOpacity: 3.3,
  },
  containerbutton: {
    marginTop: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "white", // Màu chữ của button
    fontSize: 18,
    fontWeight: "bold",
  },
});
