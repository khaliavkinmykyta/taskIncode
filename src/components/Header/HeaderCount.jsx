import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useDispatch, useSelector} from 'react-redux';

import {
  resetFavoriteForAllCharacters,
  selectFavoriteCharactersCountByGender,
} from '../../features/StarWarsSlice';

const HeaderCount = () => {
  const dispatch = useDispatch();

  const characterCounts = useSelector(selectFavoriteCharactersCountByGender);

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
        <Text className="">Female Fans - {characterCounts.female}</Text>
        <Text className="">Male Fans - {characterCounts.male}</Text>
        <Text className="">Others - {characterCounts.other}</Text>
      </View>
    </View>
  );
};

export default HeaderCount;
