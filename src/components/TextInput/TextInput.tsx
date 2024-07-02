import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { theme } from '../../themes';
import { appStyles } from '../../styles';

  const AppTextInput = (props: TextInputProps) => {
    const {
        styleProps ={},
        keyboardType= "default", 
        placeholder= "input", 
        onChange, 
        value, 
        errorMessage,
        showErrorMessage,
        name
    } = props;
    return(
        <View style={[appStyles.flex, appStyles.flexRow, appStyles.justifyBetween, appStyles.itemsCenter, styles.input, styleProps]}>
            <TextInput
                style={[styles.textWidth, appStyles.fontSizeNormal, appStyles.flexGrow]}
                onChangeText={(e) => onChange(e, name)}
                value={value}
                placeholder={placeholder}
                // @ts-ignore
                keyboardType={keyboardType}
            />
            <View>
                <Text>{value?.length || 0}/50</Text>
            </View>
            
        </View>
    )
};

export default AppTextInput;

const styles = StyleSheet.create({
    contentContainer:{
        backgroundColor: theme.colors.grey100,
        padding:4,
        borderRadius:8
    },
    
    input: {
        height: 52,
        padding: 10,
        borderRadius: 16,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.whiteColor,
        borderColor: theme.colors.grey300,
        borderWidth: 1
      },
      textWidth:{
        maxWidth: '77%',
        width: '100%'
      },
      borderBottom:{
        borderBottomColor: '#F2F4F7',
        borderBottomWidth: 1
      }
});


