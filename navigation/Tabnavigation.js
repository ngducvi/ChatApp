import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import Chats from "../screens/Chats";
import Contacts from "../screens/Contacts";
import More from "../screens/More";

const black = "#000000";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 70,
          width: "400px",
          
        },
      }}
    >
      <Tab.Screen style={{maginTop: 30}}
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {focused ? (
                  <>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 12,
                      }}
                    >
                      Contacts
                    </Text>
                    <FontAwesome  name="circle" size={8} color="#000000" />
                  </>
                ) : (
                  <Feather  name="users" size={24} color="black" />
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {focused ? (
                  <>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 12,
                      }}
                    >
                      Chats
                    </Text>
                    <FontAwesome name="circle" size={8} color={black} />
                  </>
                ) : (
                  <Ionicons  name="chatbubble-outline" size={24} color={black} />
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {focused ? (
                  <>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 12,
                      }}
                    >
                      More
                    </Text>
                    <FontAwesome name="circle" size={8} color={black} />
                  </>
                ) : (
                  <Feather name="more-horizontal" size={24} color="black" />
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
