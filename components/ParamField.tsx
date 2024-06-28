import React, { useEffect, useState } from "react";
import { Card, Text, TextInput } from "react-native-paper";
import CustomizeColorPicker from "./ColorPicker";
import { IParameterStandardModel, IThingItem, IThingItemUpdate, IThreshold } from "@/api/types";
import { StyleSheet, View } from "react-native";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

interface ParamFieldProps {
  thresholds: IThreshold;
  control: Control<IThingItemUpdate>;
  errors: FieldErrors<IThingItemUpdate>;
  deviceIndex: number;
  paramIndex: number;
  thresholdIndex: number;
  setValue: UseFormSetValue<IThingItemUpdate>;
  getValue: UseFormGetValues<IThingItemUpdate>;
}

const ParamField = ({
  thresholds,
  control,
  errors,
  deviceIndex,
  paramIndex,
  thresholdIndex,
  setValue,
  getValue,
}: ParamFieldProps) => {
  const [color, setColor] = useState<string>(thresholds.color);

  return (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.paramInput}>
        <Controller
          name={`devices.${deviceIndex}.parameterStandards.${paramIndex}.thresholds.${thresholdIndex}.name`}
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, value, onBlur } }) => (
            <View>
              <TextInput
                mode="outlined"
                value={value}
                label="Name"
                placeholder="Type something"
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
              />
              {errors?.devices?.[deviceIndex]?.parameterStandards?.[paramIndex]
                ?.thresholds?.[thresholdIndex]?.name && (
                <Text style={styles.errorText}>
                  {
                    errors?.devices?.[deviceIndex]?.parameterStandards?.[paramIndex]
                      ?.thresholds?.[thresholdIndex]?.name?.message
                  }
                </Text>
              )}
            </View>
          )}
        />
        <CustomizeColorPicker
          defaultColor={thresholds.color}
          color={color}
          setColor={setColor}
          control={control}
          errors={errors}
          thresholds={thresholds}
          deviceIndex={Number(deviceIndex)}
          paramIndex={Number(paramIndex)}
          thresholdIndex={thresholdIndex}
          setValue={setValue}
          getValue={getValue}
        />
        <Controller
          name={`devices.${deviceIndex}.parameterStandards.${paramIndex}.thresholds.${thresholdIndex}.min`}
          control={control}
          rules={{ required: "Min is required" }}
          render={({ field: { onChange, value, onBlur } }) => (
            <View>
              <TextInput
                mode="outlined"
                value={value?.toString()}
                label="Min"
                placeholder="Type something"
                onBlur={onBlur}
                onChangeText={(v) => onChange(Number(v))}
              />
              {errors?.devices?.[deviceIndex]?.parameterStandards?.[paramIndex]
                ?.thresholds?.[thresholdIndex]?.min && (
                <Text style={styles.errorText}>
                  {
                    errors?.devices?.[deviceIndex]?.parameterStandards?.[paramIndex]
                    ?.thresholds?.[thresholdIndex]?.min?.message
                  }
                </Text>
              )}
            </View>
          )}
        />
        <Controller
          name={`devices.${deviceIndex}.parameterStandards.${paramIndex}.thresholds.${thresholdIndex}.max`}
          control={control}
          rules={{ required: "Max is required" }}
          render={({ field: { onChange, value, onBlur } }) => (
            <View>
              <TextInput
                mode="outlined"
                value={value?.toString()}
                label="Max"
                placeholder="Type something"
                onBlur={onBlur}
                onChangeText={(v) => onChange(Number(v))}
              />
              {errors?.devices?.[deviceIndex]?.parameterStandards?.[paramIndex]
                ?.thresholds?.[thresholdIndex]?.max && (
                <Text style={styles.errorText}>
                  {
                    errors?.devices?.[deviceIndex]?.parameterStandards?.[paramIndex]
                    ?.thresholds?.[thresholdIndex]?.max?.message
                  }
                </Text>
              )}
            </View>
          )}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232533",
    height: "100%",
    color: "white",
    padding: 10,
  },
  card: {
    margin: 10,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  paramInput: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default ParamField;
