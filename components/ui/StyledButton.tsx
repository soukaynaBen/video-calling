import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type StyledButtonProps = {
    title : string
    onPress: () => void
    style?: any
}


export default function StyledButton({
    title,
    onPress,
    style
}: StyledButtonProps) {
  return (
    <TouchableOpacity
     onPress={onPress}
     style = {{
        backgroundColor: "white",
        width: "100%",
        borderRadius: 5,
        padding: 12,
        ...style
     }}
    >
      <Text
        style={{
            color:"#5F5DEC",
            fontSize: 16,
            textAlign: "center",
            fontWeight: "bold"
        }}
      >{title}</Text>
    </TouchableOpacity>
  )
}