// import React from 'react';
// import { useSelector } from 'react-redux';
// import { View, Text, Image } from 'react-native';
// import moment from 'moment';
// import { FaRegCheckCircle } from 'react-icons/fa';
// import "moment/locale/vi";

// const Message = ({ message, currentFriend, scrollRef, members, typingMessage }) => {
//   const { myInfo } = useSelector((state) => state.auth);

//   return (
//     <View >
//         <Text>{myInfo.username}</Text>
//         <Text>Message</Text>
//     </View>
//   );
// };

// export default Message;
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { View, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Message = ({
  message,
  currentFriend,
  scrollRef,
  members,
  typingMessage,
}) => {
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <>
      <View style={{ flexDirection: "column" }}>
        {message && message.length > 0 ? (
          message.map((m, index) =>
            m.senderId === myInfo.id ? (
              <View
                key={m._id}
                ref={scrollRef}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <View style={{ alignItems: "flex-end" }}>
                  <View
                    style={{
                      backgroundColor: "#2e86de",
                      borderRadius: 5,
                      padding: 10,
                      maxWidth: "80%",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>
                      {m.message.text === "" ? (
                        <Image
                          source={{ uri: `/image/${m.message.image}` }}
                          style={{ width: 100, height: 100 }}
                        />
                      ) : (
                        m.message.text
                      )}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "right",
                        fontSize: 12,
                      }}
                    >
                      {moment(m.createdAt).format("HH:mm")}
                    </Text>
                  </View>
                  {index === message.length - 1 && m.senderId === myInfo.id ? (
                    m.status === "seen" ? (
                      <Image
                        source={{ uri: `/image/${currentFriend.image}` }}
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                      />
                    ) : (
                      <FontAwesome
                        name="check-circle"
                        size={20}
                        color="#2e86de"
                      />
                    )
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            ) : (
              <View
                key={m._id}
                ref={scrollRef}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <View>
                  {currentFriend?.name ? (
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                      {m.senderName}
                    </Text>
                  ) : (
                    <></>
                  )}
                  <View
                    style={{
                      backgroundColor: "#e5e5ea",
                      borderRadius: 5,
                      padding: 10,
                      maxWidth: "80%",
                      marginBottom: 5,
                    }}
                  >
                    <Text>
                      {m.message.text === "" ? (
                        <Image
                          source={{ uri: `/image/${m.message.image}` }}
                          style={{ width: 100, height: 100 }}
                        />
                      ) : (
                        m.message.text
                      )}
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "right" }}>
                      {moment(m.createdAt).format("HH:mm")}
                    </Text>
                  </View>
                </View>
              </View>
            )
          )
        ) : (
          <></>
        )}
        <View>
          <Text>{myInfo.username}</Text>
          <Text>Message</Text>
        </View>
        {}
      </View>
    </>
  );
};

export default Message;
