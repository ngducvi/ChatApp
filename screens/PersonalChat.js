import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import MessageSend from "../screens/MessageSend";
import Message from "../screens/Message";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  getMessage,
  getMessageGroup,
  imageMessageSend,
  messageSend,
  getFriends,
  getGroups,
  getGroupMembers,
} from "../store/actions/messengerAction";
import * as ImagePicker from "expo-image-picker";
const PersonalChat = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { friends, message, members, messageSendSuccess, messageGetSuccess, requestAddFriend } = useSelector((state) => state.messenger);

  const { friendId, friendName, friendImage, friendEmail, friendDob } =
    route.params;
  const { currentFriend, setCurrentFriend } = route.params;
  const [messages, setMessages] = useState([]);
  const [removedGroup, setRemovedGroup] = useState("");
  const [memberChange, setMemberChange] = useState({
    changeStatus: false,
    groupId: "",
  });
  const [newMessage, setNewMessage] = useState("");

  const { myInfo } = useSelector((state) => state.auth);
 
  useEffect(() => {
    if (currentFriend?.username) {
      dispatch(getMessage(currentFriend?._id));
    } else if (currentFriend?.name) {
      dispatch(getMessageGroup(currentFriend?._id));
      dispatch(getGroupMembers(currentFriend?._id)); // Thêm dòng này để lấy danh sách thành viên nhóm
    }
  }, [currentFriend?._id]);
  useEffect(() => {
    if (memberChange.changeStatus) {
      if (currentFriend?._id === memberChange.groupId) dispatch(getGroupMembers(currentFriend?._id));
      setMemberChange({ changeStatus: false, groupId: "" });
    }
  }, [memberChange.changeStatus]);

  const inputHandle = (text) => {
    setNewMessage(text);
  };

  const [newRequest, setNewRequest] = useState(false);
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditting: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const maxSizeInBytes = 50 * 1024 * 1024; //50mb
      if (result.assets[0].fileSize > maxSizeInBytes) {
        alert("Dung lượng tệp tin không được vượt quá 50MB.");
        return;
      }
      const imageName = result.assets[0].fileName;
      const newImageName = Date.now() + imageName;
      let formData = new FormData();
      if (currentFriend.username) {
        formData.append("senderName", myInfo.username);
        formData.append("imageName", newImageName);
        formData.append("receiverId", currentFriend._id);
        formData.append("image", {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].fileName,
        });
      } else {
        formData.append("senderName", myInfo.username);
        formData.append("imageName", newImageName);
        formData.append("groupId", currentFriend._id);
        formData.append("image", {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].fileName,
        });
      }
      dispatch(imageMessageSend(formData));
    }
  };

  const sendMessage = () => {
    // Thực hiện logic gửi tin nhắn
    let data;
    if (currentFriend.username) {
      data = {
        senderName: myInfo.username,
        receiverId: currentFriend._id,
        message: newMessage ? newMessage : "❤",
      };
    } else {
      data = {
        senderName: myInfo.username,
        groupId: currentFriend._id,
        message: newMessage ? newMessage : "❤",
      };
    }
    dispatch(messageSend(data));
    setNewMessage("");
  };
  const handleImagePress = () => {
    if (currentFriend.username) {
      navigation.navigate("ProfileFriend", { friendInfo: currentFriend });
    } else {
      // Chuyển đến màn hình ProfileGroup và truyền thông tin thành viên nhóm
      navigation.navigate("ProfileGroup", { friendInfo: currentFriend, members: members});
    }
  };
  
  
  useEffect(() => {
    if (currentFriend?.name) {
      dispatch(getGroupMembers(currentFriend?._id)); // Lấy danh sách thành viên nhóm
    }
  }, [currentFriend?._id]);
  const handleEmojiSend = (e) => {
    setNewMessage(`${newMessage}` + e);
  };
  useEffect(() => {
    dispatch(getFriends(myInfo.id));
    dispatch(getGroups());
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      // component infiomation profile
      style={{
        height: "100%",
        width: "100%",
        marginLeft: 5,
        marginBottom: 9,
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            marginTop: 40,
          }}
        >
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                color="black"
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress()}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{
                  uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${currentFriend.image}`,
                }}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text style={styles.nameText}>
                 <Text>{currentFriend.username || currentFriend.name}</Text>
              </Text>
              <Text>Active 2m ago</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 13, padding: 10 }}>
            <FontAwesome
              name="phone"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
            <FontAwesome
              name="video-camera"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
            <FontAwesome name="wechat" size={24} color="black" />
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <Message message={message} currentFriend={currentFriend} />
        </ScrollView>

        <View style={{ padding: 5, marginBottom: 13 }}>
          <MessageSend
            newMessage={newMessage}
            inputHandle={inputHandle}
            sendMessage={sendMessage}
            handleEmojiSend={handleEmojiSend}
            openImagePicker={openImagePicker}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = {
  imageName: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activeIcon: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    right: 0,
    bottom: 0,
  },
  name: {},
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
  },
};

export default PersonalChat;
