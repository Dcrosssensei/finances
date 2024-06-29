import { createStackNavigator } from '@react-navigation/stack';
import Home from "./pages/home/Home";
import Details from './pages/details/Details';
import { RootStackParamList } from './routes/navigationTypes';
import Header from './components/header/Header';

const Stack = createStackNavigator<RootStackParamList>();


export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={Details} 
      options={ {
        header: ()=> (<Header back />)
      }}  
      />
    </Stack.Navigator>
  );
}
