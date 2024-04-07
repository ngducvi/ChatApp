
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";

const Message = ({ message, currentFriend }) => {
  const { myInfo } = useSelector((state) => state.auth);
  const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/;

  return (
    <View>
      {message.map((m, index) => (
        // Kiểm tra xem tin nhắn này có phải từ người dùng hiện tại không
        m.senderId === myInfo.id ? (
          // Nếu tin nhắn từ người dùng hiện tại, hiển thị tin nhắn của họ
          <View key={m._id} style={styles.myMessage}>
            {m.message.text === "" ? (
              imageRegex.test(m.message.image) ? (
                console.log("URL của hình ảnh:", m.message.image),
                <Image style={styles.image} source={{ uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${m.message.image}` }} />
              ) : (
                <Text>{m.message.image}</Text> 
              )
            ) : (
              <Text>{m.message.text}</Text>
            )}
            <Text style={styles.time}>{moment(m.createdAt).format("HH:mm")}</Text>
          </View>
        ) : (
          <View key={m._id} style={styles.friendMessage}>
            {/* {currentFriend?.name && <Text style={styles.name}>{m.senderName}</Text>} */}
            <Image style={styles.avatar} source={{ uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${currentFriend.image}` }} />
            {m.message.text === "" ? (
              imageRegex.test(m.message.image) ? (
                <Image style={styles.image} source={{ uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${m.message.image}` }} />
                
              ) : (
                console.log("URL của hình ảnh:", m.message.image),
                <Text>{m.message.image}</Text> 
              )
            ) : (
              <Text style={styles.text}>{m.message.text}</Text>
            )}
            <Text style={styles.time}>{moment(m.createdAt).format("HH:mm")}</Text>
          </View>
        )
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  myMessage: {
    alignSelf: "flex-end", // Tin nhắn của người dùng hiện tại sẽ được căn phải
    backgroundColor: "#DCF8C6",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    
    
  },
  friendMessage: {
    alignSelf: "flex-start", 
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    flexDirection: "row", 
    alignItems: "baseline", 
    maxWidth: "80%", 
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,

  },
  time: {
    fontSize: 12,
    color: "#777777",
    marginLeft: 5, // Tạo khoảng cách giữa avatar và thời gian
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
 
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 5,
  },
  text: {
    maxWidth: "80%",
   
    alignItems: "center",
  },
});

export default Message;


