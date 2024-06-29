import {
  AnyAction,
  configureStore,
  ThunkMiddleware,
  Tuple,
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import createDebounce from 'redux-debounced';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(),
});
const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

const useDispatch = () => useAppDispatch<AppDispatch>();

export { store, dispatch, useSelector, useDispatch };
