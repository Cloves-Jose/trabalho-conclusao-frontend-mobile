import { TextInput, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export function InputFormDate({ value, onChangeText, onBlur, placeholder, height, width, id, secureTextEntry }: { value?: string, onChangeText?: (e: string) => void, onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void, placeholder?: string, height?: number, width?: number, id?: string, secureTextEntry?: boolean }) {
    
    const handleDateInput = ({text}: { text: string }) => {
        // Remove qualquer caractere que não seja número
        const cleaned = text.replace(/[^0-9]/g, '');
    
        // Aplica a máscara (dd/mm/aaaa)
        let formatted = cleaned;
        if (cleaned.length > 2) {
          formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        if (cleaned.length > 4) {
          formatted = formatted.slice(0, 5) + '/' + cleaned.slice(4, 8);
        }
        
        if (onChangeText) {
            onChangeText(formatted);
        }
      };
    
    return (
        <TextInput
        style={[styles.input_style, { height: height, width: width }]}
        placeholder={placeholder}
        id={id}
        value={value}
        onChangeText={(e: any) => handleDateInput(e?.target?.value)}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
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