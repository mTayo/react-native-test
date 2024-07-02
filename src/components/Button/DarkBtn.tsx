import { Pressable , StyleSheet, Text } from "react-native";
import { theme } from "../../themes";
import { appStyles } from "../../styles";
export const DarkBtn = ({text,  onPress, extraStyle={}}: ButtonProps) => {
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
        backgroundColor: theme.colors.grey800,
  
    },
    text:{
        color: theme.colors.whiteColor,
        fontSize: 14,
        fontWeight: '500'
    }
});