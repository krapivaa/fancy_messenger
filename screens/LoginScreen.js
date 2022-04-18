import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native-web';

const LoginScreen = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const signIn = () => {

  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style = "light"/>
      {/* <Text> The Login Screen</Text> */}
      <Image source={{
        uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
      }}
      style={{width: 200, height: 200}}
      />
      <View style={styles.inputContainer}>
        <Input 
          placeholder="Email" 
          autoFocus  
          type="email" 
          value={email}
          onChangeText={text => setEmail(text)}>
        </Input>

        <Input 
          placeholder="Password"
          secureTextEntry
          type="password" 
          value={password}
          onChangeText={text => setPassword(text)}>
        </Input>
      </View>

      <Button title="Login" containerStyle={styles.button} onPress={signIn}></Button>
      <Button title="Register" containerStyle={styles.button} type="outline"></Button>
    </KeyboardAvoidingView>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",

  },
  inputContainer: {

  },
  button: {

  },
});