import { useState } from 'react';
import Pasien from '../../../models/Pasien'; 

const CreateAppointmentPasienViewModel = (navigation, route)=>{
  const {id_user, name, spesialis, biaya_konsultasi, pengalaman} = route.params.dokter
  const [keluhan, setKeluhan] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dokter, setDokter] = useState({
    id_user,
    name,
    spesialis,
    biaya_konsultasi,
    pengalaman
  })
  const createAppointment = async()=>{
    if(keluhan==""){
      alert('Keluhan harus diisi')
      return
    }
    setIsLoading(true)
    try {
      await Pasien.createAppointment(keluhan,dokter.id_user)
      alert("Berhasil membuat appointment")
      navigation.navigate('HomePasien')
    } catch (error) {
      console.log(error)
      alert("Gagal membuat appointment")
    }
    setIsLoading(false)
  }
  return {keluhan, setKeluhan, dokter, createAppointment, isLoading}
}
export default CreateAppointmentPasienViewModel