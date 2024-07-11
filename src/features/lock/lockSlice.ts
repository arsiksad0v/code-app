import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LockState {
  input: string;
  isAccessGranted: boolean | null;
}

const initialState: LockState = {
  input: '',
  isAccessGranted: null,
};

const lockSlice = createSlice({
  name: 'lock',
  initialState,
  reducers: {
    addDigit: (state, action: PayloadAction<string>) => {
      if (state.input.length < 4) {
        state.input += action.payload;
      }
    },
    removeDigit: (state) => {
      state.input = state.input.slice(0, -1);
    },
    checkPin: (state) => {
      const correctPin = '1337';
      state.isAccessGranted = state.input === correctPin;
    },
    reset: (state) => {
      state.input = '';
      state.isAccessGranted = null;
    },
  },
});

export const { addDigit, removeDigit, checkPin, reset } = lockSlice.actions;
export default lockSlice.reducer;