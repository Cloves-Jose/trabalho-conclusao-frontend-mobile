import { StyleSheet, View } from "react-native";
import FormRegister from "./formRegister/FormRegister";
import { router } from "expo-router";
import { Button, Icon } from "@rneui/themed";

export default function RegisterScreen() {

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View>
                    <Button
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => router.push({ pathname: '/' })}
                        icon={<Icon name="arrow-back" color="#3d72de"/>}
                    />
                </View>
                <View style={{ marginTop: 40 }}>
                    <FormRegister/>
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
    buttonContainer: {
        marginTop: 50,
        marginLeft: 2,
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: 50,
        elevation: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 10

    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containeGoBack: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 10
    }
})