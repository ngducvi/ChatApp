import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  input,
  TextInput,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function Loginscrean() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 38,
            textAlign: "center",
            marginTop: 30,
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          Đăng Nhập
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/images/standing-5.png")}
        />
        <View>
          <TextInput
            placeholder="Email"
            style={{
              fontSize: 20,
              padding: 16,
              marginTop: 40,
              backgroundColor: "rgba(220, 220, 220, 1)",
              borderRadius: 13,
              marginLeft: 30,
              marginRight: 30,
            }}
          ></TextInput>
          <TextInput
            placeholder="Password"
            style={{
              fontSize: 20,
              padding: 16,
              backgroundColor: "rgba(220, 220, 220, 1)",
              borderRadius: 13,
              marginVertical: 20,
              marginLeft: 30,
              marginRight: 30,
            }}
          ></TextInput>
        </View>

        <View style={styles.containerbutton}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate("Tabnavigation")}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Tạo tài khoản mới
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 184.15,
    height: 286.71,
    left: 118,
    top: 32,
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
    backgroundColor: "black", // Màu nền của button
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
