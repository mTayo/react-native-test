import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView} from 'react-native';
import { theme } from '../../themes';
import { appStyles } from '../../styles';

  const Tabs = ({tabChildren, activeTab}: any) => {
    return(
        <View style={[styles.contentContainer, appStyles.flexRow, appStyles.gap8, appStyles.itemsCenter]}>
           {tabChildren.map((tab: any, _i:number)=> (
             <Pressable style={activeTab === _i? styles.activeTab : styles.tab} onPress={tab.action} key={_i}>
               <Text style={[appStyles.textCenter, styles.tabLabel]}>{tab.label}</Text>
             </Pressable>
           ))}
        </View>
    )
};

export default Tabs;

const styles = StyleSheet.create({
    contentContainer:{
        backgroundColor: theme.colors.grey100,
        padding:4,
        borderRadius:8
    },
    activeTab:{
        padding: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: theme.colors.whiteColor,
        flexGrow: 1,
    },
    tab: {
        padding: 16,
        paddingTop: 8,
        paddingBottom: 8,
        flexGrow: 1
    },
    tabLabel:{
        fontSize: 14,
        fontWeight: 500
    }
});


