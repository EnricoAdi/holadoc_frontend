import { useEffect, useState } from 'react';
import Auth from '../../../models/Auth';
import RoleEnum from '../../../enums/RoleEnum';
import {useIsFocused} from '@react-navigation/native'

const LoginViewModel = (navigation)=>{
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [isLoading, setIsLoading] = useState(false) 
  const isFocused = useIsFocused()
  const onLogin = async()=>{
    if(username === '' || password === ''){
      alert('Please enter username and password')
      return
    }
    
    setIsLoading(true)
    // navigation.navigate("Home")
    try {
      const res = await Auth.login(username, password)
      const user = {
        name: res.data.user.name,
        username: res.data.user.username,
        token : res.data.token,
        role: res.data.user.role
      }
      await Auth.saveUser(user)
      if(user.role == RoleEnum.DOKTER){ 
        navigation.navigate("HomeDokter")
      }
      else navigation.navigate("HomePasien")

    } catch (error) {
      if (error.response.data.message) alert(error.response.data.message)
      else alert("Gagal Login")
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    (async()=>{
      const user = await Auth.getUser()
      if(user && user.username){
        if(user.role!=null && user.role == RoleEnum.DOKTER){
          navigation.navigate("HomeDokter")
        }
        else {
          navigation.navigate("HomePasien")
        } 
      }
    })()
  },[isFocused])

  return {username, setUsername, password, setPassword, onLogin, isLoading}
}
export default LoginViewModel