import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// FETCH API
export const fetchStarWars = createAsyncThunk(
  'starwars/fetchStarWars',
  async function (page) {
    const response = await fetch(`https://swapi.dev/api/people?page=${page}`);
    const data = await response.json();
    return data;
  },
);

// MAIN SLICE 
const StarWarsSlice = createSlice({
  name: 'starwars',
  initialState: {
    data: [],
    loading: false,
    status: null,
    error: null,
  },

  reducers: {
    addFavorite: (state, action) => {
      const favorited = state.data.results.find(
        item => item.name === action.payload.name,
      );
      favorited.favorite = !favorited.favorite;
    },
    resetFavoriteForAllCharacters: (state) => {
      state.data.results.forEach((item) => {
        item.favorite = false;
      });
    },
  },

  extraReducers: {
    [fetchStarWars.pending]: state => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    [fetchStarWars.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.loading = false;
      state.data = action.payload;
    },
    [fetchStarWars.rejected]: (state) => {
      state.status = 'rejected';
      state.loading = false;

    },
  },
});

export default StarWarsSlice.reducer;
export const {addFavorite, resetFavoriteForAllCharacters} = StarWarsSlice.actions;

// Male Counter
export const selectFavoriteMaleCharactersCount = state => {
  const results = state.starwars.data?.results || []; 
  const favoriteMaleCharacters = results.filter(
    item => item.favorite && item.gender === 'male',
  );

  return favoriteMaleCharacters.length;
};

// Female Counter
export const selectFavoriteFemaleCharactersCount = state => {
  const results = state.starwars.data?.results || []; 
  const favoriteFemaleCharacters = results.filter(
    item => item.favorite && item.gender === 'female',
  );

  return favoriteFemaleCharacters.length;
};

// Other Counter
export const selectFavoriteOtherCharactersCount = state => {
  const results = state.starwars.data?.results || []; 
  const favoriteOtherCharacters = results.filter(
    item => item.favorite && item.gender !== 'male' && item.gender !== 'female',
  );

  return favoriteOtherCharacters.length;
};

