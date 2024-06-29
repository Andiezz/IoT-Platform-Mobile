import { getThingDetailAPI, updateThingDetailAPI } from '@/api/api';
import {
  IParameterStandardModel,
  IThingItem,
  IThingItemUpdate,
} from '@/api/types';
import ParamField from '@/components/ParamField';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';
import { useForm, Resolver, Controller } from 'react-hook-form';
import { View } from 'react-native-animatable';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const removePropertiesFromObjects = (array: any[], properties: string[]) => {
  return array.map((obj) => {
    properties.forEach((prop) => {
      delete obj[prop];
    });
    return { ...obj }; // Return a new object without the deleted properties
  });
};

const UpdateParam = () => {
  const { thingId, paramIndex, deviceIndex } = useLocalSearchParams();
  const [thing, setThing] = useState<IThingItem>();
  const [param, setParam] = useState<IParameterStandardModel>();

  const defaultValue = {
    name: '',
    information: undefined,
    location: undefined,
    status: undefined,
    managers: [],
    devices: [],
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    setValue,
    getValues,
    reset,
  } = useForm<IThingItemUpdate>({
    mode: 'all',
    defaultValues: defaultValue,
  });

  const onSubmit = async (data: any) => {
    try {
      updateThingDetailAPI(thingId?.toString() || '', data);
      router.push(`/update-thing/${thingId}`);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Update success!',
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Something went wrong!',
      });
    }
  };

  const getThingDetail = async () => {
    const res = await getThingDetailAPI(thingId?.toString() || '');
    setThing(res.data);
  };

  useEffect(() => {
    getThingDetail();
  }, [thingId]);

  useEffect(() => {
    if (thing && deviceIndex !== undefined && paramIndex !== undefined) {
      setParam(
        thing?.devices[Number(deviceIndex)].parameterStandards[
          Number(paramIndex)
        ]
      );

      const updatedDevices = removePropertiesFromObjects(thing.devices, [
        '_id',
        'status',
      ]);

      const updatedManagers = removePropertiesFromObjects(thing.managers, [
        'email',
        'firstName',
        'isActive',
        'lastName',
        'phoneCode',
        'phoneNumber',
        'role',
        '_id',
      ]);

      reset({
        name: thing?.name,
        information: thing?.information,
        location: thing?.location,
        status: thing?.status,
        managers: updatedManagers,
        devices: updatedDevices,
      });
    }
  }, [thing, deviceIndex, paramIndex, reset]);

  useEffect(() => {
    setValue(`devices.${Number(deviceIndex)}.parameterStandardDefault`, false);
    for (
      let index = 0;
      thing?.devices && index < thing?.devices?.length;
      index++
    ) {
      setValue(`devices.${index}.model`, thing?.devices[index].model._id || '');
    }
    const updatedParam =
      getValues().devices[Number(deviceIndex)].parameterStandards &&
      removePropertiesFromObjects(
        getValues().devices[Number(deviceIndex)].parameterStandards,
        ['_id']
      );
    setValue(`devices.${Number(deviceIndex)}.parameterStandards`, updatedParam);
  }, [isDirty]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {thing && param && (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardTitle}>
                <Text
                  variant="bodyMedium"
                  style={{ color: 'gray', marginVertical: 10 }}
                >
                  Informations
                </Text>
              </View>
            </Card.Content>
            <Card style={styles.card} mode="contained">
              <Card.Content style={styles.cardContent}>
                <Controller
                  name={`devices.${Number(
                    deviceIndex
                  )}.parameterStandards.${Number(paramIndex)}.name`}
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field: { onChange, value = '', onBlur } }) => (
                    <View>
                      <TextInput
                        mode="outlined"
                        value={value}
                        label="Name"
                        placeholder="Type something"
                        onBlur={onBlur}
                        onChangeText={(v) => onChange(v)}
                      />
                      {errors?.devices?.[Number(deviceIndex)]
                        ?.parameterStandards?.[Number(paramIndex)]?.name && (
                        <Text style={styles.errorText}>
                          {
                            errors?.devices?.[Number(deviceIndex)]
                              ?.parameterStandards?.[Number(paramIndex)]?.name
                              ?.message
                          }
                        </Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  name={`devices.${Number(
                    deviceIndex
                  )}.parameterStandards.${Number(paramIndex)}.unit`}
                  control={control}
                  rules={{ required: 'Unit is required' }}
                  render={({ field: { onChange, value = '', onBlur } }) => (
                    <View>
                      <TextInput
                        mode="outlined"
                        value={value}
                        label="Unit"
                        placeholder="Type something"
                        onBlur={onBlur}
                        onChangeText={(v) => onChange(v)}
                      />
                      {errors?.devices?.[Number(deviceIndex)]
                        ?.parameterStandards?.[Number(paramIndex)]?.unit && (
                        <Text style={styles.errorText}>
                          {
                            errors?.devices?.[Number(deviceIndex)]
                              ?.parameterStandards?.[Number(paramIndex)]?.unit
                              ?.message
                          }
                        </Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  name={`devices.${Number(
                    deviceIndex
                  )}.parameterStandards.${Number(paramIndex)}.weight`}
                  control={control}
                  rules={{ required: 'Weight is required' }}
                  render={({ field: { onChange, value = '', onBlur } }) => (
                    <View>
                      <TextInput
                        mode="outlined"
                        value={value?.toString()}
                        label="Weight"
                        placeholder="Type something"
                        onBlur={onBlur}
                        onChangeText={(v) => onChange(Number(v))}
                      />
                      {errors?.devices?.[Number(deviceIndex)]
                        ?.parameterStandards?.[Number(paramIndex)]?.weight && (
                        <Text style={styles.errorText}>
                          {
                            errors?.devices?.[Number(deviceIndex)]
                              ?.parameterStandards?.[Number(paramIndex)]?.weight
                              ?.message
                          }
                        </Text>
                      )}
                    </View>
                  )}
                />
              </Card.Content>
            </Card>
            <Card.Content>
              <View style={styles.cardTitle}>
                <Text
                  variant="bodyMedium"
                  style={{ color: 'gray', marginVertical: 10 }}
                >
                  Thresholds
                </Text>
              </View>
            </Card.Content>
            {param?.thresholds.map((item, index) => (
              <ParamField
                key={index}
                control={control}
                errors={errors}
                thresholds={item}
                deviceIndex={Number(deviceIndex)}
                paramIndex={Number(paramIndex)}
                thresholdIndex={index}
                setValue={setValue}
                getValue={getValues}
              />
            ))}

            <Card.Actions>
              <Button onPress={() => router.back()}>Cancel</Button>
              <Button disabled={!isDirty} onPress={handleSubmit(onSubmit)}>
                Update
              </Button>
            </Card.Actions>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    color: 'white',
    padding: 10,
  },
  card: {
    margin: 10,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  paramInput: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default UpdateParam;
