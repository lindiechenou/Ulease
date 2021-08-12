import { ImagePickerResponse } from "react-native-image-picker";

export type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
  };

  export type University = {
    key:string,
    name:string
  }
  
  export type BottomTabParamList = {
    Search: undefined;
    Saved: undefined;
    //Messages: undefined;
    Profile: undefined;
  };
  export type ProfileScreenParamList = {
    Profile: undefined;
    EditSublet:undefined;
    Sublet: {id:string, disabled:boolean};
  };
  export type SavedScreenParamList = {
    Saved: undefined;
    Sublet: {id:string, disabled:boolean};
  };

  export type ListScreenParamList = {
    List: undefined;
    Map: undefined;
    Sublet: {id:string, disabled:boolean};
  };
  export type AuthNavigationParamList = {
    Login:undefined;
    Forgot:undefined;
    SignUP:undefined;
    Reset: {key:string}
  }

  export type ProfileNavigationParamList = {
    ChangePassword:undefined;
  }

  export type AmenitiesInfo = {
    isFurnished:boolean;
    parking:boolean;
    fitnessCenter:boolean;
    pool:boolean;
    laundry:boolean;
    lgbtq:boolean;
    petsAllowed:boolean;
  }

  export type GenderInfo = {
    men:boolean;
    nb:boolean;
    women:boolean;
  }
  export type AddressInfo = {
    id:string;
    latitude:string;
    longitude:string;
    street:string;
    street2:string;
    city:string;
    zipcode:string;
    state:string;
  }

  export type ImageInfo = {
    id:string;
    image:string;
    isPrimary:boolean;
    sublease:string;
  }

  export type SubleaseInfo = {
    id:string;
    image:ImageInfo[];
    description:string;
    price:number;
    startLease:Date;
    endLease:Date;
    housingType:string;
    owner:UserInfo;
    numRoomates:number;
    roomType:string;
    status:string;
    university:string;
    amenities:AmenitiesInfo;
    gender:GenderInfo;
    address:AddressInfo;
    savedList:string[]
  }
  
  export type SearchParamList = {
    SearchScreen: undefined;
  };
  
  export type MessageParamList = {
    MessageScreen: undefined;
  };
  
  export type ProfileParamList = {
    ProfileScreen: undefined;
  };

  export type UserInfo = {
    id:string;
    email:string;
    firstName:string;
    lastName:string;
    university:string;
    userSublease:SubleaseInfo | null
  };
  export type AddressResponse = {
    id:string
    street:string
    street2:string | null
    city:string
    state:string
    zipcode:string
    latitude:string | null
    longitude:string | null
  }
  export type ImageResponse = {
    id:string,
    image:string,
    sublease:string,
    is_primary:boolean,
  }
  export type ImageRequest = {
    id:string,
    image:string,
    photo:ImagePickerResponse,
  }
  
  export type SubleaseResponse = {
    id:string,
    address:AddressResponse,
    saved_list:string[],
    images:ImageResponse[],
    owner:string,
    description:string,
    status:string,
    room_type:string
    housing_type:string
    university_choices:string,
    cost_per_month:number,
    num_roomates:number,
    start_lease:string,
    end_lease:string,
    men_allowed:boolean,
    women_allowed:boolean
    nb_other_allowed:boolean,
    pets_allowed:boolean 
    washer_dryer:boolean
    is_furnished:boolean
    pool_available:boolean
    lgbt_friendly: boolean,
    free_parking:boolean,
    fitness_center:boolean,
  }
  export type UserResponse = {
    id: string,
    email:string,
    first_name:string
    last_name:string
    university_choices:string,
    user_sublease:SubleaseResponse | undefined,
  }

  export type UniParams = {
    name:string,
    key:string,
  }