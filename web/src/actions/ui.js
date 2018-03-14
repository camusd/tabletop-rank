import { LOADING_STARTED, LOADING_STOPPED } from "../types";

export const loadingStarted = () => ({
  type: LOADING_STARTED,
  loading: true
});

export const loadingStopped = () => ({
  type: LOADING_STOPPED,
  loading: false
});
