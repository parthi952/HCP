import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './ApiCall';

export const analyzeInteractionPrompt = createAsyncThunk(
  'hcp/analyzePrompt',
  async (prompt, { rejectWithValue }) => {
    try {
      const data = await api.analyzePrompt(prompt);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitInteraction = createAsyncThunk(
  'hcp/submitInteraction',
  async (interactionData, { rejectWithValue }) => {
    try {
      const data = await api.createInteraction(interactionData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchInteractions = createAsyncThunk(
  'hcp/fetchInteractions',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllInteractions();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const hcpSlice = createSlice({
  name: 'hcp',
  initialState: {
    interactions: [],
    extractedData: null,
    missingFields: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearExtractedData: (state) => {
      state.extractedData = null;
      state.missingFields = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeInteractionPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeInteractionPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.extractedData = action.payload.data || action.payload.partial_data || null;
        state.missingFields = action.payload.missing_fields || [];
      })

      .addCase(analyzeInteractionPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitInteraction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitInteraction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.interactions.push(action.payload);
        }
      })
      .addCase(submitInteraction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInteractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.loading = false;
        state.interactions = action.payload || [];
      })
      .addCase(fetchInteractions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearExtractedData } = hcpSlice.actions;
export default hcpSlice.reducer;
