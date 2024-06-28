declare module 'react-native-speedometer' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';
  
    interface SpeedometerProps {
      value: number;
      size?: number;
      minValue?: number;
      maxValue?: number;
      allowedDecimals?: number;
      easeDuration?: number;
      labels?: Array<{ name: string, labelColor: string, activeBarColor: string }>;
      needleImage?: any;
      needleHeightRatio?: number;
      internalColor?: string;
      externalColor?: string;
      style?: ViewStyle;
      outerCircleStyle?: ViewStyle;
      halfCircleStyle?: ViewStyle;
      imageWrapperStyle?: ViewStyle;
      imageStyle?: ViewStyle;
      showText?: boolean;
      text?: string;
      textStyle?: ViewStyle;
      textValueStyle?: ViewStyle;
      textLabelStyle?: ViewStyle;
    }
  
    export default class Speedometer extends Component<SpeedometerProps> {}
  }
  