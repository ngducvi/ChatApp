import React, { Component } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
const Infomation = (props) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        // component infiomation profile
        style={{
            height: "100%",
            width: "85%",
            marginLeft: 15,
            marginTop : 20,

        }}
      >
        {props.children}
      </KeyboardAvoidingView>
    );
  };
  export default Infomation
