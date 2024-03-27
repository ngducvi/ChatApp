import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RadioGroup from "react-native-radio-buttons-group";
import { DatePickerInput } from "react-native-paper-dates";
import PageContainer from "./../components/PageContainer";
import PageTitle from "../components/PageTitle";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/authAction";
// import RNFetchBlob from "rn-fetch-blob";

export default function Loginscrean() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("defaultAvatar.jpg");
  const [imageSource, setImageSource] = useState(null);
  const [birthdate, setBirthdate] = useState(null);

  const { loading, authenticate, error, successMessage, myInfo } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticate) {
      navigation.navigate("Tabnavigation");
    }
  }, [successMessage]);

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

  const register = () => {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);
    formData.append("birthday", birthdate + "");
    formData.append("gender", selectedId);

    dispatch(userRegister(formData));
  };

  const radioButtons = useMemo(
    () => [
      {
        id: "male",
        label: "Nam",
        value: "Nam",
      },
      {
        id: "female",
        label: "Nữ",
        value: "Nữ",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState("male");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={{ flex: 1 }}>
        <PageContainer>
          <PageTitle title="Đăng ký" onPress={() => navigation.goBack()} />
          <View>
            <Text style={styles.title}>Đăng Ký</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
              <Text style={styles.label}>Tên người dùng</Text>
              <TextInput placeholder="User Name" value={username} onChangeText={setUsername} style={styles.input} />
              <Text style={styles.label}>Ngày sinh</Text>
              <View style={styles.datePickerContainer}>
                <DatePickerInput value={birthdate} mode="date" onChange={(selectedDate) => setBirthdate(selectedDate)} backgroundColor="rgba(220, 220, 220, 1)" borderRadius={13} />
              </View>
              <Text style={[styles.label, { marginTop: 30 }]}>Giới tính</Text>
              <View style={styles.radioContainer}>
                <RadioGroup radioButtons={radioButtons} onPress={setSelectedId} selectedId={selectedId} layout="row" style={styles.radioButtons} />
              </View>
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={true} />
              <Text style={styles.label}>Nhập lại mật khẩu</Text>
              <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry={true} />
              <TouchableOpacity onPress={openImagePicker} style={styles.filePickerButton}>
                <Image source={{ uri: imageSource }} style={styles.avatar}></Image>
                <Text>Chọn tệp</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => register()}>
                <Text style={styles.buttonText}>Đăng Ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PageContainer>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 5,
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
  },
  datePickerContainer: {
    marginTop: 30,
    borderRadius: 13,
  },
  radioContainer: {
    marginLeft: 20,
  },
  filePickerButton: {
    marginLeft: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    width: 350,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(112, 11, 239, 1)",
    shadowOffset: {
      width: 0,
      height: "Spacing",
    },
    shadowOpacity: 3.3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    textAlign: "center",
    marginTop: 20,
  },
});
