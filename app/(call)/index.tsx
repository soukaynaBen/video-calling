import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text, View } from "react-native";


export default function IndexScreen() {


  return (
      <View>
        <Text>Hello World</Text>
          <SignedIn>
            <Text>You are signed in</Text>
          </SignedIn>
  
          <SignedOut>
            <Text>You are signed out</Text>
          </SignedOut>
      </View>
  )
}