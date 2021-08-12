/* eslint-disable prettier/prettier */
/*import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

export const MessagesScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Messages" alignment="center" />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h1">MESSAGES</Text>
      </Layout>
    </SafeAreaView>
  );
};*/

import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Input, Layout, List, StyleService, useStyleSheet } from '@ui-kitten/components';
import { MessageItem } from './extra/message-item.component';
import { SearchIcon } from './extra/icon';
import { Message } from './extra/data';

const initialMessages: Message[] = [
  Message.howAreYou(),
  Message.canYouSend(),
  Message.noProblem(),
  Message.washerAndDryer(),
];

export const message = ({navigation}): React.ReactElement =>{


  const styles = useStyleSheet(themedStyles);
  const [searchQuery, setSearchQuery] = React.useState<string>();

  const onItemPress = (index: number): void => {
    navigation && navigation.navigate('chat1');
  };

  const renderItem = (info: ListRenderItemInfo<Message>): React.ReactElement => (
    <MessageItem
      style={styles.item}
      message={info.item}
      onPress={onItemPress}
    />
  );

  const renderHeader = (): React.ReactElement => (
    <Layout
      style={styles.header}
      level='1'>
      <Input
        placeholder='Search'
        value={searchQuery}
        icon={SearchIcon}
      />
    </Layout>
  );

  return (
    <List
      style={styles.list}
      data={initialMessages}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
});
