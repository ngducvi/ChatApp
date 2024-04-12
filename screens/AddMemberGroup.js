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
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addMembersToGroup } from "../store/actions/messengerAction";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../environment/developer";
import { DatePickerInput } from "react-native-paper-dates";

const AddMemberGroup = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const members = useSelector((state) => state.members);
  const myInfo = useSelector((state) => state.myInfo);

  const [image, setImage] = useState("defaultAvatar.jpg");
  const [imageSource, setImageSource] = useState(null);

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
  const handleAddMember = async () => {
    try {
      if (selectedUser.length > 0) {
        const newMembers = selectedUser.map((user) => ({
          userId: user._id,
          role: "member",
        }));
        const result = await dispatch(
          addMembersToGroup(currentFriend._id, newMembers)
        );
        if (result) {
          const otherMembersId = members
            .map((m) => m.userId._id)
            .filter((id) => id !== myInfo.id);
          current.emit("memberChange", {
            groupId: currentFriend?._id,
            membersId: otherMembersId,
          });
          current.emit("groupEvent", { removeMember: false, newMembers });
          Alert.alert("Success", "Thêm thành viên mới thành công");
          setSelectedUser([]);
        }
      } else {
        Alert.alert(
          "Error",
          "Vui lòng chọn ít nhất một thành viên để thêm vào nhóm"
        );
      }
    } catch (error) {
      console.error("Error adding members to group:", error);
      Alert.alert(
        "Error",
        "Đã xảy ra lỗi khi thêm thành viên vào nhóm. Vui lòng thử lại sau"
      );
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
    <View style={{ flex: 1, padding: 20, marginTop: 40 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 10 }}>Thêm thành viên</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "black",
        }}
      >
        <FontAwesome name="search" size={24} color="black" />
        <TextInput
          style={{ marginLeft: 10, flex: 1, marginTop: 5 }}
          placeholder="Tìm kiếm"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList
        data={searchResult}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelectUser(item)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18 }}>{item.username}</Text>
            </View>
            <View>
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
        style={{
          backgroundColor: "blue",
          padding: 10,
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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
  imgname: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelimg: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default AddMemberGroup;
