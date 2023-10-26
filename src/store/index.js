import {configureStore} from '@reduxjs/toolkit';
import StarWars from '../features/StarWarsSlice';

export default configureStore({
  reducer: {
    starwars: StarWars,
  },
});
