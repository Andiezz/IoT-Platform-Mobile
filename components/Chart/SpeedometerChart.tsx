// Visualize data with Speedometer Graph in React Native
// https://aboutreact.com/react-native-speedometer-graph/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

//Import library for Speedometer
import RNSpeedometer from 'react-native-speedometer';

interface ChartProps {
  value: number
}

const SpeedometerChart = ({value}: ChartProps) => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <RNSpeedometer
          value={value}
          //value for Speedometer
          size={200}
          //Size of Speedometer
          minValue={0}
          //Min value for Speedometer
          maxValue={500}
          //Max value for Speedometer
          allowedDecimals={2}
          //Decimals value allowed or not
          labels={[
            {
              name: 'Low Risk',
              labelColor: '#00ff6b',
              activeBarColor: '#00ff6b',
            },
            {
              name: 'Medium Risk',
              labelColor: '#f4ab44',
              activeBarColor: '#f4ab44',
            },
            {
              name: 'High Risk',
              labelColor: '#ff2900',
              activeBarColor: '#ff2900',
            },
          ]}
          //Labels for the different steps of Speedometer
        />
      </View>
    </SafeAreaView>
  );
};

export default SpeedometerChart;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});