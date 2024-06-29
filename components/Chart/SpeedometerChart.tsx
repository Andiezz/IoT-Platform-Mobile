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
              name: 'Good',
              labelColor: '#00e400',
              activeBarColor: '#00e400',
            },
            {
              name: 'Moderate',
              labelColor: '#ffff00',
              activeBarColor: '#ffff00',
            },
            {
              name: 'Unhealthy for Sensitive Groups',
              labelColor: '#ff7e00',
              activeBarColor: '#ff7e00',
            },
            {
              name: '	Unhealthy',
              labelColor: '#ff0000',
              activeBarColor: '#ff0000',
            },
            {
              name: '	Very Unhealthy',
              labelColor: '#8f3f97',
              activeBarColor: '#8f3f97',
            },
            {
              name: 'Hazardous',
              labelColor: '#7e0023',
              activeBarColor: '#7e0023',
            },
          ]}
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