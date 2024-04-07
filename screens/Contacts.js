import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants/theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getFriends } from "../store/actions/messengerAction";

const Contacts = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { friends } = useSelector((state) => state.messenger); // Destructure friends from redux state

  // useEffect(() => {
  //   dispatch(getFriends()); // Fetch friends data when component mounts
  // }, []);

  const dispatch = useDispatch();

  const handleSearchUser = (text) => {
    setSearch(text);
    if (text) {
      const results = friends.filter((fd) => fd.fndInfo && fd.fndInfo.username && fd.fndInfo.username.toLowerCase().includes(text.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PersonalChat", {
          currentFriend: item.fndInfo,
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
        <Image source={{ uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.fndInfo.image}` }} resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 25 }} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text style={{ ...FONTS.h4, marginBottom: 4 }}>{item.fndInfo?.username || item.fndInfo?.name}</Text>
        {/* <Text style={{ fontSize: 14, color: COLORS.secondaryGray }}>{item.msgInfo.message?.text.substring(0, 20) || "Đã gửi 1 file"}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 22, marginTop: 22 }}>
        <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>Contacts</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Tabnavigation")}>
          <AntDesign name="plus" size={20} color={COLORS.secondaryBlack} />
        </TouchableOpacity>
      </View>
      <View
        style={{ marginHorizontal: 22, flexDirection: "row", alignItems: "center", backgroundColor: COLORS.secondaryWhite, height: 48, marginVertical: 22, paddingHorizontal: 12, borderRadius: 20 }}
      >
        <Ionicons name="search-outline" size={24} color={COLORS.black} />
        <TextInput style={{ width: "100%", height: "100%", marginHorizontal: 12 }} value={search} onChangeText={handleSearchUser} placeholder="Search contact..." />
      </View>
      <View style={{ paddingBottom: 100 }}>
        <FlatList data={searchResults.length > 0 ? searchResults : friends} renderItem={renderItem} keyExtractor={(item) => item.fndInfo._id.toString()} />
      </View>
    </View>
  );
};

export default Contacts;
