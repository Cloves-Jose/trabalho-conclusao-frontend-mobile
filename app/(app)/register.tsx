import { StyleSheet, Text, View } from "react-native";
import { TitleScreen } from "../../components/titles/TitleScreen";
import { SubtitleScreen } from "../../components/titles/SubtitleScreen";
import { useLocalSearchParams } from "expo-router";
import { FormRegister } from "../../components/formRegister/FormRegister";

export default function Register() {

    const description = useLocalSearchParams()

    return (
        <View style={styles.container}>
            <View>
                <TitleScreen>Registrar ameaça</TitleScreen>
                <SubtitleScreen>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</SubtitleScreen>
            </View>
            <View style={styles.typeContainer}>
                <Text style={styles.typeSubtitle}>Tipo de ameaça:</Text>
                <SubtitleScreen>{description.title}</SubtitleScreen>
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
            </View>
            <View style={styles.info}>
                <Text style={styles.subTitle}>Informações pessoais</Text>
            </View>
            <View>
                <FormRegister/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1
    },
    typeContainer: {
        marginTop: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "2%"
    },
    typeSubtitle: {
        fontWeight: "bold",
        color: "black"
    },
    lineContainer: {
        alignItems: "center",
        marginTop: "2.5%",
        marginBottom: "2.5%"
    },
    line: {
        borderBottomColor: "#A9A9A9",
        borderWidth: 0.2,
        width: "98%"
    },
    info: {
        marginTop: "2%",
        marginLeft: "2%"
    },
    subTitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#3d72de",
        marginBottom: 10
    }
})