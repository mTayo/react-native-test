import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Platform} from 'react-native';
import { theme } from '../../themes';

const AlertModal = ({header, message, showModal, toggleModal, action}: AlertModalProps) => {
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
                    <Pressable
                        style={[styles.greenBtn]}
                        onPress={() => action()}
                    >
                        <Text style={styles.textStyle}>Confirm</Text>
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
    alignItems: 'center',
    borderColor: theme.colors.grey200,
    borderWidth: 1
  },
  button: {
    borderRadius: 8,
    width: '100%',
    padding: 14,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeader:{
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: '500'
  },
  modalText: {
    marginBottom: 24,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default AlertModal;