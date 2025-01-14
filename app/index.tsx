import { StyleSheet, View, Text, Pressable } from "react-native";
import FormLogin from "../components/formLogin/FormLogin";
import { useRouter } from 'expo-router'

export default function AuthenticationScreen() {

    const router = useRouter()

    return (
        <View style={styles.container}>
            <View style={styles.form_container}>
                <FormLogin/>
                <View style={styles.container_register}>
                    <Pressable
                        onPress={() => router.replace('/(register)/register')}
                    >
                        <Text style={styles.register_text}>Cadastre-se</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    container_register: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    form_container: {
        marginTop: 15
    },
    register_text: {
        fontSize: 20,
        fontWeight: 600,
        color: '#3d72de'
    }
})