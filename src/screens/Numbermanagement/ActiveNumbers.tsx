import React, {useEffect, useReducer, useState} from 'react';
import { StyleSheet, Text, View, Platform} from 'react-native';
import { theme } from '../../themes';
import { appStyles } from '../../styles';
import USflag from '../../../assets/icons/usflag.svg';
import Vector from '../../../assets/icons/vector.svg';
import WhiteChevronRight from '../../../assets/icons/white_chevron_right.svg';
import BlackChevronRight from '../../../assets/icons/black_chevron_right.svg';
import WhiteDots from '../../../assets/icons/white_dots.svg';
import { APP_CONSTANTS } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../components/DropDown';
import AlertModal from '../../components/AlertModal';
import { isNotEmptyArray } from '../../libs';
import { LemonGreenBtn } from '../../components/Button';


const ActiveNumbers = ({navigation}: any) => {
    const dispatch = useDispatch();
    const defaultNumber = useSelector((state: any) => state?.defaultNumber);
    const allNumbersActivated = useSelector((state: any) => state?.allNumbersActivated);
    const initialState = {
        showDefaultModal: false,
        currentItemId: null
    };
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
    const { showDefaultModal, currentItemId } = state;

    const toggleDefaultModal = (itemIndex= null) => {
        setTimeout(() =>  setState({
            showDefaultModal: !showDefaultModal,
            currentItemId: itemIndex
        }), Platform.OS === "ios" ? 200 : 0); 
        
    };

    const setAsDefault = () => {
       const numberArray = [...allNumbersActivated];
       let newDefault = {};
        for (let index = 0; index < numberArray.length; index++) {
            const element = numberArray[index];
            
            if(element.id === currentItemId){
                element.default = true;
                newDefault = element;
            }else{
                element.default = false;
            }
        };
        dispatch({type: APP_CONSTANTS.DEFAULT_SELECTION, payload: numberArray});
        dispatch({type: APP_CONSTANTS.UPDATE_DEFAULT, payload: newDefault});
        setTimeout(() =>  setState({
            showDefaultModal: !showDefaultModal
        }), Platform.OS === "ios" ? 200 : 0); 
    };

    useEffect(() => {
  
    }, [showDefaultModal]);

    const settings = (numberId: number) => {
        const number = allNumbersActivated.find((num: any, _i: number)=> num.id === numberId );
        dispatch({type: APP_CONSTANTS.SELECT_NUMBER, payload: number});
        navigation.navigate('NumberSettingsScreen');
    };
    const nonDefaultDropdownItems = [
        {
            label: 'Set as default number',
            action: toggleDefaultModal
        },
        {
            label: 'Settings',
            action: settings
        }
    ];
    const defaultDropdownItems = [
        {
            label: 'Settings',
            action: settings
        }
    ];
  
  return (
    <View style={[ appStyles.flex1, appStyles.flexGrow]}>
        {isNotEmptyArray(allNumbersActivated)? (
            <>
                 <View style={styles.defaultCard}>
                    <View style={[appStyles.flexRow, appStyles.justifyBetween, appStyles.itemsCenter, styles.borderBottom]}>
                        <View>
                            <Text style={[appStyles.whiteColor]}>{defaultNumber?.label}</Text>
                            <View style={[appStyles.flexRow, appStyles.gap8, {marginTop: 4}]}>
                                <USflag /> 
                                <Text style={[appStyles.whiteColor]}>{defaultNumber?.number}</Text>
                            </View>
                        </View>
                        <WhiteChevronRight />
                    </View>
                    <View style={[appStyles.flexRow, appStyles.justifyBetween, appStyles.itemsCenter, {paddingTop: 16}]}>
                        <View style={[appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter]}>
                            <View style={[styles.defaultBadge]}>
                                <Text>Call  35 mins</Text>
                            </View>
                            <View style={[styles.defaultBadge]}>
                                <Text>SMS  54</Text>
                            </View>
                        </View>
                        <WhiteDots />
                    </View>
                </View>
                {allNumbersActivated.map((number: any, _i:number) => (
                    <View style={[styles.card, {marginTop: 16}]} key={_i}>
                    <View style={[appStyles.flexRow, appStyles.justifyBetween, appStyles.itemsCenter, styles.cardBorderBottom]}>
                        <View>
                            <Text style={[appStyles.colorBlack]}>{number?.label}</Text>
                            <View style={[appStyles.flexRow, appStyles.gap8, {marginTop: 4}]}>
                                <USflag /> 
                                <Text style={[appStyles.colorBlack]}>{number?.number}</Text>
                            </View>
                        </View>
                        <BlackChevronRight />
                    </View>
                    <View style={[appStyles.flexRow, appStyles.justifyBetween, appStyles.itemsCenter, {paddingTop: 16}]}>
                        <View style={[appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter]}>
                            {number.default && (
                                <View style={[styles.cardDefaultBadge]}>
                                    <Text style={appStyles.whiteColor}>Default</Text>
                                </View>
                            )}
                            <View style={[styles.cardBadge]}>
                                <Text>Call  35 mins</Text>
                            </View>
                            <View style={[styles.cardBadge]}>
                                <Text>SMS  54</Text>
                            </View>
                        </View>
                        <Dropdown id={number.id} items={number?.default? defaultDropdownItems : nonDefaultDropdownItems}/>
                    </View>
                </View>
                ))}
                {showDefaultModal && (
                    <AlertModal 
                        header="Set this number as default?" 
                        message="This number (+1 2058502276) will be used as your preferred number for calls and texts." 
                        showModal={showDefaultModal}
                        toggleModal={toggleDefaultModal}
                        action={setAsDefault}
                    />
                )}
            </>
        ): (
            <View style={[appStyles.flexCol, appStyles.flex1, appStyles.flexGrow, appStyles.justifyCenter]}>
                <View style={[{margin: 'auto'}, appStyles.flexCol, appStyles.gap21]}>
                    <View  style={[appStyles.flexRow, appStyles.justifyCenter]}>
                        <Vector /> 
                    </View>
                    <Text style={styles.alertMsg}>No activated numbers yet</Text>
                    <LemonGreenBtn onPress={undefined} icon text='Get a Number' />
                </View> 
            </View>
        )}
       
    </View>
  );
};

const styles = StyleSheet.create({
    contentContainer:{
        paddingTop:14,
        height: '100%',
        backgroundColor: theme.colors.whiteColor,
        flex: 1
    },
    defaultCard:{
        backgroundColor: theme.colors.grey800,
        borderRadius: 14,
        padding: 18
    },
    card:{
        backgroundColor: theme.colors.grey50,
        borderColor: theme.colors.grey100,
        borderWidth: 1,
        borderRadius: 14,
        padding: 18
    },
    cardBorderBottom: {
        borderBottomColor: theme.colors.grey200,
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    borderBottom:{
        borderBottomColor: '#4F4F4F',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    defaultBadge:{
        backgroundColor: theme.colors.grey50,
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8
    },
    cardBadge:{
        backgroundColor: theme.colors.grey100,
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8
    },
    cardDefaultBadge: {
        backgroundColor: theme.colors.grey800,
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8
    },
    alertMsg:{
        color: theme.colors.grey400,
        fontSize: 16
    }
});

export default ActiveNumbers;