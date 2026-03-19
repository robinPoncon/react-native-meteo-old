import { ImageSourcePropType } from "react-native";

export type Interpretation = {
	codes: number[];
	label: string;
	image: ImageSourcePropType;
};
