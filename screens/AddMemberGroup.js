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

const AddMemberGroup = ({ navigation, route }) => {
  const { groupId, members, myInfo } = route.params;

  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [loadImage, setLoadImage] = useState("");
  const [image, setImage] = useState("defaultAvatar.jpg");
  const [groupName, setGroupName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [imageSource, setImageSource] = useState(null);
  useEffect(() => {
    handleSearchUser();
  }, [search]);

  // Inside the component...
  const membersId = members.map((m) => m.userId._id); // Safe to access members now

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

  const handleAddMember = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn thêm những thành viên này vào nhóm?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            try {
              if (selectedUser.length > 0) {
                const newMembers = selectedUser.map((user) => ({
                  userId: user._id,
                  role: 'member',
                }));
                const response = await dispatch(addMembersToGroup(groupId, newMembers));
                if (response) {
                  // Xử lý khi thêm thành viên thành công
                  setSelectedUser([]); // Reset selectedUser state
                  navigation.goBack(); // Quay lại màn hình trước đó
                } else {
                  // Xử lý khi có lỗi xảy ra khi thêm thành viên
                  Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm thành viên vào nhóm. Vui lòng thử lại sau.');
                }
              } else {
                Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một thành viên để thêm vào nhóm.');
              }
            } catch (error) {
              console.error('Error adding members to group:', error);
              Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm thành viên vào nhóm. Vui lòng thử lại sau.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  const toggleSelectUser = (user) => {
    if (selectedUser.some((u) => u._id === user._id)) {
      setSelectedUser(selectedUser.filter((u) => u._id !== user._id));
    } else {
      setSelectedUser([...selectedUser, user]);
    }
  };
  console.log(groupId);
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
          <Text style={styles.headerText}>Thêm thành viên</Text>
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
        <TouchableOpacity
          onPress={handleAddMember}
          style={styles.confirmButton}
        >
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

export default AddMemberGroup;
