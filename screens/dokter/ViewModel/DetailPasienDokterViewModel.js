import { useEffect, useState } from 'react';
import {useIsFocused} from '@react-navigation/native'
import Dokter from '../../../models/Dokter';
import Auth from '../../../models/Auth';
import RoleEnum from '../../../enums/RoleEnum';

const DetailPasienDokterViewModel = (route)=>{
  const {id_pasien, name, keluhan} = route.params.pasien
  const isFocused = useIsFocused()
  const [isLoading, setIsLoading] = useState(false)
  const [dokter, setDokter] = useState({
    name: "Tammie Crawford",
    id_user: 0,
  })
  const [pasien, setPasien] = useState({
    id_pasien,
    name,
    keluhan
  })
  const [chats, setChats] = useState([
    // {id_chat:1, id_user:1, message:"Halo", role:0},
  ])
  const [message, setMessage] = useState('')
  const sendMessage = async()=>{
    if(message=="") return
    const c = [...chats]
    const temp = [...chats]
    try {
    temp.unshift({
      message,
      id_chat: Math.random().toString(),
      role: RoleEnum.DOKTER,
      id_user: dokter.id_user
    })
    setChats(temp)
    await Dokter.sendChat(id_pasien,message)
    setMessage('')
    } catch (error) {
      console.log(error)
      alert("Gagal mengirim pesan")
      setChats(c)
    }
  }
  useEffect(()=>{
    (async()=>{
      try {
        setIsLoading(true)
        const user = await Auth.getUser()
        setDokter(user)
        const res = await Dokter.fetchChat(id_pasien)
        setChats(res.data.chat)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  },[isFocused])

  return {dokter, pasien, chats, message, setMessage, sendMessage, isLoading}
}
export default DetailPasienDokterViewModel