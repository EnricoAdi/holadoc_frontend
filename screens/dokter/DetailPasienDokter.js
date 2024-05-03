import globalStyles from '../../utils/global'
import { FlatList, Text, TextInput, View } from 'react-native'
import Heading from '../../components/Heading';
import RoleEnum from "../../enums/RoleEnum";
import Button from '../../components/Button';
import ChatBubble from '../../components/ChatBubble';
import DetailPasienDokterViewModel from './ViewModel/DetailPasienDokterViewModel';

const DetailPasienDokter = ({navigation, route}) => {
  const {dokter, pasien, chats, message, setMessage, sendMessage, isLoading} = DetailPasienDokterViewModel(route)
  return (
    <View style={{...globalStyles.container}}>
      <Heading size="small">Nama Pasien : {pasien.name}</Heading>
      <Text>Keluhan : {pasien.keluhan}</Text>
      {isLoading? <Heading size="small" style={{marginTop:5}}>Loading...</Heading>:
      <FlatList
          data = {chats}
          style={{marginTop:10, marginLeft:10, maxHeight:370, width:"95%"}}
          keyExtractor={(item)=>item.id_chat}
          inverted={true}
          renderItem={({item})=>
            <ChatBubble name={item.role==RoleEnum.DOKTER? dokter.name : pasien.name} message={item.message} isCurrentUser={item.role==RoleEnum.DOKTER}/>
          }
        />}
        <View style={{justifyContent:"flex-end"}}>
          <TextInput placeholder="Pesan" style={{...globalStyles.input, height:40}} value={message} onChangeText={(val)=>setMessage(val)}/>
          <Button text={"Kirim"} style={{marginTop:20}} onClick={sendMessage} isDisabled={message==""}/>
        </View>
    </View>
  )
}

export default DetailPasienDokter