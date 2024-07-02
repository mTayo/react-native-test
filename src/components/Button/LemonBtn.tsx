import { Pressable , StyleSheet, Text } from "react-native";
import { theme } from "../../themes";
import { appStyles } from "../../styles";

export const LemonBtn = ({text, icon, onPress, extraStyle={}}: ButtonProps) => {
    return(
        <Pressable style={[styles.contentContainer, appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter, extraStyle]} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
};
const styles = StyleSheet.create({
    contentContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 6,
        paddingHorizontal: 14,
        backgroundColor: theme.colors.lightGreen300,
    },
    text:{
        color: theme.colors.black,
        fontSize: 14,
        fontWeight: '500'
    }
});