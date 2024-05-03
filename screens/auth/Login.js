import { Text, View } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Heading from '../../components/Heading'; 
import globalStyles from '../../utils/global';
import LoginViewModel from './ViewModel/LoginViewModel';

const Login = ({navigation}) => {
  const { setUsername, setPassword, onLogin, isLoading } = LoginViewModel(navigation)
  
  return ( 
    <View style={globalStyles.container}>  
      <View style={{alignItems:"center"}}>
        <Heading>LOGIN</Heading> 
      </View>

      <Input placeholder="Username" style={{marginTop:20}} onChange={(val)=>setUsername(val)}/> 
      
      <Input placeholder="Password" type="password" style={{marginTop:20}} onChange={(val)=>setPassword(val)}/>
      {isLoading && <Text style={{marginTop:10, marginLeft:5}}>Loading...</Text>}
      <Button text="Login" onClick={onLogin} style={{marginTop:20}}/>  
      <Button text="Register Sebagai Pasien" onClick={()=>navigation.navigate("RegisterPasien")}  style={{marginTop:20}}/>  
      <Button text="Register Sebagai Dokter" onClick={()=>navigation.navigate("RegisterDokter")}  style={{marginTop:20}}/>  
      </View> 
  )
}
 
export default Login