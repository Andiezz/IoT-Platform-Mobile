import { IThreshold, IThingItem, IThingItemUpdate } from "@/api/types";
import React, { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  Controller,
} from "react-hook-form";
import {
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from "react-native-paper";

import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

interface ColorProps {
  hex: string;
}

interface ColorPickerProps {
  color: string | undefined;
  defaultColor: string;
  setColor: (color: string) => void;
  thresholds: IThreshold;
  control: Control<IThingItemUpdate>;
  errors: FieldErrors<IThingItemUpdate>;
  deviceIndex: number;
  paramIndex: number;
  thresholdIndex: number;
  setValue: UseFormSetValue<IThingItemUpdate>;
  getValue: UseFormGetValues<IThingItemUpdate>;
}

export default function CustomizeColorPicker({
  color,
  defaultColor,
  setColor,
  thresholds,
  control,
  errors,
  deviceIndex,
  paramIndex,
  thresholdIndex,
  setValue,
  getValue,
}: ColorPickerProps) {
  const [showModal, setShowModal] = useState(false);

  const onSelectColor = ({ hex }: ColorProps) => {
    setColor(hex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text>Color</Text>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            width: 20,
            height: 20,
            backgroundColor: color ? color : defaultColor,
          }}
        />
        <Text>{color ? color : defaultColor}</Text>
      </View>

      <Modal visible={showModal} animationType="slide">
        <Controller
          name={`devices.${deviceIndex}.parameterStandards.${paramIndex}.thresholds.${thresholdIndex}.color`}
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <View>
              <ColorPicker
                style={{ padding: 20, display: "flex", gap: 10 }}
                value={value?.toString()}
                onComplete={onSelectColor}
                onChange={(v) => onChange(v)}
              >
                <Preview />
                <Panel1 />
                <HueSlider />
                <OpacitySlider />
                <Swatches />
              </ColorPicker>
            </View>
          )}
        />

        <Button title="Ok" onPress={() => setShowModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
