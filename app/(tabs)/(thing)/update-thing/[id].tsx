import { getThingDetailAPI } from "@/api/api";
import { IManager, IThingItem } from "@/api/types";
import { STATUS } from "@/constants/constant";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text, Button, Avatar, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Device from "./device";

const UpdateThing = () => {
  const { id } = useLocalSearchParams();
  const [thing, setThing] = useState<IThingItem>();
  const [owner, setOwner] = useState<IManager>();

  const LeftContent = () => (
    <Avatar.Text
      size={48}
      label={`${owner?.firstName.charAt(0).toUpperCase()}${owner?.lastName
        .charAt(0)
        .toUpperCase()}`}
    />
  );

  const getThingDetail = async () => {
    const res = await getThingDetailAPI(id?.toString() || "");
    setThing(res.data);
  };

  useEffect(() => {
    getThingDetail();
  }, [id]);

  useEffect(() => {
    const owner = thing?.managers.find((item) => item.isOwner === true);
    setOwner(owner);
  }, [thing]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={{ position: "relative" }}>
          <Card.Title
            title={thing?.name}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            subtitle={`ID: ${thing?._id}`}
            left={LeftContent}
          />
          <Divider style={{ marginVertical: 10 }} />
          <Card.Content>
            <View style={styles.cardTitle}>
              <Text
                variant="bodyMedium"
                style={{ color: "gray", marginVertical: 10 }}
              >
                Location
              </Text>
              <View
                style={{
                  backgroundColor:
                    thing?.status === STATUS.ACTIVE
                      ? "#55adff"
                      : thing?.status === STATUS.INACTIVE
                      ? "#bababa"
                      : "#ffd23d",
                  borderRadius: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                }}
              >
                <Text>• {thing?.status}</Text>
              </View>
            </View>
          </Card.Content>
          <Card style={styles.card} mode="contained">
            <Card.Content>
              <View style={styles.locaionContainer}>
                <View style={styles.location}>
                  <Text variant="titleLarge">{thing?.location.name}</Text>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text>longtitude: </Text>
                    <View style={styles.locationBadge}>
                      <View style={styles.badge}>
                        <Text>{thing?.location.longitude}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text>latitude: </Text>
                    <View style={styles.locationBadge}>
                      <View style={styles.badge}>
                        <Text>{thing?.location.latitude}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
          <Card.Content>
            <View style={styles.cardTitle}>
              <Text
                variant="bodyMedium"
                style={{ color: "gray", marginVertical: 10 }}
              >
                Devices
              </Text>
            </View>
          </Card.Content>
          <Card style={styles.card} mode="contained">
            <Card.Content>
              <View style={styles.locaionContainer}>
                {thing?.devices.map((item, index) => (
                  <Device
                    key={item._id}
                    device={item}
                    thingId={thing._id || ""}
                    deviceIndex={index}
                  />
                ))}
              </View>
            </Card.Content>
          </Card>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    color: "white",
    padding: 10,
  },
  card: {
    marginHorizontal: 10,
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locaionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  location: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  device: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  locationBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4ed6ed",
    borderRadius: 30,
    color: "#fff",
  },
  badge: {
    display: "flex",
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default UpdateThing;
