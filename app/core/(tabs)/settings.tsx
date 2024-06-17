import React from 'react';
import { View, Text,StyleSheet, TouchableHighlight } from 'react-native';
import Card from '../../../components/Card';
import brand from '../../../brand/brandConfig';
import List from '../../../components/List';
import ListButton from '../../../components/ListButton';


type SettingsPageProps = {
    username: string;
};

const SettingsPage = ({username}: SettingsPageProps) => {
    return (
        <View style={styles.container}>
            <View>
                <Card>
                    <List>
                        <ListButton text='Settings'/>
                    </List>
                </Card>
            </View>
        </View>
    );
};

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: brand.colors.background,
    }
  });