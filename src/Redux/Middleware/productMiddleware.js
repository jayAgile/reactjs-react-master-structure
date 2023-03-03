import axios from "axios";
import { API_BASE, API_BASE_LIST } from "../../constants";
import { loaderChange } from "../AuthSlice";

const productMiddleware = (store) => (next) => (action) => {
  if (next) next(action);

  const { type, payload } = action;

  if (type === "API2") {
    const {
      url,
      data,
      success,
      error,
      hideLoader = false,
      method = "get",
    } = payload;

    if (!hideLoader) store.dispatch(loaderChange(true));

    return axios({
      baseURL: API_BASE_LIST,
      method,
      url,
      data,
    })
      .then((res) => {
        store.dispatch(loaderChange(false));

        if (success) store.dispatch(success(res.data));

        return Promise.resolve(res.data);
      })
      .catch((err) => {
        store.dispatch(loaderChange(false));
        console.log("error", err);
        if (error) store.dispatch(error(err.response?.data));

        return Promise.reject(err.response?.data);
      });
  }
};

export default productMiddleware;
