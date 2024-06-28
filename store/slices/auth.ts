import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS, Storage } from "@/utility/storage";
import { handleRefreshToken } from "@/api/base";
import { getUserInfoAPI } from "@/api/api";
import { UserLoginResponseModel, UserResponseModel } from "@/api/types";
import { dispatch } from "../store";

interface IAuthState {
  isCheckingRememberedUser: boolean;
  isUserLoggedIn: boolean;
  userId: string | undefined | null;
}

const initialState: IAuthState = {
  isCheckingRememberedUser: true,
  isUserLoggedIn: false,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action) => ({
      ...state,
      isUserLoggedIn: true,
      userId: action.payload,
    }),
    LOGOUT: (state) => ({
      ...state,
      isUserLoggedIn: false,
      userId: null,
    }),
  },
  // extraReducers(builder) {
  //   builder.addCase(checkRememberedUserAC.fulfilled, (state, action) => ({
  //     ...state,
  //     isCheckingRememberedUser: false,
  //     isUserLoggedIn: action.payload?.isUserLoggedIn,
  //     userData: action.payload?.user,
  //   }));
  //   builder.addCase(getUserInfoAC.fulfilled, (state, action) => ({
  //     ...state,
  //     userData: action.payload.user,
  //   }));
  // },
});

export default authSlice.reducer;

const { LOGIN, LOGOUT } = authSlice.actions;

export const loginAC = async (data: UserLoginResponseModel) => {
  // ** Add to user, accessToken & refreshToken to localStorage
  await Storage.setItem(STORAGE_KEYS.token, {
    token: data.token,
    refreshToken: data.refreshToken,
  });
  
  return LOGIN(data.id);
};

export const logoutAC = () => {
  // ** Remove user, accessToken & refreshToken from localStorage
  Storage.clear(STORAGE_KEYS.userData);
  Storage.clear(STORAGE_KEYS.token);

  return LOGOUT();
};

// ** Check remenbered user
// export const checkRememberedUserAC = createAsyncThunk(
//   "auth/CHECK_REMENBERED_USER_DONE",
//   async () => {
//     try {
//       const userData = await Storage.getItem(STORAGE_KEYS.userData);
//       const token = await Storage.getItem(STORAGE_KEYS.token);
//       if (!!userData && !!token) {
//         await handleRefreshToken();
//         return {
//           isUserLoggedIn: true,
//           user: userData,
//         };
//       } else {
//         return {
//           isUserLoggedIn: false,
//           user: null,
//         };
//       }
//     } catch (error) {
//       return {
//         isUserLoggedIn: false,
//         user: null,
//       };
//     }
//   }
// );

// export const getUserInfoAC = createAsyncThunk("auth/UPDATE_USER", async () => {
//   try {
//     const userRes = await getUserInfoAPI();
//     Storage.setItem(STORAGE_KEYS.userData, {
//       ...userRes.data,
//     });
//     return {
//       user: userRes.data,
//     };
//   } catch (error: any) {
//     return {
//       user: null,
//     };
//   }
// });
