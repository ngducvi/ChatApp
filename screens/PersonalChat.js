import { View, Text, TouchableOpacity, Image,TextInput } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS } from "../constants/theme";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import { contacts } from "../constants/data";
import ProfileAccount from "../screens/ProfileAccount";
const PersonalChat = ({ navigation }) => {
    
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Xin chào",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  // change button of send
 // change button of send
const renderSend = (props) => {
    return (
      <View style={{ flexDirection: 'row' }}>
          <View style={{marginTop:2}}>
        <TouchableOpacity
          onPress={() => console.log("additional action")}
          style={{
            height: 36,
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              borderRadius: 18,
              backgroundColor: COLORS.gray,
              marginRight: 5,
              marginBottom: 5,
          }}
        >
          <FontAwesome name="plus-circle" size={24} color={COLORS.white} />
        </TouchableOpacity>
        </View>
        <Send {...props}>
          <View
            style={{
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              borderRadius: 18,
              backgroundColor: COLORS.primary,
              marginRight: 5,
              marginBottom: 5,
            }}
          >
            <FontAwesome name="send" size={12} color={COLORS.white} />
          </View>
        </Send>
  
      
      </View>
    );
  };
  
    // change button of add circle
    const renderaddCircle= (props) => {

    }

  // customize sender messages
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.white,
          },
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
      <StatusBar style="light" backgroundColor={COLORS.white} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 22,
          backgroundColor: COLORS.white,
          height: 60,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileAccount")}
          >
            <Image
              resizeMode="contain"
              source={require("../assets/images/user.jpg")}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
            />
          </TouchableOpacity>
          <Text style={{ ...FONTS.h4, marginLeft: 8 }}>BotChat</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* TouchableOpacity imagez avatar */}

          {/* <TouchableOpacity
                        onPress={() => console.log('search')}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <MaterialIcons
                            name="search"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => console.log("call")}
            style={{
              marginRight: 8,
            }}
          >
            <MaterialIcons name="call" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("video-call")}
            style={{
              marginRight: 8,
            }}
          >
            <MaterialIcons name="video-call" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        textInputStyle={{
          borderRadius: 22,
          borderWidth: 1,
          borderColor: COLORS.gray,
          marginRight: 6,
          paddingHorizontal: 12,
        }}
        
      />
    </SafeAreaView>
  );
};

export default PersonalChat;