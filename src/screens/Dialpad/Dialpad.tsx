import React, {useEffect, useReducer, useState} from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, Platform} from 'react-native';
import { theme } from '../../themes';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NumericKeyPad } from '../../components/DialPad';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PhoneUp from '../../../assets/icons/phoneup.svg';
import UsFlag from '../../../assets/icons/usflag.svg';
import ChevronDown from '../../../assets/icons/chevrondown.svg';
import ChevronRight from '../../../assets/icons/black_chevron_right.svg';
import BackSpace from '../../../assets/icons/backspace.svg';
import HomeIcon from '../../../assets/icons/home.svg';
import MessageIcon from '../../../assets/icons/tabs/message.svg';
import KeyboardIcon from '../../../assets/icons/tabs/keyboard.svg';
import CallIcon from '../../../assets/icons/tabs/call.svg';
import ContactIcon from '../../../assets/icons/tabs/contact.svg';
import WhitePlusIcon from '../../../assets/icons/white_plus_btn.svg';
import DiamondIcon from '../../../assets/icons/black_diamond.svg';
import { appStyles } from '../../styles';
import PhoneNumber from 'libphonenumber-js';
import WarningModal from '../../components/WarningModal';
import { APP_CONSTANTS } from '../../../constants';
import { isObjectEmpty, truncateMultilineText } from '../../libs';
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

const DialpadScreen = ({navigation}: any ) => {
    const dispatch = useDispatch();
    const defaultNumber = useSelector((state: any) => state?.defaultNumber);
    const allNumbersActivated = useSelector((state: any) => state?.allNumbersActivated);
    const initialState = {
        phoneNumber: '',
        showAlertModal: false
    };
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
    const { phoneNumber, showAlertModal } = state;
    const onKeyPadPress = (number: number) => {
        if(phoneNumber.length < 13){
            setState({
                phoneNumber: !phoneNumber? `+1-${number}` : phoneNumber + String(number)
            });
        };
    };
    const removeLastCharacter = () => {
       let str = phoneNumber;
       str = str.slice(0, -1);
        setState({
            phoneNumber: str
        });
    };
    const toggleAlertModal = () => {
        setState({
            showAlertModal: !showAlertModal
        });
    };

    const addNumberToList = () => {
        const newArray = [...allNumbersActivated];
        newArray.push({
            number: `+1-${phoneNumber}`,
            label: '',
            default: false,
            activated: true,
            id: newArray.length + 1
        });
        dispatch({type:APP_CONSTANTS.DEFAULT_SELECTION, payload: newArray});
    };

    const validatePhoneNumber = () => {
        try {
          const number: any = PhoneNumber(phoneNumber, 'US');
          if (number.isValid()) {
            addNumberToList();
          } else {
            toggleAlertModal()
          }
        } catch (e) {
            toggleAlertModal()
        }
    };

    const handleCall = () => {
        if(!isObjectEmpty(defaultNumber) || !defaultNumber?.hasCredit){
            navigation.navigate('OutgoingCallScreen');
        }
    }; 

    useEffect(() => {
        setState({
            phoneNumber: defaultNumber?.number
        })
    }, [defaultNumber]);
  
    return (
        <ScrollView style={styles.contentContainer}>
            <SafeAreaView  style={{paddingHorizontal: 0}}>
                {!isObjectEmpty(defaultNumber)? (
                     <View  style={[appStyles.flexRow, appStyles.itemsCenter, appStyles.justifyBetween, {paddingHorizontal: 20}]}>
                        <View  style={[appStyles.flexRow, appStyles.gap6]}>
                            <UsFlag width={24}/>
                            <View style={[]}>
                                {defaultNumber?.label && (
                                    <Text>{truncateMultilineText(defaultNumber?.label, 31)}</Text>
                                )}
                                <Text style={{fontSize: 12, color: theme.colors.grey600}}>{defaultNumber?.number}</Text> 
                            </View>
                            <ChevronDown width={20} />
                        </View>
                        <Pressable 
                            onPress={() => navigation.navigate('NumberManagementScreen')} 
                            style={[ styles.whiteBtn]}
                        >
                            <WhitePlusIcon width={20} /> 
                        </Pressable>
                    </View> 
                ): (
                    <View  style={[appStyles.flexRow, appStyles.justifyEnd, , {paddingHorizontal: 20}]}>
                        <Pressable 
                            onPress={() => navigation.navigate('NumberManagementScreen')} 
                            style={[styles.getANumber, appStyles.flexRow, appStyles.gap8, appStyles.justifyCenter, appStyles.itemsCenter ]}
                        >
                            <PhoneUp width={20} /> 
                            <Text style={[appStyles.whiteColor]}>Get a Number</Text>
                        </Pressable>
                    </View> 
                )}
                {!defaultNumber?.hasCredit &&(
                    <View style={{paddingHorizontal: 20}}>
                        <Pressable 
                            onPress={() => navigation.navigate('NumberManagementScreen')} 
                            style={[styles.topUpMenu, appStyles.flexRow, appStyles.gap8, appStyles.justifyBetween, appStyles.itemsCenter ]}
                        >
                            <View style={[appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter]}>
                                <DiamondIcon width={20} /> 
                                <Text style={[appStyles.colorBlack, appStyles.font500]}>Balance: 0 CR.</Text>
                            </View>
                            <View style={[appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter]}>
                                <Text style={[appStyles.colorBlack, appStyles.font500]}>Top up</Text>
                                <ChevronRight width={20} /> 
                            </View>
                        </Pressable>
                    </View>
                )}
               
                <View style={[{marginTop: 24, marginBottom: 8, paddingHorizontal: 20}, appStyles.flexRow, appStyles.itemsCenter, appStyles.justifyBetween]}>
                    <View style={[appStyles.flexRow, appStyles.gap4, appStyles.itemsCenter, styles.flagContainer]}>
                        <UsFlag />
                        <ChevronDown />
                    </View>
                    <View style={[{marginLeft: 8}]}>
                        <Text style={styles.phoneInput}>{phoneNumber}</Text>
                    </View>
                    <Pressable onPress={()=>removeLastCharacter()}>
                        <BackSpace />
                    </Pressable>
                    
                </View>
                <Pressable onPress={()=> validatePhoneNumber()}>
                    {!isObjectEmpty(defaultNumber)? (
                        <Text style={[appStyles.textCenter, {color: theme.colors.grey800}]}>{truncateMultilineText(defaultNumber?.label, 51)}</Text>
                    ):(
                        <Text style={[appStyles.textCenter, {color: theme.colors.lightGreen600}]}>Add to contacts</Text>
                    )}
                </Pressable>
                <Text style={[appStyles.textCenter, {color: theme.colors.grey500, marginVertical: 8}]}>$0.01/min</Text>
                <View style={[{marginTop: 67}, styles.numericContainer]}>
                    <NumericKeyPad  
                        onKeyPadPress ={onKeyPadPress} 
                        dialpad  
                        disabled={isObjectEmpty(defaultNumber) || !defaultNumber?.hasCredit} 
                        onCallEnd={() => handleCall()}
                    />
                </View>
                
            </SafeAreaView>
            {showAlertModal && (
                <WarningModal
                    header="Invalid Number" 
                    message="The number you have entered is invalid. Please check the number and try again." 
                    showModal={showAlertModal}
                    toggleModal={toggleAlertModal}
                    action={undefined}
                />
            )}
        </ScrollView>
    );
};


const Tab = createBottomTabNavigator();


//Screen names
const homeScreen = "Home";
const messageScreen = "Message";
const keypadScreen = "Keypad";
const callScreen = "Call";
const contactScreen = "Contacts";

function DialTabs() {
  return (
    <Tab.Navigator
    initialRouteName={keypadScreen}
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.tabContainer,
        ],
        tabBarItemStyle: {
          marginBottom: 7
        },
        tabBarInactiveTintColor: '#A5A5A5',
        tabBarActiveTintColor: '#232323',
        tabBarIcon: ({ focused, color, size }) => {
            let rn = route.name;
            if (rn === homeScreen) {
                return (
                    <View> 
                        <HomeIcon />
                    </View>
                )

            } else if (rn === messageScreen) {
                return (
                    <View> 
                        <MessageIcon />
                    </View>
                )

            } else if (rn === keypadScreen) {
                return (
                    <View> 
                        <KeyboardIcon />
                    </View>
                )
            }else if (rn === callScreen) {
                return (
                    <View> 
                        <CallIcon />
                    </View>
                )
            }else if (rn === contactScreen) {
                return (
                    <View> 
                        <ContactIcon />
                    </View>
                )
            }

          },
      })}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <Tab.Screen name="Home"  component={DialpadScreen} />
      <Tab.Screen name="Message"  component={DialpadScreen} />
      <Tab.Screen name="Keypad"  component={DialpadScreen} />
      <Tab.Screen name="Call"  component={DialpadScreen} />
      <Tab.Screen name="Contacts" component={DialpadScreen} />
    </Tab.Navigator>
  );
}

export default DialTabs;

const styles = StyleSheet.create({
    contentContainer:{
        backgroundColor: theme.colors.whiteColor,
        flex: 1
    },
    getANumber: {
        backgroundColor: theme.colors.grey800,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        width: 150
    },
    flagContainer:{
        borderColor: theme.colors.grey300,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    phoneInput: {
        fontSize: 24,
        fontWeight: '500'
    },
    label:{
        fontSize: 10,
        fontWeight: '400',
    },
    activeLabel:{
        fontSize: 10,
        fontWeight: '400',
    },
    tabContainer:{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: 'white', 
        height : Platform.OS === 'ios' ? 86 : 70,
        paddingTop: Platform.OS === 'ios' ? 8 : 0,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        // marginTop: Platform.OS === 'ios' ? 0 : 20,
        borderTopWidth: 1,
        borderTopColor: '#fff'
    },
    numericContainer:{
        marginBottom: Platform.OS === 'ios' ? 0 : 50,
    },
    whiteBtn:{
        borderColor: theme.colors.grey300,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 8
    },
    topUpMenu:{
        backgroundColor: theme.colors.lightGreen300,
        marginTop: 11,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14
    }
});