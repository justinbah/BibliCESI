
import * as React from 'react';
import { View, TextInput, Button } from 'react-native'

export default class Search extends React.Component {

  render() {
    return (
      <View>
        <TextInput placeholder='Titre du film'/>
        <Button title='Rechercher' onPress={() => {}}/>
      </View>
    )
  }
}


