'use strict';

var React = require('react-native');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var {
    Text,
    View,
    Component,
    StyleSheet,
    TabBarIOS,
    ScrollView
} = React;

var Feed = require('./Feed');

class AppContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 'feed'
        }
    }

    render(){
      return (
      <ScrollableTabView>
        <ScrollView  tabLabel="Feed" style={styles.feedTab}>
              <View style={styles.card}>
           <Feed />
            </View>
        </ScrollView >
        <ScrollView  tabLabel="Search">
        </ScrollView >
        
      </ScrollableTabView>
      );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  feedTab: {

  }
});

module.exports = AppContainer;