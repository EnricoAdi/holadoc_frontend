import { useState } from 'react';
import Auth from '../../../models/Auth';

const RegisterPasienViewModel = (navigation)=>{
  const [name, setName] = useState('') 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [confirm, setConfirm] = useState('') 
  const [isLoading, setIsLoading] = useState(false) 
  const onRegister = async()=>{
    if(name==="" || username === '' || password === '' || confirm===""){
      alert('Please fill all fields')
      return
    }
    
    setIsLoading(true)
    try {
      const res = await Auth.registerPasien(name, username, password, confirm)
      alert("Register Pasien Berhasil")
      navigation.navigate("Login")

    } catch (error) {
      if (error.response.data.message) alert(error.response.data.message)
      else alert("Gagal Register Pasien")
    }
    setIsLoading(false)
  }
  return {username, setUsername, password, setPassword,
    confirm, setConfirm, name, setName, onRegister, isLoading}
}

export default RegisterPasienViewModel