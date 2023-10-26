import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const InfoScreen = () => {
  const route = useRoute();
  const {characterData} = route.params;
  return (
    <View className="flex-1 bg-white p-4">
      <ScrollView className="gap-1">
        <Text className="font-bold text-xl text-center py-3">
          {characterData.name}
        </Text>
        <Text>Birth Year: {characterData.birth_year}</Text>
        <Text>Gender: {characterData.gender}</Text>
        <Text>Height: {characterData.height}</Text>
        <Text>Mass: {characterData.mass}</Text>
        <Text>Skin_color: {characterData.skin_color}</Text>
        <Text>Eye color: {characterData.eye_color}</Text>
        <Text>Hair color: {characterData.hair_color}</Text>
        <Text>Homeworld: {characterData.homeworld}</Text>
        <Text>Films:</Text>
        {characterData.films?.map((item, index) => (
          <Text key={index}>{`${index + 1}. ${item}`}</Text>
        ))}
        <Text>Starships:</Text>
        {characterData.starships?.map((item, index) => (
          <Text key={index}>{`${index + 1}. ${item}`}</Text>
        ))}
        <Text>Vehicles:</Text>
        {characterData.vehicles?.map((item, index) => (
          <Text key={index}>{`${index + 1}. ${item}`}</Text>
        ))}
        <Text>Created: {characterData.created}</Text>
        <Text>Edited: {characterData.edited}</Text>
      </ScrollView>
    </View>
  );
};

export default InfoScreen;
