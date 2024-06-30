import { View, Text, StyleSheet, ViewStyle } from "react-native";

export interface EmptyPropsTypes {
    message?: string;
    styleMod?: ViewStyle;
    numberOfLines?: number;
};

export interface ListEmptyComponentType {
    emptyProps?: EmptyPropsTypes,
};



function ListEmptyComponent({
    emptyProps = {},
}: ListEmptyComponentType) {

    const { message, styleMod, numberOfLines = 1 }: EmptyPropsTypes = emptyProps;
    const defaultMessage = 'No se encontraron Resultados'
    return (
        <>
            <View style={[styles.container, styleMod]}>
                <Text numberOfLines={numberOfLines} style={styles.text}>
                    {message || defaultMessage}
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
    },
});

export default ListEmptyComponent;