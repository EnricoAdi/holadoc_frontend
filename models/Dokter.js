import { privateClient } from "../services/_client"

const Dokter = {
  getProfile(){
    return privateClient.get('/dokter/profile')
  },
  setBiaya(biaya){ 
    return privateClient.put('/dokter/biaya',{biaya})
  },
  deletePasien(id_pasien){ 
    return privateClient.delete(`/dokter/pasien/${id_pasien}`)
  },
  fetchChat(id_pasien){
    return privateClient.get(`/dokter/chat/${id_pasien}`)
  },
  sendChat(id_pasien,message){
    return privateClient.put(`/dokter/chat`,{id_pasien,message})
  }
}
export default Dokter