import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { s } from './Home.style';
import { UserCoords } from 'types/UserCoords';
import { MeteoAPI } from 'api/meteo';
import { getWeatherInterpretation } from 'services/meteo.service';
import MeteoBasic from 'components/MeteoBasic/MeteoBasic';
import MeteoAdvanced from 'components/MeteoAdvanced/MeteoAdvanced';

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

const Home = () => {
  const [coords, setCoords] = useState<UserCoords>();
  const [weather, setWeather] = useState<Weather>();
  const [city, setCity] = useState<string>();
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

  return (
    currentWeather && (
      <>
        <View style={s.meteo_basic}>
          {interpretation && city && (
            <MeteoBasic
              temperature={Math.round(currentWeather?.temperature)}
              city={city}
              interpretation={interpretation}
            />
          )}
        </View>
        <View style={s.searchbar_container}></View>
        <View style={s.meteo_advanced}>
          <MeteoAdvanced
            wind={currentWeather.windspeed}
            dusk={weather.daily.sunrise[0].split('T')[1]}
            dawn={weather.daily.sunset[0].split('T')[1]}
          />
        </View>
      </>
    )
  );
};

export default Home;
