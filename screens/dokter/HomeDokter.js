import globalStyles from '../../utils/global'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Heading from '../../components/Heading'; 
import { MaterialIcons } from '@expo/vector-icons';
import toRupiah from '../../utils/currency';
import Button from '../../components/Button';
import HomeDokterViewModel from './ViewModel/HomeDokterViewModel';

const HomeDokter = ({navigation}) => {
  const {isLoadingFirst, user, pasiens, biaya, setBiaya, changeBiaya, deletePasien, onRefresh, isRefreshing, isLoadingBiaya} = HomeDokterViewModel(navigation)
  return ( 
    <View style={globalStyles.container}>
    {isLoadingFirst && <Heading size="medium">Loading...</Heading>}
    {!isLoadingFirst &&
    <>
      <View style={{flex:1, flexDirection:"row", maxHeight:70}}>
        <MaterialIcons name='person-pin' size={50} style={{marginTop:10}} />
        <View style={{flex: 1, justifyContent: 'center', marginLeft:10}}> 
          <Heading size="medium">{user.name}</Heading>
        </View>
      </View> 
      <Heading size="small" style={{marginLeft:10, marginTop:5}}>Biaya Konsultasi : {toRupiah(user.biaya_konsultasi)}</Heading>
      <Heading size="small" style={{marginLeft:10}}>Total Pendapatan : {toRupiah(user.total_pendapatan)}</Heading>
      <Text style={{fontSize:15, marginLeft:10}}>Daftar Pasien</Text>
      <FlatList
          data = {pasiens}
          style={{marginTop:10, marginLeft:10, maxHeight:300, width:"95%"}}
          keyExtractor={(item)=>item.id_pasien}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          renderItem={({item})=>
            <TouchableOpacity style={{padding:2, flex:1, flexDirection:"row", justifyContent:"space-between", marginTop:2}} onPress={()=>navigation.navigate("DetailPasienDokter",{pasien:item})}>
              <View style={{width:"80%"}}>
                <Text style={{fontSize:15}}>Name: {item.name}</Text> 
                <Text style={{fontSize:13, color:"gray"}}>Keluhan: {item.keluhan.substring(0,30)}</Text> 
              </View>
              <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
                <MaterialIcons name='delete' size={30} style={{marginTop:1}} onPress={()=>deletePasien(item.id_pasien)}/>   
              </View>           
            </TouchableOpacity>
          }
        />

        <View style={{justifyContent:"flex-end"}}>
          <View style={{flex:1, flexDirection:"row", marginTop:20}}>
            <TextInput placeholder="Biaya Konsultasi" style={{...globalStyles.input, height:40, width:"75%"}} inputMode="numeric" value={biaya} onChangeText={(val)=>setBiaya(val)}/>
            <Button text={isLoadingBiaya ? "Loading...":"Save"} onClick={changeBiaya} style={{height:40, marginLeft:10}}/>
          </View>
        </View>
    </>
    }
    </View>
  )
}
export default HomeDokter