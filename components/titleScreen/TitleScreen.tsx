import { View, Text, StyleSheet } from "react-native"

export function TitleScreen({text}: { text: string | string[] }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 18,
        marginLeft: 8
    },
    title: {
        fontWeight: '600',
        fontSize: 30,
        color: '#3d72de'
    }
})