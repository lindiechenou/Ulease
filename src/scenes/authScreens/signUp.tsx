import React, {useState} from 'react';
import { View, Platform, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Modal} from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  StyleService,
  Icon,
  IconElement,
  Text,
  Autocomplete,
  AutocompleteItem,
  IndexPath,
  Select,
  SelectItem,
  Card,
  IconProps
} from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {ImageOverlay} from '../../components/image-overlay.component'
import { EmailIcon, PersonIcon, UniversityIcon } from '../../components/icons';

import {AuthContext} from '../../navigations/AuthProvider'
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



const universities:UniParams[] = require('../../components/universities.json')
const backgroundImage = require('../../components/ulease.png')

import { StackNavigationProp } from '@react-navigation/stack';
import { AuthNavigationParamList, UniParams } from 'types';
import {Panel} from '../../components/panel.component';

type SignInNavigationProp = StackNavigationProp<
 AuthNavigationParamList, 'SignUP'
>;
type Props = {
  navigation: SignInNavigationProp;
}

export const SignUpScreen = ({ navigation }:Props): React.ReactElement => {
  const {register} = React.useContext(AuthContext);
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [password2, setPassword2] = React.useState<string>('');
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);
  const [passwordVisible2, setPasswordVisible2] = React.useState<boolean>(true);

  const [showVerification, setShowVerification] = React.useState(false);
 
  //error handling
  
  const [eduError, setEduError] = React.useState<boolean>(false)
  const [firstNameError, setFirstNameError] = React.useState<boolean>(false)
  const [universityError, setUniversityError] = React.useState<boolean>(false)
  const [lastNameError, setLastNameError] = React.useState<boolean>(false)
  const [termsAcceptedError, setTermsAcceptedError] = React.useState<boolean>(false)
  const [passwordMatchError, setPasswordMatchError] = React.useState<boolean>(false)
 
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  
  const university = universities[selectedIndex.row].name;
  const [contactUs, setContactUs] = React.useState<boolean>(false);
  const [resend, setResend] = React.useState<boolean>(false)
  
  const renderOption = (item:UniParams, index:number) => (
    <SelectItem
      key={index}
      title={item.name}
    />
  );

  const onSignUpButtonPress = (): void => {
    let valid = true;
   if(email.match('\\.edu$') == null ){
     valid = false;
     setEduError(true);
   }
   
  if (password !== password2 || password.trim() == "" || password.trim() == "") {
    setPasswordMatchError(true)
    valid = false;
  } 
  if (lastName.trim() === "") {
    setLastNameError(true)
    valid = false;
  } 
  if (firstName.trim() === "") {
    setFirstNameError(true);
    valid = false;
  } 
  const uniRequest = universities.find( ({ name }) => name === university )?.key
  if (university.trim() === "" ||  uniRequest == undefined) {
    setUniversityError(true);
    valid = false;
  } 
  if(!termsAccepted){
    setTermsAcceptedError(true)
    valid=false;
  }
   if(valid){
     if(uniRequest)
        register({email, password, password2, firstName, lastName, university:uniRequest})
        .then( response => {
            if(response != undefined){
              setShowVerification(true)
            }
        })
  }
  };
  const renderLoginIcon = (style: IconProps): IconElement => (
    <Icon {...style} name={'login'} pack='material'/>
  );
  
  const onSelect = (index:IndexPath ) => {
    setUniversityError(false); 
    //setUniversity(universities[index].name);
    setSelectedIndex(index)
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('Login');
  };

  const renderIcon = (style:IconProps) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <Icon {...style} name={passwordVisible ? 'eye-off' : 'eye'}></Icon>
      </TouchableWithoutFeedback>  )
 const renderCheckBoxText = () => (
  <Text style={styles.termsCheckBoxText}>I read and agree to the Terms & Conditions</Text>
  )

const renderIcon2 = (style:IconProps) => (
  <TouchableWithoutFeedback onPress={onPasswordIconPress2}>
      <Icon {...style} name={passwordVisible2 ? 'eye-off' : 'eye'}></Icon>
    </TouchableWithoutFeedback>  )

const onPasswordIconPress2 = (): void => {
  setPasswordVisible2(!passwordVisible2);
};

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <ImageOverlay
        style={styles.container}
        source={backgroundImage}>
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      viewIsInsideTabBar={true}
      scrollEnabled={(Platform.OS === 'ios')}
      enableAutomaticScroll={(Platform.OS === 'ios')}
      enableOnAndroid={true}
    >
      
    
        <View style={styles.innerView}>

          <View style={styles.headerContainer}>
            <Text
              category="h1"
              status="control"
              style={styles.name}>
              ULease
            </Text>
            <Text
                style={styles.signInLabel}
                category='s1'
              >
              The short term housing finder for university students
            </Text>
          </View>
      
          <View style={styles.formContainer}>
            <Text category="s1" style={styles.infoHeader}>Login Info</Text>
           
              <Input
                style={eduError ? styles.errorInput : styles.emailInput}
                autoCapitalize='none'
                placeholder='University Email'
                accessoryRight={EmailIcon}
                keyboardType={'email-address'}
                status='control'
                value={email}
                onChangeText={text => {
                  setEduError(false)
                  setEmail(text);
                }}
              /> 
            
              <Input
                  style={passwordMatchError ? styles.errorInput : styles.emailInput}
                  autoCapitalize='none'
                  secureTextEntry={passwordVisible}
                  placeholder='Password'
                  status='control'
                  accessoryRight={renderIcon}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setPasswordMatchError(false)
                  }}
              />
              
              <Input
                style={passwordMatchError ? styles.errorInput : styles.emailInput}
                autoCapitalize='none'
                secureTextEntry={passwordVisible2}
                placeholder='Retype Password'
                accessoryRight={renderIcon2}
                value={password2}
                status='control'
                onChangeText={text => {
                  setPassword2(text);
                  setPasswordMatchError(false)
                }}
              />

            <Text category="s1" style={styles.infoHeader}>Personal Info</Text>
         

              <Input
                style={firstNameError ? styles.errorInput : styles.emailInput}
                placeholder='First Name'
                accessoryRight={PersonIcon}
                value={firstName}
                status='control'
                onChangeText={text => {
                  setFirstNameError(false);
                  setFirstName(text);
                }}
              />
        
            
              <Input
                style={lastNameError ? styles.errorInput : styles.emailInput}
                placeholder='Last Name'
                accessoryRight={PersonIcon}
                status='control'
                value={lastName}
                onChangeText={text => {
                  setLastNameError(false);
                  setLastName(text);
                }}
              /> 
             
               <Select style={universityError ? styles.errorInput : styles.emailInput}
                placeholder='Choose your university'
                status='control'
                onSelect={index => onSelect(index)}
                value={university}
                accessoryRight={
                 UniversityIcon
                }
                >   
                {universities.map(renderOption)}
              </Select>
             

            <CheckBox
              style={termsAcceptedError ? styles.errorInput : styles.emailInput}
              // text='I read and agree to Terms & Conditions'
              checked={termsAccepted}
              onChange={(checked: boolean) => {
                setTermsAccepted(checked)
                setTermsAcceptedError(false)

              }}
              status='basic'
            >
            {renderCheckBoxText}
            </CheckBox>
           
          <Button
            style={styles.signUpButton}
            size='giant'
            onPress={onSignUpButtonPress}>
            SIGN UP
          </Button>
          <Button
            style={styles.signInButton}
            appearance='ghost'
            status='control'
            onPress={onSignInButtonPress}>
            Already have an account? Sign In
          </Button>
          
          {(eduError || passwordMatchError || firstNameError || lastNameError || universityError || termsAcceptedError) &&
         
          (<Panel title={"Error..."}>
              {eduError && (
                <Text style={styles.error}>Email must be a university email</Text>
              )}
              {passwordMatchError && (
                <Text style={styles.error}>Password fields must match</Text>
              )}
               {firstNameError && (
                <Text style={styles.error}>First Name is Required</Text>
              )}
               {lastNameError && (
                <Text style={styles.error}>Last Name is Required</Text>
              )}
              {universityError && (
                  <Text style={styles.error}>University must be listed</Text>
                )}
              {termsAcceptedError && (
                <Text style={styles.error}>Please agree to our Terms & Conditions</Text>
            )}
          </Panel>
          )}

        </View>

        </View>
        <Modal
          visible={showVerification}
          animationType='fade'
          transparent={true}
          onRequestClose={() => {
            setShowVerification(!showVerification)
          }
        }>
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
          <Text category='s1' style={styles.verificationheader}>Verify Your Email Address</Text> 
              <Text style={styles.inlineText}>
                <Text numberOfLines={5}>A verification email was successfully sent to </Text>
                <Text style={styles.inlineTextBold}>{email}</Text>
                <Text>. Please click the link provided in the email to access your account. If you did not receive an email, please </Text>
                <Text 
                  style={(contactUs ? styles.pressableText:{color:'blue'})} 
                  onPress={() => {
                    console.log('contact button') 
                    setContactUs(true)
                  }}>contact us</Text>
                <Text> or </Text>
                <Text 
                  style={(resend ? styles.pressableText:{color:'blue'})} 
                  onPress={() => {
                    console.log('resend email button')
                    setResend(true)
                  }}>resend your email</Text>
              </Text>
          <Button style={styles.loginButton} 
          accessoryLeft={renderLoginIcon} 
          size='small'
          onPress={() =>{
            setShowVerification(false) 
            navigation.navigate('Login')}}>
            Back to Login
          </Button>
          </View>
        </View>
      </Modal>

    </KeyboardAwareScrollView>
    </ImageOverlay>
  );
};

const styles = StyleService.create({
  
  errorInput:{
    borderColor:'red',
    borderRadius:30,
    marginTop:1,
  },
  pressableText:{
    color:'rgba(0,0,255, .5)'
  },
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    padding: 35,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor:'white',
    width:'90%',
    borderRadius:30,
    borderColor:'#177796',
    borderWidth:2,
  },
  
  inlineText:{
    flexDirection:'row',
    justifyContent:'flex-start',
    textAlign:'justify',
    lineHeight:20,
  },
  inlineTextBold:{
    fontWeight:'bold',
  },
  autoItem:{
    borderColor:'#177796'
  },
  innerView: {
    paddingHorizontal: 20,
    flex:1,
    justifyContent:'space-between'
  },
  infoHeader:{
    marginTop:10,
    borderRadius: 30,
    color:"white"
  },
  loginButton: {
    marginTop:8,
    marginBottom:8,
    borderRadius:30,
    width:'70%',
    alignSelf:'center'
  },
  verificationheader:{
    marginTop:8,
    marginBottom:8,
  },
  error:{
    lineHeight:20,
    textAlign:'right',
    marginRight:20,
    
  },
  icon: {
    color:'#8F9BB3',
    width: 20,
    height: 20,
    marginRight:10
  },

  name: { 
    color: 'white',
    fontFamily: 'Lobster-Regular', 
    fontSize: 50,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textShadowColor: '#177796',
  },
  container: {
    flex:1,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 5,    // backgroundColor: 'color-primary-default',
    marginTop:20,
    justifyContent:'space-around'
  },
  signInLabel: {
    color:'white',
    paddingHorizontal: 50,
    textAlign:'center'
  },
 
  formContainer: {
    flex:7,
    justifyContent:'space-between'
    /*
    paddingTop: 16,
    paddingHorizontal: 16,
    flex:1 */
  },
  emailInput: {
    borderRadius: 30,
    marginTop:15,
  },
  Autocomplete: {
    marginTop: 16,
    borderRadius: 100,
  },
  termsCheckBox: {
    marginTop: 24,
    
  },
  termsCheckBoxText: {
   color:'white',
   marginLeft:10, 
  },
  signUpButton: {
    marginHorizontal: 16,
    marginTop:10,
    borderRadius: 30,
    borderColor:'white',
    backgroundColor:'#177796'
  },
  signInButton: {
    marginTop:-10,
    marginHorizontal: 16,
  },
});
