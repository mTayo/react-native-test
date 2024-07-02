import React, {useEffect, useReducer, useState} from 'react';
import { StyleSheet, Text, View, Platform} from 'react-native';
import { theme } from '../../themes';
import { appStyles } from '../../styles';
import USflag from '../../../assets/icons/usflag.svg';
import { APP_CONSTANTS } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../../components/DropDown';
import Vector from '../../../assets/icons/vector.svg';
import { isNotEmptyArray } from '../../libs';

const ExpiredNumbers = ({navigation}: any) => {
    const dispatch = useDispatch();
    const  allNumbersExpired = useSelector((state: any) => state?.allNumbersExpired);
    const initialState = {
        showDefaultModal: false,
        currentItemId: null
    };
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
    const { showDefaultModal } = state;

    useEffect(() => {
  
    }, [showDefaultModal]);

    const settings = (numberId: number) => {
        const number = allNumbersExpired.find((num: any, _i: number)=> num.id === numberId );
        dispatch({type: APP_CONSTANTS.SELECT_NUMBER, payload: number});
        navigation.navigate('NumberSettingsScreen');
    };

    const dropdownItems = [
        {
            label: 'Settings',
            action: settings
        }
    ];
  
  return (
    <View style={[ appStyles.flex1, appStyles.flexGrow]}>
        {isNotEmptyArray(allNumbersExpired)? (
            <>
            {allNumbersExpired.map((number: any, _i:number) => (
                <View style={[styles.card, {marginTop: 16}]} key={_i}>
                <View style={[appStyles.flexRow, appStyles.justifyBetween, appStyles.itemsCenter]}>
                    <View>
                        <Text style={[appStyles.colorBlack]}>{number?.label}</Text>
                        <View style={[appStyles.flexRow, appStyles.gap8, {marginTop: 4}]}>
                            <USflag /> 
                            <Text style={[appStyles.colorBlack]}>{number?.number}</Text>
                        </View>
                    </View>
                    <Dropdown id={number.id} items={dropdownItems}/>
                </View>
            
            </View>
            ))}
            </>
        ):(
        <View style={[appStyles.flexCol, appStyles.flex1, appStyles.flexGrow, appStyles.justifyCenter]}>
                <View style={[{margin: 'auto'}, appStyles.flexCol, appStyles.gap21]}>
                    <View  style={[appStyles.flexRow, appStyles.justifyCenter]}>
                        <Vector /> 
                    </View>
                    <Text style={styles.alertMsg}>No expired numbers</Text>
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

export default ExpiredNumbers;