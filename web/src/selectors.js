export const isAuthenticatedSelector = state => !!state.auth.token;
export const isUserDataFetchedSelector = state => !!state.user.data.id;
export const isConfirmedSelector = state => state.user.data.confirmed;
export const userErrorSelector = state => state.user.error;
export const authErrorSelector = state => state.auth.error;
export const loadingSelector = state => state.ui.loading;
