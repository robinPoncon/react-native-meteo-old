import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AlataRegular from './assets/fonts/Alata-Regular.ttf';
import Home from './pages/Home/Home';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forecast from 'pages/Forecast/Forecast';
import { RootStackParamList } from 'types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

const App = () => {
    const [isFontLoaded] = useFonts({
        'Alata-Regular': AlataRegular,
    });
    return (
        <NavigationContainer theme={navTheme}>
            {isFontLoaded && (
                <Stack.Navigator
                    screenOptions={{ headerShown: false, animation: 'fade' }}
                    initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Forecast" component={Forecast} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default App;
