import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function CallRoutesLayout() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tabs
      screenOptions={({route})=>({
         header: () => null,
         tabBarStyle: {
            display: route.name === "[id]" ? "none" : "flex"
         },
         tabBarLabelStyle: {
            zIndex: 100,
            paddingBottom: 5
         }
      })}
      >
      <Tabs.Screen 
        name='index'
        options={{
            title: "All Calls",
            tabBarIcon: ({ color }) =>(<Ionicons name='call-outline' size={24} color={color}/>)
        }}
       />
      <Tabs.Screen 
        name='join'
        options={{
            title: "Join Call",
            headerTitle: "Enter the Room ID",
            tabBarIcon: ({ color }) =>(<Ionicons name='enter-outline' size={24} color={color}/>)
        }}
       />
      </Tabs>
    </SafeAreaView>
  )
}