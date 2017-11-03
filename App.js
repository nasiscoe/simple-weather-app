import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import api from "./src/app/api"

// Converts UTC formatted time to understandable timestamp
function timeConverter(UNIX_timestamp){
  var date = new Date(UNIX_timestamp * 1000);
  var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = weekdays[date.getDay()];
  var time = date.getHours();
  return ('  ' + day + ' - ' + time + ':00');
}

// renders weather information for a single timestamp (one row in ScrollView)
class DayPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: '',
      weatherType: '',
      temp: '--',
    };
  }

  getDayWeather() {
    api().then((response) => {
      let weatherData = response.list[this.props.day]
      this.setState({
        day: weatherData.dt,
        weatherType: weatherData.weather[0].main,
        temp: weatherData.main.temp,
      });
    });
  }

  render() {
    {this.getDayWeather()}
    return (
      <View style={[styles.dayPanel]}>
        <View style={[styles.dateContainer]}>
          <Text style={styles.day}>
            {timeConverter(this.state.day)}
          </Text>
        </View>
        <View style={[styles.weatherContainer]}>
          <Text style={styles.weatherType}>
            {this.state.weatherType}
          </Text>
          <Text style={styles.temp}>
            {Math.round(this.state.temp) + "°F"}
          </Text>
        </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    var panels = [];
    // Iterates through each timestamp in the OpenWeatherMap 5 day forecast
    for (var i = 0; i < 38; i++) {
      panels.push(<DayPanel day = {i} key = {i} />);
    }
    return (
      <View style={{backgroundColor: '#BF360C', flex: 1}}>
        <View style={[styles.titleBar]}>
          <Text style={{color: '#f4f4f4', fontSize: 34, fontWeight: "500",}}>
            {"Kansas City"}
          </Text>
          <Text style={{color: '#f4f4f4', marginBottom: 5, fontSize: 15, fontWeight: "100"}}>
            {"Five Day Forecast"}
          </Text>
        </View>
        <ScrollView>
          {panels}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleBar: {
    backgroundColor: '#D84315',
    marginTop: 20,
    alignItems: 'center'
  },
  dayPanel: {
    backgroundColor: '#E64A19',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  weatherContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  temp: {
    color: '#f4f4f4',
    fontSize: 15,
    fontWeight: "100"
  },
  day: {
    color: '#f4f4f4',
    fontSize: 16,
    fontWeight: "500",
  },
  weatherType: {
    color: '#f4f4f4',
    fontSize: 15,
    fontWeight: "200",
  },
});

AppRegistry.registerComponent('weather_app', () => weather_app);
