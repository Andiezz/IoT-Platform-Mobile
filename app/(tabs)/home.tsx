import { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { ThingResponseModel } from '@/api/types';
import { router } from 'expo-router';
import { getThingListAPI } from '@/api/api';

interface Message {
  thingId: string;
}

const Home = () => {
  const [thingList, setThingList] = useState<ThingResponseModel>();

  const userId = useSelector((state: RootState) => state.auth.userId);
  const getThingList = async () => {
    if (userId) {
      const res = await getThingListAPI(10, 1, '', userId);
      setThingList(res.data);
    }
  };

  useEffect(() => {
    getThingList();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={'Thing List'}
          titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
        />
        <Card.Content style={styles.thingWrapper}>
          {thingList?.paginatedResults?.map((item) => (
            <Card
              key={item._id}
              mode="outlined"
              onPress={() => router.push(`/home/${item._id?.toString()}`)}
              style={styles.thingWrapper}
            >
              <Card.Content style={styles.thingContent}>
                <View style={styles.thingTitle}>
                  <Text>
                    {item?.name} | {`ID: ${item._id}`}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  card: {
    margin: 10,
    height: 250,
  },
  thingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  thingContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  thingTitle: {
    display: 'flex',
    backgroundColor: '#4095e5',
    padding: 5,
    borderRadius: 5,
    width: '90%',
  },
});

export default Home;
