import React, { useReducer } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, Dimensions} from 'react-native';
import { theme } from '../../themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyles } from '../../styles';
import ChevronLeft from '../../../assets/icons/chevronleft.svg';
import ButtondarkPlus from '../../../assets/icons/buttondark_plus.svg';
import Tabs from '../../components/Tabs';
import ActiveNumbers from './ActiveNumbers';
import ExpiredNumbers from './ExpiredNumbers';
import { useDispatch, useSelector } from 'react-redux';
import { APP_CONSTANTS } from '../../../constants';

const windowHeight = Dimensions.get('window').height;
    const NumbermanagementScreen = ({navigation}: any) => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state: any) => state?.currentTab);
    const initialState = {
        activeTab: currentTab
    };
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
    const {activeTab} = state;

   const switchTabView = (tabNumber: number) => {
        setState({
            activeTab: tabNumber
        });
        dispatch({type: APP_CONSTANTS.CHANGE_NUMBER_MANAGEMENT_TAB, payload: tabNumber})
    };

    const renderTabItem = () => {
        switch (activeTab) {
            case 1:
               return <ExpiredNumbers  navigation={navigation} />
        
            default:
                return <ActiveNumbers navigation={navigation} />
        }
    };

    const tabChildren = [
        {
            label: 'Activated',
            action: () => {switchTabView(0)}
        },
        {
            label: 'Expired',
            action: () => {switchTabView(1)}
        }
    ];

    return (
        <ScrollView style={[styles.contentContainer, {minHeight: windowHeight}]}>
            <SafeAreaView style={[appStyles.flex1, {minHeight: windowHeight}]}>
                <View>
                    <View style={[appStyles.flex, appStyles.flexRow, appStyles.gap12, appStyles.justifyBetween, appStyles.itemsCenter]}>
                        <Pressable onPress={()=> navigation.navigate('DialPadScreen')} style={[appStyles.flex, appStyles.flexRow, appStyles.gap12, appStyles.itemsCenter]}>
                            <ChevronLeft />
                            <Text>Select main number</Text>
                        </Pressable>
                        <ButtondarkPlus />
                    </View> 
                    <View style={{marginTop: 16}}>
                        <Tabs tabChildren={tabChildren} activeTab={activeTab} />
                    </View>
                </View>
                <View style={[{marginTop: 18}, appStyles.flexGrow]}>
                    {renderTabItem()}
                </View>
                <View>

                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer:{
        paddingTop:14,
        paddingHorizontal:18,
        height: '100%',
        backgroundColor: theme.colors.whiteColor,
        flex: 1
    },
    stateText:{
       marginBottom: 20, 
       marginTop: 20,
       color: theme.colors.grey400,
       fontSize: 16
    }
});

export default NumbermanagementScreen;