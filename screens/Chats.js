import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { FONTS, COLORS } from "../constants/theme";
import { contacts } from "../constants/data";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../store/actions/messengerAction";

const Chats = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.messenger);

  useEffect(() => {
    dispatch(getFriends()); // Fetch friends data when component mounts
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PersonalChat", {
          friendId: item.fndInfo._id,
          friendName: item.fndInfo.username,
          friendImage: item.fndInfo.image,
        })
      }
      style={[
        {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 22,
          borderBottomColor: COLORS.secondaryWhite,
          borderBottomWidth: 1,
          backgroundColor: index % 2 !== 0 ? COLORS.tertiaryWhite : null,
        },
      ]}
    >
      <View style={{ paddingVertical: 15, marginRight: 22 }}>
        {item.isOnline && item.isOnline == true && (
          <View
            style={{
              height: 14,
              width: 14,
              borderRadius: 7,
              backgroundColor: COLORS.green,
              borderColor: COLORS.white,
              borderWidth: 2,
              position: "absolute",
              top: 14,
              right: 2,
              zIndex: 1000,
            }}
          ></View>
        )}
        <Image
          source={{ uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.fndInfo.image}` }}
          resizeMode="contain"
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={{ ...FONTS.h4, marginBottom: 4 }}>{item.fndInfo?.username || item.fndInfo?.name}</Text>
        <Text style={{ fontSize: 14, color: COLORS.secondaryGray }}>{item.message?.text.substring(0, 20) || "Đã gửi 1 file"}    <Text style={{ ...FONTS.h5, marginBottom: 4 }}>{item.msgInfo && item.msgInfo.message ? moment(item.msgInfo.createdAt).startOf("mini").fromNow() : ""}</Text></Text>
        
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 22,
              marginTop: 22,
            }}
          >
            <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>Chats</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => navigation.navigate("Addcontacts")}>
                <MaterialCommunityIcons name="message-badge-outline" size={20} color={COLORS.secondaryBlack} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 12,
                }}
                onPress={() => navigation.navigate("Addcontacts")}
              >
                <MaterialCommunityIcons name="playlist-check" size={20} color={COLORS.secondaryBlack} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 22,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginRight: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#e6edff",
                  marginBottom: 4,
                }}
              >
                <AntDesign name="plus" size={24} color={COLORS.black} onPress={() => navigation.navigate("Addcontacts")} />
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal={true}
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 15,
                      marginRight: 22,
                    }}
                    onPress={() =>
                      navigation.navigate("PersonalChat", {
                        userName: item.userName,
                      })
                    }
                  >
                    <Image
                      source={item.userImg}
                      resizeMode="contain"
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                      }}
                    />
                  </TouchableOpacity>
                  <Text>{item.userName.substring(0, 5)}...</Text>
                </View>
              )}
            />
          </View>

          <View
            style={{
              paddingBottom: 100,
              marginTop: 20,
            }}
          >
            <FlatList data={friends} renderItem={renderItem} keyExtractor={(item) => item.fndInfo._id} />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Chats;
