import axios from "axios";
import { API_BASE, API_BASE_ALBUM, API_BASE_LIST } from "../../constants";
import { loaderChange } from "../AuthSlice";

const reduxApiMiddleware = (store) => (next) => (action) => {
  if (next) next(action);

  const { type, payload } = action;

  if (type === "API" || type == "API2" || type == "API3") {
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
      baseURL:
        type == "API3"
          ? API_BASE_ALBUM
          : type == "API2"
          ? API_BASE_LIST
          : API_BASE,
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
        console.log(err);
        store.dispatch(loaderChange(false));

        if (error) store.dispatch(error(err.response?.data));

        return Promise.reject(err.response?.data);
      });
  }
};

export default reduxApiMiddleware;
