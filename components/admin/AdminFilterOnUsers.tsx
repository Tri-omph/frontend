import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import FilterWithSingleOption from "@/components/filters/FilterWithSingleOption";
import FilterWithMultipleOptions from "@/components/filters/FilterWithMultipleOptions";
import { UserFilter, UserStatusEnum } from "@/types/userEnums";
import { adminFilteringType } from "@/hooks/useAdminActions";

interface FilterProps {
  isVisible: boolean;
  onClose: () => void;
  applyFilter: (filters: adminFilteringType) => void;
}

const AdminFilterOnUsers: React.FC<FilterProps> = ({
  isVisible,
  onClose,
  applyFilter,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<null | string>(null);
  const [borneMin, setBorneMin] = useState<null | string>(null);
  const [borneMax, setBorneMax] = useState<null | string>(null);

  const data = Object.entries(UserStatusEnum).map(([key, value], index) => ({
    key: (index + 1).toString(),
    value: value,
  }));

  const order = Object.entries(UserFilter).map(([key, value], index) => ({
    key: (index + 1).toString(),
    value: value,
  }));

  const handleValidate = () => {
    applyFilter({
      status: selected.length > 0 ? selected : [UserStatusEnum.TOUS],
      minPoints: borneMin ? Number(borneMin) : 0,
      maxPoints: borneMax ? Number(borneMax) : null,
      order: selectedOrder,
    });

    onClose(); // Fermer le bottomsheet
  };

  // Gestion de l'ouverture/fermeture du bottom sheet
  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1} // Fermé initialement
      snapPoints={["40%", "70%"]} // Points d'accroche
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      onClose={onClose}
      style={{ borderRadius: 20, overflow: "hidden" }}
      handleIndicatorStyle={{
        width: 100,
        backgroundColor: "#ccc",
      }}
    >
      <View style={styles.filterContainer}>
        <Text style={styles.title}>Appliquer vos filtres</Text>

        {/* Section: Statut des utilisateurs */}
        <FilterWithMultipleOptions
          filterTitle="Filtrer selon le statut"
          filterLabel="Statut"
          selected={selected}
          setSelected={setSelected}
          data={data}
        />

        {/* Section: Ordre */}
        <FilterWithSingleOption
          filterTitle="Afficher selon l'ordre suivant"
          selected={selectedOrder}
          setSelected={setSelectedOrder}
          data={order}
        />

        {/* Section: Bornes */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>
            Borne sur les nombres de points
          </Text>
          <View style={styles.borneContainer}>
            <TextInput
              style={styles.borneInput}
              placeholder="Borne min."
              keyboardType="numeric"
              onChangeText={setBorneMin}
            />
            <TextInput
              style={styles.borneInput}
              placeholder="Borne max."
              keyboardType="numeric"
              onChangeText={setBorneMax}
            />
          </View>
        </View>

        {/* Bouton Valider */}
        <TouchableOpacity
          style={styles.validateButton}
          onPress={handleValidate}
        >
          <Text style={styles.validateText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  statusOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  borneContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  borneInput: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  validateButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  validateText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AdminFilterOnUsers;
