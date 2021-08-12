import React, {useState, Component} from 'react';
import {ImageStyle, TouchableWithoutFeedback, View, Platform, Keyboard, KeyboardAvoidingView} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Input,
  StyleService,
  useStyleSheet,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import {EmailIcon} from '../../components/icons'; 
import {AuthContext} from '../../navigations/AuthProvider'

//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthNavigationParamList } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import {Panel} from '../../components/panel.component';
import {ImageOverlay} from '../../components/image-overlay.component'
type LoginScreenNavigationProp = StackNavigationProp<
  AuthNavigationParamList
>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

export const LoginScreen = ({ navigation }:Props): React.ReactElement => {
  const {login} = React.useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  //error handling
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const navigateForgot = () => {
      navigation.navigate('Forgot');
    };
  const sign = () => {
    navigation.navigate('SignUP');
  };


  const renderIcon = (style:IconProps) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <Icon {...style} name={passwordVisible ? 'eye-off' : 'eye'}></Icon>
      </TouchableWithoutFeedback>  )

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      
      <ImageOverlay
        style={styles.container}
        source={require('../../components/ulease.png')}>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
     
        <Input
          label="Email"
          style={emailError ? styles.errorInput : styles.passwordInput}
          placeholder="University Email"
          accessoryRight={EmailIcon}
          keyboardType={'email-address'}
          value={email}
          status='control'
          onChangeText={text => {
            setInvalidError(false)
            setEmailError(false);
            setEmail(text);
          }}
          autoCapitalize='none'
          
        />
       
        <Input
          style={emailError ? styles.errorInput : styles.passwordInput}
          label="Password"
          placeholder="Password"
          accessoryRight={renderIcon}
          status='control'
          value={password}
          secureTextEntry={passwordVisible}
          autoCapitalize='none'
          onChangeText={text => {
            setInvalidError(false)
            setPasswordError(false);
            setPassword(text);
          }}
        />
      
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="control"
            onPress={navigateForgot}
          >
            Forgot password?
          </Button>
        </View>
        {(emailError || passwordError || invalidError) &&
         
         (<Panel title={"Error..."}>
             {emailError && (
               <Text style={styles.error}>Email must be a university email</Text>
             )}
             {passwordError && (
               <Text style={styles.error}>Password field is required</Text>
             )}
              {invalidError && (
               <Text style={styles.error}>Email and/or Password is incorrect</Text>
           )}
         </Panel>
         )}
      </View>
      
      <View style={{justifyContent:'flex-end'}}>
      <Button style={styles.signInButton} 
      size="giant" 
      
      onPress={() => {
        let valid = true;
         if (email.trim() === "" || email.match('\\.edu$') == null) {
          setEmailError(true)
          valid = false;
          
        } else {
          setEmailError(false);
        } 
       
        if (password.trim() === "") {
          setPasswordError(true)
          valid = false;
        } else {
          setPasswordError(false)
        }
        if(valid){
          login({email, password}).then(response => {
            if(response == undefined){
              setInvalidError(true)
            }
          })
      }
     }
        }>
        SIGN IN
      </Button>
      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="control"
        onPress={sign}
      >
        Don't have an account? Create
      </Button>
      </View>
      </View>
      </TouchableWithoutFeedback>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleService.create({
  innerView: {
    padding: 10,
    flex: 1,
    justifyContent: "space-around"
  },
  name: {
    // color: '#0d6efd', 
    color: 'white',
    fontFamily: 'Lobster-Regular', 
    fontSize: 70,
    
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textShadowColor: '#177796',
  },
  error:{
    textAlign:'right',
  },
  container: {
    flex:1
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
    color:'white',
    paddingHorizontal: 50,
    textAlign:'center'
  },
  signInButton: {
    marginHorizontal: 16,
    borderRadius: 30,
    borderColor:'white',
    backgroundColor:'#177796'
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
    borderRadius: 30,
  },
  errorInput: {
    marginTop: 16,
    borderRadius: 30,
    borderColor:'red'
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
