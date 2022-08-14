import React, { createContext, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants";
import { useDispatch } from "react-redux";
import { loginStore, logoutStore } from "../store/authSlice";
import { Context } from "../context/Context";

const AxiosContext = createContext({});
const AxiosProvider = ({ children }) => {
  const { setIsLoading } = useContext(Context);
  const dispatch = useDispatch();
  const authAxios = axios.create({
    baseURL: API_URL,
  });
  const publicAxios = axios.create({
    baseURL: API_URL,
  });

  authAxios.interceptors.request.use(
    async (config) => {
      const token = (await AsyncStorage.getItem("accessToken")) || null;
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = async (email, password) => {
    await publicAxios
      .post("/login", {
        email,
        password,
      })
      .then(async (response) => {
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        dispatch(loginStore(response.data));
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status == 401 || error.response.status == 422) {
            alert("ชื่อหรือรหัสผ่านไม่ถูกต้อง");
            // setIsLoading(false);
          }
        }
      });
  };

  const logout = () => {
    dispatch(logoutStore());
  };

  const getVerify = async () => {
    setIsLoading(true);
    await authAxios
      .post("/verify")
      .then(async (response) => {
        if (response.data.status === "OK") {
          dispatch(loginStore(response.data));
        } else {
          dispatch(logoutStore());
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status == 401) {
            alert("เซสชั่นหมดอายุ");
          }
        }
      });
    setIsLoading(false);
  };

  const verify = async () => {
    AsyncStorage.getItem("accessToken").then((item) => {
      if (item) {
        getVerify();
      }
    });
  };

  return (
    <AxiosContext.Provider
      value={{
        authAxios,
        publicAxios,
        login,
        logout,
        verify,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosProvider };
