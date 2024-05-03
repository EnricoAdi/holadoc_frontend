import {publicClient, privateClient, setAccessToken, accessToken} from "../services/_client"
import AsyncStorage from '@react-native-async-storage/async-storage';
import KEY from "../services/key";

const Auth = {
  AUTH_KEY : KEY.AUTH_KEY,
  login(username,password){
    return publicClient.post('/auth/login', {username, password})
  },
  refresh(){
    return privateClient.post('/auth/refresh')
  },
  registerPasien(name, username, password, password_confirmation){
    return publicClient.post('/auth/register/pasien', {name, username, password, password_confirmation})
  },
  registerDokter(name, username, password, password_confirmation, spesialis, deskripsi, tahun_praktek){
    return publicClient.post('/auth/register/dokter', {name, username, password, password_confirmation, spesialis, deskripsi, tahun_praktek})
  },
  async saveUser(user){
    try {
      await AsyncStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
      setAccessToken(user.token)
    } catch (e) {
      console.log(e)
    }
  },
  async getUser(){
    try {
      const getUser = await AsyncStorage.getItem(this.AUTH_KEY);
      const user = JSON.parse(getUser)
      if(user){
        if(user.token && !accessToken) setAccessToken(user.token)
        return user
      }else{
        return {}
      }
    } catch (e) {
      console.log(e)
      return {}
    }
  },
  async logout(){
    await privateClient.post('/auth/logout') //invalidate JWT
    await this.removeUser()
  },
  async removeUser(){ 
    await AsyncStorage.removeItem(this.AUTH_KEY);
  }
}
export default Auth