'use strict';

var React = require('react-native');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var {
    Text,
    View,
    Component,
    StyleSheet,
    TabBarIOS,
    ScrollView,
    Navigator,
    TouchableOpacity 
} = React;

var Feed = require('./Feed');
var PushPayload = require('./PushPayload.js');

class AppContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'feed'
        }
    }

    render(){
      return (
          <Navigator
            sceneStyle={{
                flex: 1
            }} 
            initialRoute={{
              component: Feed,
              name:'Feed', 
              index: 0
            }}
            renderScene={this.renderScene.bind(this)} />
      );
    }

    renderScene(route, navigator){
      var name = route.name;
      if(name == 'Feed'){
        return(
          <ScrollableTabView>
            <ScrollView  tabLabel="Feed" style={styles.feedTab}>
              <Feed navigator={navigator} />
            </ScrollView >
            <ScrollView  tabLabel="Search">
            </ScrollView >
          </ScrollableTabView>
        );
      }
      if(name == 'PushEvent'){
        return(
            <PushPayload navigator={navigator} data={route.passProps} />
          );
      }
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