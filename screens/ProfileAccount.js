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
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/actions/authAction";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";

const ProfileAccount = ({ navigation }) => {
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLogout());
    navigation.navigate("/");
  };
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditting: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].fileName,
      });
      setImageSource(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <PageTitle
          title="Thông tin cá nhân"
          onPress={() => navigation.goBack()}
          rightContent={
            <TouchableOpacity onPress={() => console.log("Edit pressed")}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          }
        />
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
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

          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              // backgroundColor xám nhạt
              backgroundColor: "#CCCCCC",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 150,
            }}
          >
            <Image
              style={{ width: 100, height: 100 ,borderRadius: 50}}
              source={{
                uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${myInfo.image}`,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <TouchableOpacity>
                <AntDesign name="pluscircle" onPress={openImagePicker} size={30} color="gray"></AntDesign>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 20 }}></View>
          <Infomation>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={myInfo.username}
            />

            <TextInput
              placeholder="Ngày sinh"
              style={styles.input}
              value={format(new Date(myInfo.birthday), "dd/MM/yyyy")}
            />

            <TextInput
              placeholder="Email"
              style={styles.input}
              value={myInfo.email}
            />
          </Infomation>
        </View>
        <View style={styles.containerbutton}>
          <TouchableOpacity style={styles.button1} onPress={logout}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    textAlign: "center",
    marginTop: 30,
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
    marginTop: 10,
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
});

export default ProfileAccount;
