import React, {useState, useRef, useEffect} from 'react';
import { View, Alert } from 'react-native';
import { Divider, Icon, Layout, StyleService,  useStyleSheet, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import {BackIcon, DeleteIcon, ForwardIcon, PersonIcon, PinIcon, HomeIcon, ImageIcon} from '../../components/icons'
import { ImageResponse, ProfileScreenParamList, ImageRequest} from 'types';
import { Menu, MenuItem } from '@ui-kitten/components';
import { AddressComponent } from '../../components/address.component';
import { SubletScreen } from '../subletScreen';
import {FlagComponent} from '../../components/flag.component'
import AddressModal from './AddressModal'
import PriceModal from './PriceModal'
import DescriptionModal from './DescriptionModal'
import HousingTypeModal from './HousingTypeModal'
import RoomTypeModal from './RoomTypeModal'
import AvailabilityModal from './AvailabilityModal'
import ImageHeaderModal from './ImageHeaderModal'
import GenderModal from './GenderModal'
import AmenitiesModal from './AmenitiesModal'
import RoommatesModal from './RoommatesModal'
import ImageModal from './ImageModal'

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {UserContext, Body} from '../../navigations/UserProvider'
type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileScreenParamList,
  'EditSublet'
>;
type ProfileScreenRouteProp = RouteProp<ProfileScreenParamList, 'EditSublet'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};



export const EditSubletScreen = ({ route, navigation }:Props) => {
   
    const [addressModal, setAddressModal] = useState<boolean>(false);
    const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
    const [housingTypeModal, setHousingTypeModal] = useState<boolean>(false);
    const [roomTypeModal, setRoomTypeModal] = useState<boolean>(false);
    const [priceModal, setPriceModal] = useState<boolean>(false);
    const [availabilityModal, setAvailabilityModal] = useState<boolean>(false);
    const [imageHeaderModal, setImageHeaderModal] = useState<boolean>(false);
    const [roommatesModal, setRoommatesModal] = useState<boolean>(false);
    const [imagesModal, setImagesModal] = useState<boolean>(false);
    const [amenitiesModal, setAmenitiesModal] = useState<boolean>(false);
    const [genderModal, setGenderModal] = useState<boolean>(false);
    
    const {userState, patchUserSublet, patchUserImages, createUserImages, deleteUserImages, deleteSublease} = React.useContext(UserContext)
    const sublet = userState.user_sublease
    
    if(sublet == null){
        navigation.goBack();
    }
    const styles = useStyleSheet(themedStyles)
    
    const navigateBack = () => {
        navigation.goBack();
      };
    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    )
    const DeleteAction = () => (
        <TopNavigationAction icon={DeleteIcon} onPress={deleteLease}/>
      )

    useEffect(() => {
        if(sublet == undefined){
            navigation.navigate('Profile')
        }
    }, [sublet])
  
    const deleteLease = () => {
        Alert.alert(
            "Delete Listing",
            "Are you sure you want to delete this listing? This action cannot be undone.",
            [
                
                  { text: "Yes, I'm sure", 
                  style: 'default',
                  onPress: () => {
                      
                      deleteSublease()} 
                },
                {
                    text: "Cancel",
                    style: "cancel"
                  },
            ]
        )
    }
    

    const callbackModal = (street:string, street2:string, city:string, state:string, zipcode:string) => {
        console.log("calling back address")
        const body:Body = {
            address:{
                street:street,
                street2:street2,
                city:city,
                state: state,
                zipcode: zipcode,
            }
        }
        patchUserSublet(body);
        setAddressModal(false);
    }

    const callbackDescriptionModal = (description:string) => {
       const body:Body = {
           description:description
       }
        patchUserSublet(body);
        setDescriptionModal(false);
    }
    const callbackHousingTypeModal = (ht:string) => {
        const body:Body = {
            housing_type:ht
        }
        patchUserSublet(body)
        setHousingTypeModal(false);
    }
    const callbackRoomTypeModal = (rt:string) => {
        const body:Body = {
            room_type:rt
        }
        patchUserSublet(body);
        setRoomTypeModal(false);
    }
    const callbackPriceModal = (price:number) => {
        const body:Body = {
            cost_per_month:price
        }
        patchUserSublet(body);
        setPriceModal(false);
    }

    const callbackAvailabilityModal = (startDate:Date, endDate:Date) => {
        const start_lease:string = `${startDate.getUTCFullYear()}-${startDate.getUTCMonth()+1}-${startDate.getUTCDate()}`
        const end_lease:string = `${endDate.getUTCFullYear()}-${endDate.getUTCMonth()+1}-${endDate.getUTCDate()}`
        
        const body:Body = {
            start_lease:start_lease,
            end_lease:end_lease,
        }
        patchUserSublet(body)
        setAvailabilityModal(false);
    }

    const callbackImageHeaderModal = (oldHeader:string, newHeader:string) => {
        async function fetch() {
        if(oldHeader !== newHeader){
            if(oldHeader != undefined){
                patchUserImages(oldHeader, false)
            }
            if(newHeader != undefined){
                patchUserImages(newHeader, true)
            }
        }
            
        }
        fetch()
        setImageHeaderModal(false);
    }

    const callbackImageModal = (images:ImageRequest[], deleteImage:string[]) => {
    
        if(images.length != 0){
            createUserImages(images);
        }

        if(deleteImage.length != 0){
            deleteUserImages(deleteImage);
        }
        setImagesModal(false);
    }

    const callbackRoommatesModal = (roommates:number) => {
        const body:Body = {
            num_roomates:roommates
        }
        patchUserSublet(body)
        setRoommatesModal(false);
    }

    const callbackAmenitiesModal = (furnished:boolean,
        fitness:boolean,
        parking:boolean,
        pool:boolean,
        laundry:boolean,
        pets:boolean,
        lgbtq:boolean,
    ) => {
        const body:Body = {
            fitness_center:fitness,
            pets_allowed:pets, 
            washer_dryer:laundry,
            is_furnished:furnished,
            pool_available:pool,
            lgbt_friendly: lgbtq,
            free_parking:parking,
        }
        patchUserSublet(body)
        setAmenitiesModal(false);
    }

    const callbackGenderModal = ( 
        men:boolean,
        women:boolean,
        nb:boolean
    ) => {
        const body:Body = {
            men_allowed:men,
            women_allowed:women,
            nb_other_allowed:nb,
        }
        patchUserSublet(body);
        setGenderModal(false);
    }

    const callbackCancelModal = (ref:Function) => {
        if(ref.name == 'AddressModal')
            setAddressModal(false);

        else if(ref.name == 'DescriptionModal')
            setDescriptionModal(false);
         else if(ref.name == 'RoomTypeModal')
            setRoomTypeModal(false);
        
        else if(ref.name == 'PriceModal')
            setPriceModal(false);
        
        else if(ref.name == 'AvailabilityModal')
            setAvailabilityModal(false);
        
        else if(ref.name == 'ImageHeaderModal')
            setImageHeaderModal(false);
        
        else if(ref.name == 'ImageModal')
            setImagesModal(false);
        
        else if(ref.name == 'RoommatesModal')
            setRoommatesModal(false);
        
        else if(ref.name == 'AmenitiesModal')
            setAmenitiesModal(false);

        else if(ref.name == 'GenderModal')
            setGenderModal(false);
         else if(ref.name == 'HousingTypeModal')
            setHousingTypeModal(false);
    }

    const onAddressPress = () => {
        setAddressModal(true)
    };
    const onGenderPress = () => {
        setGenderModal(true)
    };

    const onAmenitiesPress = () => {
        setAmenitiesModal(true)
       
    };
    const onDescriptionPress = () => {
        setDescriptionModal(true)
    };
    const onHousingTypePress = () => {
        setHousingTypeModal(true)
    };
    const onRoomTypePress = () => {
        setRoomTypeModal(true)
    };
   
    const onNumRoommatesPress = () => {
        setRoommatesModal(true)
    };
    const onAvailabilityPress = () => {
        setAvailabilityModal(true)
    };
    const onImageHeaderPress = () => {
        setImageHeaderModal(true)
    };
    const onCostPress = () => {
        setPriceModal(true)
    };

    const onImagesPress = () => {
        setImagesModal(true)
    };

    const onUserViewPress = () => {
        if(sublet != undefined){
            const id:string = sublet.id
            const disabled:boolean=true;
            navigation.navigate('Sublet', {id, disabled})
        }
    };


    const renderOptionItem= (option:string)=>{
        return(
            <Text key={option} style={styles.AmenitiesText}>{option}</Text>
        )
    }

    const GenderTitle = () =>{
       
        let gender = [];

        if(sublet?.women_allowed){
            gender.push("women")
          }
          if(sublet?.men_allowed){
            gender.push("men")
          }
          if(sublet?.nb_other_allowed){
            gender.push("non-binary")
          }
          if(gender.length == 0){
            gender.push("No Preferences Selected")
          }

        return(
            <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                    <Icon
                    style={styles.icon}
                    name={'person-outline'}
                    pack='material'
                    />
                    <Text category='s1' >Gender Preferences{'\n'}</Text>
                </View>
                <View style={styles.SubletInfo}>
                    <View style={styles.AmenitiesInfo}>
                        {gender.map(renderOptionItem)} 
                    </View>
                <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'edit'}
                    pack='eva'
                    />
                </View>
            </View>
            )

    }
    




    const AmenitiesTitle = () =>{
        if(sublet == null){
            return <Text>Amenitites</Text>
        }
       
        let amenities = [];

        if(sublet?.is_furnished){
            amenities.push("Furnished")
          } 
          if(sublet?.fitness_center){
            amenities.push("Fitness Center")
          }
          if(sublet?.free_parking){
              amenities.push("Parking")
          }
          if(sublet?.pool_available){
              amenities.push("Pool")
          }
          if(sublet?.washer_dryer){
              amenities.push("Laundry")
          }
          if(sublet?.pets_allowed){
            amenities.push("Pet Friendly")
          }
         if(sublet?.lgbt_friendly){
            amenities.push("LGBTQ+ Friendly")
         }
         if(amenities.length == 0){
             amenities.push("No Amenities Selected")
         }
        return(
            <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                    <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'home-outline'}
                    pack='eva'
                    />
                    <Text category='s1' >Amenities{'\n'}</Text>
                </View>
                <View style={styles.SubletInfo}>
                    <View style={styles.AmenitiesInfo}>
                        {amenities.map(renderOptionItem)} 
                    </View>
                <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'edit'}
                    pack='eva'
                    />
                </View>
            </View>
            )

    }
    const NumRoommatesTitle = ()=> {
        if(sublet == null){
            return <Text>Roommates{'\n'}</Text>
        }
        return (
    
        <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                    <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'people-outline'}
                    pack='eva'
                    />
                    <Text category='s1' >Roommates{'\n'}</Text>
                </View>
                <View style={styles.SubletInfo}>
                <Text style={styles.SubletText}>My Listing has {sublet.num_roomates} Roommate(s)</Text>
                <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'edit'}
                    pack='eva'
                    />
                </View>
            </View>
     )}

    const ImageHeaderTitle = ()=> {
        if(sublet == null){
            return <Text>Image Header{'\n'}</Text>
        }
        return (
        <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                    <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'image-outline'}
                    pack='eva'
                    />
                    <Text category='s1' >Edit Image Header{'\n'}</Text>
                </View>
                <View style={styles.SubletInfo}>
                <Text style={styles.SubletText}>Choose Image Header from {sublet.images.length} Image(s)</Text>
                <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'edit'}
                    pack='eva'
                    />
                </View>
            </View>
    )
        }
    
    const ImageTitle = ()=> {
        if(sublet == null){
            return <Text>Images{'\n'}</Text>
        }
        return (
        <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                    <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'image-outline'}
                    pack='eva'
                    />
                    <Text category='s1' >Images{'\n'}</Text>
                </View>
                <View style={styles.SubletInfo}>
                <Text style={styles.SubletText}>My Listing has {sublet.images.length} Image(s)</Text>
                <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name={'edit'}
                    pack='eva'
                    />
                </View>
            </View>
     )
        }
    const AddressTitle = () =>{
        if(sublet == null){
            return <Text>Address</Text>
        }
    
        let addressl1 = ''
        if(sublet.address.street2 == undefined || sublet.address.street2.length==0){
            addressl1 = `${sublet.address.street}`
        } else{
            addressl1 =  `${sublet.address.street} ${sublet.address.street2}`
        }
        const addressl2 = `${sublet.address.city}, ${sublet.address.state} ${sublet.address.zipcode}`
        return(
        <View style={styles.MenuInfo}>
            <View style={styles.MenuTitle}>
                <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'pin-outline'}
                pack='eva'
                />
                <Text category='s1' >Address{'\n'}</Text>
            </View>
            <View style={styles.SubletInfo}>
            <Text style={styles.SubletText}>{addressl1}, {addressl2}</Text>
            <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'edit'}
                pack='eva'
                />
            </View>
        </View>
        )
        
    }

    const RoomTypeTitle = () =>{
        if(sublet == null){
            return <Text>Room Type</Text>
        }
        
        var formattedString = ''
        if(sublet.room_type == 'Shared'){
            formattedString = 'Shared - the student will share a room with others'
        }else{
            formattedString='Private - the student will get their own room'
        }
        return(
        <View style={styles.MenuInfo}>
            <View style={styles.MenuTitle}>
                <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'single-bed'}
                pack='material'
                />
                <Text category='s1' >Room Type{'\n'}</Text>
            </View>
            <View style={styles.SubletInfo}>
            <Text style={styles.SubletText}>{formattedString}</Text>
            <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'edit'}
                pack='eva'
                />
            </View>
        </View>
        )
    }

    const HousingTypeTitle = () =>{
        if(sublet == null){
            return <Text>Housing Type</Text>
        }
        
        var formattedString = ''
        if(sublet.housing_type == 'House'){
            formattedString = 'House'
        }else{
            formattedString='Apartment'
        }
        return(
        <View style={styles.MenuInfo}>
            <View style={styles.MenuTitle}>
                <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'apartment'}
                pack='material'
                />
                <Text category='s1' >Housing Type{'\n'}</Text>
            </View>
            <View style={styles.SubletInfo}>
            <Text style={styles.SubletText}>{formattedString}</Text>
            <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'edit'}
                pack='eva'
                />
            </View>
        </View>
        )
    }
    const UniversityTypeTitle = () =>{
        if(sublet == null){
            return <Text>University</Text>
        }
        const university = sublet.university_choices
        return(
        <View style={styles.MenuInfo}>
            <View style={styles.MenuTitle}>
                <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'school'}
                pack='material'
                />
                <Text category='s1' >University{'\n'}</Text>
            </View>
            <View style={styles.SubletInfo}>
            <Text style={styles.SubletText}>{university}</Text>
           
            </View>
        </View>
        )
    }
    const CostTitle = () =>{
        if(sublet == null){
            return <Text>Price Per Month</Text>
        }
        const price = sublet.cost_per_month
        return(
        <View style={styles.MenuInfo}>
            <View style={styles.MenuTitle}>
                <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'pricetags-outline'}
                pack='eva'
                />
                <Text category='s1' >Price Per Month{'\n'}</Text>
            </View>
            <View style={styles.SubletInfo}>
            <Text style={styles.SubletText}>${price}/month</Text>
            <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'edit'}
                pack='eva'
                />
            </View>
        </View>
        )
    }
    const formatDate = (date:Date | undefined):string => {
        if(date != undefined){
          return `${date.getUTCMonth()+1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
        }else{
          return '...'
        }
      }

    const AvailabilityTitle = () =>{
        if(sublet == null){
            return <Text>Availability</Text>
        }
        const startDate = new Date(sublet.start_lease)
        const endDate = new Date(sublet.end_lease)

        return(
        <View style={styles.MenuInfo}>
            <View style={styles.MenuTitle}>
                <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'clock-outline'}
                pack='eva'
                />
                <Text category='s1' >Availability{'\n'}</Text>
            </View>
            <View style={styles.SubletInfo}>
            <Text style={styles.SubletText}>{formatDate(startDate)} to {formatDate(endDate)}</Text>
            <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'edit'}
                pack='eva'
                />
            </View>
        </View>
        )
    }
    const addOneToEnd = () =>{
        if(sublet){
            const end = new Date(sublet.end_lease)
            end.setHours(end.getHours()+12)
            return end;
        }
        return new Date()
    }
    const DescriptionTitle = () =>{
        if(sublet == null){
            return <Text>Description</Text>
        }
        const description = sublet.description
        return(
        <View style={styles.MenuInfo}>
            <View style={styles.MenuTitle}>
                <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'list-outline'}
                pack='eva'
                />
                <Text category='s1' >Description{'\n'}</Text>
            </View>
            <View style={styles.SubletInfo}>
            <Text style={styles.SubletText}>{description}</Text>
            <Icon
                style={styles.icon}
                fill='#8F9BB3'
                name={'edit'}
                pack='eva'
                />
            </View>
        </View>
        )
    }
  return (
    <React.Fragment>
      <TopNavigation title='Edit My Listing' alignment='center' accessoryLeft={BackAction} accessoryRight={DeleteAction}/>
      <Menu>
        <MenuItem style={styles.MenuItem} title={()=> AddressTitle()}  onPress={onAddressPress}/>
        <MenuItem style={styles.MenuItem} title={()=>AvailabilityTitle()} onPress={onAvailabilityPress}/>
        <MenuItem style={styles.MenuItem} title={()=>CostTitle()} onPress={onCostPress}/>
        <MenuItem style={styles.MenuItem} title={()=>DescriptionTitle()} onPress={onDescriptionPress}/>
        <MenuItem style={styles.MenuItem} title={()=> HousingTypeTitle()} onPress={onHousingTypePress}/>
        <MenuItem style={styles.MenuItem} title={()=> GenderTitle()} onPress={onGenderPress}/>
        <MenuItem style={styles.MenuItem} title={()=> AmenitiesTitle()} onPress={onAmenitiesPress}/>
        <MenuItem style={styles.MenuItem} title={()=> NumRoommatesTitle()} onPress={onNumRoommatesPress}/>
        <MenuItem style={styles.MenuItem} title={()=>ImageTitle()} onPress={onImagesPress}/>
        <MenuItem style={styles.MenuItem} title={()=>ImageHeaderTitle()} onPress={onImageHeaderPress}/>
        <MenuItem style={styles.MenuItem} title={()=>RoomTypeTitle()} onPress={onRoomTypePress}/>
        <MenuItem style={styles.MenuItem} title={()=>UniversityTypeTitle()} disabled={true}/>
        <MenuItem style={styles.MenuItem} title={'Check how your listing looks to users'} accessoryRight={ForwardIcon} onPress={onUserViewPress}/>
        
      </Menu>
      
       
      {sublet != null && (
          <React.Fragment>
                <AddressModal address={sublet.address} addressModal={addressModal} callbackModal={callbackModal} callbackCancelModal={callbackCancelModal}/>
                <DescriptionModal description={sublet.description} descriptionModal={descriptionModal} callbackModal={callbackDescriptionModal} callbackCancelModal={callbackCancelModal}/>
                <HousingTypeModal housingType={sublet.housing_type} housingTypeModal={housingTypeModal} callbackModal={callbackHousingTypeModal} callbackCancelModal={callbackCancelModal}/>
                <AvailabilityModal start={new Date(sublet.start_lease)} end={addOneToEnd()} availabilityModal={availabilityModal} callbackModal={callbackAvailabilityModal} callbackCancelModal={callbackCancelModal}/>
                <GenderModal men={sublet.men_allowed} women={sublet.women_allowed} nb={sublet.nb_other_allowed} genderModal={genderModal} callbackModal={callbackGenderModal} callbackCancelModal={callbackCancelModal}/>
                <AmenitiesModal 
                    furnished={sublet.is_furnished} 
                    fitness={sublet.fitness_center}
                    parking={sublet.free_parking}
                    pool={sublet.pool_available}
                    laundry={sublet.washer_dryer}
                    pets={sublet.pets_allowed}
                    lgbtq={sublet.lgbt_friendly}
                    amenitiesModal={amenitiesModal} callbackModal={callbackAmenitiesModal} callbackCancelModal={callbackCancelModal}/>
                <RoommatesModal roommates={sublet.num_roomates} roommatesModal={roommatesModal} callbackModal={callbackRoommatesModal} callbackCancelModal={callbackCancelModal}/>
                <ImageModal sublease={sublet.id} images={sublet.images} imageModal={imagesModal} callbackModal={callbackImageModal} callbackCancelModal={callbackCancelModal}/>
                <ImageHeaderModal images={sublet.images} imageHeaderModal={imageHeaderModal} callbackModal={callbackImageHeaderModal} callbackCancelModal={callbackCancelModal}/>
                <PriceModal price={sublet.cost_per_month} priceModal={priceModal} callbackModal={callbackPriceModal} callbackCancelModal={callbackCancelModal}/>
                <RoomTypeModal roomType={sublet.room_type} roomTypeModal={roomTypeModal} callbackModal={callbackRoomTypeModal} callbackCancelModal={callbackCancelModal}/>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
const themedStyles = StyleService.create({
    
    MenuInfo: {
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around'
    },
    MenuTitle:{
        width:'50%',
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    MenuItem:{
        minHeight:70,
    },
    SubletInfo:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    AmenitiesInfo:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:'90%'
    },
    SubletText:{
        color:'gray',
        flexWrap:'nowrap',
        width:'90%',
    },
    AmenitiesText:{
        color:'gray',
        width:"50%",
        textAlign:'left'
    },
    CenterText:{
        textAlign:'center',
        flexWrap:'nowrap',
    },
    icon: {
        color:'#8F9BB3',
        width: 20,
        height: 20,
        marginRight:10
      },
})