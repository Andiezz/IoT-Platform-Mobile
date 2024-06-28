import { icons } from "@/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

export interface IOverviewPointWidget {
  param?: string;
  text?: string;
  color?: string;
  backgroud?: string;
  isCol?: boolean;
}

const OverviewPointWidget: React.FC<IOverviewPointWidget> = ({
  param,
  text,
  color,
  backgroud,
}) => {
  return (
    <>
      {param !== "undefined" && param !== "null" && (
        <>
          <View style={styles.wrapper}>
            <View>
              <View style={[styles.img, { backgroundColor: `${backgroud}` }]}>
                <MaterialIcons name="offline-bolt" size={20} color={color} />
              </View>
            </View>
            <View style={styles.infomation}>
              <View style={styles.param}>
                <Text>{param}</Text>
              </View>
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  img: {
    width: 48,
    height: 48,
    backgroundColor: "#ffd8d666",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infomation: {
    display: "flex",
    flexWrap: "nowrap",
    width: 80,
  },
  param: {
    width: "90%",
  },
  text: {
    lineHeight: 22,
    fontSize: 14,
  },
});
export default OverviewPointWidget;
