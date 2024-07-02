import React, { useReducer} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import { theme } from '../../themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyles } from '../../styles';
import DefaultAvatar from '../../../assets/icons/default_avatar.svg';
import { APP_CONSTANTS } from '../../../constants';
import { DefaultDailPad, NumericKeyPad } from '../../components/DialPad';

const windowHeight = Dimensions.get('window').height;
const OutgoingCallScreen = ({navigation}: any) => {
    const initialState = {
        callState: APP_CONSTANTS.IS_CALLING,
        keyboardType:APP_CONSTANTS.DEFAULT,
    };
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
    const {callState, keyboardType} = state;

    const changeToNumericKeyBoard = () => {
        setState({
            keyboardType: keyboardType === APP_CONSTANTS.DEFAULT? APP_CONSTANTS.NUMERIC : APP_CONSTANTS.DEFAULT
        })
    };
    const onCallEnd = () => {
        setState({
            callState: APP_CONSTANTS.CALL_ENDED
        });
        setTimeout(()=> {
            navigation.navigate('DialPadScreen')
        }, 200)
    };
    const renderCallStatus = () => {
        let statement = '';
        switch (callState) {
            case APP_CONSTANTS.IS_CALLING:
                statement = 'Calling..';
                break;
            case APP_CONSTANTS.CALL_ACTIVE:
                statement = '00:05';
            break;
            case APP_CONSTANTS.CALL_ENDED:
                statement = 'Call ended';
            break;
            default:
                statement = 'Calling..';
                break;
        }
        return statement;
    };
  return (
    <ScrollView style={[styles.contentContainer, {minHeight: windowHeight}]}>
        <SafeAreaView style={[appStyles.flex1, {minHeight: windowHeight}]}>
             <View style={[ {paddingLeft: 18, paddingRight: 18}]}>
                <View style={[appStyles.flex, appStyles.flexRow, appStyles.justifyBetween, appStyles.itemsCenter, {marginBottom:32}]}>
                    <Text style={[appStyles.font500, appStyles.colorBlack]}>Calling from WhatsApp</Text>
                    
                    <Text style={[appStyles.font400, appStyles.colorGrey600]}>+1-2059276258</Text>
                </View>
                <View style={[appStyles.flex, appStyles.flexCol, appStyles.justifyCenter, appStyles.itemsCenter, {marginBottom:44}]}>
                    <DefaultAvatar />
                    <Text style={[{marginTop: 12}, appStyles.colorBlack, appStyles.fontSizeNormal]}>{renderCallStatus()}</Text>
                    <Text style={[{marginTop: 4}, appStyles.colorBlack, appStyles.fontSizeXL, appStyles.font500 ]}>+1-2059276258</Text>
                    <Text style={[{marginTop: 4}, appStyles.colorBlack, appStyles.fontSizeSmall]}>Houston, TX</Text>
                </View>
            </View> 
            <View  style={[appStyles.flexGrow]}>
               {keyboardType === APP_CONSTANTS.DEFAULT? (
                    <DefaultDailPad  onKeyBoardPress={() => changeToNumericKeyBoard()} onCallEnd={() => onCallEnd()} disabled={callState === APP_CONSTANTS.CALL_ENDED}/>
                    ):(
                    <NumericKeyPad onKeyBoardPress={() => changeToNumericKeyBoard()} onCallEnd={() => onCallEnd()} disabled={callState === APP_CONSTANTS.CALL_ENDED}/>
                )}
            </View>
        </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    contentContainer:{
        paddingTop:14,
        height: '100%',
        backgroundColor: theme.colors.whiteColor,
        flex: 1
    },
});

export default OutgoingCallScreen;