import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, useWindowDimensions } from 'react-native';
import { s } from './Txt.style';

type TxtProps = {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
};

const Txt = ({ children, style }: TxtProps) => {
    const { height } = useWindowDimensions();
    const flatStyle = StyleSheet.flatten(style);
    const fontSize = flatStyle?.fontSize || s.text.fontSize;
    return (
        <Text style={[s.text, style, { fontSize: fontSize * 0.00118 * height }]}>{children}</Text>
    );
};

export default Txt;
