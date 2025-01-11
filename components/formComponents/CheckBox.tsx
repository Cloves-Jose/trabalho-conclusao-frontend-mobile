import { Pressable, StyleSheet } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import { View } from "react-native";


export function CheckBox({ checked, onPress }: { checked: boolean, onPress: () => void }) {
    return (
        <Pressable
            role="checkbox"
            aria-checked={checked}
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={onPress}
        >
            {checked && <Octicons name="dot-fill" size={24} color="#f3f3f3" />} 
        </Pressable>
    )
}

const styles = StyleSheet.create({
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#3d72de',
        backgroundColor: 'transparent'
    },
    checkboxChecked: {
        backgroundColor: '#3d72de'
    }
})