import { StyleSheet, Text, View } from "react-native";

export function SubtitleScreen({ text }: { text: string | string[] }) {
    return (
        <View style={styles.container}>
            <Text style={styles.subTitle}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        marginLeft: 8,
        marginRight: 8
    },
    subTitle: {
        textAlign: 'justify',
        fontWeight: 'bold',
        color: '#A9A9A9'
    }
})