import React from 'react';
import {View,Text,Dimensions,Image} from 'react-native';
import {Form, Item, Label, Input,Button} from 'native-base';

var myBackground = require('../assets/icons/landing.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class SignIn extends React.Component{
	state = {
		email: "",
		password: ""
	}
	logIn = () =>{
		var email = this.state.email;
		var password = this.state.password;

		this.props.signIn(email,password);
	}
	render(){
		return(
			<View style={{flex: 1}}>
				<Image source={myBackground} style={styles.backgroundImage}>
					<View style={styles.inputStyle}>
						<Form>
							<Item floatingLabel>
								<Label>Email</Label>
								<Input
									autoCorrect={false}
									onChangeText={(email)=>this.setState({email})}
								/>
							</Item>
							<Item floatingLabel>
								<Label>Password</Label>
								<Input
									autoCorrect={false}
									onChangeText={(password)=>this.setState({password})}
									secureTextEntry
								/>
							</Item>
						</Form>
						<View style={{marginTop: 10}}>
							<Button
								primary
								block
								onPress={this.logIn}
							>
								<Text style={{color: 'white'}}>Sign In/Sign Up</Text>
							</Button>
						</View>
					</View>
				</Image> 
			</View>
		)
	}
}

const styles = {
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		width: width,
		height: height
	},
	inputStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 10
	}
}

export default SignIn;