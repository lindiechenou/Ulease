import React, { cloneElement, useEffect, useState } from 'react';
import { ImageBackground, ListRenderItemInfo, StyleSheet, View, RefreshControl, TouchableOpacity } from 'react-native';
import { Button, Card, List, Text, Input, } from '@ui-kitten/components';
import { EditIcon } from './icons';
import { sub } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { Divider, Layout, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import {getSubleaseList, getImageURL} from '../services/subleaseList'
import {AddressComponent} from './address.component'
import { ImageHeader } from './primaryImage.componenet';
import { SubleaseInfo, AddressInfo, AmenitiesInfo, GenderInfo, ImageInfo, ProfileScreenParamList} from 'types';
import {AuthContext} from '../navigations/AuthProvider'
import { StackNavigationProp } from '@react-navigation/stack';
import { UserContext } from '../navigations/UserProvider'
import {CreateSubletModal} from '../scenes/profileScreen/createSubletModal'
type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileScreenParamList, 'Profile'
>;
type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const ProfileSubleaseScreen = ({ navigation }:Props): React.ReactElement => {
  
  const {userState} = React.useContext(UserContext)
  const sublet = userState.user_sublease
  const [modalVisible, setModalVisible] = React.useState<boolean>(false)

    const onEditPress = () => {
      if(sublet !== undefined){
        navigation.navigate('EditSublet');
      }
    }
    const onCreatePress = () => {
      if(sublet == undefined){
       setModalVisible(true)
      }
    }
    const callbackModal = () => {
      setModalVisible(false)
    }
    const callbackCancelModal = () => {
      setModalVisible(false)
    }



  if(sublet == undefined){
    return(
      <View>
      <Text category='s1' style={styles.headerSetting}>My Listing</Text>
      <React.Fragment>
          <TouchableOpacity
            onPress={() => onCreatePress()}
            style={[styles.setting, styles.passwordContainer]}>
             <Text
              category='s1'>
              Create my new listing
            </Text>
            <Icon
              style={styles.icon}
              fill='#8F9BB3'
              name={'keyboard-arrow-right'}
              pack='material'
            />
          </TouchableOpacity>
          <Divider/>
          <CreateSubletModal modalVis={modalVisible} callbackModal={callbackModal} callbackCancelModal={callbackCancelModal}/>
        </React.Fragment>
      </View>
    )
  }else{
    return (
      <React.Fragment>
      <View>
      <Text category='s1' style={styles.headerSetting}>My Listing</Text>
      <React.Fragment>
          <TouchableOpacity
            onPress={() => onEditPress()}
            style={[styles.setting, styles.passwordContainer]}>
             <Text
              category='s1'>
              Edit My Listing
            </Text>
            <Icon
              style={styles.icon}
              fill='#8F9BB3'
              name={'keyboard-arrow-right'}
              pack='material'
            />
          </TouchableOpacity>
          <Divider/>
        </React.Fragment>
      </View>
    
    
    </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
    list: {
      flex: 1,
    },
    icon: {
      width: 25,
      height: 25,
    },
    setting: {
      padding: 16,
    },
    passwordContainer:{
      backgroundColor:'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      paddingHorizontal: 60,
      paddingTop: 16,
      paddingBottom: 8,
    },
    headerSetting: {
      marginTop: 24,
      marginBottom:8,
      marginHorizontal:8
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
  