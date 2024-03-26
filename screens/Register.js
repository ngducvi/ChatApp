import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RadioGroup from "react-native-radio-buttons-group";
import { DatePickerInput } from "react-native-paper-dates";
import * as DocumentPicker from "expo-document-picker";
import PageContainer from "./../components/PageContainer";
import PageTitle from "../components/PageTitle";
export default function Loginscrean() {
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const navigation = useNavigation();
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Nam",
        value: "Nam",
      },
      {
        id: "2",
        label: "Nữ",
        value: "Nữ",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState();
  const [birthdate, setBirthdate] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
      <PageTitle
          title="Đăng ký"
          onPress={() => navigation.goBack()}
        />
      <View>
        <Text style={styles.title}>Đăng Ký</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput placeholder="Email" style={styles.input} />
          <Text style={styles.label}>Tên người dùng</Text>
          <TextInput placeholder="User Name" style={styles.input} />
          <Text style={styles.label}>Ngày sinh</Text>
          <View style={styles.datePickerContainer}>
            <DatePickerInput
              value={birthdate}
              mode="date"
              onChange={(event, selectedDate) => setBirthdate(selectedDate)}
              backgroundColor="rgba(220, 220, 220, 1)"
              borderRadius={13}
            />
          </View>
          <Text style={[styles.label, { marginTop: 30 }]}>
            Giới tính
          </Text>
          <View style={styles.radioContainer}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              layout="row"
              style={styles.radioButtons}
            />
          </View>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
          />
          <Text style={styles.label}>Nhập lại mật khẩu</Text>
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={pickFile} style={styles.filePickerButton}>
            <Text>Chọn tệp</Text>
          </TouchableOpacity>
          
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Tabnavigation")}
          >
            <Text style={styles.buttonText}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
       
      </View>
      </PageContainer>
    </SafeAreaView>
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
