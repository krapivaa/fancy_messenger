import React, {useLayoutEffect, useState} from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback  } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db , auth} from '../firebase';
import firebase from 'firebase/app';


const ChatScreen = ({navigation, route}) => {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {

    let unmounted = false;

    navigation.setOptions({
        title: "Chat",
        headerBackTitleVisible: false,
        headerTitleAlighn: "left",
        headerTitle: () => (
            <View style={{
                flexDirection: "row",
                alignItems: "center"
            }}>
                <Avatar 
                    rounded 
                    source={{
                        uri: 
                        messages[0]?.data.photoURL || 
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                    }}
                />
                <Text style={styles.text}>{route.params.chatName}</Text>
            </View>
        ),
        headerLeft: () => (
          <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
              <AntDesign name="arrowleft" size={24} color="#89C7E7" />
          </TouchableOpacity>  
        ),
        headerRight: () => (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                <TouchableOpacity>
                    <FontAwesome name="video-camera" size={24} color="#89C7E7" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="call" size={24} color="#89C7E7"  />
                </TouchableOpacity>
            </View>
        )
    });
    return () => { unmounted = true };
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
    });
    setInput("");
  };
  
  useLayoutEffect(() => {
    const unsubscribe = db.collection("chats").doc(route.params.id).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))
    ));
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
                <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                    {messages.map(({ id, data}) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} id={id} style={styles.receiver}>
                                <Text style={styles.receiverText}>{data.message}</Text>
                                <Text style={styles.receiverName}>{data.displayName}</Text>
                                <Avatar
                                    position="absolute"
                                    rounded
                                    // for WEB
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -15,
                                        right: -5,
                                    }}
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    source={{
                                        uri: data.photoURL,
                                    }}
                                />
                            </View>
                        ) : (
                            <View key={id} id={id} style={styles.sender}>
                                <Text style={styles.senderText}>{data.message}</Text>
                                <Text style={styles.senderName}>{data.displayName}</Text>
                                <Avatar
                                    position="absolute"
                                    rounded
                                    // for WEB
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: -5,
                                    }}
                                    bottom={-15}
                                    left={-5}
                                    size={30}
                                    source={{
                                        uri: data.photoURL,
                                    }}
                                />
                            </View>
                        )
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput 
                        value={input} 
                        onChangeText={(text) => setInput(text)} 
                        onSubmitEditing={sendMessage}
                        placeholder="Fancy Message" 
                        style={styles.textInput} 
                    />
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name="send" size={24} color="#2B68E6" />
                    </TouchableOpacity>
                </View>
            </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen;

const styles = StyleSheet.create({
    text: {
        color: "#89C7E7",
        marginLeft: 10,
        fontWeight: "700"
    },
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    receiver: {
        padding: 15,
        backgroundColor: "#FFF684",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#89C7E7",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10
    },
    senderText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    receiverName: {
        left: 10,
        fontSize: 10,
        color: "black"
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "black"
    }
});