import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { Button, Tooltip, Card, Icon, IconProps, Layout, List, StyleService, Text, useStyleSheet, TopNavigation, TopNavigationAction, Divider } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';;
import {BackIcon, BookmarkIcon, BookmarkOutlineIcon, InfoIcon} from '../../components/icons'
import {AddressComponent} from '../../components/address.component'
import {ImageList} from '../../components/Imagelist.component'
import {FlagComponent} from '../../components/flag.component'
import { ImageHeader } from '../../components/primaryImage.componenet';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListScreenParamList, ProfileScreenParamList, SavedScreenParamList } from 'types';
import {AuthContext} from '../../navigations/AuthProvider'
import { SubleaseContext } from '../../navigations/SubleaseProvider';
import { UserContext } from '../../navigations/UserProvider';
import { RouteProp } from '@react-navigation/native';
import {SubleaseResponse} from 'types';
class Amenity {
    constructor(readonly icon: string,
                readonly title: string) {
    }
}



type SubletScreenNavigationProp = StackNavigationProp<
  ListScreenParamList | SavedScreenParamList,
  'Sublet'
>;
type SubletScreenRouteProp = RouteProp<ListScreenParamList | SavedScreenParamList | ProfileScreenParamList, 'Sublet'>;

type Props = {
  navigation: SubletScreenNavigationProp;
  route: SubletScreenRouteProp;
};

export const SubletScreen = ({route, navigation}:Props) => {
  const {state} = React.useContext(AuthContext);
  const {userState} = React.useContext(UserContext)
  const {subleaseState, deleteSubleaseSaved, postSubleaseSaved} = React.useContext(SubleaseContext)
  const {id} = route.params;
  const {disabled} = route.params

  useEffect(() => {
    if(id == undefined){
      navigation.goBack()
    }
  }, [id])

  
  let sublease:SubleaseResponse | undefined;
  //if this is the user sublet
  if(disabled){
    sublease = userState.user_sublease
  }else{
    sublease = subleaseState.data.find(sublease => sublease.id === id)
  }
  
  const isSaved = ():boolean => {
    
    if(sublease != undefined && state.email != undefined && sublease.saved_list.indexOf(state.email) != -1){
      return true;
    }else{
      return false;
    }
  }

  const [bookmarked, setBookmarked] = React.useState<boolean>(isSaved())
  const [infoVisible, setInfoVisible] = React.useState(false);
  
  let amenities:Amenity[] = [];
  let requirements :string[] = [];
  let startDate:Date;
  let endDate:Date;
  if(sublease != undefined){
    
    if(sublease?.is_furnished){
      amenities.push(new Amenity("single-bed", "Furnished"))
    } 
    if(sublease?.fitness_center){
      amenities.push(new Amenity("fitness-center", "Fitness Center"))
    }
    if(sublease?.free_parking){
        amenities.push(new Amenity("local-parking", "Parking"))
    }
    if(sublease?.pool_available){
        amenities.push(new Amenity("pool", "Pool"))
    }
    if(sublease?.washer_dryer){
        amenities.push(new Amenity("local-laundry-service", "Laundry"))
    }
    if(sublease?.pets_allowed){
      amenities.push(new Amenity("pets", "Pet Friendly"))
    }
  if(sublease?.lgbt_friendly){
      amenities.push(new Amenity("flag", "LGBTQ+ Friendly"))
  }
    if(amenities.length == 0){
      amenities.push(new Amenity("sentiment-very-dissatisfied", 'no amenities selected'))
    }

    if(sublease?.women_allowed){
      requirements.push("women")
    }
    if(sublease?.men_allowed){
      requirements.push("men")
    }
    if(sublease?.nb_other_allowed){
      requirements.push("non-binary")
    }
    if(requirements.length == 0){
      requirements.push("no preferences selected")
    }
    

    startDate = new Date(sublease.start_lease)
    endDate = new Date(sublease.end_lease)
}
  const styles = useStyleSheet(themedStyles);

  async function onBookmarkActionPress() {
    if(state.userToken != undefined){
      if(!disabled){
        setBookmarked(!bookmarked);
        if(!bookmarked){
          postSubleaseSaved(id, state.userToken)
          
        }
        else{
          deleteSubleaseSaved(id, state.userToken)
        }
    }
  }
  };

  const renderBookmarkAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
      onPress={() => onBookmarkActionPress()}
    />
  );

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
 )

  const onMessageButtonPress = (): void => {

  };

  const renderOptionItemIcon = (style: ImageStyle, icon: string): React.ReactElement => (
    <Icon {...style} name={icon} pack='material'/>
  );
  const renderFlagItemIcon = (style: ImageStyle, icon: string): React.ReactElement => (
    <FlagComponent {...style}/>
  );

  const renderGenderInfo = (): React.ReactElement => (
    <TouchableOpacity style={styles.genderInfo} onPress={() => setInfoVisible(true)}>
          <Icon style={styles.icon} name='info-outline'/>
    </TouchableOpacity>
  )
  const renderOptionItem = (option:Amenity, index: number): React.ReactElement => (
    <Button
      key={index}
      style={styles.optionItem}
      appearance='ghost'
      size='small'
      accessoryLeft={(style: IconProps) => {return ((option.icon == "flag") ? renderFlagItemIcon(style, option.icon) : renderOptionItemIcon(style, option.icon))}}
      >{option.title}
    </Button>
  );
  const renderTitle = (): React.ReactElement => {
      if(sublease?.num_roomates == 1){
          return(
            <Text style={styles.title}
            category='s1'>{sublease.room_type} Room in {sublease.housing_type} with {sublease.num_roomates} Roomate</Text>
            )
        }
      else if(sublease != undefined && sublease?.num_roomates > 1){
      return(
      <Text style={styles.title}
      category='s1'>{sublease.room_type} Room in {sublease.housing_type} with {sublease.num_roomates} Roomates</Text>
      )}
  
      else if(sublease?.num_roomates == 0){
        return(
          <Text style={styles.title}
          category='s1'>{sublease.room_type} Room in {sublease.housing_type} with no roomates</Text>
        )
      }
      return <Text></Text>
    }
  const renderDetailItem = (detail: string, index: number): React.ReactElement => (
    <Button
      key={index}
      style={styles.detailItem}
      appearance='outline'
      size='tiny'>
      {detail}
    </Button>
  );

  const formatDate = (date:Date | undefined):string => {
    if(date != undefined){
      return `${date.getUTCMonth()+1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
    }else{
      return '...'
    }
  }

  const renderBookingFooter = (): React.ReactElement => (
    <View>
      <Layout style={styles.featureInfoText}>
      <Text category='s1'>Availability</Text></Layout>
      <Text
        style={styles.description}>
        {formatDate(startDate)} to {formatDate(endDate)}
      </Text>
      <Layout style={styles.genderInfoContainer}>
        <Text category='s1'>Gender Preferences </Text>
        <Tooltip
          style={styles.tooltip}
          anchor={renderGenderInfo}
          visible={infoVisible}
          onBackdropPress={() => setInfoVisible(false)}>
          We value inclusivity, which is why we encourage students to welcome all gender identities. That being said, we encourage those who do not identify with traditional genders to reach out to sublets that identify as LGBTQ+ friendly and/or list non-binary on their gender preferences
        </Tooltip>
      </Layout>
      <View style={styles.detailsList}>
        {requirements.map(renderDetailItem)}
      </View>
       <Layout style={styles.featureInfoText}>
      <Text category='s1'>Features</Text></Layout>
      <View style={styles.optionList}>
        {amenities.map(renderOptionItem)}
      </View>
    </View>
  );
  if(sublease != undefined){
  return (
    <View style={{flex:1}}>
    <TopNavigation title='Property Details' alignment='center' accessoryLeft={BackAction} accessoryRight={() => renderBookmarkAction()}/>
    <ScrollView style={styles.container}>
      <ImageHeader images={sublease.images} style={{height: 260}} />
      <Card
        style={styles.bookingCard}
        appearance='filled'
        disabled={true}
        footer={renderBookingFooter}>
        {renderTitle()}
       <AddressComponent address={sublease.address} category='p2'/>
        <Text
          style={styles.rentLabel}
          appearance='hint'
          category='p2'>
          Rent {sublease.housing_type}
        </Text>
        <Text
          style={styles.priceLabel}
          category='h6'>
          ${sublease.cost_per_month}
          <Text>/month</Text>
        </Text>
        <Button
          style={styles.bookButton}
          onPress={onMessageButtonPress}>
          MESSAGE
        </Button>
      </Card>
      <Text
        style={styles.sectionLabel}
        category='s1'>
        About
      </Text>
      <Text
        style={styles.description}
        appearance='hint'>
        {sublease.description}
      </Text>
    
      <Text
        style={styles.sectionLabel}
        category='s1'>
        Photos
      </Text>
      <ImageList imageList={sublease.images}/>
    </ScrollView>
    </View>
  );
}else{
  return (<View></View>);
}
}

const themedStyles = StyleService.create({
  icon: {
    width: 16,
    height:16, 
  },
  container: {
    backgroundColor: 'background-basic-color-2',
    contentInset: {top:100},
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  tooltip:{
    width:'90%',
    flexWrap:'wrap'
  },
  title: {
    width: '100%',
  },
  rentLabel: {
    marginTop: 24,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 8,
  },
  detailsList: {
    width:'100%',
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginHorizontal: 8,
    marginVertical: 8,
    marginBottom:8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 8,
  },
  optionList: {
    width:'100%',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    marginHorizontal: 0,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal:0,
    paddingHorizontal: 0,
    width:'50%',
    justifyContent:'flex-start'
  },
  genderInfo:{
    marginTop:0
  },
  genderInfoContainer:{
    margin:8,
    display: 'flex',
    width:'40%',
    flexDirection:'row',
    flexWrap:'nowrap',
  },
  featureInfoText:{
    marginLeft:8,
    marginTop:8,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imagesList: {
    padding: 8,
    backgroundColor: 'background-basic-color-2',
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
