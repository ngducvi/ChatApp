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
  title,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import PageContainer from "./../components/PageContainer";
import PageTitle from "../components/PageTitle";
import { AntDesign } from "@expo/vector-icons";
import Infomation from "../components/Infomation";

const ProfileFriend = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View style={{ flex: 1, marginTop: 20 }}>
          {/* Backgroud image*/}

          <Image
            style={{
              width: "100%",
              height: 200,
              position: "absolute",
              top: 0,
            }}
            source={require("../assets/images/OIP.jpg")}
          />
          <PageTitle onPress={() => navigation.goBack()} title="Back" />

          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              // backgroundColor xám nhạt
              backgroundColor: "#CCCCCC",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 100,
              marginLeft: 30,
            }}
          >
            <AntDesign name="user" size={60} color="#111"></AntDesign>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            ></View>
          </View>
          <Infomation>
            <Text style={styles.title}>Nanem</Text>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.text}>Ngày sinh :</Text>
            <Text style={styles.text}>Giới tính :</Text>
          </Infomation>
        </View>
        <View style={styles.containerbutton}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerbutton}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Block</Text>
            
          </TouchableOpacity>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    marginTop: -10,
    justifyContent: "left",
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    marginLeft: 30,
    marginRight: 30,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    padding: 16,
    backgroundColor: "rgba(220, 220, 220, 1)",
    borderRadius: 13,
    marginVertical: 3,
    marginTop: 12,
  },
  containerbutton: {
    marginTop: 5,
    alignItems: "center",
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
  buttonText: {
    color: "white", // Màu chữ của button
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    justifyContent: "left",
    fontWeight: "bold",
    marginBottom: 30,
  },
});

export default ProfileFriend;
