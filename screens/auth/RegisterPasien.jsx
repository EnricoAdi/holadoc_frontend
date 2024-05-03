import { Text, View } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Heading from '../../components/Heading'; 
import globalStyles from '../../utils/global';
import RegisterPasienViewModel from './ViewModel/RegisterPasienViewModel';

const RegisterPasien = ({navigation}) => {
  const { setUsername, setPassword, onRegister, isLoading, setName, setConfirm } = RegisterPasienViewModel(navigation)
  return (
    
    <View style={globalStyles.container}>  
      <View style={{alignItems:"center"}}>
        <Heading>Register Sebagai Pasien</Heading> 
      </View>

      <Input placeholder="Name" style={{marginTop:20}} onChange={(val)=>setName(val)}/> 
      <Input placeholder="Username" style={{marginTop:20}} onChange={(val)=>setUsername(val)}/> 
      
      <Input placeholder="Password" type="password" style={{marginTop:20}} onChange={(val)=>setPassword(val)}/>
      <Input placeholder="Konfirmasi Password" type="password" style={{marginTop:20}} onChange={(val)=>setConfirm(val)}/>
      {isLoading && <Text style={{marginTop:10, marginLeft:5}}>Loading...</Text>}

      <Button text="Register" onClick={onRegister} style={{marginTop:20}}/>  
      <Button text="Ke Halaman Login" onClick={()=>navigation.navigate("Login")}  style={{marginTop:20}}/>
      </View> 
  )
}

export default RegisterPasien