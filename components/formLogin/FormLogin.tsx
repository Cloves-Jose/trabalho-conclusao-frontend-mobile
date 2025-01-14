import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup'
import { TextForm } from "../textForm/TextForm";
import { InputForm } from "../inputForm/InputForm";
import { TextWarning } from "../textWarning/TextWarning";
import { ButtonForm } from "../buttonForm/ButtonForm";
import { useSession } from "../../hooks/useSession";
import { useEffect } from "react";
import { router } from 'expo-router'

export default function FormLogin() {

    const { signIn, session } = useSession()

    useEffect(() => {
        if (session) {
            router.replace('/(app)/home')
        }
    }, [session])

    const validateForm = Yup.object().shape({
        email: Yup.string().required('Preencha este campo')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'E-mail inválido'),
        password: Yup.string().required('Preencha este campo')
    })

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationScheme={validateForm}
            onSubmit={async (values) => {
                const body = {
                    email: values.email,
                    password: values.password
                }

                await signIn(body)
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.container}>
                    <View style={styles.container_input}>
                        <TextForm text="E-mail"/>
                        <InputForm
                            width={360}
                            height={50}
                            id="email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Seu e-mail"
                        />
                        {errors.email &&
                            <View style={styles.container_warning}>
                                <TextWarning text={errors.email}/>
                            </View>
                        }
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
                            placeholder="Sua senha"
                            secureTextEntry={true}
                        />
                        {errors.password &&
                            <View style={styles.container_warning}>
                                <TextWarning text={errors.password}/>
                            </View>
                        }
                    </View>
                    <View style={styles.container_button}>
                        <ButtonForm
                            width={360}
                            height={50}
                            title="Entrar"
                            onPressButton={handleSubmit}
                        />
                    </View>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 290,
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
    container_warning: {
        marginTop: 4
    },
    container_button: {
        marginTop: 5
    }
})