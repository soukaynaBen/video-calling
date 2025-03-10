import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AuthRouteslayout() {

    const { isSignedIn } = useAuth()
    if (isSignedIn) {
        return <Redirect  href={"/(call)"}/>
    }

  return (
    <SafeAreaView style={{flex: 1,
        backgroundColor: "#5F5DEC"
    }}>
        <Stack
        screenOptions={{
            headerStyle: { backgroundColor: "#5F5DEC" },
            headerTintColor: "white"
        }}
        >
            <Stack.Screen
                name='sign-in'
                options={{
                    title: "Sign In to get started",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='sign-up'
                options={{
                    title: "Create a new account",
                    headerBackTitle: "Sign In",
                    headerStyle: { backgroundColor: "#5F5DEC"},
                    headerTintColor: "white"
                }}
            />
        </Stack>
    </SafeAreaView>
  )
}