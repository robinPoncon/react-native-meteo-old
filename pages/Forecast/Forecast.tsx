import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Container from 'components/Container/Container';
import Txt from 'components/Txt/Txt';
import { TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from 'types/RootStackParamList';
import { s } from './Forecast.style';
import ForecastListItem from 'components/ForecastListItem/ForecastListItem';
import { getWeatherInterpretation } from 'services/meteo.service';
import { dateToDDMM, DAYS } from 'services/date.service';

type ForecastRouteProp = RouteProp<RootStackParamList, 'Forecast'>;

const Forecast = () => {
    const { params } = useRoute<ForecastRouteProp>();
    const nav = useNavigation();

    const backButton = (
        <TouchableOpacity onPress={() => nav.goBack()} style={s.back_btn}>
            <Txt>{'<'}</Txt>
        </TouchableOpacity>
    );

    const header = (
        <View style={s.header}>
            {backButton}
            <View style={s.header_texts}>
                <Txt>{params?.city}</Txt>
                <Txt style={s.subtitle}>Prévision sur 7 jours</Txt>
            </View>
        </View>
    );

    const forecastList = (
        <View style={s.forecastList}>
            {params.time?.map((time, index) => {
                const code = params.weathercode?.[index];
                if (code) {
                    const image = getWeatherInterpretation(code)?.image;
                    const date = new Date(time);
                    const day = DAYS[date.getDay()];
                    const d = dateToDDMM(date);
                    const temperature = params.temperature_2m_max?.[index] ?? 0;
                    return (
                        <ForecastListItem
                            image={image}
                            day={day}
                            date={d}
                            key={time}
                            temperature={temperature?.toFixed(0)}
                        />
                    );
                }
            })}
        </View>
    );

    return (
        <Container>
            {header}
            {forecastList}
        </Container>
    );
};

export default Forecast;
