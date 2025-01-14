import { StyleSheet, Text } from "react-native";

export function TextWarning({ text }: { text: string }) {
    return (
        <Text style={styles.error_warning}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    error_warning: {
        color: '#C41E3A'
    }
})