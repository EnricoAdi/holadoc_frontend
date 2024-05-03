import globalStyles from '../../utils/global'
import { FlatList, Text, TextInput, View } from 'react-native'
import Heading from '../../components/Heading';
import RoleEnum from "../../enums/RoleEnum";
import ChatBubble from '../../components/ChatBubble';
import Button from '../../components/Button';
import ChatPasienViewModel from './ViewModel/ChatPasienViewModel';

const ChatPasien = ({navigation,route}) => {
  const {dokter, pasien, chats, message, setMessage, sendMessage, isLoading, selesai} = ChatPasienViewModel(navigation,route)
  return (
    <View style={{...globalStyles.container}}>
      <Button text="Selesai" style={{height:40, marginBottom:10}} onClick={selesai}/>
      <Heading size="small">Nama Dokter : {dokter.name}</Heading>
      <Text>Keluhan anda : {pasien.keluhan}</Text>
      {isLoading? <Heading size="small" style={{marginTop:5}}>Loading...</Heading>:
      <FlatList
          data = {chats}
          style={{marginTop:10, marginLeft:10, maxHeight:370, width:"95%"}}
          keyExtractor={(item)=>item.id_chat}
          inverted={true}
          renderItem={({item})=>
            <ChatBubble name={item.role==RoleEnum.PASIEN? pasien.name : dokter.name} message={item.message} isCurrentUser={item.role==RoleEnum.PASIEN}/>
          }
        />}
        
        <View style={{justifyContent:"flex-end"}}>
          <TextInput placeholder="Pesan" style={{...globalStyles.input, height:40}} value={message} onChangeText={(val)=>setMessage(val)}/>
          <Button text={"Kirim"} style={{marginTop:20}} onClick={sendMessage} isDisabled={message==""}/>
        </View>
    </View>
  )
}

export default ChatPasien