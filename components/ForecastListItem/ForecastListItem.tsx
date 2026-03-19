import Txt from 'components/Txt/Txt';
import { Image, ImageSourcePropType, View } from 'react-native';
import { s } from './ForecastListItem.style';

type ForecastListItemProps = {
    image: ImageSourcePropType;
    day: string;
    date: string;
    temperature: string;
};

const ForecastListItem = ({ image, day, date, temperature }: ForecastListItemProps) => {
    return (
        <View style={s.container}>
            <Image style={s.image} source={image} />
            <Txt style={s.day}>{day}</Txt>
            <Txt style={s.date}>{date}</Txt>
            <Txt style={s.temperature}>{temperature}°</Txt>
        </View>
    );
};

export default ForecastListItem;
