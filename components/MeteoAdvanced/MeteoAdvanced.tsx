import { View } from "react-native";
import { s, StyledContainer, StyledLabel, StyledValue } from "./MeteoAdvanced.style";

type MeteoAdvancedProps = {
	dusk: string;
	dawn: string;
	wind: number;
};

const MeteoAdvanced = ({ dusk, dawn, wind }: MeteoAdvancedProps) => {
	return (
		<View style={s.container}>
			<StyledContainer>
				<StyledValue>{dusk}</StyledValue>
				<StyledLabel>Aube</StyledLabel>
			</StyledContainer>
			<StyledContainer>
				<StyledValue>{dawn}</StyledValue>
				<StyledLabel>Crépuscule</StyledLabel>
			</StyledContainer>
			<StyledContainer>
				<StyledValue>{wind} km/h</StyledValue>
				<StyledLabel>Vent</StyledLabel>
			</StyledContainer>
		</View>
	);
};

export default MeteoAdvanced;
