import { View, Pressable, PressableProps, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { ColorsApp } from "../constants";

interface ButtonPressProps extends Omit<PressableProps, 'children'> {
    children: (pressed: boolean) => ReactNode;
    personalize?: ViewStyle
    colorPress?: string
    colorinactive?: string
  }

const ButtonPress = ({children, personalize, colorPress, colorinactive, ...restProps}: ButtonPressProps) => {
    return (
        <Pressable
            {...restProps}
            style={personalize}>
            {({ pressed }) => (
                <View
                    style={[
                        {
                            padding: 15,
                        },
                        pressed
                            ? { backgroundColor: colorPress || ColorsApp.blue }
                            : { backgroundColor: colorinactive || ColorsApp.lightgray },
                    ]}>
                         {children(pressed)}
                </View>
            )}
        </Pressable>
    );
};

export default ButtonPress;
