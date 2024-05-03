import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import colors from '../utils/colors'

const Button = ({text, onClick, color=colors.primary, style, isDisabled=false}) => {
  let bgColor = color
  if(isDisabled){
    bgColor = colors.gray
  }
  return (
    <Pressable style={{...styles.button, ...style, backgroundColor: bgColor}} onPress={onClick} disabled={isDisabled}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable> 
  )
}

const styles = StyleSheet.create({
  button: { 
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Add some shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default Button