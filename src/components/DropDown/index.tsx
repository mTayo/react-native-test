import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { FlatList, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BlackDots from '../../../assets/icons/black_dots.svg';
import { theme } from '../../themes';

const Dropdown = ({items, id}: any) => {

  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef();
 const [dropdownTop, setDropdownTop] = useState(0);    
 const [dropdownRight, setDropdownRight] = useState(0);  

const openDropdown = (): void => {
    // @ts-ignore
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
      setDropdownRight(_px - 160);
    });
    setVisible(!visible);
  };

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent  animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop, left: dropdownRight }]}>
               {items.map((item: any, _i:number) => (
                    <Pressable 
                        onPress={()=> {
                            setVisible(!visible);
                            setTimeout(() => item.action(id), Platform.OS === "ios" ? 100 : 0); 
                        }} 
                        key={_i}
                    >
                       <Text style={styles.dropdownItem}>{item.label}</Text>
                     </Pressable>
                ))}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => openDropdown()}
    //   @ts-ignore
      ref={DropdownButton}
    >
      {renderDropdown()}
      <BlackDots />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {

  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {

    backgroundColor: theme.colors.whiteColor,
    width: 'auto',
    maxWidth: 196,
    paddingVertical: 8,
    borderColor: theme.colors.grey200,
    borderWidth: 1,
    borderRadius: 14
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 6
  },
  overlay: {
    flex: 1
  }
});

export default Dropdown;
