import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const MessageSend = ({ inputHandle, newMessage, sendMessage, handleEmojiSend, imageSend }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😝", "😜", "🧐", "🤓", "😎", "😕", "🤑", "🥴", "😱"];

  // Function to handle emoji selection
  const handleEmojiPress = (emoji) => {
    handleEmojiSend(emoji); // Call the callback function to pass the selected emoji to the parent component
    setNewMessage(newMessage + emoji); // Update the value of newMessage with the selected emoji
  };
  // const setNewMessage = (text) => {
  //   inputHandle(text); // Call the inputHandle function to update the newMessage state
  // };

  return (
    <View style={styles.messageSendSection}>
      <View style={styles.file}>
        <TouchableOpacity>
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={imageSend}></TouchableOpacity>
      </View>

      <View style={styles.file}>
        <TouchableOpacity onPress={imageSend}>
          <FontAwesome name="image" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={imageSend}></TouchableOpacity>
      </View>

      <View style={styles.file}>
        <TouchableOpacity onPress={imageSend}>
          <FontAwesome icon="microphone" />
        </TouchableOpacity>
        <TouchableOpacity onPress={imageSend}></TouchableOpacity>
      </View>

      <View style={styles.file}>
        <FontAwesome name="gift" size={24} color="black" />
      </View>

      <View style={styles.messageType}>
        <TextInput
          style={styles.formControl}
          onChangeText={inputHandle} // Update newMessage state when input changes
          value={newMessage} // Display the value of newMessage in the input
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.emoji} onPress={() => setShowEmoji(!showEmoji)}>
          <Text>😊</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={sendMessage} style={styles.file}>
        <FontAwesome name="paper-plane" size={24} color="black" />
      </TouchableOpacity>

      {showEmoji && (
        <View style={styles.emojiSection}>
          <View style={styles.emoji}>
            {emojis.map((e) => (
              <TouchableOpacity
                key={e} // Using emoji character as key
                onPress={() => handleEmojiPress(e)}
              >
                <Text>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default MessageSend;

const styles = {
  messageSendSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  file: {
    flexDirection: "row",
    alignItems: "center",
  },
  addAttachment: {
    position: "absolute",
    padding: 4,
    backgroundColor: "#212d44",
    fontSize: 14,
    bottom: 44,
    display: "none",
    color: "#fff",
  },
  messageType: {
    flexDirection: "row",
    width: "70%",
    height: 40,
    backgroundColor: "#dfdfdf",
    borderRadius: 50,
    alignItems: "center",
  },
  formControl: {
    flex: 1,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingHorizontal: 10,
  },
  emoji: {
    paddingHorizontal: 10,
    flexDirection: "row",
    display: "grid",
    padding: 5,
    gridTemplateColumns: "repeat(7, 1fr)",
  },
  emojiSection: {
    flexDirection: "row",
    width: 200,
    backgroundColor: "#0e131d",
    position: "absolute",
    right: 60,
    padding: 6,
    bottom: 50,
    borderRadius: 8,
    borderBottomRightRadius: 0,
  },
};
