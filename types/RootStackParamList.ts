export type RootStackParamList = {
    Overview: undefined;
    Details: { name: string };
    Home: undefined;
    Forecast: {
        city?: string;
        sunrise?: string[];
        sunset?: string[];
        time?: string[];
        weathercode?: number[];
        temperature_2m_max?: number[];
    };
};
