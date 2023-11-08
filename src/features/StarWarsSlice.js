import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import produce from 'immer';
import { createSelector } from 'reselect';


// FETCH API by page
export const fetchStarWars = createAsyncThunk(
  'starwars/fetchStarWars',
  async function (page) {
    const response = await fetch(`https://swapi.dev/api/people?page=${page}`);
    const data = await response.json();
    return data;
  },
);

// MAIN SLICE (status + data[] + favoriteCharacters[])
const StarWarsSlice = createSlice({
  name: 'starwars',
  initialState: {
    data: [],
    favoriteCharacters: [],
    loading: false,
    status: null,
    error: null,
  },

  reducers: {
    changeFavorite: (state, action) => {
      // find favorite in data
      const favorited = state.data.results.find(
        item => item.name === action.payload.name,
      );
      //change to opposite value
      favorited.favorite = !favorited.favorite;

      //create/renewe fav array
      if (favorited.favorite) {
        state.favoriteCharacters.push(favorited);
      } else {
        const index = state.favoriteCharacters.findIndex(
          item => item.name === favorited.name,
        );
        if (index !== -1) {
          state.favoriteCharacters.splice(index, 1);
        }
      }
    },
    resetFavoriteForAllCharacters: state => {
      state.data.results.forEach(item => {
        item.favorite = false;
      });

      // erase of favoriteCharacters
      state.favoriteCharacters.forEach(item => {
        item.favorite = false;
      });
      state.favoriteCharacters = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStarWars.pending, state => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStarWars.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.loading = false;

        const newPageResults = action.payload.results;

        const favoriteCharacterNames = new Set(
          state.favoriteCharacters.map(item => item.name),
        );

        newPageResults.forEach(newCharacter => {
          if (favoriteCharacterNames.has(newCharacter.name)) {
            newCharacter.favorite = true;
          }
        });

        state.data = action.payload;
      })
      .addCase(fetchStarWars.rejected, state => {
        state.status = 'rejected';
        state.loading = false;
      });
  },
});

export default StarWarsSlice.reducer;
export const {changeFavorite, resetFavoriteForAllCharacters} =
  StarWarsSlice.actions;


// New Single Counter Selecetor 
export const selectFavoriteCharactersCountByGender = createSelector(
  state => state.starwars.favoriteCharacters || [],
  favoriteCharacters => {
    const maleCount = favoriteCharacters.filter(
      item => item.gender === 'male',
    ).length;
    const femaleCount = favoriteCharacters.filter(
      item => item.gender === 'female',
    ).length;
    const otherCount = favoriteCharacters.filter(
      item => item.gender !== 'male' && item.gender !== 'female',
    ).length;

    return {
      male: maleCount,
      female: femaleCount,
      other: otherCount,
    };
  }
);
