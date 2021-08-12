

import React, { useEffect } from 'react';
import { ImageBackground, ListRenderItemInfo, StyleSheet, View, RefreshControl } from 'react-native';
import { Button, Card, List, Text, Input } from '@ui-kitten/components';
import { MapIcon, SearchIcon } from '../../components/icons';
import { sub } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { Divider, Layout, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import {AddressComponent} from '../../components/address.component'
import { ImageHeader } from '../../components/primaryImage.componenet';
import { SavedScreenParamList, ImageResponse, SubleaseResponse} from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import {AuthContext} from '../../navigations/AuthProvider'
import {SubleaseContext} from '../../navigations/SubleaseProvider'

type SavedScreenNavigationProp = StackNavigationProp<
 SavedScreenParamList, 'Saved'
>;
type Props = {
  navigation: SavedScreenNavigationProp;
};
export const SavedListScreen = ({ navigation }:Props): React.ReactElement => {

  const [refreshing, setRefreshing] = React.useState(true);
  const {state} = React.useContext(AuthContext);
  const {subleaseState, requestSubleaseSaved} = React.useContext(SubleaseContext)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);
  

    const onPress = (id:string) => {
      const disabled:boolean=false;
      navigation.navigate('Sublet', {id, disabled});
    }

    /*
    const navigateMap = () => {
        navigation.navigate('Map');
    };*/


    const ScreenList = (): React.ReactElement => (
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation title='My Saved Properties' alignment='center'/>
        <Divider/>
    </SafeAreaView>
    );

    //this is where we can format what image shows up in list vie
  const renderItemHeader = (image:Array<ImageResponse>): React.ReactElement => (
      <ImageHeader images={image} style={{height: 160}}/>
    ); 

  
  useEffect( () => {
      async function fetchSubleaseSaved() {
        if(refreshing){
          if(state.userToken != undefined){
            await requestSubleaseSaved(state.userToken)
          }
          setRefreshing(false)
        }
      }
      fetchSubleaseSaved()
    }, [refreshing]);

  interface renderItemProps {
    index:number
    item:SubleaseResponse
  }

  const renderItem = ({index, item}:renderItemProps): React.ReactElement => {
    return(
      <Card 
        onPress={() => onPress(item.id)}
        style={styles.item}
        header={() => renderItemHeader(item.images)}>
        <Text style={{marginHorizontal: -4,}}
            category='h6'>
            {item.room_type} Room in {item.housing_type}
        </Text>
        <View style={styles.itemFooter}>
          <Text
            category='s1'>
            ${item.cost_per_month}/month
          </Text>
          <AddressComponent address={item.address} category='p2'/>
      </View>
    </Card>
    ); 
    }
      return (
      <List
          style={styles.list}
          data={subleaseState.saved.filter(sublease => (sublease.owner != state.email))}
          renderItem={renderItem}
          ListHeaderComponent={ScreenList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
      />
      );
   
}

const styles = StyleSheet.create({
    list: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 60,
      paddingTop: 16,
      paddingBottom: 8,
    },
    item: {
      borderRadius: 0,
      marginVertical: 8,
    },
    itemHeader: {
      height: 160,
    },
    textInfo:{
      textAlign: 'center',
      marginVertical: 8,
    },
    itemFooter: {
      flexDirection: 'column',
      marginTop: 16,
      marginHorizontal: -4,
    },
    activityButton: {
      marginHorizontal: 4,
      paddingHorizontal: 0,
    },
    imagesList: {
      padding: 8,
    },
  });
  