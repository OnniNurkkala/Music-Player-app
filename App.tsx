import React from 'react';
import { StyleSheet, View } from 'react-native';

import Musicplayer from './Musicplayer';


export default function App() {

  return (
    <View style={styles.container}>
      <Musicplayer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})
