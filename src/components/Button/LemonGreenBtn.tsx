import { Pressable , StyleSheet, Text } from "react-native";
import { theme } from "../../themes";
import PlusIcon from '../../../assets/icons/black_plus.svg';
import { appStyles } from "../../styles";
export const LemonGreenBtn = ({text, icon, onPress, extraStyle={}}: ButtonProps) => {
    return(
        <Pressable style={[styles.contentContainer, appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter]} onPress={onPress}>
            {icon && (
                <PlusIcon />
            )}
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
        borderRadius: 14,
        padding: 14,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.lightGreen300,
        width: 161
  
    },
    text:{
        color: theme.colors.black,
        fontSize: 14,
        fontWeight: '500'
    }
});