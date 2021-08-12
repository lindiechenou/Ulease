

import React, { useEffect } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { Button, Card, List, Text, Input } from '@ui-kitten/components';
import { MapIcon, SearchIcon } from '../../components/icons';
import {SubleaseContext} from '../../navigations/SubleaseProvider'
import { SafeAreaView } from 'react-native';
import { Divider, Layout, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import {AddressComponent} from '../../components/address.component'
import { ImageHeader } from '../../components/primaryImage.componenet';
import { ImageResponse, ListScreenParamList, SubleaseResponse} from 'types';
import {AuthContext} from '../../navigations/AuthProvider'
import { StackNavigationProp } from '@react-navigation/stack';

type ListScreenNavigationProp = StackNavigationProp<
 ListScreenParamList
>;
type Props = {
  navigation: ListScreenNavigationProp;
};

export const ListScreen = ({ navigation }:Props): React.ReactElement => {
  const [refreshing, setRefreshing] = React.useState(true);
  const {state} = React.useContext(AuthContext);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const {subleaseState, requestSubleaseList} = React.useContext(SubleaseContext)
  /*
  const renderSearchBar = (): React.ReactElement => (
    //to search: value={searchQuery}l..
    
      <Input style={styles.header}
        placeholder='Search'
        accessoryRight={SearchIcon}
      />
  );
  */


    const onPress = (id:string) => {
      const disabled:boolean=false;
      navigation.navigate('Sublet', {id, disabled} );
    }
    /*
    const navigateMap = () => {
        navigation.navigate('Map');
    };*/
    /*
    const MapAction = () => (
        <TopNavigationAction icon={MapIcon} title='map' onPress={navigateMap}/>
    )*/
    
    //when we integrate mapping again
    //<TopNavigation title={renderSearchBar} alignment='center' accessoryLeft={MapAction}/>
    
    const ScreenList = (): React.ReactElement => (
        <SafeAreaView style={{ flex: 1 }}>
         <TopNavigation title='Search Properties' alignment='center'/>
        <Divider/>
    </SafeAreaView>
    );

    //this is where we can format what image shows up in list vie
  const renderItemHeader = (image:Array<ImageResponse>): React.ReactElement => 
  {
      return(
      <ImageHeader images={image} style={{height: 160}}/>
      )
  }

  
  useEffect( () => {
    async function fetchSubleaseList() {
      if(refreshing){
        if(state.userToken != undefined){
          await requestSubleaseList(state.userToken)
        }
        setRefreshing(false)
      }
    }
    fetchSubleaseList()
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
        data={subleaseState.data.filter(sublease => (sublease.owner != state.email))}
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
  