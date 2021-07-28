import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PayloadActionCreator } from '@reduxjs/toolkit';
import { ITts } from '../interface/tts';
import * as api from '../lib/api/tts';
import createRequestSaga from '../hooks/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { stat } from 'fs';
import axios from 'axios';
export const tts = [
  {
    city: 'Paris',
    country: '제주도 푸른밤',
    img: `https://ww8007bucket.s3.ap-northeast-2.amazonaws.com/%ED%83%9C%EC%97%B0/record-player-1851576_1920.jpg`,
  },
  {
    city: 'NewYork',
    country: '제주도 푸른밤',
    img: `https://ww8007bucket.s3.ap-northeast-2.amazonaws.com/%ED%83%9C%EC%97%B0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2021-07-25+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.16.36.png`,
  },
];
const initialState: ITts = {
  text: '',
  mp3File: '',
  type: 'KSS',
  error: '',
  mp3File2: '',
};
export interface submit {
  text: string;
  type: string;
}
const SUBMIT_TTS = 'tts/SUBMIT_TTS';
const GET_TTS = 'tts/GET_TTS';
export const submitTTS = createAction(SUBMIT_TTS, (info: submit) => info);
// export const submitTTS = createAction(SUBMIT_TTS);
export const getTTS = createAction(GET_TTS);
const submitTTSSaga = createRequestSaga(SUBMIT_TTS, api.submitTTS);
const getTTSSaga = createRequestSaga(GET_TTS, api.getMP3);
export function* ttsSaga() {
  yield takeLatest(SUBMIT_TTS, submitTTSSaga);
  yield takeLatest(GET_TTS, getTTSSaga);
}
const ttsSlice = createSlice({
  name: 'tts',
  initialState: initialState,
  reducers: {
    inputText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    initialText: (state) => {
      state.text = '';
    },
    changeType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    SUBMIT_TTS_SUCCESS: (state, action: PayloadAction<any>) => {
      var url = action.payload['data'];
      state.mp3File = 'http://localhost:5000'+url;
      // state.mp3File = 'hihi';
    },
    setInitialText: (state) => {
      state.mp3File = '';
    },
    SUBMIT_TTS_FAILURE: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});
export const { inputText, initialText, changeType, setInitialText } =
  ttsSlice.actions;

export default ttsSlice.reducer;
