import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Login from './screens/auth/Login'; 
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './utils/RootNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from './utils/colors'; 
import RegisterDokter from './screens/auth/RegisterDokter';
import RegisterPasien from './screens/auth/RegisterPasien';
import HomeDokter from './screens/dokter/HomeDokter';
import Auth from './models/Auth';
import HomePasien from './screens/pasien/HomePasien';
 
const Stack = createNativeStackNavigator();
const defaultNavigationOptions = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitle: 'Holadoc',
};

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import CreateAppointmentPasien from './screens/pasien/CreateAppointmentPasien';
import DetailPasienDokter from './screens/dokter/DetailPasienDokter';
import ChatPasien from './screens/pasien/ChatPasien';

const HeaderRight = ({navigation, routeName})=>{
  return (
    <Menu style={{marginRight:10, padding:10}}>
      <MenuTrigger>
        <View><MaterialIcons name='more-vert' size={30} style={{color:"white"}}/></View>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption style={{padding:10}} onSelect={() => {
          navigation.navigate(`Home${routeName}`)
        }} text='Home' />
        <MenuOption style={{padding:10}} onSelect={async() => {
          await Auth.logout()
          navigation.navigate("Login")
        }} text='Logout' /> 
      </MenuOptions>
    </Menu>
  )

}
export default function App() {  
  return (
    <NavigationContainer ref={navigationRef}>
    <MenuProvider>
      <Stack.Navigator screenOptions={defaultNavigationOptions} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="RegisterDokter" component={RegisterDokter}/>
        <Stack.Screen name="RegisterPasien" component={RegisterPasien}/>
        <Stack.Screen name="HomeDokter" component={HomeDokter} options={({ navigation }) => ({
          headerTitle: "Home Page Dokter",
          headerLeft: () => <View></View>,
          headerRight: () => <HeaderRight navigation={navigation} routeName={"Dokter"}/>,
        })}/>
        <Stack.Screen name="DetailPasienDokter" component={DetailPasienDokter} options={({ navigation }) => ({
          headerTitle: "Detail Pasien",
          headerRight: () => <HeaderRight navigation={navigation} routeName={"Dokter"}/>,
        })}/>
        <Stack.Screen name="HomePasien" component={HomePasien} options={({ navigation }) => ({
          headerTitle: "Home Page Pasien",
          headerLeft: () => <View></View>, 
          headerRight: () => <HeaderRight navigation={navigation} routeName={"Pasien"}/>,
        })}/>
        <Stack.Screen name="CreateAppointmentPasien" component={CreateAppointmentPasien} options={({ navigation }) => ({
          headerTitle: "Create Appointment",
          headerRight: () => <HeaderRight navigation={navigation} routeName={"Pasien"}/>,
        })}/>
        <Stack.Screen name="ChatPasien" component={ChatPasien} options={({ navigation }) => ({
          headerTitle: "Konsultasi",
          headerRight: () => <HeaderRight navigation={navigation} routeName={"Pasien"}/>,
        })}/>
      </Stack.Navigator>
    </MenuProvider>
    </NavigationContainer>
  );
} 