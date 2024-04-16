import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addMembersToGroup,
  createNewGroup,
} from "../store/actions/messengerAction";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../environment/developer";
import { DatePickerInput } from "react-native-paper-dates";

const CreateGroup = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [loadImage, setLoadImage] = useState("");
  const [image, setImage] = useState("defaultAvatar.jpg");
  const [groupName, setGroupName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const members = useSelector((state) => state.members);
  const myInfo = useSelector((state) => state.myInfo);
  const [imageSource, setImageSource] = useState(null);
  // Function to reload contacts
  const reloadContacts = () => {
    dispatch(getFriends());
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  const handleSearchUser = async () => {
    if (search !== "") {
      try {
        const response = await axios.get(`${API_URL}/api/search?q=${search}`);
        if (members && members.length > 0) {
          setSearchResult(
            response.data.users.filter(
              (user) => !members.some((m) => m.userId._id === user._id)
            )
          );
        } else {
          setSearchResult(response.data.users);
        }
      } catch (error) {
        console.log("Error searching for users:", error);
      }
    } else {
      setSearchResult([]);
    }
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
  const createGroup = async () => {
    if (selectedUser.length < 2) {
      // Alert user if selected members are less than 3
      Alert.alert("Thông báo", "Phải có ít nhất 3 thành viên để tạo nhóm!");
      console.log("At least 3 members are required to create a group");
      return;
    }
    if (!groupName) {
      // Alert user if group name is not provided
      Alert.alert("Thông báo", "Vui lòng đặt tên cho nhóm chat!");
      console.log("Group name is required");
      return;
    }

    try {
      const formData = new FormData();
      const members = selectedUser.map((u) => ({
        userId: u._id.toString(),
        role: "member",
      }));

      formData.append("name", groupName);
      formData.append("image", image);
      formData.append("members", JSON.stringify(members));

      const response = await dispatch(createNewGroup(formData));

      setSelectedUser([]);
      setImage("");
      setLoadImage("");
      setGroupName("");

      if (response) {
        current.emit("groupEvent", { newMembers: members });
        alert.success("Tạo nhóm thành công!");
      }
    } catch (error) {
      console.log("Error creating group:", error);
      // Handle error (e.g., show error message)
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo nhóm. Vui lòng thử lại sau.");
    }
  };

  const toggleSelectUser = (user) => {
    if (selectedUser.some((u) => u._id === user._id)) {
      setSelectedUser(selectedUser.filter((u) => u._id !== user._id));
    } else {
      setSelectedUser([...selectedUser, user]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Tạo nhóm</Text>
        </View>
        <View style={styles.imgname}>
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.filePickerButton}
          >
            <View style={styles.labelimg}>
              <Image
                //assets/images
                source={
                  imageSource
                    ? { uri: imageSource }
                    : require("../assets/images/user.jpg")
                }
                style={styles.avatar}
              ></Image>
              <Text>Chọn tệp</Text>
            </View>
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setGroupName(text)}
            value={groupName}
            placeholder="Nhập tên nhóm"
          />
        </View>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <View style={styles.selectedUsersContainer}>
          {selectedUser.map((user) => (
            <TouchableOpacity
              key={user._id}
              onPress={() => toggleSelectUser(user)}
              style={styles.selectedUser}
            >
              <View style={styles.lableuser}>
                <Image
                  style={styles.userAvatarSelected}
                  source={{
                    uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${user.image}`,
                  }}
                />
                <Text style={styles.selectedUsername}>{user.username} x</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.separatorContainer}>
          <Text>-----------------------</Text>
        </View>
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleSelectUser(item)}
              style={styles.userItemContainer}
            >
              <Image
                style={styles.userAvatar}
                source={{
                  uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.image}`,
                }}
              />
              <Text style={styles.username}>{item.username}</Text>
              <View style={styles.checkboxContainer}>
                {selectedUser.some((u) => u._id === item._id) ? (
                  <Ionicons name="checkbox-outline" size={24} color="blue" />
                ) : (
                  <Ionicons name="checkbox-outline" size={24} color="gray" />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={createGroup} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
  },
  imgname: {
    margin: 30,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    height: 45,
    borderColor: "black",
    backgroundColor: "#f2f2f2",
    width: 330,
    height: 100,
  },
  labelimg: {
    flexDirection: "column",
    alignItems: "center",
  },
  filePickerButton: {
    marginLeft: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  textInput: {
    marginTop: 20,
    marginLeft: 10,
    height: 40,
    width: "70%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  searchContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderRadius: 20,
    height: 45,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    marginTop: 5,
  },
  selectedUsersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedUser: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedUsername: {
    fontSize: 18,
  },
  separatorContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  userItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userAvatarSelected: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    marginLeft: 10,
  },
  checkboxContainer: {
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },
  lableuser: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CreateGroup;
