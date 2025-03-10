import { View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Link, useRouter } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'
import { MaterialIcons } from '@expo/vector-icons'
import StyledButton from '@/components/ui/StyledButton'
import SignInWithOAuth from '@/components/SignInWithOAuth'


export default function SignInScreen() {

   const  { isLoaded, setActive, signIn } = useSignIn()
   const [password, setPassword] = useState("")
   const [emailAddress, setEmailAddress] = useState("")
   const router = useRouter()

   const onSignInPress = useCallback(async()=>{
         if (!isLoaded) {
          return 
         }
         
         try {
          const signInAttenpt = await signIn.create({
            identifier: emailAddress,
            password
          })

          if (signInAttenpt.status === "complete") {
            
            await setActive({
              session: signInAttenpt.createdSessionId
            })
             router.replace("/")

          } else {
            console.error(JSON.stringify(signInAttenpt, null, 2))
          }
          
         } catch (error) {
          console.error(JSON.stringify(error, null, 2))
           Platform.OS === "web" ?  alert(
            "Looks like you entered the wrong email or password.\n\nPlease try again."
          ):
          Alert.alert(
            "Whoops!",
            "Looks like you entered the wrong email or password.\n\nPlease try again."
          )
        }

   },[isLoaded, password, emailAddress]) 

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#5F5DEC",
        paddingHorizontal: 20,
        justifyContent: "center",
        gap: 10
      }}
      behavior={Platform.OS === "ios"? "padding": undefined}
    >
      <MaterialIcons
       name="video-chat" 
       size={160} 
       color="white"
        style={{
          alignSelf: "center",
          paddingBottom: 20,
        }}
        />
      <TextInput
        autoCapitalize='none'
        value={emailAddress}
        placeholder='Email...'
        onChangeText={(emailAddress)=>setEmailAddress(emailAddress)}
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10
        }}
      />
      <TextInput
        value={password}
        placeholder='Password...'
        secureTextEntry={true}
        onChangeText={(password)=>setPassword(password)}
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10
        }}
      />

      <View  
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20
        }}
      />

      <StyledButton title='Sign In' onPress={onSignInPress}/>
      <Text
      style={{
        textAlign: "center",
        color: "white"
      }}
      >
        OR
      </Text>

     <SignInWithOAuth /> 

      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      />

      <View
        style={{
          borderBottomColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }} > Don't have an account? </Text>
        <Link href="/sign-up">
         <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textDecorationLine: "underline"
          }}
         >Sign up</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  )
}