import { StyleSheet, Text } from "react-native";
import { Modal, View } from "react-native";
import { ButtonForm } from "../buttonForm/ButtonForm";

export function AlertFeedback({ modalVisible, goBack, text }: { modalVisible: boolean, goBack: () => void, text: string }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => goBack()}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                    <View style={{ padding: 30 }}>
                        <Text style={{ fontSize: 20, color: '#A9A9A9' }}>{text}</Text>
                    </View>
                    <ButtonForm title="Ok" height={50} width={360} onPressButton={() => goBack()}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 380,
        height: 170,
        justifyContent: 'center',
    }

})