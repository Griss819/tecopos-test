import { useEffect, useState } from 'react';
import { FlatList, Modal, TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import CustomText from "@/components/ui/CustomText";
import {Ionicons} from "@expo/vector-icons";

export const CustomSelect = ({
  options,
  onSelect,
  selected,
  style
}: {
  options: any[];
  onSelect: (item: any) => void;
  selected?: any;
  style?: ViewStyle;
}) => {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selected) setSelectedItem(selected);
  }, []);

  const handleSelect = (item: any) => {
    onSelect(item);
    setSelectedItem(item);
    setVisible(false);
  };

  return (
    <View style={[{display: 'flex'},style]}>
      <TouchableOpacity
        style={[
          {
            minHeight: 50,
            borderWidth: 2,
            borderRadius: 10,
            width: '100%',
            paddingHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderColor:'gray'
          }
        ]}
        onPress={() => setVisible(true)}>
        <CustomText>{selectedItem?.label || 'Selecciona una opción'}</CustomText>
        <Ionicons color={'gray'} icon={'chevron-down'}></Ionicons>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  selector: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
