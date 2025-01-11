import { ImageBackground, StyleSheet, Text, View, Pressable } from "react-native";
import { BACKEND_URL, HOST_URL } from "../../constants/backend_url";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Icon } from "@rneui/themed";
import { TitleScreen } from "../../components/titles/TitleScreen";

export default function Description() {

    const threat = useLocalSearchParams()

    const _replaceUrlImage = (url: string | any) => {
        const parts = url.split(HOST_URL)
        return parts.join(BACKEND_URL);
    }

    const _formRegister = () => {
        router.push({ pathname: '/register', params: { id: threat.id, title: threat.title }})
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{uri: _replaceUrlImage(threat?.image) }}
                resizeMode="cover"
                style={styles.image}
            >
                <Button
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => router.push({ pathname: '/' })}
                    icon={<Icon name="arrow-back" color="#3d72de"/>}
                />
                <View style={styles.bottomSheet}>
                    <View>
                        <TitleScreen>{threat.title}</TitleScreen>
                    </View>
                    <View style={styles.containerSubTitle}>
                        <Text style={styles.subTitleText}>{threat.description}</Text>
                    </View>
                    <View style={{ alignItems: "center", height: 50, justifyContent: "center", width: "100%" }}>
                        <Button
                            title={'Registrar ameaça'}
                            buttonStyle={styles.bottomButton}
                            onPress={() => _formRegister()}
                        />
                    </View>
                </View>
                
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        flex: 1,
        // justifyContent: "center"
    },
    buttonContainer: {
        marginTop: '2%',
        marginLeft: '2%',
        width: '10%'
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderRadius: 50
    },
    bottomButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        height: 40
    },
    bottomButton: {
        width: 300,
        borderRadius: 10
    },
    bottomSheet: {
        height: '60%',
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginTop: '50%'
    },
    containerSubTitle: {
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTitleText: {
        textAlign: 'justify',
        fontWeight: 'bold',
        color: "#A9A9A9",
        fontSize: 18
    }
})