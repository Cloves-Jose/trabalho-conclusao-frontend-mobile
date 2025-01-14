import { Formik } from "formik";
import { useContext, useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import LocationContext from "../../../../context/locationContext";
import { SubtitleScreen } from "../../../../components/subtitleScreen/SubtitleScreen";
import { CheckBox, Icon } from "@rneui/themed";
import { ButtonForm } from "../../../../components/buttonForm/ButtonForm";
import ModalDescription from "../modalDescription/ModalDescription";
import { useCameraPermissions } from 'expo-camera'
import { router, useLocalSearchParams } from "expo-router";
import Api from "../../../../services/api";
import { AlertFeedback } from "../../../../components/alertFeedback/AlertFeedback";


export default function FormThreat ({ setActiveCamera, activeCamera, image, auth, pickImage, imageId }: { setActiveCamera: any, activeCamera: any, image: any, auth: any, pickImage: any, imageId: string }) {

    const threat = useLocalSearchParams()

    const location = useContext(LocationContext)

    const [permission, requestPermission] = useCameraPermissions();

    const [checked, setChecked] = useState(false); 
    
    const [modalVisible, setModalVisible] = useState(false);

    const [alertFeedback, setAlertFeedback] = useState(false)


    if (!permission) {
        return
    }

    if (!permission.granted) {
        return (
            <View style={styles.container_permission}>
                <View style={styles.container_text_permission}>
                    <SubtitleScreen text="Você precisa conceder acesso a camera do dispositivo para registrar uma nova ameaça"/>
                </View>
                <ButtonForm onPressButton={requestPermission} title="Permitir" height={50} width={400}/>
            </View>
        )
    }

    const onSubmitThreat = async (data: any) => {
        const headers = {
            "Content-Type": "application/json; charset=utf-8"
        }
        
        await Api.post('/call', data, { headers })
        .then((response) => {
            if (response.status == 201) {
                setAlertFeedback(true)
            }
        }).catch((e) => {
            console.error(e)
        })
    }

    const goBack = () => {
        setAlertFeedback(false)
        router.push({ pathname: '/(app)/home' })
    }

    return (
        <Formik
            initialValues={{ description: "" }}
            onSubmit={async (values) => {

                const body = {
                    threat_id: threat.id,
                    longitude: location?.location?.coords?.longitude != undefined ? location?.location?.coords?.longitude.toString() : "0",
                    latitude: location?.location?.coords?.latitude != undefined ? location?.location?.coords?.latitude.toString() : "0",
                    resides_in_location: checked,
                    description: values.description,
                    image_id: imageId,
                    municipality_id: auth.session.municipality_id
                }

                await onSubmitThreat(body)

            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <AlertFeedback modalVisible={alertFeedback} text="Chamado registrado!" goBack={goBack}/>
                    <ModalDescription modalVisible={modalVisible} setModalVisible={setModalVisible} handleChange={handleChange} handleBlur={handleBlur} values={values}/>
                    <View>
                        <SubtitleScreen text='Informações sobre a ameaça'/>
                        <CheckBox
                            title='Você reside no local da ameaça?'
                            checkedIcon={"dot-circle-o"}
                            uncheckedIcon={"circle-o"}
                            checked={checked}
                            onPress={() => setChecked(!checked)}
                        />
                    </View>
                    <View>
                        <SubtitleScreen text="Faça uma breve descrição sobre a ameaça (opcional)"/>
                        <View style={styles.container_description}>
                            <ButtonForm title="Descrição" height={48} width={400} onPressButton={() => setModalVisible(!modalVisible)}/>
                        </View>
                    </View>
                    <View style={styles.container_camera}>
                        <SubtitleScreen text="Adicionar foto do ameaça"/>
                        <View style={styles.container_camera_container}>
                            <Pressable style={styles.container_camera_button} onPress={() => pickImage()}>
                                <View style={styles.container_button}>
                                    <Icon name="add-a-photo"/>
                                </View>
                            </Pressable>
                            <View>
                                <SubtitleScreen text="Pressione no ícone da camera para"/>
                                <SubtitleScreen text="adicionar uma foto"/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container_image}>
                        {image != undefined 
                            ?
                                image && <Image source={{ uri: image }} style={{ width: 350, height: 300, borderRadius: 5 }}/>
                            :
                                <View style={{ width: 350, height: 300 }}>

                                </View>
                        }
                    </View>
                    <View style={styles.container_button_submit}>
                        <ButtonForm title="Enviar" height={50} width={400} onPressButton={handleSubmit}/>
                    </View>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container_description: {
        marginTop: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_camera: {
        marginTop: 5
    },
    container_camera_button: {
        height: 100,
        marginLeft: 5,
        marginTop: 8
    },
    container_button: {
        backgroundColor: '#B2BEB5',
        height: 100,
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    container_camera_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container_image: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    container_button_submit: {
        // marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_permission: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_text_permission: {
        marginBottom: 20
    }

})