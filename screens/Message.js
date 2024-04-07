import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  // Dữ liệu tin nhắn ảo test
  const messages = [
    { _id: 1, senderId: 1, message: { text: "Hello", image: "" }, createdAt: new Date() },
    { _id: 2, senderId: 2, message: { text: "Hi there!", image: "" }, createdAt: new Date() },
    { _id: 1, senderId: 1, message: { text: "Hello", image: "" }, createdAt: new Date() },
    { _id: 1, senderId: 1, message: { text: "Hello", image: "" }, createdAt: new Date() },
    { _id: 1, senderId: 1, message: { text: "Hello", image: "" }, createdAt: new Date() },
    { _id: 1, senderId: 1, message: { text: "Hello", image: "" }, createdAt: new Date() },
    { _id: 2, senderId: 2, message: { text: "Hi there!", image: "" }, createdAt: new Date() },
    { _id: 2, senderId: 2, message: { text: "Hi there!", image: "" }, createdAt: new Date() },
    { _id: 2, senderId: 2, message: { text: "Hi there!", image: "" }, createdAt: new Date() },
    { _id: 2, senderId: 2, message: { text: "Hi there!", image: "" }, createdAt: new Date() },
    { _id: 2, senderId: 2, message: { text: "Hi there!", image: "" }, createdAt: new Date() },
    { _id: 2, senderId: 2, message: { text: "Hi there!", image: "" }, createdAt: new Date() },
  ];

  const { myInfo } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      {message.map((m, index) => {
        const isMyMessage = m.senderId === myInfo.id;
        return (
          <View
            key={index} // Sử dụng index của mảng làm key
            style={[styles.messageContainer, isMyMessage ? styles.myMessageContainer : styles.friendMessageContainer]}
          >
            <View style={styles.messageContent}>
              <Text style={[styles.messageText, isMyMessage ? styles.myMessageText : styles.friendMessageText]}>{m.message.text}</Text>
              <Text style={styles.timestamp}>{moment(m.createdAt).format("HH:mm")}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
    maxWidth: "95%",
  },
  messageContent: {
    maxWidth: "100%",
  },
  myMessageContainer: {
    justifyContent: "flex-end",
  },
  friendMessageContainer: {
    justifyContent: "flex-start",
  },
  messageText: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  myMessageText: {
    backgroundColor: "#2e86de",
    color: "#fff",
    alignSelf: "flex-end",
  },
  friendMessageText: {
    backgroundColor: "#e5e5ea",
    color: "#000",
    alignSelf: "flex-start",
  },
  timestamp: {
    fontSize: 12,
    color: "#727272",
    alignSelf: "flex-end",
  },
});

export default Message;
