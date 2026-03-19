import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { s } from './Home.style';
import { UserCoords } from 'types/UserCoords';
import { MeteoAPI } from 'api/meteo';
import { getWeatherInterpretation } from 'services/meteo.service';
import MeteoBasic from 'components/MeteoBasic/MeteoBasic';
import MeteoAdvanced from 'components/MeteoAdvanced/MeteoAdvanced';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/RootStackParamList';
import Container from 'components/Container/Container';
import Searchbar from 'components/Searchbar/Searchbar';

type Weather = {
    current_weather: {
        temperature: number;
        windspeed: number;
        weathercode: number;
    };
    daily: {
        sunrise: string[];
        sunset: string[];
    };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
    const [coords, setCoords] = useState<UserCoords>();
    const [weather, setWeather] = useState<Weather>();
    const [city, setCity] = useState<string>();
    const nav = useNavigation<NavigationProp>();
    const currentWeather = weather?.current_weather;

    useEffect(() => {
        getUserCoords();
    }, []);

    useEffect(() => {
        if (coords) {
            fetchWeather(coords);
            fetchCity(coords);
        }
    }, [coords]);

    const getUserCoords = async () => {
        let { status } = await requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const location = await getCurrentPositionAsync();
            setCoords({ lat: location.coords.latitude, lng: location.coords.longitude });
        } else {
            setCoords({ lat: 48.85, lng: 2.35 });
        }
    };

    const fetchWeather = async (coordinates: UserCoords) => {
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coordinates);
        setWeather(weatherResponse);
    };

    const interpretation = currentWeather
        ? getWeatherInterpretation(currentWeather?.weathercode)
        : null;

    const fetchCity = async (coordinates: UserCoords) => {
        const cityResponse = await MeteoAPI.fetchCityFromCoords(coordinates);
        setCity(cityResponse);
    };

    const goToForecastPage = () => {
        nav.navigate('Forecast', { city, ...weather?.daily });
    };

    const fetchCoorsByCity = async (city: string) => {
        try {
            const coords = await MeteoAPI.fetchCoordsFromCity(city);
            setCoords(coords);
        } catch (e) {
            Alert.alert('Oups ! ', String(e));
        }
    };

    return (
        currentWeather && (
            <Container>
                <View style={s.meteo_basic}>
                    {interpretation && city && (
                        <MeteoBasic
                            temperature={Math.round(currentWeather?.temperature)}
                            city={city}
                            interpretation={interpretation}
                            onPress={goToForecastPage}
                        />
                    )}
                </View>
                <View style={s.searchbar_container}>
                    <Searchbar onSubmit={fetchCoorsByCity} />
                </View>
                <View style={s.meteo_advanced}>
                    <MeteoAdvanced
                        wind={currentWeather.windspeed}
                        dusk={weather.daily.sunrise[0].split('T')[1]}
                        dawn={weather.daily.sunset[0].split('T')[1]}
                    />
                </View>
            </Container>
        )
    );
};

export default Home;
