import { useEffect, useState } from 'react';
import {useIsFocused} from '@react-navigation/native'
import Dokter from '../../../models/Dokter';

const HomeDokterViewModel = (navigation)=>{
  const isFocused = useIsFocused()
  const [isLoadingFirst, setIsLoadingFirst] = useState(false)
  const [isLoadingBiaya, setIsLoadingBiaya] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [user, setUser] = useState({
    name: "Tammie Crawford",
    biaya_konsultasi: 0,
    total_pendapatan: 0,
  })
  const [biaya, setBiaya] = useState(0)
  const [pasiens, setPasiens] = useState([{
    id_pasien: "0",
    keluhan: "abc asdausda asdausda asdausda asdausda asdausda ",
    name: "abc"
  },{
    id_pasien: "5",
    keluhan: "abc asdausda asdausda asdausda asdausda asdausda ",
    name: "abc"
  },{
    id_pasien: "123",
    keluhan: "abc",
    name: "abc"
  }])

  const changeBiaya = async()=>{
    setIsLoadingBiaya(true)
    try {
      const res = await Dokter.setBiaya(biaya)
      console.log(res.data)
      setUser({
        ...user,
        biaya_konsultasi: biaya
      })
      alert("Berhasil mengubah biaya konsultasi")
    } catch (error) {
      alert("Gagal mengubah biaya konsultasi")
    }
    setIsLoadingBiaya(false)
  }
  const deletePasien = async(id_pasien)=>{
    const confirm = window.confirm("Apakah anda yakin ingin menghapus pasien ini?")
    if(!confirm) return
    const findTemp = pasiens.find((pasien)=>pasien.id_pasien === id_pasien)
    const temp = pasiens.filter((pasien)=>pasien.id_pasien !== id_pasien)
    setPasiens(temp) //optimistic rendering
    try {
      const res = await Dokter.deletePasien(id_pasien)
      alert("Berhasil menghapus pasien")
    } catch (error) {
      console.log(error)
      setPasiens([...pasiens, findTemp]) //rollback
      alert("Gagal menghapus pasien")
    }
  }
  const onRefresh = async()=>{
    setIsRefreshing(true)
    const res = await Dokter.getProfile()
    setUser(res.data.user)
    setBiaya(res.data.user.biaya_konsultasi)
    setPasiens(res.data.pasiens)
    setIsRefreshing(false)
  }
  useEffect(()=>{
    (async()=>{
      setIsLoadingFirst(true)
      const res = await Dokter.getProfile()
      setUser(res.data.user)
      setBiaya(res.data.user.biaya_konsultasi)
      setPasiens(res.data.pasiens)
      setIsLoadingFirst(false)
    })()
  },[isFocused])
  return {isLoadingFirst, user, pasiens, biaya, setBiaya, changeBiaya, deletePasien, onRefresh, isRefreshing, isLoadingBiaya}
}
export default HomeDokterViewModel