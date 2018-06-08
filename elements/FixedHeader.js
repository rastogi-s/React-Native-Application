import React from 'react'
import {Header} from 'react-native-elements'
import {Icon} from 'native-base';
const FixedHeader = (navigation) => (
  <Header
    leftComponent={{ icon: 'menu', color: '#fff' }}
    centerComponent={{	text: 'Course Manager App',
      style: { color: '#fff' } }}
    //rightComponent={{ icon: 'home', color: '#fff' onPress:}}/>
    rightComponent={<Icon name={'home'} style={{color:'#fff'}}  onPress={()=> navigation.navigate('Home')}/>}/>
)

export default FixedHeader