import { useLocalSearchParams, router } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";
import { BACKEND_URL } from "../../constants/backend_url";
import { Button, Icon } from "@rneui/themed";
import { TitleScreen } from "../../components/titleScreen/TitleScreen";
import { SubtitleScreen } from "../../components/subtitleScreen/SubtitleScreen";
import { ButtonForm } from "../../components/buttonForm/ButtonForm";

export default function Description() {

    const threat = useLocalSearchParams()

    const _replaceUrlImage = (url: string | any) => {
        const parts = url.split('http://localhost:3001')
        return parts.join(BACKEND_URL)
    }

    const _formRegisterThreat = () => {
        router.push({ pathname: '/(app)/threat/threat', params: { id: threat.id, title: threat.title } })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: _replaceUrlImage(threat?.image) }}
                resizeMode="cover"
                style={styles.image}
            >
                <Button
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    onPress={() => router.push({ pathname: '/(app)/home' })}
                    icon={<Icon name="arrow-back" color="#3d72de"/>}
                />
                <View style={styles.bottomSheet}>
                    <View>
                        <TitleScreen text={threat.title}/>
                    </View>
                    <View style={styles.containrSubTitle}>
                        <SubtitleScreen text={threat.description}/>
                    </View>
                    <View style={styles.containerButton}>
                        <ButtonForm title="Registrar ameaça" height={50} width={400} onPressButton={() => _formRegisterThreat()}/>
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
        flex: 1
    },
    buttonContainer: {
        marginTop: '10%',
        marginLeft: '2%',
        width: '10%',
        elevation: 20,
        borderRadius: 50
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderRadius: 50
    },
    bottomSheet: {
        height: '70%',
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginTop: '50%'
    },
    containrSubTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerButton: {
        alignItems: 'center',
        height: 150,
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 30,
    }
})