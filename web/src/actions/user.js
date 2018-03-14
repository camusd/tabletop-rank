import {
  USER_DATA_REQUESTED,
  USER_DATA_RETRIEVED,
  USER_DATA_RETRIEVAL_FAILED,
  USER_CREATION_FAILED,
  USER_CREATED,
  USER_CREATION_INITIATED
} from "../types";

export const userDataRequested = () => ({
  type: USER_DATA_REQUESTED
});

export const userDataRetrieved = ({ user }) => ({
  type: USER_DATA_RETRIEVED,
  user
});

export const userDataRetrievalFailed = ({ error }) => ({
  type: USER_DATA_RETRIEVAL_FAILED,
  error
});

export const userCreationInitiated = ({ data, redirect }) => ({
  type: USER_CREATION_INITIATED,
  data,
  redirect
});

export const userCreated = ({ user }) => ({
  type: USER_CREATED,
  user
});

export const userCreationFailed = ({ error }) => ({
  type: USER_CREATION_FAILED,
  error
});
