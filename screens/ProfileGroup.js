import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PageContainer from "./../components/PageContainer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants/theme";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  UserAddOutlined,
} from "@expo/vector-icons";
import {
  getMessage,
  getMessageGroup,
  imageMessageSend,
  messageSend,
  getFriends,
  getGroups,
  getGroupMembers,
  removeMember,
  leaveGroup,
  disbandTheGroup,
} from "../store/actions/messengerAction";

const ProfileGroup = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { friendInfo, members } = route.params;
  console.log("members", friendInfo);
  const { myInfo } = useSelector((state) => state.auth);
  const isGroupLeader = members.find(member => member.userId._id === myInfo.id && member.role === 'admin');
  const handleLeaveGroup = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn rời khỏi nhóm?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { 
          text: "Đồng ý", 
          onPress: async () => {
            try {
              await dispatch(leaveGroup(friendInfo._id));
              navigation.navigate("Contacts"); // Navigate to Contacts screen after leaving the group
            } catch (error) {
              console.log("Error leaving group:", error);
            }
          }
        },
      ],
      { cancelable: false }
    );
  };

  const deleteMember = (userId) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa thành viên này?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { 
          text: "Đồng ý", 
          onPress: async () => {
            try {
              const rs = await dispatch(removeMember(friendInfo._id, userId));
              await dispatch(getGroupMembers(friendInfo._id));
              if (rs) {
                const otherMembersId = members.map((m) => m.userId._id).filter((id) => id !== myInfo.id);
                await dispatch(getGroupMembers(friendInfo._id));
                alert.success("Xóa thành viên ra khỏi đoạn chat thành công!");
                current.emit("memberChange", { groupId: friendInfo._id, membersId: otherMembersId });
                current.emit("groupEvent", { removeMember: true, newMembers: [{ userId: userId }], groupId: friendInfo._id });
              }
            } catch (error) {
              alert.error("Xóa thành viên không thành công!");
            }
          }
        },
      ],
      { cancelable: false }
    );
  };
  const disbandGroup = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn giải tán nhóm?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { 
          text: "Đồng ý", 
          onPress: async () => {
            try {
              await dispatch(disbandTheGroup(friendInfo._id));
              navigation.navigate("Contacts"); // Navigate to Contacts screen after disbanding the group
              alert.success("Giải tán nhóm thành công!");
            } catch (error) {
              console.log("Error disbanning group:", error?.response?.data); // Use optional chaining here
            }
          }
        },
      ],
      { cancelable: false }
    );
  };
  
  
  const renderMemberItem = ({ item }) => (
    <View style={styles.memberItem}>
      <Image
        style={styles.memberAvatar}
        source={{
          uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${item.userId.image}`,
        }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.textmember}>{item.userId.username}</Text>
        {item.role === "admin" ? (
          <Text style={styles.rolemember}>Trưởng nhóm</Text>
        ) : item.role === "subadmin" ? (
          <Text style={styles.rolemember}>Phó nhóm</Text>
        ) : (
          <Text style={styles.rolemember}>Thành viên</Text>
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", flex: 1 }}>
        <TouchableOpacity
          onPress={() => { 
            if (item.userId._id !== myInfo.id) {
                deleteMember(item.userId._id, myInfo);
            }
          }}
        >
          <MaterialIcons name="delete" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <MaterialIcons
            name="info"
            size={25}
            color={COLORS.secondaryBlack}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  

  useEffect(() => {
    console.log("ID nhóm:", friendInfo?._id);
    if (friendInfo?.name) {
      dispatch(getGroupMembers(friendInfo?._id));
    }
  }, [friendInfo?._id]);

  const [showMemberList, setShowMemberList] = useState(false);
  const [showImageList, setShowImageList] = useState(false); // Thêm state để điều khiển việc hiển thị danh sách ảnh
  
  const toggleImageList = () => {
    setShowImageList(!showImageList);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View style={styles.container}>
          <PageTitle onPress={() => navigation.goBack()} title="Back" />
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `https://iuh-cnm-chatapp.s3.ap-southeast-1.amazonaws.com/${friendInfo.image}`,
              }}
            />
            <Text style={styles.grouptitle}>
              {friendInfo.username ? friendInfo.username : friendInfo.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              //Khoang cach giua cac item
              justifyContent: "space-around",
              width: "80%",
              marginTop: 50,
            }}
          >
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => navigation.navigate("AddMemberGroup", { groupId: friendInfo._id , members: members , myInfo: myInfo})}
            >
              <MaterialIcons
                name="group-add"
                size={25}
                color={COLORS.secondaryBlack}
              />
              <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleLeaveGroup()}
            >
              <MaterialIcons name="exit-to-app" size={25} color="red" />
              <Text>Leave</Text>
            </TouchableOpacity>
            {/* Chỉ hiển thị nút "Giải tán nhóm" nếu người dùng là trưởng nhóm */}
            {isGroupLeader && (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={disbandGroup}
              >
                <MaterialIcons name="delete" size={25} color="red" />
                <Text>Giải tán nhóm</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => setShowMemberList(!showMemberList)}
            >
              <MaterialIcons
                name="group"
                size={25}
                color={COLORS.secondaryBlack}
              />
              <Text>Danh sách thành viên</Text>
            </TouchableOpacity>
            {showMemberList && (
             <FlatList
             data={members}
             renderItem={renderMemberItem}
             keyExtractor={(item, index) => item.userId._id + index}
           />
           
            )}
            <TouchableOpacity
              style={styles.optionItem}
            >
              <MaterialIcons
                name="settings"
                size={25}
                color={COLORS.secondaryBlack}
              />
              <Text>Tùy chỉnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionItem}
            >
              <MaterialIcons
                name="lock"
                size={25}
                color={COLORS.secondaryBlack}
              />
              <Text>Quyền riêng tư</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={toggleImageList} // Kích hoạt hiển thị danh sách ảnh khi nhấn vào
            >
              <MaterialIcons
                name="folder-shared"
                size={25}
                color={COLORS.secondaryBlack}
              />
              <Text>File đã chia sẻ</Text>
            </TouchableOpacity>
            {showImageList && ( // Hiển thị danh sách ảnh nếu showImageList là true
              <View>{/* Hiển thị danh sách ảnh */}</View>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Block</Text>
          </TouchableOpacity>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  grouptitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  profileImage: {
    marginTop: 40,
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#700BEF",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  optionsContainer: {
    width: "90%",
    marginTop: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#CCCCCC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textmember: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileGroup;
