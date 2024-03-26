import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PageTitle = (props) => {
  return (
    <View style={styles.PageTitleContainer}>
    <TouchableOpacity onPress={props.onPress} style={{ marginRight: 12 }}>
      <MaterialIcons name="keyboard-arrow-left" color="black" size={30}  />
    </TouchableOpacity>
    {props.title && <Text style={{ fontSize: 22,fontWeight : 'bold' }}>{props.title}</Text>}
    {props.rightContent && <View style={{ position: 'absolute', right: 12 }}>{props.rightContent}</View>}
  </View>
  
  );
};

const styles = StyleSheet.create({
  PageTitleContainer: {
    marginHorizontal: 22,
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    
  },
});

export default PageTitle;
