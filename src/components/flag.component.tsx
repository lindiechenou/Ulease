import Svg, {   
    Rect,
  } from 'react-native-svg';
  
  /* Use this if you are using Expo
  import * as Svg from 'react-native-svg';
  const { Circle, Rect } = Svg;
  */
  
  import React from 'react';
  import { View, StyleSheet, ImageStyle } from 'react-native';
  import {StyleService, useStyleSheet} from '@ui-kitten/components'
  export function FlagComponent(style: ImageStyle):React.ReactElement{
  
      return (
        <View
          {...style}
        >
          <Svg height="100%" width="100%" viewBox="0 0 18 15" style={styles.FlagItem}>
          <Rect
            x='0'
            y='0'
            width="18"  
            height="3"
            fill="red"
            />
            <Rect
              width="18"
              y='3'
              height="4"
              fill="orange"
            />
            <Rect
              width="18"
              height="3"
              y='6'
              fill="yellow"
            />
            <Rect
              width="18"
              height="3"
              y='9'
              fill="green"
            />
            <Rect
              width="18"
              height="3"
              y='12'
              fill="blue"
            />
            <Rect
              width="18"
              height="3"
              y='15'
              fill="purple"
            />
          </Svg>
        </View>
      );
    }
  

  const styles = StyleService.create({
      FlagItem:{
          flexDirection:'column',
      }

  })