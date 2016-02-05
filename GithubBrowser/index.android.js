  /**
   * Sample React Native App
   * https://github.com/facebook/react-native
   */
   'use strict';



   var React = require('react-native');
   var ProgressBar = require('ProgressBarAndroid');
   var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
  } = React;

  var Login = require('./Login');
  var AppContainer = require('./AppContainer');
  var AuthService = require('./AuthService');
  var Utility = require('./utilities/utility.js')

  class GithubBrowser extends Component {
    constructor(props){
      super(props);
      this.state = {
        isLoggedIn: false,
        checkingAuth: true
      }

      Utility.bind(this, ['onLogin', 'componentDidMount'])
    }


    componentDidMount(){
      AuthService.getAuthInfo((err, authInfo) => {
        this.setState({
          checkingAuth: false,
          isLoggedIn: authInfo != null
        })
      });
    }

    render() {
      if(this.state.checkingAuth){
       return (
          <View style={styles.container}>
            <ProgressBar styleAttr="Inverse" />
        </View>
        );
     }

     if(this.state.isLoggedIn){
      return (
        <AppContainer />
        );
    }else{
      return (
        <Login onLogin={this.onLogin} />
        );
    }}

    onLogin(){
      this.setState({isLoggedIn: true});
    }
  }

  const styles = StyleSheet.create({
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
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

  AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
