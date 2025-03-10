import { View, Text, KeyboardAvoidingView, Button, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SignedIn, SignedOut, useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { TextInput } from 'react-native-gesture-handler'
import StyledButton from '@/components/ui/StyledButton'

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState("")

    const onSignUpPress =  async () =>{
      if (!isLoaded) {
        return
      }
      
      try {
        
        await signUp.create({
          emailAddress,
          password
        })
        
        await signUp.prepareEmailAddressVerification({ strategy: "email_code"})
        setPendingVerification(true)
        
      } catch (err: any) {
        console.error(JSON.stringify(err, null,2))
         Platform.OS === "web" ? alert(err.errors[0].message):
        Alert.alert("Error", err.errors[0].message)
      } 
    }
    
    const onPressVerify = async ()=>{
      if (!isLoaded) {
        return
      }
      
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({code})
        
        if (completeSignUp.status === "complete" ) {
          await setActive({ session: completeSignUp.createdSessionId})
          router.replace("/")
        } else {
          console.error(JSON.stringify(completeSignUp, null, 2))
        }
        
      } catch (error) { 
        console.error(JSON.stringify(error, null,2))
        Alert.alert("Error", "Looks like you intered the wrong code. \n\nPlease try again.")
      }
    }
    
  return (
    <KeyboardAvoidingView
      behavior={
          Platform.OS === "ios"? "padding": undefined
      }

      style = {{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#5F5DEC"

      }}
    >
      {!pendingVerification && (
        <View style={{
          gap: 10
        }}>
          <Text
            style ={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 20
            }}
          >
            Enter your details to get started!
          </Text>
          <TextInput 
            autoCapitalize='none'
            value={emailAddress}
            placeholder='Email...'
            onChangeText={(email) =>setEmailAddress(email)}
            style ={{
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
             onChangeText={(password) =>setPassword(password)}
             style ={{
              padding: 20,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10
            }}
          />
          <StyledButton title='Sign Up' onPress={onSignUpPress}
          />
        </View>
      )}
      {pendingVerification && (
        <>
          <Text
            style= {{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              marginBottom: 20
            }}
          >
            A verification code has been sent to your email. Please enter it below.
          </Text>
           <TextInput 
             value={code}
             placeholder='"Code...'
             secureTextEntry={true}
             onChangeText={(code) =>setCode(code)}
             />

             <Button title='Verify Email' onPress={onPressVerify}
           />
        </>
      )}
      
    </KeyboardAvoidingView>
  )
}