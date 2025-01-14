import { TextInput, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export function InputForm({ value, onChangeText, onBlur, placeholder, height, width, id, secureTextEntry, maxLength }: { value?: string, onChangeText?: (e: string) => void, onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void, placeholder?: string, height?: number, width?: number, id?: string, secureTextEntry?: boolean, maxLength?: number }) {
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
        />
    )
}

const styles = StyleSheet.create({
    input_style: {
        borderWidth: 0.5,
        borderColor: '#5F5F5F',
        borderRadius: 5,
        paddingLeft: 15,
    }
})