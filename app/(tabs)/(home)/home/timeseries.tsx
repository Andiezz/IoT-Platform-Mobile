import { IOverviewDaily } from "@/api/types";
import OverviewPointWidget from "@/components/OverviewWidget";
import { TextTimeseries, BackgroupColor, Color } from "@/constants/constant";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card } from "react-native-paper";

export interface IProps {
  data?: IOverviewDaily;
  arrayTimes: any[];
}

const CurrentData: React.FC<IProps> = ({ data, arrayTimes }) => {
  const [more, setMore] = useState<boolean>(false);
  useEffect(() => {
    if (arrayTimes.length > 5) {
      setMore(true);
    }
  }, [arrayTimes]);

  const renderTimeseries = (data: IOverviewDaily) => {
    return (
      <>
        {data["co"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.CO}
            param={`${data["co"]?.toFixed(2)}`}
            backgroud={BackgroupColor.CO}
            color={Color.CO}
          />
        )}
        {data["toluen"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.Toluen}
            param={`${data["toluen"]?.toFixed(2)}`}
            backgroud={BackgroupColor.Toluen}
            color={Color.Toluen}
          />
        )}
        {data["alcohol"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.Alcohol}
            param={`${data["alcohol"]?.toFixed(2)}`}
            backgroud={BackgroupColor.Alcohol}
            color={Color.Alcohol}
          />
        )}
        {data["ch4"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.CH4}
            param={`${data["ch4"]?.toFixed(2)}`}
            backgroud={BackgroupColor.CH4}
            color={Color.CH4}
          />
        )}
        {data["aceton"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.Aceton}
            param={`${data["aceton"]?.toFixed(2)}`}
            backgroud={BackgroupColor.Aceton}
            color={Color.Aceton}
          />
        )}
        {data["co2"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.CO2}
            param={`${data["co2"]?.toFixed(2)}`}
            backgroud={BackgroupColor.CO2}
            color={Color.CO2}
          />
        )}
        {data["humidity"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.Humi}
            param={`${data["humidity"]?.toFixed(2)}`}
            backgroud={BackgroupColor.Humi}
            color={Color.Humi}
          />
        )}
        {data["lpg"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.LPG}
            param={`${data["lpg"]?.toFixed(2)}`}
            backgroud={BackgroupColor.LPG}
            color={Color.LPG}
          />
        )}
        {data["temperature"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.Temp}
            param={`${data["temperature"]?.toFixed(2)}`}
            backgroud={BackgroupColor.Temp}
            color={Color.Temp}
          />
        )}
        {data["nh4"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.NH4}
            param={`${data["nh4"]?.toFixed(2)}`}
            backgroud={BackgroupColor.NH4}
            color={Color.NH4}
          />
        )}
        {data["tvoc"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.TVOC}
            param={`${data["tvoc"]?.toFixed(2)}`}
            backgroud={BackgroupColor.TVOC}
            color={Color.TVOC}
          />
        )}
        {data["pm25"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.PM25}
            param={`${data["pm25"]?.toFixed(2)}`}
            backgroud={BackgroupColor.PM25}
            color={Color.PM25}
          />
        )}
        {data["pm10"] !== 0 && (
          <OverviewPointWidget
            text={TextTimeseries.PM10}
            param={`${data["pm10"]?.toFixed(2)}`}
            backgroud={BackgroupColor.PM10}
            color={Color.PM10}
          />
        )}
      </>
    );
  };

  return (
    <>
      {data && arrayTimes.length > 1 ? (
        <View>
          <View style={more ? styles.halfHeight : styles.fullHeight}>
            {renderTimeseries(data)}
          </View>
          {arrayTimes.length > 5 && (
            <View>
              <Card.Actions>
                {more ? (
                  <Button mode="outlined" onPress={() => setMore(false)}>
                    Show more
                  </Button>
                ) : (
                  <Button mode="outlined" onPress={() => setMore(true)}>
                    Show less
                  </Button>
                )}
              </Card.Actions>
            </View>
          )}
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  halfHeight: {
    display: "flex",
    width: "80%",
    flexWrap: "wrap",
    height: 100,
    overflow: "hidden",
  },
  fullHeight: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
  btn: {
    color: "#2b7ae8",
    cursor: "pointer",
    textAlign: "center",
  },
});
export default CurrentData;
