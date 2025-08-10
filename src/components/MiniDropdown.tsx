import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, DEFAULT_SPACING } from '../theme/theme';
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

export default function MiniDropdown({
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
          <View style={{ padding: DEFAULT_SPACING }}>
            <AppText style={{ color: selected ? '#00B4E4' : '#000000' }}>
              {item.label}
            </AppText>
          </View>
        )}
        style={[styles.dropdown]}
        itemContainerStyle={{}}
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
        iconColor={COLORS.theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 130,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 0,
  },
  dropdown: {
    borderColor: COLORS.theme,
    borderBottomWidth: 2,
    height: 35,
  },
  icon: {
    marginRight: 5,
  },

  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.theme,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
