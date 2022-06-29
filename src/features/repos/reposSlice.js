import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const reposAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.lastUpdate.localeCompare(a.lastUpdate),
});

export const fetchUserRepos = createAsyncThunk(
  'repos/fetchUserRepos',
  async (username, { rejectWithValue }) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated`
    );
    if (!response.ok) return rejectWithValue('Something wrong...');
    const json = await response.json();
    return json;
  }
);

const reposSlice = createSlice({
  name: 'repos',
  initialState: reposAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserRepos.fulfilled, (state, action) => {
      let repos = action.payload.map((repo) => ({
        id: repo.id,
        watchers: repo.watchers_count,
        stargazers: repo.stargazers_count,
        issues: repo.open_issues_count,
        forks: repo.forks_count,
        name: repo.name,
        description: repo.description,
        lastUpdate: repo.pushed_at,
        url: repo.html_url,
      }));
      reposAdapter.setAll(state, repos);
    });
  },
});

export const {
  selectAll: selectAllRepos,
  selectById: selectRepoById,
  selectIds: selectRepoIds,
} = reposAdapter.getSelectors((state) => state.repos);

export default reposSlice.reducer;
