import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dummyData from '../../data/dummyData/getAllPosts.json';
import { SearchBar } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state={
      data: dummyData,
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render () {
    const { search } = this.state;

    return (
      <ScrollView>
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>
        {this.state.data.map((item, i) => {
          return (
            <View key={i} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View>
                <Text>City: </Text><Text>{item.locationCity}</Text>
              </View>
              <Text>Attendees: {item.currentAttendees === null ? 
                                0 : item.currentAttendees}/{item.maxAttendees}</Text>
              <Text>Created at {item.created_at}</Text>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Meet Friends',
};

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    flex: 1
  }, 
  itemTitle: {
    color: '#00A2E5',
    fontWeight: 'bold'
  }
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { width: 0, height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
