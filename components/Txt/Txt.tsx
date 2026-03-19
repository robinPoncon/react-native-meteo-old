import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { s } from "./Txt.style";

type TxtProps = {
	children: ReactNode;
	style?: StyleProp<TextStyle>;
};

const Txt = ({ children, style }: TxtProps) => {
	return <Text style={[s.text, style]}>{children}</Text>;
};

export default Txt;
