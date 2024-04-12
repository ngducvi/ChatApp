import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants/theme";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  UserAddOutlined,
} from "@expo/vector-icons";
import { getFriends } from "../store/actions/messengerAction";
import { API_URL } from "../environment/developer";
import {
  FRIEND_GET_SUCCESS,
  GET_MEMBER_SUCCESS,
  GET_REQUEST_ADD_FRIEND_SUCCESS,
  GROUPS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
} from "../store/types/messengerType";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Contacts = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { friends } = useSelector((state) => state.messenger); // Destructure friends from redux state

  const dispatch = useDispatch();

  const Search = (text) => {
    setSearch(text);
    if (text) {
      const results = friends.filter(
        (fd) =>
          fd.fndInfo &&
          fd.fndInfo.username &&
          fd.fndInfo.username.toLowerCase().includes(text.toLowerCase())
      );
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
      style={styles.itemContainer}
    >
      <View style={styles.imageContainer}>
        {item.isOnline && item.isOnline == true && (
          <View style={styles.onlineIndicator}></View>
        )}
        <Image
          source={{
            uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.fndInfo.image}`,
          }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.username}>
          {item.fndInfo?.username || item.fndInfo?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contacts</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Addcontacts")}>
            <View style={styles.viewtouch}>
              <MaterialIcons
                name="person"
                size={25}
                color={COLORS.secondaryBlack}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CreateGroup")}>
            <View style={styles.viewtouch}>
              <MaterialIcons
                name="group"
                size={25}
                color={COLORS.secondaryBlack}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color={COLORS.black} />
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={Search}
          placeholder="Search contact..."
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={searchResults.length > 0 ? searchResults : friends}
          renderItem={renderItem}
          keyExtractor={(item) => item.fndInfo._id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 22,
    marginTop: 22,
  },
  headerText: {
    ...FONTS.h4,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    margin: 5,
    padding: 5,
  },
  searchContainer: {
    marginHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondaryWhite,
    height: 48,
    marginVertical: 22,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  input: {
    width: "100%",
    height: "100%",
    marginHorizontal: 12,
  },
  flatListContainer: {
    paddingBottom: 100,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    borderBottomColor: COLORS.secondaryWhite,
    borderBottomWidth: 1,
    backgroundColor: COLORS.tertiaryWhite,
  },
  imageContainer: {
    paddingVertical: 15,
    marginRight: 22,
  },
  onlineIndicator: {
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
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  textContainer: {
    flexDirection: "column",
  },
  username: {
    ...FONTS.h4,
    marginBottom: 4,
  },
  viewtouch: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginHorizontal: 5,
  },
});

export default Contacts;
