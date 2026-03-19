import { ReactNode } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { s } from 'components/Container/Container.style';
import backgroundImg from '../../assets/images/background.png';

type ContainerProps = {
    children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
    return (
        <ImageBackground source={backgroundImg} style={s.img_background} imageStyle={s.img}>
            <SafeAreaProvider>
                <SafeAreaView style={s.container}>{children}</SafeAreaView>
            </SafeAreaProvider>
        </ImageBackground>
    );
};

export default Container;
