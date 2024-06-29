import { getThingListAPI } from '@/api/api';
import { ThingResponseModel } from '@/api/types';
import { STATUS } from '@/constants/constant';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { router } from 'expo-router';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

const Thing = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>('');
  const [thingList, setThingList] = useState<ThingResponseModel>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const getThingList = async () => {
    if (userId) {
      const res = await getThingListAPI(pageSize, pageNumber, keyword, userId);
      setThingList(res.data);
    }
  };
  useEffect(() => {
    getThingList();
  }, [pageSize, pageNumber, keyword, userId]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {thingList?.paginatedResults?.map((item) => (
          <Card key={item._id} style={styles.card} mode="contained">
            <Card.Content>
              <View style={styles.cardHeader}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'baseline',
                  }}
                >
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="location" size={16} color="#2b7ae8" />
                    <Text style={{ color: '#2b7ae8' }}>
                      {item.location.name}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor:
                      item.status === STATUS.ACTIVE
                        ? '#55adff'
                        : item.status === STATUS.INACTIVE
                        ? '#bababa'
                        : '#ffd23d',
                    borderRadius: 20,
                    // paddingLeft: 10,
                    // paddingRight: 10,
                    padding: 10,
                  }}
                >
                  <Text> • {item.status}</Text>
                </View>
              </View>
            </Card.Content>
            <Divider style={{ margin: 10, height: 2 }} />
            <Card.Content
              style={{ marginVertical: 10, display: 'flex', gap: 10 }}
            >
              <View style={styles.infomation}>
                <Text style={[styles.text, { color: 'gray' }]}>Owner: </Text>
                <Text style={styles.text}>
                  {
                    item.managers.find((item) => item.isOwner === true)
                      ?.firstName
                  }{' '}
                  {
                    item.managers.find((item) => item.isOwner === true)
                      ?.lastName
                  }
                </Text>
              </View>
              <View style={styles.infomation}>
                <Text style={[styles.text, { color: 'gray' }]}>Managers: </Text>
                <Text style={styles.text}>
                  {item.managers
                    .filter((item) => item.isOwner === false)
                    .join(', ')}
                </Text>
              </View>
              <View style={styles.infomation}>
                <Text style={[styles.text, { color: 'gray' }]}>Devices: </Text>
                <Text style={styles.text}>
                  {item.devices.map((item) => item.name).join(', ')}
                </Text>
              </View>
              <View style={styles.infomation}>
                <Text style={[styles.text, { color: 'gray' }]}>CreateAt: </Text>
                <Text style={styles.text}>
                  {moment(item.createdOn).format(' hh:mm:ss MMMM DD, YYYY')}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => router.push(`/thing/${item._id}`)}>
                See Detail
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    height: '100%',
    color: 'white',
    padding: 10,
  },
  card: {
    marginHorizontal: 10,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infomation: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  text: {
    fontSize: 15,
  },
  location: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  device: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  locationBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ed6ed',
    borderRadius: 30,
    color: '#fff',
  },
  badge: {
    display: 'flex',
    paddingLeft: 5,
    paddingRight: 5,
  },
});
export default Thing;
