import { useEffect, useState } from 'react'
import {useIsFocused} from '@react-navigation/native'
import Pasien from '../../../models/Pasien'
import Auth from '../../../models/Auth';
import RoleEnum from '../../../enums/RoleEnum';

const ChatPasienViewModel = (navigation,route)=>{
  const isFocused = useIsFocused()
  const [isLoading, setIsLoading] = useState(false)
  const [pasien, setPasien] = useState({
    id_pasien: 0,
    id_user: 0,
    name: "Tammie Crawford",
    keluhan: "Sakit"
  })
  const [chats, setChats] = useState([
    // {id_chat:1, id_user:1, message:"Halo", role:0},
  ])
  const [dokter, setDokter] =  useState({
    name: "dr. Tammie Crawford",
    id_user: 0,
  })
   
  const [message, setMessage] = useState('')
  const sendMessage = async()=>{
    if(message=="") return
    const c = [...chats]
    const temp = [...chats]
    try {
    temp.unshift({
      message,
      id_chat: Math.random().toString(),
      role: RoleEnum.PASIEN,
      id_user: pasien.id_user
    })
    setChats(temp)
    await Pasien.sendChat(pasien.id_pasien,message)
    setMessage('')
    } catch (error) {
      console.log(error)
      alert("Gagal mengirim pesan")
      setChats(c)
    }
  }
  
  const selesai = async()=>{
    const confirm = window.confirm("Apakah anda yakin ingin menyelesaikan sesi konsultasi?")
    if(!confirm) return
    try {
      await Pasien.doneAppointment(pasien.id_pasien)
      alert("Konsultasi selesai")
      navigation.navigate("HomePasien")
    } catch (error) {
      console.log(error)
      alert("Gagal menyelesaikan konsultasi")
    } 
  }
  useEffect(()=>{
    (async()=>{
      try {
        setIsLoading(true)
        const user = await Auth.getUser() //get user pasien
        const res = await Pasien.fetchChat()
        setChats(res.data.chat)
        setDokter(res.data.dokter)
        setPasien({
          ...user,
          id_pasien : res.data.appointment.id_pasien,
          keluhan: res.data.appointment.keluhan,
        })
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  },[isFocused])
  return {dokter, pasien, chats, message, setMessage, sendMessage, isLoading, selesai}
}

export default ChatPasienViewModel