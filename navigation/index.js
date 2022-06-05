import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack';
import Home from '../screens/Home';
import Category from '../screens/Category';
import Difficulty from '../screens/Difficulty';
import Question from '../screens/Question';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="Category" component={Category} options={{headerShown:false}}/>
      <Stack.Screen name="Difficulty" component={Difficulty} options={{headerShown:false}}/>
      <Stack.Screen name="Question" component={Question} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default MyStack;