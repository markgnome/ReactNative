'use strict';

var React = require('react-native');
var buffer = require('buffer');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS
} = React;

const octocat = require('./img/Octocat.png');


class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			showProgress: false
		}
	}

	render(){
		var errorCtlr = <View />;

		if(!this.state.success && this.state.badCredentials){
			errorCtlr = <Text style={styles.error}>
				That username and password combination did not work.
			</Text>;
		}

		if(!this.state.success && this.state.unknownError){
			errorCtlr = <Text style={styles.error}>
				We experienced an unexpected issue.
			</Text>;
		}

		return (			
			<View style={styles.container}>
				<Image style={styles.logo} source={octocat} />
				<Text style={styles.heading}>
					Github Browser
				</Text>

				<TextInput 
					style={styles.input} 
					onChangeText={(text) => this.setState({username: text})}
					placeholder="Github username" 
					autoCapitalize="none" />

				<TextInput style={styles.input} 
					onChangeText={(text) => this.setState({password: text})}
					placeholder="Github password" 
					secureTextEntry={true} />

				<TouchableHighlight 
					onPress={this.onLoginPressed.bind(this)}
					style={styles.button}>
					<Text style={styles.buttonText}>
						Log in
					</Text>
				</TouchableHighlight> 
				{errorCtlr}
				<ActivityIndicatorIOS animating={this.state.showProgress} 
					style={styles.loader}
					size="large" />
			</View>
		);
	}

	onLoginPressed(){
		console.log('Attempting to log in with username ' + this.state.username);
		this.setState({showProgress: true});

		var authService = require('./AuthService');
		authService.login({ 
			username: this.state.username, 
			password: this.state.password }, (results) => {			
			this.setState(Object.assign({ showProgress: false }, results));

			if(results.success && this.props.onLogin){
				this.props.onLogin();
			}

		})

	}
}

var styles = StyleSheet.create({
	container:{
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		paddingTop: 50,
		padding: 10
	},
	logo:{
		width: 66,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10
	},
	input:{
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48bbec'
	},
	button:{
		height: 50,
		backgroundColor: '#48bbec',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'		
	},
	buttonText:{
		fontSize: 22,
		color: '#fff',
		alignSelf: 'center'
	},
	loader:{
		marginTop: 20
	},
	error: {
		color: 'red',
		paddingTop: 10
	}
});

module.exports = Login;