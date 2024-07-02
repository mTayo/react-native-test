import React, { useEffect, useReducer } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { theme } from '../../../themes';
import AppTextInput from '../../../components/TextInput/TextInput';

const EditLabelModal = ({header, message, showModal, toggleModal, action, selectedNumber}: any) => {
    const initialState = {
        formData: {
            label: ''
        },
        errors:{}
    };
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
    const { formData } = state;

    const handleInputChange =  (e: string| null, name: string): void => {
        // @ts-ignore
        if((e.length <= 50) || (e.length < formData?.label?.length)){
            setState({
                formData:{
                    ...formData,
                    [name]: e
                }
            });
         }
    };

    useEffect(()=> {
        setState({
            formData: {
                ...formData,
                label: selectedNumber?.label
            }
        });
    }, []);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeader}>{header}</Text>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={{marginBottom:24}}>
                        <AppTextInput 
                            placeholder="Enter"
                            onChange={handleInputChange}
                            value={formData?.label}
                            name="label"
                            errorMessage={''}
                            showErrorMessage={false}
                        />
                    </View>
                    <Pressable
                        style={[styles.greenBtn]}
                        onPress={() => action(formData?.label)}
                    >
                        <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose, {marginTop: 8}]}
                        onPress={() => toggleModal()}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    maxWidth: 320,
    width: '100%',
    borderRadius: 20,
    padding: 24,
    backgroundColor: theme.colors.whiteColor,
    // alignItems: 'center',
    borderColor: theme.colors.grey200,
    borderWidth: 1
  },
  button: {
    borderRadius: 8,
    width: '100%',
    padding: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    // elevation: 2,
    borderWidth: 1,
    borderColor: theme.colors.grey300
  },
  greenBtn:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 14,
    color: theme.colors.black,
    backgroundColor: theme.colors.lightGreen300,
    width: '100%'

    },
  buttonOpen: {},
  buttonClose: {
    backgroundColor: theme.colors.whiteColor,
  },
  textStyle: {
    color: theme.colors.grey600,
    fontWeight: '500',
    textAlign: 'left',
  },
  modalHeader:{
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 16,
    marginTop: 8,
    textAlign: 'left',
  },
});

export default EditLabelModal;