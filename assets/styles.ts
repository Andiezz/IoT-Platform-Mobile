import { StyleSheet } from 'react-native';

// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;

// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;

export const colors = {
  GrayAlt: '#DDDDDD',
  LightBlue: '#F0F9FE',
  LightTextPrimary: '#212B36',
  GradientMain: '#9081FE',
  MainColor: '#4A98E2',
  MainTransparent: '#4A98E226',
  Alternate3: '#F96363',
  Alternate2: '#00B268',
  Alternate1: '#FF7448',
  Alternate3Transparent: '#F9636326',
  Alternate2Transparent: '#00B26826',
  Alternate1Transparent: '#FF744826',
  White: '#FFFFFF',
  Black: '#000000',
  Gray: '#999999',
  GrayTransparent: '#99999926',
  Rhino: '#3C4858',
  // Old
  PrimaryTransparent: '#9E95F51F',
  SecondaryTransparent: '#82868B1F',
  SuccessTransparent: '#00B2671F',
  WarningTransparent: '#FF9F431F',
  ErrorTransparent: '#F963631F',
  InfoTransparent: '#00CFE81F',
  ShadesBlack: '#000000',
  ShadesWhite: '#FFFFFF',
  ShadesBase: '#F4F4F4',
  NeutralDark: '#15233E',
  NeutralLight: '#BABFC7',
  NeutralLighter: '#2F4674',
  Transparent: 'transparent',
  BackgroundMain: '#FEFEFE',
  MainLight: '#DCEBF9',
  ShadowColor: '#919EAB1F',
  BorderColor: '#919EAB52',
  LightTextSecondary: '#637381',
  Grey: '#DFE3E8',
  Danger: '#FF4842',
  MainLighter: '#397AD829',
  DangerLighter: '#FF484229',
  FavouriteLighter: '#FF48421F',
  NotificationRead: '#919EABCC',
  Warning: '#FF8F6D',
  //New
  //Primary
  PrimaryLighter: '#DCEBF9',
  PrimaryLight: '#96C3EE',
  PrimaryMain: '#4A98E2',
  PrimaryDark: '#1D6BB4',
  PrimaryDarker: '#124472',
  PrimaryLighterTransparent: '#397AD814',
  PrimaryLightTransparent: '#397AD81F',
  PrimaryMainTransparent: '#397AD829',
  PrimaryDarkTransparent: '#397AD83D',
  PrimaryDarkerTransparent: '#397AD852',

  //Secondary
  SecondaryLighter: '#DDE8F8',
  SecondaryLight: '#99BAEB',
  SecondaryMain: '#397AD8',
  SecondaryDark: '#225CAF',
  SecondaryDarker: '#163A6F',
  SecondaryLighterTransparent: '#3366FF14',
  SecondaryLightTransparent: '#3366FF1F',
  SecondaryMainTransparent: '#3366FF29',
  SecondaryDarkTransparent: '#3366FF3D',
  SecondaryDarkerTransparent: '#3366FF52',

  //Info
  InfoLighter: '#D0F2FF',
  InfoLight: '#74CAFF',
  InfoMain: '#1890FF',
  InfoDark: '#0C53B7',
  InfoDarker: '#04297A',
  InfoLighterTransparent: '#1890FF14',
  InfoLightTransparent: '#1890FF1F',
  InfoMainTransparent: '#1890FF29',
  InfoDarkTransparent: '#1890FF3D',
  InfoDarkerTransparent: '#1890FF52',

  //Success
  SuccessLighter: '#E9FCD4',
  SuccessLight: '#AAF27F',
  SuccessMain: '#4FCD28',
  SuccessDark: '#4FCD28',
  SuccessDarker: '#08660D',
  SuccessLighterTransparent: '#54D62C14',
  SuccessLightTransparent: '#54D62C1F',
  SuccessMainTransparent: '#54D62C29',
  SuccessDarkTransparent: '#54D62C3D',
  SuccessDarkerTransparent: '#54D62C52',

  //Warning
  WarningLighter: '#FFF7CD',
  WarningLight: '#FFE16A',
  WarningMain: '#EBB000',
  WarningDark: '#B78103',
  WarningDarker: '#7A4F01',
  WarningLighterTransparent: '#FFC10714',
  WarningLightTransparent: '#FFC1071F',
  WarningMainTransparent: '#FFC10729',
  WarningDarkTransparent: '#FFC1073D',
  WarningDarkerTransparent: '#FFC10752',

  //Error
  ErrorLighter: '#FFE7D9',
  ErrorLight: '#FFA48D',
  ErrorMain: '#FF4842',
  ErrorDark: '#B72136',
  ErrorDarker: '#7A0C2E',
  ErrorLighterTransparent: '#FF484214',
  ErrorLightTransparent: '#FF48421F',
  ErrorMainTransparent: '#FF484229',
  ErrorDarkTransparent: '#FF48423D',
  ErrorDarkerTransparent: '#FF484252',

  //Background
  BackgroundDefaultLight: '#FFFFFF',
  BackgroundPaperLight: '#FFFFFF',
  BackgroundNeutralLight: '#F4F6F8',
  BackgroundDefaultDark: '#161C24',
  BackgroundPaperDark: '#212B36',
  BackgroundNeutralDark: '#919EAB29',

  // Other
  OtherChart0304: '#2CD9C5',
  OtherChart0104: '#826AF9',
};

export const textStyles = StyleSheet.create({
  DisplayBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 60,
  },
  DisplaySemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 60,
  },
  DisplayRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 60,
  },
  HeadingH1Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    lineHeight: 58,
  },
  HeadingH1SemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 48,
    lineHeight: 58,
  },
  HeadingH1Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 34,
    lineHeight: 42,
  },
  HeadingH1SmallBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    lineHeight: 42,
  },
  HeadingH1SmallSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 34,
    lineHeight: 42,
  },
  HeadingH1SmallMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 34,
    lineHeight: 42,
  },
  HeadingH2Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    lineHeight: 42,
  },
  HeadingH2SemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 34,
    lineHeight: 42,
  },
  HeadingH2Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 34,
    lineHeight: 42,
  },
  HeadingH2SmallBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 30,
  },
  HeadingH2SmallSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 30,
  },
  HeadingH2SmallMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    lineHeight: 30,
  },
  HeadingH3Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 30,
  },
  HeadingH3SemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 30,
  },
  HeadingH3Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    lineHeight: 30,
  },
  HeadingH3SmallBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    lineHeight: 24,
  },
  HeadingH3SmallSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 24,
  },
  HeadingH3SmallMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 24,
  },
  HeadingH4Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    lineHeight: 24,
  },
  HeadingH4SemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 24,
  },
  HeadingH4Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 24,
  },
  HeadingH4SmallBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  HeadingH4SmallSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
  },
  HeadingH4SmallMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 20,
  },
  HeadingH5Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    lineHeight: 20,
  },
  HeadingH5SemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
  },
  HeadingH5Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 20,
  },
  HeadingH5Regular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
  HeadingH5SmallBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    lineHeight: 18,
  },
  HeadingH5SmallSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  HeadingH5SmallMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 18,
  },
  HeadingH6Bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    lineHeight: 18,
  },
  HeadingH6SemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  HeadingH6Medium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 18,
  },
  HeadingH6SmallBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    lineHeight: 14,
  },
  HeadingH6SmallSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 14,
  },
  HeadingH6SmallMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 14,
  },
  BodyParagraphLargeRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  BodyParagraphLargeBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    lineHeight: 22,
  },
  BodyParagraphLargeSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
  BodyParagraphSmallRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 24,
  },
  BodyParagraphSmallSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 24,
  },
  BodyCaptionLargeRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  BodyCaptionLargeSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  BodyCaptionLargeSemiBoldUpper: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
  BodyCaptionSmallRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    lineHeight: 14,
  },
  BodyCaptionSmallSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
    lineHeight: 14,
  },
  BodyCaptionSmallSemiBoldUpper: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 11,
    lineHeight: 14,
    textTransform: 'uppercase',
  },
  BodyFooterRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 14,
  },
  BodyFooterSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    lineHeight: 14,
  },
  BodyFooterSemiBoldUpper: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    lineHeight: 14,
    textTransform: 'uppercase',
  },
});

export const shadows = StyleSheet.create({
  z1: {
    shadowColor: '#919EAB',
    shadowOpacity: 0.12,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  z8: {
    shadowColor: '#919EAB',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 3,
  },
  z12: {
    shadowColor: '#919EAB',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 6,
  },
  z16: {
    shadowColor: '#919EAB',
    shadowOpacity: 0.12,
    shadowRadius: 32,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    elevation: 6,
  },
  z20: {
    shadowColor: '#919EAB',
    shadowOpacity: 0.12,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 8,
  },
  z24: {
    shadowColor: '#919EAB',
    shadowOpacity: 0.2,
    shadowRadius: 48,
    shadowOffset: {
      width: 0,
      height: 24,
    },
    elevation: 8,
  },
});
