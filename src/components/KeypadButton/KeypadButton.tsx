import React from 'react';
import { StyleSheet,  Pressable} from 'react-native';
import { theme } from '../../themes';

 export const KeypadButton = ({children, onPress}: KeypadButtonProps) => {
    return(
        <Pressable style={styles.contentContainer} onPress={onPress}>
            {children}
        </Pressable>
    )
};

export const CallCancelButton = ({children, onPress}: KeypadButtonProps) => {
    return(
        <Pressable style={[styles.contentContainer, styles.cancelButton]} onPress={onPress}>
            {children}
        </Pressable>
    )
};

export const CallDialButton = ({children, onPress, disabled}: KeypadButtonProps) => {
    return(
        <Pressable style={[styles.contentContainer, disabled? styles.disabledLemonGreenButton : styles.lemonGreenButton]} onPress={onPress}>
            {children}
        </Pressable>
    )
};

export const CallPickButton = ({children, onPress}: KeypadButtonProps) => {
    return(
        <Pressable style={[styles.contentContainer, styles.greenButton]} onPress={onPress}>
            {children}
        </Pressable>
    )
};

export const CallTransparentButton = ({children, onPress}: KeypadButtonProps) => {
    return(
        <Pressable style={[styles.contentContainer, styles.transparentButton]} onPress={onPress}>
            {children}
        </Pressable>
    )
};

const styles = StyleSheet.create({
    contentContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        minHeight: 72,
        maxHeight: 72,
        minWidth: 72,
        maxWidth: 72,
        width: '100%',
        borderRadius: 88,
        backgroundColor: theme.colors.grey100,
        flex: 1
    },
    cancelButton: {
       backgroundColor: '#FD3C2E',
       shadowColor: '#fd3c2e99',
       elevation:15,
       shadowOffset: {width: -2, height: 4},
       shadowOpacity: 0.2,
       shadowRadius: 3,
    },
    greenButton: {
        backgroundColor: '#33D059',
        shadowColor: '#33d05999',
        elevation:15,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
     },
     lemonGreenButton: {
        backgroundColor: '#B9FF66',
        shadowColor: '#B9FF66',
        elevation:15,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
     },
     disabledLemonGreenButton: {
        backgroundColor: '#E9FFC7',
        shadowColor: '#E9FFC7',
        elevation:15,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
     },
    transparentButton: {
        backgroundColor: theme.colors.whiteColor,
    }
});


