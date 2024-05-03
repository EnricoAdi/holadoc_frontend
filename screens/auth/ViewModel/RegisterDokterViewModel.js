import { useState } from 'react';
import Auth from '../../../models/Auth';

const RegisterDokterViewModel = (navigation)=>{
  const [name, setName] = useState('') 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [confirm, setConfirm] = useState('') 
  const [spesialis, setSpesialis] = useState('Umum') 
  const [deskripsi, setDeskripsi] = useState('') 
  const [tahun, setTahun] = useState(2000) 
  const [isLoading, setIsLoading] = useState(false) 
  const listSpesialis = [
    {key:'Umum', value:'Umum'}, 
    {key:'Ortopedi', value:'Ortopedi'}, 
    {key:'Penyakit Dalam', value:'Penyakit Dalam'}, 
    {key:'THT', value:'THT'}, 
    {key:'Paru-paru', value:'Paru-paru'}
]
  const onRegister = async()=>{
    if(name==="" || username === '' || password === '' || confirm==="" || deskripsi==="" || tahun===""){
      alert('Please fill all fields')
      return
    }
    
    setIsLoading(true)
    try {
      const res = await Auth.registerDokter(name, username, password, confirm, spesialis, deskripsi, tahun)
      alert("Register Dokter Berhasil")
      navigation.navigate("Login")

    } catch (error) {
      if (error.response.data.message) alert(error.response.data.message)
      else alert("Gagal Register Dokter")
    }
    setIsLoading(false)
  }
  return {listSpesialis, setUsername, password, setPassword,
    spesialis, setSpesialis, deskripsi, setDeskripsi, tahun, setTahun,
    confirm, setConfirm, name, setName, onRegister, isLoading}
}
export default RegisterDokterViewModel