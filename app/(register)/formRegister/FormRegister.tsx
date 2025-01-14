import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { TextForm } from "../../../components/textForm/TextForm";
import { InputForm } from "../../../components/inputForm/InputForm";
import {Picker} from '@react-native-picker/picker';
import { ButtonForm } from "../../../components/buttonForm/ButtonForm";
import Api from "../../../services/api";
import { useEffect, useState } from "react";
import MaskInput, { Masks } from 'react-native-mask-input'
import { router } from "expo-router";
import { AlertFeedback } from "../../../components/alertFeedback/AlertFeedback";

export default function FormRegister() {

    const [municipality, setMunicipality] = useState<Array<[]>>([])
    const [date, setDate] = useState('')
    const [alertFeedback, setAlertFeedback] = useState(false)

    useEffect(() => {
        listMunicipality()
    }, [])

    const listMunicipality = async () => {
        await Api.get('/municipality')
            .then((response) => {
                setMunicipality(response.data)
            })
            .catch((error) => {

            })
    }

    const onSubmitMunicipality = async (data: {name: string, email: string, gender: string, municipality_id: string, birth_date: string, password: string}) => {
        const headers = {
            "Content-Type": "application/json; charset=utf-8"
        }
        await Api.post('/municipality', {
            name: data.name,
            email: data.email,
            gender: data.gender,
            municipality_id: data.municipality_id,
            birth_date: data.birth_date,
            password: data.password
        }, { headers })
                .then((response) => {
                    if (response.status == 201) {
                        setAlertFeedback(true)
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
    }

    const goBack = () => {
        setAlertFeedback(false)
        router.push({ pathname: '/' })
    }

    return (
        <View>
            <AlertFeedback modalVisible={alertFeedback} text="Cadastro realizado!" goBack={goBack}/>
            <Formik
                initialValues={{ name: '', gender: '', email: '', municipality_id: '', password: ''}}
                onSubmit={(value) => {
                    
                    const data = {
                        name: value.name,
                        gender: value.gender,
                        birth_date: date,
                        email: value.email,
                        password: value.password,
                        municipality_id: value.municipality_id
                    }

                    console.warn({data})

                    onSubmitMunicipality(data)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.container}>
                        <View style={styles.container_input}>
                            <TextForm text="Nome"/>
                            <InputForm
                                width={360}
                                height={50}
                                id="name"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                placeholder="Nome"
                            />
                        </View>
                        <View style={styles.container_input}>
                            <TextForm text="Gênero"/>
                            <Picker
                                selectedValue={values.gender}
                                onValueChange={handleChange('gender')}
                                onBlur={handleBlur('gender')}
                                style={styles.container_picker}
                            >
                                <Picker.Item label="Masculino" value="M"/>
                                <Picker.Item label="Feminino" value="F"/>
                                <Picker.Item label="Outros" value="N/A"/>
                            </Picker>
                        </View>
                        <View style={styles.container_input}>
                            <TextForm text="Data de nascimento"/>
                            <MaskInput
                                id="date"
                                style={styles.container_date_mask}
                                value={date}
                                onChangeText={(masked, unmasked) => {
                                    setDate(masked)
                                }}
                                mask={Masks.DATE_DDMMYYYY}
                                
                            />
                        </View>
                        <View style={styles.container_input}>
                            <Picker
                                selectedValue={values.municipality_id}
                                onValueChange={handleChange('municipality_id')}
                                onBlur={handleBlur('municipality_id')}
                                style={styles.container_picker}
                            >
                                {municipality.map((item: any, index) => {
                                    return <Picker.Item key={index} label={item.municipality_name} value={item.id}/>
                                })}
                            </Picker>
                        </View>
                        <View style={styles.container_input}>
                            <TextForm text="E-mail"/>
                            <InputForm
                                width={360}
                                height={50}
                                id="email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder="E-mail"
                            />
                        </View>
                        <View style={styles.container_input}>
                            <TextForm text="Senha"/>
                            <InputForm
                                width={360}
                                height={50}
                                id="password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder="Senha"
                                secureTextEntry={true}
                            />
                        </View>
                        <View>
                            <ButtonForm
                                width={360}
                                height={50}
                                title="Cadastrar"
                                onPressButton={handleSubmit}
                            />
                        </View>
                    </View>
                )}

            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 550,
        width: 385,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 20
    },
    container_input: {
        marginTop: 4,
        marginBottom: 10
    },
    container_date_mask: {
        width: 360,
        height: 50,
        borderWidth: 0.5,
        borderRadius: 5,
        paddingLeft: 10,
        borderColor: '#5F5F5F'
    },
    container_picker: {
        height: 50,
        width: 360,
        borderWidth: 0.5,
        borderColor: '#5F5F5F',
        borderRadius: 5,
        paddingLeft: 15
    }
})