import { Image, View } from 'react-native';
import Clock from '../Clock/Clock';
import Txt from '../Txt/Txt';
import { s } from './MeteoBasic.style';
import { Interpretation } from 'types/InterpretationType';

type MeteoBasicProps = {
  temperature: number;
  city: string;
  interpretation: Interpretation;
};

const MeteoBasic = ({ temperature, city, interpretation }: MeteoBasicProps) => {
  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>
      <Txt>{city}</Txt>
      <Txt style={s.weather_label}>{interpretation.label}</Txt>
      <View style={s.temperature_box}>
        <Txt style={s.temperature}>{temperature}°</Txt>
        <Image style={s.image} source={interpretation.image} />
      </View>
    </>
  );
};

export default MeteoBasic;
