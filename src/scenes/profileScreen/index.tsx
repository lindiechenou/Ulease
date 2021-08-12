import React, {useEffect, useState} from 'react';
import { RefreshControl } from 'react-native';
import { Alert, ScrollView, View, ImageStyle, TouchableOpacity, SafeAreaView, ActionSheetIOS, Pressable, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Icon, Layout, StyleService, Text, useStyleSheet, TopNavigation, TopNavigationAction, Divider, IconProps, Input } from '@ui-kitten/components';
import { ProfileSetting } from './extra/profile-setting.component';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { Profile } from './extra/data';
import {EditIcon, CameraIcon} from '../../components/icons'
import {UserContext} from '../../navigations/UserProvider'
import {AuthContext} from '../../navigations/AuthProvider'
import { resolvePlugin } from '@babel/core';
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileScreenParamList, SubleaseInfo} from 'types';
import { ProfileSubleaseScreen } from '../../components/usersublease.component';
import {getImageURL} from '../../services/subleaseList'
import { University} from 'types';
import { changePWord } from '../../services/subleaseList';

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileScreenParamList, 'Profile'
>;
type Props = {
  navigation: ProfileScreenNavigationProp;
};

const universities = require('../../components/universities.json')
export const ProfileScreen = ({ navigation }:Props): React.ReactElement => {
  
  const [refreshing, setRefreshing] = React.useState(true);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const { state, logout } = React.useContext(AuthContext);
  const [newPassword1, setPassword1] = React.useState('');
  const [newPassword2, setPassword2] = React.useState('');
  const [password1Visible, setPassword1Visible] = useState<boolean>(true);
  const [password2Visible, setPassword2Visible] = useState<boolean>(true);

  const [passwordMatchError, setPasswordMatchError] = React.useState<boolean>(false);
  const {userState , requestUser} = React.useContext(UserContext)
  const styles = useStyleSheet(themedStyles)
 

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.photoButton}
      size='small'
      status='basic'
      accessoryLeft={CameraIcon}
    />
  ); 

  useEffect( () => {
    async function fetchUser() {
      if(refreshing)
        if(state.userToken != undefined){
          await requestUser(state.userToken)
          setRefreshing(false)
        }
    }
    fetchUser()
  }, [refreshing]);

  const renderEdit = (): React.ReactElement => (
    <TopNavigationAction icon={EditIcon}></TopNavigationAction>
  );


  const onPassswordIconPress =(): void=>{
    setPassword1Visible(!password1Visible);
  };

  const onPassswordIconPress2 =(): void=>{
    setPassword2Visible(!password2Visible);
  };

  const renderIcon = (style:IconProps) =>(
    <TouchableWithoutFeedback onPress={onPassswordIconPress}>
      <Icon {...style} name={password1Visible ? 'eye-off' : 'eye'}></Icon>
    </TouchableWithoutFeedback>
  )

  const renderIcon2 = (style:IconProps) =>(
    <TouchableWithoutFeedback onPress={onPassswordIconPress2}>
      <Icon {...style} name={password2Visible ? 'eye-off' : 'eye'}></Icon>
    </TouchableWithoutFeedback>
  )

  const onSubmitButtonPress = (): void =>{
    let valid = true;
    if(newPassword1.trim()===""){
      valid = false;
    }
    if(newPassword2.trim()===""){
      valid = false;
    }
    if(newPassword1 != newPassword2){
      valid=false;
    }
    if(valid){
      changePWord(state.userToken, newPassword1,newPassword2)
      .then((response) => {
        if(response==undefined){
          
        }else{
          setModalVisible(false)
          Alert.alert("Password successfully changed")
        }
      })
    } else{
      setPasswordMatchError(true)
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='My Profile' alignment='center' accessoryRight={renderEdit}/>
      <Divider/>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Layout
          style={styles.photoSection}
          level='1'>
          <ProfileAvatar
            style={styles.photo}
            source={require('./assets/image-profile.jpg')}
            editButton={renderPhotoButton}
          />
          <View style={styles.nameSection}>
            <ProfileSetting
              style={styles.setting}
              value={userState.first_name + ' '+ userState.last_name}
            />
          </View>
        </Layout>
        <Text category='s1' style={styles.headerSetting}>Personal Info</Text>
        <ProfileSetting
          style={[styles.setting]}
          hint='Email'
          value={userState.email}
        />
        <ProfileSetting
          style={[styles.setting]}
          hint='University'
          value={universities.find( ( {key}:University ) => key.toLowerCase() === userState.university_choices.toLowerCase() )?.name}
        />
        <Text category='s1' style={styles.headerSetting}>Privacy</Text>
        <Divider/>
        <React.Fragment>
          <TouchableOpacity
           onPress={() => setModalVisible(true)}
            style={[styles.setting, styles.passwordContainer]}>
             <Text
              category='s1'>
              Change Password
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
          <Divider/>
        <ProfileSubleaseScreen navigation={navigation}/>
        <Button 
          style={styles.doneButton}
          accessoryLeft={(style:IconProps) => <Icon {...style} name={'logout'} pack='material'/>}
          onPress={() => logout()}
          status='primary'>
          Log Out
        </Button>
        
      </ScrollView>
      <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
               <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.keyboardContainer}
                  >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.backgroundHeader}>
                      <Text category='h6' style={styles.headerText}>Change Password</Text>
                    </View>
                    {passwordMatchError && (
                      <Text style={styles.error}>Password fields must match and cannot be blank</Text>
                    )}
                    <View style={styles.contentView}>
                      <Input style={styles.modalText}
                          label={evaProps => <Text {...evaProps}>New Password</Text>}
                          secureTextEntry={password1Visible}
                          autoCapitalize='none'
                          accessoryRight={renderIcon}
                          onChangeText={text=>{
                            setPasswordMatchError(false)
                            setPassword1(text)
                          }

                          }
                      />
                      <Input style={styles.modalText}
                          label={evaProps => <Text {...evaProps}>Repeat New Password</Text>}
                          secureTextEntry={password2Visible}
                          autoCapitalize='none'
                          accessoryRight={renderIcon2}
                          onChangeText={text=>{
                            setPasswordMatchError(false)
                            setPassword2(text)
                          }
                        }
                      />
                    </View>
                        
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                        onPress={onSubmitButtonPress}>
                        submit
                        
                    </Button>
                    <Button status='primary' 
                      size='medium'
                      onPress={() => setModalVisible(!modalVisible)}
                      style={styles.button}>cancel</Button>
                    </View>
                  </View>
                </View>
                </KeyboardAvoidingView>
              </Modal>
    </SafeAreaView>
  );
  }

const themedStyles = StyleService.create({
  icon: {
    width: 25,
    height: 25,
  },
  keyboardContainer:{
    flex:1,
  },
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
    minHeight: 192,
  },
  passwordContainer:{
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error:{
    color: "red",
    textAlign:'left',
    fontWeight:'bold',
    margin:10,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  photo: {
    aspectRatio: 1.0,
    height: 76,
  },
  photoButton: {
    aspectRatio: 1.0,
    height: 32,
    borderRadius: 16,
  },
  nameSection: {
    flex: 1,
    marginHorizontal: 8,
  },
  description: {
    padding: 24,
    backgroundColor: 'background-basic-color-1',
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  setting: {
    padding: 16,
  },
  headerSetting: {
    marginTop: 24,
    marginBottom:8,
    marginHorizontal:8
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 24,
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 64,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginVertical:10,
    marginHorizontal:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },



  backgroundHeader:{
    backgroundColor:"color-primary-500",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingBottom:15,
  },

  headerText:{
    textAlign:'center',
    marginTop:15,
    color:'white',
  },
  buttonGroup:{
    justifyContent:'center',
    alignContent:'center',
    flexDirection:'row'
  },
  contentView:{
    justifyContent:'center',
    alignContent:'center',
    margin:15.
  },

});