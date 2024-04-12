import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
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
    // dispatch(getFriends()); // Fetch friends data when component mounts
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PersonalChat", { currentFriend: item.fndInfo })
      }
      style={[
        styles.chatItemContainer,
        { backgroundColor: index % 2 !== 0 ? COLORS.tertiaryWhite : null },
      ]}
    >
      <View style={styles.chatItemImageContainer}>
        {item.isOnline && item.isOnline == true && (
          <View style={styles.onlineIndicator}></View>
        )}
        <Image
          source={{
            uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.fndInfo.image}`,
          }}
          resizeMode="contain"
          style={styles.chatItemImage}
        />
      </View>
      <View style={styles.chatItemTextContainer}>
        <Text style={styles.usernameText}>
          {item.fndInfo?.username || item.fndInfo?.name}
        </Text>
        <Text style={styles.messageText}>
          {item.message?.text.substring(0, 20) || "Đã gửi 1 file"}{" "}
          <Text style={styles.timeText}>
            {item.msgInfo && item.msgInfo.message
              ? moment(item.msgInfo.createdAt).startOf("mini").fromNow()
              : ""}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Chats</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Addcontacts")}
              >
                <MaterialCommunityIcons
                  name="message-badge-outline"
                  size={20}
                  color={COLORS.secondaryBlack}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("Addcontacts")}
              >
                <MaterialCommunityIcons
                  name="playlist-check"
                  size={20}
                  color={COLORS.secondaryBlack}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("Addcontacts")}
              >
                <AntDesign name="plus" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={friends}
              keyExtractor={(item) => item.fndInfo._id}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.friendContainer}
                  onPress={() =>
                    navigation.navigate("PersonalChat", { currentFriend: item.fndInfo })
                  }
                >
                  <View style={styles.chatItemImageContainer}>
                    {item.isOnline && item.isOnline == true && (
                      <View style={styles.onlineIndicator}></View>
                    )}
                    <Image
                      source={{
                        uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.fndInfo.image}`,
                      }}
                      resizeMode="contain"
                      style={styles.chatItemImage}
                    />
                  </View>
                  <Text style={styles.usernameText}>
                    {item.fndInfo?.username || item.fndInfo?.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <FlatList
            data={friends}
            renderItem={renderItem}
            keyExtractor={(item) => item.fndInfo._id}
          />
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
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
  },
  iconButton: {
    marginLeft: 12,
  },
  searchContainer: {
    marginHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 4,
  },
  addButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6edff",
    marginBottom: 4,
  },
  friendContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  chatItemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    borderBottomColor: COLORS.secondaryWhite,
    borderBottomWidth: 1,
  },
  chatItemImageContainer: {
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
  chatItemImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  chatItemTextContainer: {
    flexDirection: "column",
  },
  usernameText: {
    ...FONTS.h4,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.secondaryGray,
  },
  timeText: {
    ...FONTS.h5,
    marginBottom: 4,
  },
});

export default Chats;
