import AlataRegular from './assets/fonts/Alata-Regular.ttf';
import backgroundImg from './assets/images/background.png';
import Home from './pages/Home/Home';
import { useFonts } from 'expo-font';
import { ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { s } from 'styles/index.style';

const App = () => {
  const [isFontLoaded] = useFonts({
    'Alata-Regular': AlataRegular,
  });
  return (
    <ImageBackground source={backgroundImg} style={s.img_background} imageStyle={s.img}>
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>{isFontLoaded && <Home />}</SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

export default App;
