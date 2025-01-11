import { Input } from "@rneui/base";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData } from "react-native";

let Keyboard: {
    default: "default",
    numberPad: "number-pad",
    decimalPad: "decimal-pad",
    numeric: "numeric",
    emailAddress: "email-address",
    phonePad: "phone-pad"
}

export type KeyboardType = (typeof Keyboard)[keyof typeof Keyboard]

export function InputForm ({ placeholder, maxLength, onChangeText, keyboardType, id, value, onBlur, secureTextEntry, height, width }: { placeholder: string, maxLength: number, onChangeText: (e: string) => void, keyboardType: KeyboardType, id: string, value: any, onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void, secureTextEntry: boolean, height?: number, width?: number }) {
    return (
        <TextInput
            style={[styles.input_style, { height: height, width: width }]}
            placeholder={placeholder}
            id={id}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            keyboardType={keyboardType}
        />
    )
}

const styles = StyleSheet.create({
    input_style: {
        borderWidth: 0.5,
        borderColor: "#5F5F5F",
        borderRadius: 5,
        paddingLeft: 15,
    }
})

const inputStyles = {
    borderBottomColor: "transparent"
}