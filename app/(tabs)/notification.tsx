import { getNotificationAPI } from "@/api/api";
import { INotification } from "@/api/types";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { View } from "react-native-animatable";
import { Avatar, Card, Divider, Text } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import moment from "moment-timezone";

const Notification = () => {
  const [notification, setNotification] = useState<Array<INotification>>([]);
  const { width } = useWindowDimensions();

  const getNotification = async () => {
    const res = await getNotificationAPI(1, 50);
    setNotification(res.data.paginatedResults);
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            {notification.map((item) => (
              <View key={item._id} style={styles.notificationContainer}>
                <View style={{ paddingTop: 15 }}>
                  <Avatar.Text
                    size={48}
                    label={`${item?.type.charAt(0).toUpperCase()}`}
                    style={{backgroundColor: "#fbd736"}}
                  />
                </View>
                <View style={styles.content}>
                  <RenderHTML
                    contentWidth={width-30}
                    source={{ html: item.content }}
                    baseStyle={styles.htmlContent}
                  />
                  <Text style={{color: "#858585"}}>
                    {moment(item.createdOn).format(" hh:mm:ss MMMM DD, YYYY")}
                  </Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const widthContent = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    color: "white",
    padding: 10,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 5
  },
  notificationContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  htmlContent: {
    flexShrink: 1, // Allowing text to wrap within the container
    flexWrap: "wrap",
    width: widthContent - 120,
  },
  content: {
    display: "flex",
    flexDirection: "column",
  }
});

export default Notification;
