import { View, StyleSheet, Modal } from "react-native";
import { ButtonForm } from "../../../../components/buttonForm/ButtonForm";
import { InputForm } from "../../../../components/inputForm/InputForm";
import { SubtitleScreen } from "../../../../components/subtitleScreen/SubtitleScreen";

export default function ModalDescription({ modalVisible, setModalVisible, handleChange, handleBlur, values }: { modalVisible: boolean, setModalVisible: any, handleChange: any, handleBlur: any, values: any }) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                    <View style={styles.containerInput}>
                        <SubtitleScreen text={`${values.description.length == "" ? 0 : values.description.length}/100`}/>
                        <InputForm
                            width={360}
                            height={50}
                            id="description"
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            placeholder="Descrição"
                            maxLength={100}
                        />
                    </View>
                    <ButtonForm title="Ok" height={50} width={360} onPressButton={() => setModalVisible(!modalVisible)}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInput: {
        marginBottom: 15
    }
})