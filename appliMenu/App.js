import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, Text, View,StyleSheet,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BarCodeScanner } from 'expo-barcode-scanner';
//import Search from "./Search";
//import Search from './Search.js'

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bibli CESI</Text>
        <Image
        style={{width: 400, height: 100}}
        source={require('./assets/logocesi.png')}
        />
         <Text></Text>
      <Button
        title="Aller a la lecture code barre "
        onPress={() => navigation.navigate('codeBarre')}
      />
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>type de code barre :{typeCodeBarre}{"/n"}</Text>
      <Text>donnée code barre :{dataCodeBarre}{"/n"}</Text>

      <Button title="Retour à l'acceuil" onPress={() => navigation.navigate('Home')} />
      <Text></Text>

      <Button
        title="relire le code barre"
        onPress={() => navigation.navigate('codeBarre')}
      />
      
    </View>
  );
}
function barrecode({navigation}) {
 
  return ( Search({navigation}));
}


var typeCodeBarre , dataCodeBarre;

function Search({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    typeCodeBarre=type;
    dataCodeBarre=data;
    navigation.navigate('Details');

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ title: 'Accueil' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Second écran' }}
        />
        <Stack.Screen
          name="codeBarre"
          component={barrecode}
          options={{ title: 'code Barre' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default App;