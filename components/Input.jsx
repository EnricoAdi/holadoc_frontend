import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native';
import globalStyles from '../utils/global';
const Input = (props) => {
  const [keyboardType, setKeyboardType] = useState('text')
  useEffect(()=>{
    if(props.type === 'password' || props.type === '' ){
      setKeyboardType('text')
    }else{
      setKeyboardType(props.type)
    }
  },[])
  return (
    <TextInput style={{
      ...globalStyles.input,
      ...props.style
    }}
    inputMode={keyboardType}
    secureTextEntry={props.type === 'password' ? true : false} 
    placeholder={props.placeholder}
    onChangeText={props.onChange}
    />
  )
}
 

export default Input