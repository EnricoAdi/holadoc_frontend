import { useEffect, useState } from 'react';
import {useIsFocused} from '@react-navigation/native'
import Auth from '../../../models/Auth';
import Pasien from '../../../models/Pasien';
import StatusPasienEnum from '../../../enums/StatusPasienEnum';

const HomePasienViewModel = (navigation)=>{
  const isFocused = useIsFocused()
  const [isLoadingFirst, setIsLoadingFirst] = useState(false)
  const [isLoadingFilter, setIsLoadingFilter] = useState(false)
  const [filterDokter, setFilterDokter] = useState("")
  const [filterSpesialis, setFilterSpesialis] = useState("Semua")
  const [isConsulting, setIsConsulting] = useState(1)
  const [user, setUser] = useState({
    name: "Joe Godfrey",  
  })
  const listSpesialis = [
    {key:'Semua', value:'Semua'}, 
    {key:'Umum', value:'Umum'}, 
    {key:'Ortopedi', value:'Ortopedi'}, 
    {key:'Penyakit Dalam', value:'Penyakit Dalam'}, 
    {key:'THT', value:'THT'}, 
    {key:'Paru-paru', value:'Paru-paru'}
  ]
  const [dokters, setDokters] = useState([
    // {id_user: "1", name: "Dr. John Doe", spesialis: "Umum", biaya_konsultasi: 100000, pengalaman: 10},
    // {id_user: "2", name: "Dr. John Deo", spesialis: "Ortopedi", biaya_konsultasi: 50000, pengalaman: 5},
  ]) 
  const navigateToChat = (dokter) => {
    if(isConsulting!=StatusPasienEnum.DITERIMA){
      navigation.navigate('CreateAppointmentPasien', {dokter})
    }
  }
  useEffect(()=>{
    const delayed = setTimeout(() => {
      (async()=>{
        try {
          setIsLoadingFilter(true)
          const res = await Pasien.getDoctors(filterDokter, filterSpesialis)
          setDokters(res.data.doctors)
          setIsConsulting(res.data.is_consulting)
          setIsLoadingFilter(false)
        } catch (error) {
          console.log(error)
        }
      })()
    }, 800);
    return () => clearTimeout(delayed)
    
  },[filterDokter, filterSpesialis])

  useEffect(()=>{
    (async()=>{
      setIsLoadingFirst(true)
      const u = await Auth.getUser()
      setUser(u)
      const res = await  Pasien.getDoctors(filterDokter, filterSpesialis)
      setDokters(res.data.doctors)
      setIsConsulting(res.data.is_consulting)
      setIsLoadingFirst(false)
    })()
  },[isFocused])
  return {isLoadingFirst, isLoadingFilter, user, dokters, filterDokter, setFilterDokter, filterSpesialis, setFilterSpesialis, listSpesialis, isConsulting, navigateToChat}
}
export default HomePasienViewModel