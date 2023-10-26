import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderCount from '../../components/Header/HeaderCount';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStarWars} from '../../features/StarWarsSlice';
import CharacterItem from './CharacterItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../../components/Loader/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const status = useSelector(state => state.starwars.status);
  const loading = useSelector(state => state.starwars.loading);

  const data = useSelector(state => state.starwars.data);

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  const prevPage = () => {
    setPage(prev => (prev > 0 ? prev - 1 : 1));
  };

  useEffect(() => {
    dispatch(fetchStarWars(page));
  }, [page]);

  return (
    <View className="flex-1 bg-white">
      <HeaderCount />

      {loading ? (
        <Loader loading={loading} />
      ) : status === 'resolved' && data.results?.length > 0 ? (
        <View className="flex-1">
          <View>
            <FlatList
              data={data.results}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.name}
              renderItem={({item, index}) => {
                if (index === data.results.length - 1) {
                  return (
                    <View className="flex-row justify-between items-center p-4">
                      <TouchableOpacity
                        onPress={prevPage}
                        disabled={page === 1}
                        className={`bg-black p-3 rounded-xl ${
                          page === 1 ? 'bg-zinc-600 ' : ''
                        }`}>
                        <Text className="text-white">Prev Page</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={nextPage}
                        className="bg-black  p-3 rounded-xl">
                        <Text className="text-white">Next Page</Text>
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  return <CharacterItem character={item} />;
                }
              }}
            />
          </View>
        </View>
      ) : (
        <View className="items-center justify-center flex-1">
          <Text className="text-xl">No data availible ...</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
