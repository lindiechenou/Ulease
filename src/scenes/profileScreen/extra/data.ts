import { ImageSourcePropType } from 'react-native';

export class Profile {

  constructor(readonly firstName: string,
              readonly lastName: string,
              readonly photo: ImageSourcePropType,
              readonly gender: Gender,
              readonly description: string,
              readonly age: number,
              readonly email: string,
              readonly phoneNumber: string) {
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static genericProfile(): Profile {
    return new Profile(
      'Sasha',
      'Braus',
      require('../assets/image-profile.jpg'),
      Gender.FEMALE,
      'Hi! My name is Sasha. Here is some more generic text for you to read! Lease my place pls!',
      25,
      'sasha.brause@gmail.com',
      '502-555-1234',
    );
  }
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other', //will want to replace 'other' with whatever the person identifies 
				   //as or have perfer not to say then remove the gender part of the screen. 
				   //not sure how that would be done though yet. still learning react 
}