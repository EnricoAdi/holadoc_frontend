import globalStyles from '../../utils/global'
import { FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native'
import Heading from '../../components/Heading'; 
import { MaterialIcons } from '@expo/vector-icons';
import toRupiah from '../../utils/currency';
import Button from '../../components/Button';
import { SelectList } from 'react-native-dropdown-select-list'
import StatusPasienEnum from '../../enums/StatusPasienEnum';
import HomePasienViewModel from './ViewModel/HomePasienViewModel';

const HomePasien = ({navigation}) => {
  const {isLoadingFirst, isLoadingFilter, user, dokters, setFilterDokter, setFilterSpesialis, listSpesialis, isConsulting, navigateToChat} = HomePasienViewModel(navigation)
  return (
    <View style={globalStyles.container}>
     {isLoadingFirst ? <Heading size="medium">Loading...</Heading> :  <>
     <View style={{flex:1, flexDirection:"row", maxHeight:55}}>
      <MaterialIcons name='person' size={50}  />
          <View style={{flex: 1, justifyContent: 'center', marginLeft:10}}> 
            <Heading size="medium">{user.name}</Heading>
          </View>
      </View>
       
      <View>
          <View style={{flex:1, flexDirection:"row", marginTop:20}}>
            <TextInput placeholder="Nama Dokter" style={{...globalStyles.input, height:40, width:"75%"}} onChangeText={(val)=>setFilterDokter(val)} />
            <SelectList 
              setSelected={(val) => setFilterSpesialis(val)} 
              data={listSpesialis}
              search={false}
              dropdownStyles={{position: 'absolute', backgroundColor:  "white"}}
              dropdownShown={false}
              defaultOption={{key:'Semua', value:'Semua'}}
              boxStyles={{maxWidth: 70, height: 40, marginLeft: 10,  borderRadius: 5, padding: 5}}
              save="value"
          />
          </View>
        </View>
        {isLoadingFilter ? <Heading size="small" style={{marginTop:10, height:350}}>Loading...</Heading> : 
        <FlatList
          data = {dokters}
          style={{marginTop:10, marginLeft:10, maxHeight:350, width:"95%", zIndex:-1}}
          keyExtractor={(item)=>item.id_user}
          renderItem={({item})=>
          <TouchableOpacity onPress={()=>navigateToChat(item)}>
            <View style={{padding:2, marginTop:2}}> 
              <Text style={{fontSize:15}}>Name: {item.name}</Text> 
              <Text style={{fontSize:13, color:"gray"}}>Spesialis: {item.spesialis}</Text> 
              <View style={{flex:1, flexDirection:"row"}}>
                <Text style={{fontSize:13, color:"gray"}}>Pengalaman: {item.pengalaman} tahun</Text>
                <Text style={{fontSize:13, color:"gray", marginLeft:20}}>Biaya : {toRupiah(item.biaya_konsultasi)}</Text>
              </View> 
            </View>
          </TouchableOpacity>
          }
        />}
        <View style={{justifyContent:"flex-end", marginTop:10}}> 
            <Button text={"Buka Percakapan"} onClick={()=>navigation.navigate("ChatPasien")} style={{height:40, marginLeft:10}} isDisabled={isConsulting!=StatusPasienEnum.DITERIMA}/>
        </View>
        {isConsulting==StatusPasienEnum.DITOLAK? <Text style={{color:"red", marginTop:4}}>KONSULTASI SEBELUMNYA DITOLAK</Text>:null}
     </>}
     
    </View>
  )
}

export default HomePasien