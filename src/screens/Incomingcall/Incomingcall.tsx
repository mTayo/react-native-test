import React, { useReducer} from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, Dimensions} from 'react-native';
import { theme } from '../../themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyles } from '../../styles';
import CallerAvatar from '../../../assets/icons/caller_avatar.svg';
import PhoneDown from '../../../assets/icons/phone_down.svg';
import PhoneUp from '../../../assets/icons/phoneup.svg';
import { APP_CONSTANTS } from '../../../constants';
import { CallCancelButton, CallPickButton } from '../../components/KeypadButton';

const windowHeight = Dimensions.get('window').height;
const IncomingCallScreen = ({navigation}: any) => {

    const initialState = {
        callState: APP_CONSTANTS.IS_CALLING
    };
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
    const {callState} = state;
    const onCallEnd = () => {
        setState({
            callState: APP_CONSTANTS.CALL_ENDED
        });
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
                statement = 'Call end';
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
                    <CallerAvatar />
                    <Text style={[{marginTop: 12}, appStyles.colorBlack, appStyles.fontSizeNormal]}>{renderCallStatus()}</Text>
                    <Text style={[{marginTop: 4}, appStyles.colorBlack, appStyles.fontSizeXL, appStyles.font500 ]}>+1-2059276258</Text>
                    <Text style={[{marginTop: 4}, appStyles.colorBlack, appStyles.fontSizeSmall]}>Houston, TX</Text>
                </View>
            </View> 
            <View style={[appStyles.flexGrow, appStyles.justifyEnd, appStyles.flexCol, appStyles.itemsCenter, {marginBottom:44}]}>
                <View style={[ appStyles.flexRow, appStyles.gap35, appStyles.w_full, appStyles.justifyAround]}>
                    <CallCancelButton onPress={onCallEnd}>
                        <PhoneDown />
                    </CallCancelButton>
                    <CallPickButton onPress={onCallEnd}>
                        <PhoneUp />
                    </CallPickButton>
                    
                </View>
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

export default IncomingCallScreen;