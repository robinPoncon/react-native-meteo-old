import axios from 'axios';
import { UserCoords } from 'types/UserCoords';

export class MeteoAPI {
  static async fetchWeatherFromCoords(coords: UserCoords) {
    return (
      await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
      )
    ).data;
  }
  static async fetchCityFromCoords(coords: UserCoords) {
    const {
      address: { city, village, town },
    } = (
      await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&format=json`,
        {
          headers: {
            'User-Agent': 'foobar/1.0',
          },
        }
      )
    ).data;
    return city || village || town;
  }
}
