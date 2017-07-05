import React from 'react';
import {View,Text,Image} from 'react-native';
import {Header,Left,Button,Icon,Body,Title,Right,Fab} from 'native-base';
import {MapView} from 'expo';
import Meteor, {createContainer} from 'react-native-meteor';

var mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#AFFFA0"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "color": "#EAFFE5"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f9f8c7"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#59A499"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#F0FF8D"
            },
            {
                "weight": 2.2
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fdfabf"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#1A87D6"
            }
        ]
    }
];

class PokeMap extends React.Component{
	state = {
		location: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		}
	}
	recordEvent = (x) =>{
		console.log(x);
		this.setState({location: x});
	}
	addPokemon = ()=>{
		Meteor.call('pokemon.add',this.state.location, (err,res)=>{
			console.log('add function', err,res);
		})
	}
	removePokemon = ()=>{
		if(this.props.pokemon.length === 0){
			return;
		}
		var remove = this.props.pokemon[0]._id;
		Meteor.call("pokemon.subtract", remove, (err,res)=>{
			console.log('remove function',err,res);
		})
	}
	renderPokemon = () =>{
		return this.props.pokemon.map(p=>{
			return(
				<MapView.Marker 
					coordinate={{latitude: p.latitude, longitude: p.longitude}}
					key={p._id}
				>
					<Image 
						source={{uri: "http://192.168.0.13:3000/"+p.image}} 
						style={{height: 50,width:50}}
					/>
				</MapView.Marker>
			)
		})
	}
	logout = () =>{
		Meteor.logout();
		this.props.flipLogin(false);
	}
	render(){
		console.log(this.props.pokemon);
		return(
			<View style={{flex: 1}}>
				<Header>
					<Left>

					</Left>
					<Body>
						<Title>PokeMap</Title>
					</Body>
					<Right>
						<Button transparent onPress={this.logout}>
							<Icon name="power"/>
						</Button>
					</Right>
				</Header>
				<MapView
					style={{flex: 1}}
					initialRegion={this.state.location}
					provider={MapView.PROVIDER_GOOGLE}
					customMapStyle={mapStyle}
					onRegionChangeComplete={(x)=>this.recordEvent(x)}
				>
					{this.renderPokemon()}
				</MapView>
				<Fab 
					direction="left" 
					position="bottomRight"
					style={{backgroundColor: 'green'}}
					onPress={this.addPokemon}
				>
					<Icon name="add"/>
				</Fab>
				<Fab 
					direction="right" 
					position="bottomLeft"
					style={{backgroundColor: 'red'}}
					onPress={this.removePokemon}
				>
					<Icon name="remove"/>
				</Fab>
			</View>
		)
	}
}

export default createContainer(params=>{
	Meteor.subscribe('pokemon');

	return{
		pokemon: Meteor.collection('pokemon').find({})
	};
}, PokeMap);




