import {  Image,View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import { COLORS, FONTS } from "../constants/theme";
import ProfileAccount from "../screens/ProfileAccount";
import { useNavigation } from "@react-navigation/native";
import Chats from "../screens/Chats";
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import {useSelector} from "react-redux";
const More = () => {
  const navigation = useNavigation();
  const { loading, authenticate, error, successMessage, myInfo } = useSelector((state) => state.auth);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 22,
            marginVertical: 22,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>More</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 22,
          }}
        >
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: COLORS.secondaryWhite,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           <Image
              style={{ width: 70, height: 70 ,borderRadius: 50}}
              source={{
                uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${myInfo.image}`,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 22,
            }}
          >
            <Text style={{ ...FONTS.h4, marginVertical: 6 }}>{myInfo.username}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("pressed");
            }}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 32,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileAccount")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 22,
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign name="user" size={24} color={COLORS.black} />
              <Text style={{ ...FONTS.h4, marginLeft: 12 }}> Account</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Chats")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 22,
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="chatbubble-outline" size={24} color={COLORS.black} />
              <Text style={{ ...FONTS.h4, marginLeft: 12 }}> Chats</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("Pressed");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 22,
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="help-circle-outline" size={24} color={COLORS.black} />
              <Text style={{ ...FONTS.h4, marginLeft: 12 }}>Help</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Addcontacts");
              
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 22,
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="email-outline" size={24} color={COLORS.black} />
              <Text style={{ ...FONTS.h4, marginLeft: 12 }}>Invite Your Friends</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default More;
