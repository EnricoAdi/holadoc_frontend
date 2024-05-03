import { Text, View, TextInput, ScrollView } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Heading from '../../components/Heading'; 
import globalStyles from '../../utils/global';
import { SelectList } from 'react-native-dropdown-select-list'
import RegisterDokterViewModel from './ViewModel/RegisterDokterViewModel';

const RegisterDokter = ({navigation}) => {
  const { listSpesialis, setUsername, password, setPassword,
    spesialis, setSpesialis, deskripsi, setDeskripsi, tahun, setTahun,
    confirm, setConfirm, name, setName, onRegister, isLoading } = RegisterDokterViewModel(navigation)
  
  return (
    <ScrollView style={globalStyles.container}>  
      <View style={{alignItems:"center"}}>
        <Heading>Register Sebagai Dokter</Heading> 
      </View>

      <Input placeholder="Name" style={{marginTop:20}} onChange={(val)=>setName(val)}/> 
      <Input placeholder="Username" style={{marginTop:20}} onChange={(val)=>setUsername(val)}/> 
      
      <Input placeholder="Password" type="password" style={{marginTop:20}} onChange={(val)=>setPassword(val)}/>
      <Input placeholder="Konfirmasi Password" type="password" style={{marginTop:20}} onChange={(val)=>setConfirm(val)}/>
      <SelectList 
        setSelected={(val) => setSpesialis(val)} 
        data={listSpesialis}
        defaultOption={{key:'Umum', value:'Umum'}}
        boxStyles={{marginTop:20}}
        save="value"
    />
    
    <TextInput placeholder="Deskripsi" style={{...globalStyles.input, marginTop:20}} onChange={(val)=>setDeskripsi(val.target.value)} multiline={true}  numberOfLines = {4}/>
    <TextInput style={{...globalStyles.input, marginTop:20}} value={tahun.toString()} placeholder="Tahun Praktek" keyboardType='numeric' onChangeText={(val)=>setTahun(val)}/>  
      {isLoading && <Text style={{marginTop:10, marginLeft:5}}>Loading...</Text>}

      <Button text="Register" onClick={onRegister} style={{marginTop:20}}/>  
      <Button text="Ke Halaman Login" onClick={()=>navigation.navigate("Login")}  style={{marginTop:20}}/>

      </ScrollView> 
  )
}

export default RegisterDokter