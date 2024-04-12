import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Button,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  getRequestAddFriends,
} from "../store/actions/messengerAction";
import axios from "axios";
import { API_URL } from "../environment/developer";
import { GET_REQUEST_ADD_FRIEND_SUCCESS } from "../store/types/messengerType";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createMaterialTopTabNavigator();

export default class Addcontacts extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerLeft: () => (
            <TouchableOpacity onPress={this.goBack}>
              <MaterialIcons
                name="keyboard-arrow-left"
                color="black"
                size={30}
              />
            </TouchableOpacity>
          ),
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen name="Tìm kiếm" component={SearchTab} />
        <Tab.Screen name="Lời mời" component={InvitationsTab} />
      </Tab.Navigator>
    );
  }

  goBack = () => {
    // Thêm logic để quay lại trang trước đó
  };
}

class SearchTab extends Component {
  render() {
    return (
      <View style={styles.tabContent}>
        <SearchInfo />
      </View>
    );
  }
}

class InvitationsTab extends Component {
  render() {
    return (
      <View style={styles.tabContent}>
        <AcceptInvitations />
      </View>
    );
  }
}
const AcceptInvitations = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { requestAddFriend } = useSelector((state) => state.messenger);

  const acceptRequestFriend = (user) => {
    dispatch(acceptFriendRequest(user._id));
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20,
      }}
    >
      <Image
        source={{
          uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.image}`,
        }}
        resizeMode="contain"
        style={{ height: 50, width: 50, borderRadius: 25 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 18 }}>{item.username}</Text>
        <TouchableOpacity onPress={() => acceptRequestFriend(item)}>
          <Text style={{ color: "blue" }}>Chấp nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

 

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 22,
          marginTop: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>
          Lời mời
        </Text>
      </View>
      <FlatList
      data={requestAddFriend}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
    />
    </View>
  );
};

const SearchInfo = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchUser = async (text) => {
    setSearch(text);
    if (text !== "") {
      try {
        const response = await axios.get(`${API_URL}/api/search?q=${text}`);
        setSearchResult(response.data.users);
      } catch (error) {
        console.log("Error searching for users:", error);
      }
    } else {
      setSearchResult([]);
    }
  };

  const addFriend = (userId) => {
    // Implement addFriend functionality
  };

  const acceptRequestFriend = (user) => {
    // Implement acceptRequestFriend functionality
  };

  const renderItem = ({ item }) => (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          source={{
            uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.image}`,
          }}
          resizeMode="contain"
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18 }}>{item.username}</Text>
        <View style={{ flexDirection: "row" }}>
          {item.statusFriend === "none" ? (
            <TouchableOpacity onPress={() => addFriend(item._id)}>
              <View style={styles.viewtouch}>
                <Text style={{ color: "blue", marginRight: 10 }}>Kết bạn</Text>
              </View>
            </TouchableOpacity>
          ) : item.statusFriend === "request" ? (
            <TouchableOpacity onPress={() => acceptRequestFriend(item)}>
              <Text style={{ color: "blue", marginRight: 10 }}>Chấp nhận</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ color: "green", marginRight: 10 }}>Bạn bè</Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 22,
          marginTop: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>
          Tìm kiếm
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 22,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "lightgray",
          height: 48,
          marginVertical: 22,
          paddingHorizontal: 12,
          borderRadius: 20,
        }}
      >
        <Ionicons name="search-outline" size={24} color="black" />
        <TextInput
          style={{ marginLeft: 10, flex: 1 }}
          placeholder="Tìm kiếm"
          value={search}
          onChangeText={handleSearchUser}
        />
      </View>
      <View style={{ paddingBottom: 100, marginLeft: 15 }}>
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
  },
  tabLabel: {
    marginTop: 40,
    color: "#000000",
  },
  tabContent: {
    flex: 1,
  },
  viewtouch: {
    width: 100,
    height: 50,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.gray,
  },
});
