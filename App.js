import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Button
} from 'react-native';
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');


const data = {
  0: {
    text: 'print("3")',
  },
  1: {
    text: 'print("1")',
  },
  2: {
    text: 'print("2")',
  }
};

export default class Basic extends Component {
  render() {
    const question = "The basic Program should count to three. To put it in the right order,drag and drop the lines where they belong."
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{question}</Text>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={data}
          scrollEnabled={false}
          renderRow={this._renderRow} 
          />
      </View>
    );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data, active} = this.props
    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Text style={styles.text}>{data.text}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 25,
    color: '#595959',
    paddingLeft: 10,
    paddingRight: 10
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,
    height: 'auto',
    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001a4d',
    padding: 16,
    paddingTop: 0,
    height: 70,
    flex: 1,
    marginTop: 0,
    marginBottom: 8,
    borderRadius: 4,
    borderColor: '#fff',

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  text: {
    fontSize: 24,
    color: '#fff',
  },

});
