import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import { COLORS, FONTS } from "../constants/theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { contacts } from "../constants/data";
import { useSelector } from "react-redux";
const Contacts = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(contacts);
  //   const { friends } = route?.params;
  const { friends, requestAddFriend } = useSelector((state) => state.messenger);
 
  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = contacts.filter((user) => user.userName.toLowerCase().includes(text.toLowerCase()));
    setFilteredUsers(filteredData);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.fndInfo._id}
      onPress={() =>
        navigation.navigate("PersonalChat", {
          userName: item.userName,
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
        },
        index % 2 !== 0
          ? {
              backgroundColor: COLORS.tertiaryWhite,
            }
          : null,
      ]}
    >
      <View
        style={{
          paddingVertical: 15,
          marginRight: 22,
        }}
      >
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
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text style={{ ...FONTS.h4, marginBottom: 4 }}>{item.fndInfo?.username}</Text>
        <Text style={{ fontSize: 14, color: COLORS.secondaryGray }}>{item.lastSeen}</Text>
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
            <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>Contacts</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tabnavigation")}>
              <AntDesign name="plus" size={20} color={COLORS.secondaryBlack} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 22,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.secondaryWhite,
              height: 48,
              marginVertical: 22,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
          >
            <Ionicons name="search-outline" size={24} color={COLORS.black} />

            <TextInput
              style={{
                width: "100%",
                height: "100%",
                marginHorizontal: 12,
              }}
              value={search}
              onChangeText={handleSearch}
              placeholder="Search contact..."
            />
          </View>

          <View
            style={{
              paddingBottom: 100,
            }}
          >
            <FlatList
              data={friends.filter((fd) => fd.fndInfo.username).sort((a, b) => a.fndInfo.username.toLowerCase() > b.fndInfo.username.toLowerCase())}
              renderItem={renderItem}
              keyExtractor={(item) => item.fndInfo._id.toString()}
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Contacts;
