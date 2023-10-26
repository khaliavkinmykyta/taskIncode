import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useDispatch, useSelector} from 'react-redux';

import {
  selectFavoriteFemaleCharactersCount,
  selectFavoriteMaleCharactersCount,
  selectFavoriteOtherCharactersCount,
  resetFavoriteForAllCharacters,
} from '../../features/StarWarsSlice';

const HeaderCount = () => {
  const dispatch = useDispatch();

  const maleCharacterCount = useSelector(selectFavoriteMaleCharactersCount);
  const femaleCharacterCount = useSelector(selectFavoriteFemaleCharactersCount);
  const otherCharacterCount = useSelector(selectFavoriteOtherCharactersCount);

  const handleResetFavorites = () => {
    dispatch(resetFavoriteForAllCharacters());
  };
  return (
    <View className="justify-between gap-5 p-4">
      {/* FANS & RESET */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xl">Fans</Text>
        <TouchableOpacity
          onPress={handleResetFavorites}
          className="bg-[#edd817] px-4 py-2 rounded-full border border-black">
          <Text className="uppercase font-bold">Reset</Text>
        </TouchableOpacity>
      </View>

      {/* COUNTERS */}
      <View className="flex-row justify-between">
        <Text className="">Female Fans - {femaleCharacterCount}</Text>
        <Text className="">Male Fans - {maleCharacterCount}</Text>
        <Text className="">Others - {otherCharacterCount}</Text>
      </View>
    </View>
  );
};

export default HeaderCount;
