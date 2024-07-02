import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import  {KeypadButton, CallCancelButton, CallTransparentButton, CallDialButton } from '../KeypadButton';
import Mute from '../../../assets/icons/mute.svg';
import KeyBoard from '../../../assets/icons/keyboard.svg';
import Speaker from '../../../assets/icons/speaker.svg';
import Message from '../../../assets/icons/message.svg';
import Contact from '../../../assets/icons/contact.svg';
import BlackContact from '../../../assets/icons/black_contact.svg';
import PhoneDown from '../../../assets/icons/phone_down.svg';
import BlackPhoneUp from '../../../assets/icons/black_phone_up.svg';
import Audio from '../../../assets/icons/audio.svg';
import ChevronDown from '../../../assets/icons/chevrondown.svg';
import GreyPhoneUp from '../../../assets/icons/grey_phone_up.svg';
import History from '../../../assets/icons/history.svg';
import { appStyles } from '../../styles';

export const DefaultDailPad = ({onKeyBoardPress, onCallEnd, disabled}: DefaultDialPad) => {
    const color = disabled? '#DBDBDB' : '#5E5E5E';
    return(
        <View style={[styles.contentContainer,  appStyles.flex, appStyles.flexCol, appStyles.justifyBetween]}>
            <View>
                <View style={[appStyles.flex, appStyles.flexRow, appStyles.gap32, appStyles.justifyBetween, appStyles.itemsCenter]}>
                    <KeypadButton onPress={undefined}>
                        <Mute style={{color}}/>
                    </KeypadButton>
                    <KeypadButton onPress={onKeyBoardPress}>
                        <KeyBoard style={{color}} />
                    </KeypadButton>
                    <KeypadButton onPress={undefined}>
                        <Speaker style={{color}} />
                    </KeypadButton>
                </View>
                <View style={[appStyles.flex, appStyles.flexRow, appStyles.gap32, appStyles.justifyBetween, appStyles.itemsCenter, {marginTop:24}]}>
                    <KeypadButton onPress={undefined}>
                        <Message style={{color}} />
                    </KeypadButton>
                    
                    <KeypadButton onPress={undefined}>
                        <Contact  style={{color}} />
                    </KeypadButton>
                </View>
            </View>
            <View style={[appStyles.flex1, appStyles.justifyEnd, appStyles.flexCol, appStyles.itemsCenter, {marginBottom:44}]}>
                <CallCancelButton onPress={onCallEnd}>
                    <PhoneDown />
                </CallCancelButton>
                
               
            </View>
            
        </View>
    )
};

export const NumericKeyPad = ({onKeyBoardPress, onKeyPadPress, onCallEnd, disabled, dialpad = false}: NumericKeyPad) => {
    return(
        <View style={[styles.contentContainer,  appStyles.flex, appStyles.flexCol, appStyles.justifyBetween]}>
            <View>
                <View style={[appStyles.flex, appStyles.flexRow, appStyles.gap32, appStyles.justifyBetween, appStyles.itemsCenter]}>
                    <KeypadButton onPress={() => onKeyPadPress(1) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit, {marginLeft: -8}]}> 1</Text>
                            <Audio />
                        </View>
                    </KeypadButton>
                    <KeypadButton onPress={() => onKeyPadPress(2) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit, {marginLeft: -8}]}> 2</Text>
                            <Text style={[styles.numericAlpha]}>ABC</Text>
                        </View>
                    </KeypadButton>
                    <KeypadButton onPress={() => onKeyPadPress(3) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit, {marginLeft: -8}]}> 3</Text>
                            <Text style={[styles.numericAlpha]}>DEF</Text>
                        </View>
                    </KeypadButton>
                </View>
                <View style={[appStyles.flex, appStyles.flexRow, appStyles.gap32, appStyles.justifyBetween, appStyles.itemsCenter, {marginTop: 12}]}>
                    <KeypadButton onPress={() => onKeyPadPress(4) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit]}>4</Text>
                            <Text style={[styles.numericAlpha]}>GHI</Text>
                        </View>
                    </KeypadButton>
                    <KeypadButton onPress={() => onKeyPadPress(5) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit , {marginLeft: -8}]}> 5</Text>
                            <Text style={[styles.numericAlpha]}>JKL</Text>
                        </View>
                    </KeypadButton>
                    <KeypadButton onPress={() => onKeyPadPress(6) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit]}>6</Text>
                            <Text style={[styles.numericAlpha]}>MNO</Text>
                        </View>
                    </KeypadButton>
                </View>
                <View style={[appStyles.flex, appStyles.flexRow, appStyles.gap32, appStyles.justifyBetween, appStyles.itemsCenter, {marginTop: 12}]}>
                    <KeypadButton onPress={() => onKeyPadPress(7) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit]}>7</Text>
                            <Text style={[styles.numericAlpha]}>PQRS</Text>
                        </View>
                    </KeypadButton>
                    <KeypadButton onPress={() => onKeyPadPress(8) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit]}>8</Text>
                            <Text style={[styles.numericAlpha]}>TUV</Text>
                        </View>
                    </KeypadButton>
                    <KeypadButton onPress={() => onKeyPadPress(9) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit]}>9</Text>
                            <Text style={[styles.numericAlpha]}>WXYZ</Text>
                        </View>
                    </KeypadButton>
                </View>
                <View style={[appStyles.flex, appStyles.flexRow, appStyles.gap32, appStyles.justifyBetween, appStyles.itemsCenter, {marginTop: 12}]}>
                    <KeypadButton onPress={() => onKeyPadPress('*') }>
                        <View style={[]}>
                            <Text style={[styles.numericDigit]}>*</Text>
                        </View>
                    </KeypadButton>
                    <KeypadButton onPress={() => onKeyPadPress(0) }>
                        <View style={[appStyles.flexCol, appStyles.itemsCenter, appStyles.justifyCenter]}>
                            <Text style={[styles.numericDigit]}>0</Text>
                            <Text>+</Text>
                        </View>
                    </KeypadButton>
                    <KeypadButton onPress={() => onKeyPadPress('#') }>
                        <View>
                            <Text style={[styles.numericDigit]}>#</Text>
                        </View>
                    </KeypadButton>
                </View>
            </View>
            {dialpad ? (
                <View style={[ appStyles.flex, appStyles.flexRow, appStyles.justifyEnd, appStyles.gap25, appStyles.itemsCenter, {marginBottom:44, marginTop: 12}]}>
                     <CallTransparentButton onPress={onKeyBoardPress}>
                        <View style={[ appStyles.flex, appStyles.flexCol,  appStyles.itemsCenter, {marginLeft: -12} ]}>
                            <History />
                            <Text style={[styles.numericAlpha]}>History</Text>
                        </View>
                    </CallTransparentButton>
                    <CallDialButton onPress={onCallEnd} disabled={disabled}>
                        {disabled? <GreyPhoneUp /> : <BlackPhoneUp />}
                    </CallDialButton>
                    <CallTransparentButton onPress={onKeyBoardPress}>
                        <View style={[ appStyles.flex, appStyles.flexCol,  appStyles.itemsCenter,  {marginRight: -12} ]}>
                            <BlackContact />
                            <Text style={[styles.numericAlpha]}>Contacts</Text>
                        </View>
                    </CallTransparentButton>
                </View>
            ): (
                <View style={[ appStyles.flex, appStyles.flexRow, appStyles.justifyEnd, appStyles.gap25, appStyles.itemsCenter, {marginBottom:44, marginTop: 12}]}>
                    <CallTransparentButton onPress={undefined}/>
                    <CallCancelButton onPress={onCallEnd}>
                        <PhoneDown />
                    </CallCancelButton>
                    <CallTransparentButton onPress={onKeyBoardPress}>
                        <View style={[ appStyles.flex, appStyles.flexCol,  appStyles.itemsCenter ]}>
                            <ChevronDown />
                            <Text style={[styles.numericAlpha]}>Hide</Text>
                        </View>
                    </CallTransparentButton>
                </View>
            )}
            
        </View>
    )
};
const styles = StyleSheet.create({
    contentContainer:{
        paddingHorizontal: 32,
        maxWidth: 335,
        width: '100%',
        margin: 'auto',
        flex: 1
    },
    numericDigit:{
        fontSize: 30,
    },
    numericAlpha:{
        fontSize: 10
    }

});
