// import AsyncStorage from '@react-native-async-storage/async-storage';
import { privateClient } from "../services/_client"

const Pasien = {
  getDoctors(name="",spesialisasi=""){
    return privateClient.get('/pasien/doctors',{params:{name,spesialisasi}})
  },
  /**
   * 
   * @param {String} keluhan 
   * @param {Number} dokter 
   * @returns 
   */
  createAppointment(keluhan,dokter){ 
    return privateClient.post('/pasien/create',{keluhan,dokter})
  },
  fetchChat(){
    return privateClient.get('/pasien/chat')
  },
  sendChat(id_pasien,message){
    return privateClient.put(`/pasien/chat`,{id_pasien,message})
  },
  doneAppointment(id_pasien){ 
    return privateClient.get(`/pasien/done/${id_pasien}`)
  }
}
export default Pasien;