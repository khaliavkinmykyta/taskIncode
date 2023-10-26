import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {changeFavorite} from '../../features/StarWarsSlice';
import {HeartIcon} from 'react-native-heroicons/solid';
import {HeartIcon as HeartIconFav} from 'react-native-heroicons/outline';

const CharacterItem = ({character}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleChangeFavorite = () => {
    dispatch(changeFavorite(character));
  };
  return (
    <View className="flex-row justify-between items-center p-4 flex-1">
      <View className="w-full bg-slate-100  flex-1 p-2 rounded-xl border border-gray-300">
        <TouchableOpacity
          className=""
          onPress={() =>
            navigation.navigate('Info', {characterData: character})
          }>
          <View className="flex-row gap-1">
            <Text className="font-bold">Name:</Text>
            <Text>{character.name}</Text>
          </View>
          <View className="flex-row gap-1">
            <Text className="font-bold">Birth Year:</Text>
            <Text>{character.birth_year}</Text>
          </View>
          <View className="flex-row gap-1">
            <Text className="font-bold">Gender:</Text>
            <Text>{character.gender}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="">
        <TouchableOpacity onPress={handleChangeFavorite} className="p-5">
          {!character.favorite ? (
            <HeartIconFav color={'black'} size={26} />
          ) : (
            <HeartIcon color={'red'} size={26} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CharacterItem;
