import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PageContainer from "./../components/PageContainer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants/theme";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  UserAddOutlined,
} from "@expo/vector-icons";

const ProfileFriend = ({ navigation, route }) => {
  const { friendName, friendEmail, friendImage } = route.params;
  const leaveGroup = () => {
    // Khi nhấn nút "Rời khỏi nhóm", hiển thị cửa sổ xác nhận
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn rời khỏi nhóm?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Đồng ý", onPress: () => navigation.navigate("Contacts") },
      ],
      { cancelable: false }
    );
  };
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
            <Text style={styles.grouptitle}>Tên nhóm</Text>
          </View>
          <View
            style={{ flexDirection: "row", 
            justifyContent: "space-between",
            alignContent: "center",
            marginTop: 20,
            width: "80%" 
           }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("AddMemberGroup")}
            >
              <View style={styles.viewtouch}>
                <MaterialIcons
                  name="group-add"
                  size={25}
                  color={COLORS.secondaryBlack}
                />
                <Text>Thêm thành viên</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {leaveGroup()}}
            >
              <View style={styles.viewtouch}>
                <MaterialIcons
                  name="exit-to-app"
                  size={25}
                  color={COLORS.secondaryBlack}
                />
                <Text>Rời khỏi nhóm</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{friendName}</Text>
            <Text style={styles.text}>Email: {friendEmail}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
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
  grouptitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 70,
  }
,
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
  viewtouch: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#CCCCCC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ProfileFriend;
