import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import MessageSend from "../screens/MessageSend";
import Message from "../screens/Message";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS } from "../constants/theme";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { getMessage, getMessageGroup, messageSend } from "../store/actions/messengerAction";
import { getFriends } from "../store/actions/messengerAction";
const PersonalChat = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { message, members, messageSendSuccess, messageGetSuccess } = useSelector((state) => state.messenger);

  const { friendId, friendName, friendImage, friendEmail, friendDob } = route.params;
  const { currentFriend } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (currentFriend?.username) {
      dispatch(getMessage(currentFriend?._id));
    } else if (currentFriend?.name) {
      dispatch(getMessageGroup(currentFriend?._id));
    }
  }, [currentFriend?._id]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  const { myInfo } = useSelector((state) => state.auth);

  const inputHandle = (text) => {
    setNewMessage(text);
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

  const handleEmojiSend = (emoji) => {
    // Thực hiện logic xử lý việc chọn emoji
  };

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
            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.goBack()}>
              <MaterialIcons name="keyboard-arrow-left" color="black" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileFriend", {
                  friendId: friendId,
                  friendName: friendName,
                  friendEmail: friendEmail,
                  friendImage: friendImage,
                })
              }
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{
                  uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${currentFriend.image}`,
                }}
              />
            </TouchableOpacity>

            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text style={styles.nameText}>{currentFriend.username || currentFriend.name}</Text>
              <Text>Active 2m ago</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 13, padding: 10 }}>
            <FontAwesome name="phone" size={24} color="black" style={{ marginRight: 20 }} />
            <FontAwesome name="video-camera" size={24} color="black" style={{ marginRight: 10 }} />
            <FontAwesome name="wechat" size={24} color="black" />
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <Message message={message} />
        </ScrollView>

        <View style={{ padding: 5, marginBottom: 13 }}>
          <MessageSend newMessage={newMessage} inputHandle={inputHandle} sendMessage={sendMessage} handleEmojiSend={handleEmojiSend} />
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
