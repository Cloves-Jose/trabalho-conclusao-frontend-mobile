import { Pressable, Text, StyleSheet } from "react-native"
export function ButtonForm({ width, height, title, onPressButton }: { width?: number, height?: number, title?: string, onPressButton?: () => void  }) {
    return (
        <Pressable style={({pressed}) => [pressed ? styles.button_style_pressed : styles.button_style, { width: width, height: height }]} onPress={onPressButton}>
            <Text style={styles.button_title}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button_style: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3d72de",
        borderRadius: 5
    },
    button_style_pressed: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5F8575",
        borderRadius: 5
    },
    button_title: {
        color: '#fff',
        fontFamily: 'Montserrat',
        fontSize: 20
    }
})