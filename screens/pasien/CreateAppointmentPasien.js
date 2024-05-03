
import globalStyles from '../../utils/global'
import { Text, TextInput, View } from 'react-native'
import Heading from '../../components/Heading';  
import toRupiah from '../../utils/currency';
import Button from '../../components/Button'; 
import colors from '../../utils/colors';
import CreateAppointmentPasienViewModel from './ViewModel/CreateAppointmentPasienViewModel';

const CreateAppointmentPasien = ({navigation, route}) => {
  const {setKeluhan, dokter, createAppointment, isLoading} = CreateAppointmentPasienViewModel(navigation, route)
  return (
    <View style={globalStyles.container}>
      <Heading size="small">{dokter.name}</Heading>
      <Text>Spesialis : {dokter.spesialis}</Text>
      <Text>Menjadi dokter selama : {dokter.pengalaman} tahun</Text>
      <Text>Biaya : {toRupiah(dokter.biaya_konsultasi)}</Text>
      
      <TextInput placeholder="Isi Keluhan" style={{...globalStyles.input, marginTop:20}} onChange={(val)=>setKeluhan(val.target.value)} multiline={true}  numberOfLines = {10}/>
      <Button text="Batal" color={colors.danger} style={{marginTop:20}} onClick={()=>{
        navigation.navigate('HomePasien')
      }}/>
      <Button text={isLoading ? "Loading...":"Mulai Konsultasi"} style={{marginTop:20}} onClick={createAppointment}/>
    </View>
  )
}

export default CreateAppointmentPasien