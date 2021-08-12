import React from 'react'
import {ImageProps, ImageStyle} from 'react-native'
import {Icon, IconElement, IconProps} from '@ui-kitten/components'
import { Button, Card, List, Text, Input } from '@ui-kitten/components';


export function SearchIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='search-outline'/>
    );
}
export const PersonIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='person'/>
  );
export function SavedIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='heart-outline'/>
    );
}
export function upIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='arrow-circle-up-outline'/>
    );
}
export function downIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='arrow-circle-down-outline'/>
    );
}
export function DeleteIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='trash-2-outline'/>
    );
}
export function InfoIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='info-outline'/>
    );
}

export function MessagesIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='message-square-outline'/>
    );
}

export function ProfileIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='person-outline'/>
    );
}
export const EmailIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='email-outline'/>
  );

  export const AvailabilityIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='clock-outline'/>
  )

export function EditIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='edit'/>
    );
}
export function BackIcon(style: IconProps):IconElement {
    return (
        <Icon {...style} name='arrow-back'/>
    );
}
export function ForwardIcon2(style: IconProps):IconElement {
    return (
        <Icon {...style} name='arrow-forward'/>
    );
}

export const ImageIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='image-outline'/>
  );
export const UniversityIcon = (style: IconProps): IconElement => (
    
        <Icon
        {...style}
        fill='#8F9BB3'
        name={'school'}
        pack='material'
        />
  );
//mapIcon
export const MapIcon = (style: IconProps): IconElement =>(
    <Icon {...style} name='map-outline' />
);

export const BookmarkIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='bookmark'/>
  );
  
export const BookmarkOutlineIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='bookmark-outline'/>
);

export const CarIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='car-outline'/>
);
export const CameraIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='camera'/>
  );

  export const ForwardIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='arrow-ios-forward'/>
  );

  export const HomeIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='home-outline'/>
  );

  export const PinIcon = (style: IconProps): IconElement => (
    <Icon {...style} name='pin-outline'/>
  );
  