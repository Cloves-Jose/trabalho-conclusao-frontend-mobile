import { Text, StyleSheet } from "react-native";

export function TextForm({ text }: { text: string }) {
    return (
        <Text style={styles.text_form}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text_form: {
        color: '#5F5F5F',
    }
})