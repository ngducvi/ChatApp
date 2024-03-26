import React, { Component } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
const PageContainer = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#white",
      }}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};
export default PageContainer;
