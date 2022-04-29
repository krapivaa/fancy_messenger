import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, View,  KeyboardAvoidingView} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import {auth} from '../firebase';

export default function RegisterScreen({ navigation }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
        headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
        authUser.user.updateProfile({
            displayName: name,
            photoURL: imageUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        });
    })
    .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      
      <Text h4 style={{ marginBottom: 50 }}>Create a Signal account</Text>

      <View style={ styles.inputContainer}>
        <Input
            placeholder="Full Name"
            autofocus
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
        />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
          <Input
            placeholder="Password"
            type="password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
          <Input
            placeholder="Profile Picture URL (optional)"
            type="image"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            onSubmitEditing={register}
        />
      </View>

      <Button
          title="Register"
          raised
          onPress={register}
        />
      <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})