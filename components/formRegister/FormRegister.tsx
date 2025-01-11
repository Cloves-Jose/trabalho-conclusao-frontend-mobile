import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import { InputForm } from "../formComponents/InputForm";
import { CheckBox } from "../formComponents/CheckBox";
import { useState } from "react";

export function FormRegister () {

    const [checked, setChecked] = useState(false)
    const [noChecked, setNoChecked] = useState(false)

    const checkForm = () => {
        setChecked(true);
        setNoChecked(false)
    }

    const noCheckForm = () => {
        setChecked(false);
        setNoChecked(true)
    }

    return (
        <Formik
            initialValues={{ age: 0 }}
            onSubmit={() => {}}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                    <View style={styles.container_input}>
                        <InputForm
                            placeholder="Digite sua idade"
                            maxLength={2}
                            id="age"
                            onChangeText={handleChange('age')}
                            onBlur={handleBlur('age')}
                            value={values.age}
                            keyboardType={"numeric"}
                            secureTextEntry={false}
                            height={50}
                            width={400}
                        />
                    </View>
                    <View style={styles.container_checkbox}>
                        <Text style={styles.text_checkbox}>Você mora no local da ameaça?</Text>
                        <View style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 250 }}>
                                <View style={styles.container_checkbox_component}>
                                    <CheckBox
                                        checked={checked}
                                        onPress={() => checkForm()}
                                    />
                                    <Text style={{ marginLeft: 10 }}>Sim</Text>
                                </View>
                                <View style={styles.container_checkbox_component}>
                                    <CheckBox
                                        checked={noChecked}
                                        onPress={() => noCheckForm()}
                                    />
                                    <Text style={{ marginLeft: 10 }}>Não</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container_input: {
        alignItems: "center"
    },
    text_checkbox: {
        fontWeight: 'bold',
        color: '#3f3f3f'
    },
    container_checkbox: {
        marginTop: 10,
        marginLeft: 8,
        display: "flex",
        justifyContent: "center",
        // alignItems: "center"
    },
    container_checkbox_component: {
        flexDirection: 'row',
        marginTop: 10,
    }
})