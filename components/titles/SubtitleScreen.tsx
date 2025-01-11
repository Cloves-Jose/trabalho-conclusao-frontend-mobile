import { View, Text, StyleSheet } from "react-native";

export function SubtitleScreen({ children }: { children: any }) {
    return (
        <View style={styles.container}>
            <Text style={styles.subTitle}>{children}</Text>
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