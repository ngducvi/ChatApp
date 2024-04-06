import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PageContainer from "./../components/PageContainer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";

const ProfileFriend = ({ navigation, route }) => {
  const { friendName, friendEmail, friendImage } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View style={styles.container}>
          <PageTitle onPress={() => navigation.goBack()} title="Back" />
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${friendImage}`,
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{friendName}</Text>
            <Text style={styles.text}>Email: {friendEmail}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Block</Text>
          </TouchableOpacity>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#700BEF",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileFriend;
