import React, {useReducer} from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, Dimensions, Image, Platform } from 'react-native';
import { theme } from '../../themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyles } from '../../styles';
import CloseIcon from '../../../assets/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { truncateMultilineText } from '../../libs';
import UsFlag from '../../../assets/icons/usflag.svg';
import { DarkBtn } from '../../components/Button/DarkBtn';
import { WhiteBtn } from '../../components/Button/WhiteBtn';
import EditLabelModal from './EditLabelModal';
import { APP_CONSTANTS } from '../../../constants';
import { LemonBtn } from '../../components/Button/LemonBtn';

const windowHeight = Dimensions.get('window').height;
const NumberSettingsScreen = ({navigation}: any) => {
    const dispatch = useDispatch();
    const selectedNumber = useSelector((state: any) => state?.selectedNumberData);
    const allNumbers  = useSelector((state: any) => state?.allNumbers);
    const initialState = {
        showEditModal: false
    };
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
    const { showEditModal } = state;

    const toggleEditModal = () => {
        setTimeout(() =>  setState({
            showEditModal: !showEditModal
        }), Platform.OS === "ios" ? 200 : 0); 
    };
    const determineTextColor = () => {
        return selectedNumber?.activated? {} : {color: theme.colors.red600}
    };
    const updateLabel = (label: string) => {
        let newNumber = {
            ...selectedNumber,
            label: label
        };
        let newNumbers = [...allNumbers];
        dispatch({
            type: APP_CONSTANTS.SELECT_NUMBER, 
            payload: newNumber
        });
        for (let index = 0; index < newNumbers.length; index++) {
            const element = newNumbers[index];
            if(element.id === newNumber.id){
                element.label = newNumber.label;
            }
        }
        dispatch({
            type: APP_CONSTANTS.UPDATE_LIST_OF_ALL_NUMBERS, 
            payload: newNumbers
        });
        toggleEditModal();
    
    };

    const renewNumber = () => {
        let newNumber = {
            ...selectedNumber,
            activated: !selectedNumber.activated
        };
        let newNumbers = [...allNumbers];
        dispatch({
            type: APP_CONSTANTS.SELECT_NUMBER, 
            payload: newNumber
        });
        for (let index = 0; index < newNumbers.length; index++) {
            const element = newNumbers[index];
            if(element.id === newNumber.id){
                element.activated = newNumber.activated;
            }
        }
        dispatch({
            type: APP_CONSTANTS.UPDATE_LIST_OF_ALL_NUMBERS, 
            payload: newNumbers
        });
        navigation.navigate('NumberManagementScreen');
    };

    const renderActiveCard = () => {
        return(
            <View style={[styles.activeCardContainer]}>
                <View >
                    <Image source={require('../../../assets/images/active_number_spiral.png')} style={styles.backgroundImg} />
                </View>
                <Text style={[appStyles.font400, appStyles.fontSizeXS, appStyles.colorBlack, {marginTop: 20}]}>{truncateMultilineText(selectedNumber?.label, 30)}</Text>
                <Text style={[appStyles.font500, appStyles.fontSizeXL, appStyles.colorBlack, {marginTop: 10}]}>{selectedNumber?.number}</Text>
                <View style={[appStyles.flexRow, appStyles.itemsCenter, appStyles.gap8, {marginTop: 10}]}>
                <View style={[styles.whiteBadges, appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter]}>
                        <UsFlag/>
                        <Text style={styles.badgeText}>United States</Text>
                </View>
                <View style={styles.whiteBadges}>
                        <Text style={styles.badgeText}>Calls</Text>
                </View>
                <View style={styles.whiteBadges}>
                        <Text style={styles.badgeText}>SMS</Text>
                </View>
                </View>
            </View>
        )
    };
    const renderInActiveCard = () => {
        return(
            <View style={[styles.inactiveCardContainer]}>
                <View >
                    <Image source={require('../../../assets/images/inactive_spiral.png')} style={styles.backgroundImg} />
                </View>
                <Text style={[appStyles.font400, appStyles.fontSizeXS, appStyles.colorBlack, {marginTop: 20}]}>{truncateMultilineText(selectedNumber?.label, 30)}</Text>
                <Text style={[appStyles.font500, appStyles.fontSizeXL, appStyles.colorBlack, {marginTop: 10}]}>{selectedNumber?.number}</Text>
                <View style={[appStyles.flexRow, appStyles.itemsCenter, appStyles.gap8, {marginTop: 10}]}>
                <View style={[styles.whiteBadges, appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter]}>
                        <UsFlag/>
                        <Text style={styles.badgeText}>United States</Text>
                </View>
                <View style={styles.whiteBadges}>
                        <Text style={styles.badgeText}>Calls</Text>
                </View>
                <View style={styles.whiteBadges}>
                        <Text style={styles.badgeText}>SMS</Text>
                </View>
                </View>
            </View>
        )
    };
  return (
    <ScrollView style={[styles.contentContainer, {minHeight: windowHeight}]}>
        <SafeAreaView style={[appStyles.flex1, {minHeight: windowHeight}]}>
             <View style={[ {paddingLeft: 18, paddingRight: 18}]}>
                <Pressable onPress={() => navigation.navigate('NumberManagementScreen')} style={[appStyles.flex, appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter, {marginBottom:32}]}>
                    <CloseIcon />
                    <Text style={[appStyles.font400, appStyles.colorBlack, appStyles.fontSize18, appStyles.font500]}>Number Settings</Text>
                </Pressable>
            
            </View> 
            <View style={{paddingHorizontal: 18}}>
                {selectedNumber?.activated?  renderActiveCard() : renderInActiveCard()}
                <View style={[
                        appStyles.flexRow, 
                        appStyles.justifyBetween, 
                        appStyles.itemsCenter, 
                        {paddingTop: 18, paddingBottom: 20, borderBottomColor: theme.colors.grey200, borderBottomWidth: 1}
                ]}>
                    <View>
                        <Text style={[styles.cardDarkText, determineTextColor()]}>Valid until</Text>
                        <Text style={[styles.cardGreyText, {marginTop: 4, }, determineTextColor()]}>Aug 12, 2024</Text>
                    </View>
                    <View>
                        {selectedNumber?.activated?(
                            <DarkBtn text="Renew" onPress={()=> renewNumber()} />
                        ): (
                            <LemonBtn text="Renew" onPress={()=> renewNumber()} />
                        )}
                        
                    </View>
                </View>

                <View style={[
                        appStyles.flexRow, 
                        appStyles.justifyBetween, 
                        appStyles.itemsCenter, 
                        {paddingTop: 18, paddingBottom: 20}
                ]}>
                    <View>
                        <Text style={styles.cardDarkText}>Label</Text>
                        <Text style={[styles.cardGreyText, {marginTop: 4}]}>{truncateMultilineText(selectedNumber?.label || '-', 45)}</Text>
                    </View>
                    <View>
                        <WhiteBtn text="Edit" onPress= {toggleEditModal} />
                    </View>
                </View>
            </View>
            {showEditModal && (
            <EditLabelModal 
                header="Edit labels for your number" 
                message="Enter your desired label or description for the number." 
                showModal={showEditModal}
                selectedNumber={selectedNumber}
                toggleModal={toggleEditModal}
                action={updateLabel}
            />
        )}
            
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
    activeCardContainer:{
        backgroundColor: theme.colors.lightGreen300,
        borderRadius: 20,
        padding: 18
    },
    inactiveCardContainer:{
        backgroundColor: theme.colors.grey100,
        borderRadius: 20,
        padding: 18
    },
    backgroundImg:{
        position: "absolute",
        top: -15,
        left: -5,
        right: 0,
        resizeMode: 'cover'
    },
    whiteBadges:{
        paddingHorizontal:8,
        paddingVertical: 4,
        backgroundColor: theme.colors.grey50,
        borderRadius: 8,
        minHeight: 30
    },
    badgeText: {
        fontSize: 14,
        color: theme.colors.grey500,
        margin: 'auto'
    },
    cardDarkText: {
        fontSize: 14,
        color: theme.colors.black,
        fontWeight: '500'
    },
    cardGreyText: {
        fontSize: 12,
        color: theme.colors.grey600,
        fontWeight: '500'
    }
});

export default NumberSettingsScreen;