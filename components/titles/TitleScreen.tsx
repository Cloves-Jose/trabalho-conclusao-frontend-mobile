import { View, Text, StyleSheet } from "react-native";

export function TitleScreen({ children }: { children: any }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
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