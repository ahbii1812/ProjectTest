import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  COLORS,
  DEFAULT_SPACING,
  FIELD_HEIGHT,
  SHADOW_STYLE,
} from '../theme/theme';
import AppText from './AppText';

interface Item {
  label: string;
  value: string;
}

interface Props {
  value: string;
  setValue: (i: string) => void;
  itemList: Item[];
  placeholder?: string;
}

export default function DropdownPicker({
  value,
  setValue,
  itemList,
  placeholder,
}: Props) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        placeholder={placeholder}
        placeholderStyle={{ fontSize: 14 }}
        renderItem={(item, selected) => (
          <View
            style={{
              backgroundColor: selected ? '#00B4E4' : '#F8F8F8',
              padding: DEFAULT_SPACING,
            }}
          >
            <AppText variant={selected ? 'Picker-Selected' : null}>
              {item.label}
            </AppText>
          </View>
        )}
        style={[styles.dropdown]}
        itemContainerStyle={{
          marginVertical: DEFAULT_SPACING - 5,
        }}
        containerStyle={{
          marginTop: -7,
          padding: DEFAULT_SPACING,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={itemList}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? 'blue' : 'black'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    ...SHADOW_STYLE,
    borderRadius: 8,
  },
  dropdown: {
    height: FIELD_HEIGHT,
    borderColor: '#E3E3E3',
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },

  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
