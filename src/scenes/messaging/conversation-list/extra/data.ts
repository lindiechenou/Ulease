import { ImageSourcePropType } from 'react-native';

export class Profile {

  constructor(readonly firstName: string,
              readonly lastName: string,
              /*readonly photo: ImageSourcePropType*/) {
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static lindie(): Profile {
    return new Profile(
      'Lindie',
      'Chenou',
      //require('../Assets/image-profile-1.jpg'),
    );
  }

  static natalina(): Profile {
    return new Profile(
      'Natalina',
      'Vaccaro',
      //require('../Assets/image-profile-1.jpg'),
    );
  }

  static andrew(): Profile {
    return new Profile(
      'Andrew',
      'Albrecht',
      //require('../Assets/image-profile-1.jpg'),
    );
  }

  static eric(): Profile {
    return new Profile(
      'Eric',
      'Ritter',
      //require('../Assets/image-profile-1.jpg'),
    );
  }
}

export class Message {

  constructor(readonly text: string,
              readonly date: string | null,
              readonly isRead: boolean,
              readonly profile: Profile) {
  }

  get formattedText(): string {
    const isLong: boolean = this.text.length > 36;
    return isLong ? `${this.text.substring(0, 32)}...` : this.text;
  }

  static howAreYou(): Message {
    return new Message(
      'Hey, how are you?',
      '4:30 PM',
      false,
      Profile.lindie(),
    );
  }

  static canYouSend(): Message {
    return new Message(
      'Can you send me a picture of the room please?',
      '4:12 PM',
      true,
      Profile.natalina(),
    );
  }

  static noProblem(): Message {
    return new Message(
      'No problem, talk to you later.',
      '12:00 PM',
      true,
      Profile.andrew(),
    );
  }

  static washerAndDryer(): Message {
    return new Message(
      'I was told the room comes with a washer and Dryer, can I see it?',
      '12:00 PM',
      true,
      Profile.eric(),
    );
  }
}