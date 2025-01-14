import { Platform, StyleSheet, Text, View } from "react-native";
import { TitleScreen } from "../../../components/titleScreen/TitleScreen";
import { SubtitleScreen } from "../../../components/subtitleScreen/SubtitleScreen";
import { useLocalSearchParams } from "expo-router";
import FormThreat from "./formThreat/FormThreat";
import { useContext, useState } from "react";
import AuthContext from "../../../context/authContext";
import * as ImagePicker from 'expo-image-picker';
import Api from "../../../services/api";

export default function Threat() {

    const threat = useLocalSearchParams()

    const auth = useContext(AuthContext)

    const [activeCamera, setActiveCamera] = useState(false);
    const [image, setImage] = useState<string | null>(null)
    const [imageId, setImageId] = useState<string>('')

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images', 'videos'],
            quality: 1
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
            createFormData(result.assets[0], auth)
        }
    }

    const createFormData = (image: any, auth: any) => {
        const formData = new FormData();
        formData.append('municipality_id', auth.session.municipality_id)

        formData.append('file', {
            uri: image.uri, // URI da imagem retornada pela câmera
            name: image.fileName, // Nome do arquivo
            type: image.mimeType, // Tipo MIME (ex: 'image/jpeg')
        } as unknown as Blob);
        
        putImage(formData)
    }

    const putImage = async (data: any) => {
        await Api.put('/image/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
            setImageId(response.data.id)
        })
        .catch((error) => {
            console.warn(error)
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.containerText}>
                    <TitleScreen text="Registrar ameaça"/>
                    <SubtitleScreen text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."/>
                </View>
                <View style={styles.typeContainer}>
                    <Text style={styles.typeSubtitle}>Tipo de ameaça:</Text>
                    <SubtitleScreen text={threat.title}/>
                </View>
                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                </View>
                <View>
                    <FormThreat setActiveCamera={setActiveCamera} activeCamera={activeCamera} image={image} auth={auth} pickImage={pickImage} imageId={imageId}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    containerText: {
        marginTop: 10
    },
    typeContainer: {
        marginTop: '2%',
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