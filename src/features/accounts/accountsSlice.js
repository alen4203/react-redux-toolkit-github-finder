import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const accountsAdapter = createEntityAdapter();

export const fetchGithubAccounts = createAsyncThunk(
  'accounts/fetchGithubAccounts',
  async (username, { rejectWithValue }) => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`
    );
    if (!response.ok) return rejectWithValue('This user does not exist...');
    const json = await response.json();
    return json.items;
  }
);

export const fetchOneAccount = createAsyncThunk(
  'accounts/fetchOneAccount',
  async (username, { rejectWithValue }) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) return rejectWithValue('This user does not exist...');
    const json = await response.json();
    return json;
  }
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsAdapter.getInitialState({
    currentAccount: null,
    status: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGithubAccounts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchGithubAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        let accounts = action.payload;
        accounts = accounts.map((acc) => ({
          id: acc.id,
          username: acc.login,
          avatar: acc.avatar_url,
        }));

        accountsAdapter.setAll(state, accounts);
      })
      .addCase(fetchGithubAccounts.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.payload);
      });
    builder.addCase(fetchOneAccount.fulfilled, (state, action) => {
      let curAccount = action.payload;
      curAccount = {
        id: curAccount.id,
        url: curAccount.html_url,
        username: curAccount.login,
        avatar: curAccount.avatar_url,
        type: curAccount.type,
        name: curAccount.name || '',
        company: curAccount.company || '',
        location: curAccount.location || '',
        email: curAccount.email || '',
        bio: curAccount.bio || '',
        publicRepos: curAccount.public_repos,
        followers: curAccount.followers,
        following: curAccount.following,
      };
      state.currentAccount = curAccount;
    });
  },
});

export const {
  selectAll: selectAllAccounts,
  selectById: selectAccountById,
  selectIds: selectAccountIds,
} = accountsAdapter.getSelectors((state) => state.accounts);

export default accountsSlice.reducer;
