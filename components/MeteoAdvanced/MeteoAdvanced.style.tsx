import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Txt from "../Txt/Txt";

export const s = StyleSheet.create({
	container: {
		borderRadius: 15,
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
		borderColor: "white",
		borderWidth: 2,
		backgroundColor: "#00000043"
	}
});

export const StyledLabel = ({ children }: { children: ReactNode }) => {
	return <Txt style={{ fontSize: 15 }}>{children}</Txt>;
};

export const StyledValue = ({ children }: { children: ReactNode }) => {
	return <Txt style={{ fontSize: 20 }}>{children}</Txt>;
};

export const StyledContainer = ({ children }: { children: ReactNode }) => {
	return <View style={{ alignItems: "center" }}>{children}</View>;
};
