import { StyleSheet } from "react-native";
import { colors, textStyles } from "@/assets/styles";

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  imageStyle: {
    width: 343,
    height: 256,
  },
  imageLogo: {
    width: 126,
    height: 126,
  },

  formContainer: {
    justifyContent: "center",
  },
  headerTitle: {
    ...textStyles.HeadingH3SemiBold,
    color: colors.NeutralDark,
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    textAlign: "center",
    marginBottom: 8,
    marginHorizontal: 40,
    borderBottomColor: colors.GrayAlt,
    borderBottomWidth: 1,
  },
  inputError: {
    textAlign: "center",
    marginBottom: 8,
    marginHorizontal: 40,
    borderBottomColor: colors.Alternate3,
    borderBottomWidth: 1,
  },
  forgotPasswordContainer: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 16,
    marginHorizontal: 40,
  },
  forgotPasswordButton: {},
  link: {
    ...textStyles.BodyParagraphSmallSemiBold,
    color: colors.MainColor,
  },
  error: {
    ...textStyles.BodyParagraphSmallSemiBold,
    lineHeight: 5,
    color: colors.ErrorMain,
    width: "100%",
    textAlign: "center",
  },
  error2: {
    color: colors.ErrorMain,
    width: "100%",
    textAlign: "center",
  },
  guideContainer: {
    marginTop: 2,
    marginBottom: 16,
  },
  footerButtonContainer: {
    paddingVertical: 16,
  },
  signInButton: {
    marginHorizontal: 24,
    marginBottom: 12,
  },
  subContainer: {
    display: "flex",
    justifyContent: "center",
  },
  sliderItemDescription: {
    ...textStyles.BodyCaptionLargeRegular,
    color: colors.LightTextPrimary,
    marginBottom: 6,
    width: "100%",
    textAlign: "center",
  },
  sliderItemSub: {
    ...textStyles.BodyCaptionLargeSemiBold,
    color: colors.MainColor,
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  signInWithBiometricContainer: {
    paddingHorizontal: 24,
  },
  biometricContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderColor: colors.PrimaryMain,
    borderWidth: 1,
    borderRadius: 8,
    height: 68,
  },
  phoneNumberContainer: {
    gap: 8,
    marginBottom: 40,
  },
  phoneNumberLabel: {
    ...textStyles.BodyCaptionLargeRegular,
    color: colors.LightTextSecondary,
    textAlign: "center",
  },
  phoneNumberText: {
    ...textStyles.BodyParagraphLargeRegular,
    color: colors.LightTextPrimary,
    textAlign: "center",
  },
  loginWithBiometricText: {
    ...textStyles.BodyParagraphSmallRegular,
    color: colors.LightTextPrimary,
    marginBottom: 8,
  },
});

export default styles;
