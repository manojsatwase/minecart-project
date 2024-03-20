import { makeRequest,METHODS } from "./apiCall";

import {
     RegisterFailure, RegisterRequest, RegisterSuccess,
     LoadUserFailure, LoadUserRequest, LoadUserSuccess,
     LoginFailure, LoginRequest, LoginSuccess,
     logoutUserFailure, logoutUserRequest, logoutUserSuccess,
} from "../redux/slices/userSlice";


export const loginUserAPI = (email, password) => async (dispatch) => {
    await makeRequest(
        dispatch,
        LoginRequest,
        LoginSuccess,
        LoginFailure,
        METHODS.POST,
        "/api/v1/login",
        { email, password }
    );
};

export const registerUserAPI = (username,email,password,avatar) => async (dispatch) => {
    await makeRequest(
        dispatch,
        RegisterRequest,
        RegisterSuccess,
        RegisterFailure,
        METHODS.POST,
        "/api/v1/register",
        { username,email,password,avatar }
    );
};

export const loadUserAPI = () => async (dispatch) => {
    await makeRequest(
        dispatch,
        LoadUserRequest,
        LoadUserSuccess,
        LoadUserFailure,
        METHODS.GET,
        "/api/v1/me"
    );
};

export const logoutUserAPI =  () => async(dispatch) => {
    await makeRequest(
        dispatch,
        logoutUserRequest,
        logoutUserSuccess,
        logoutUserFailure,
        METHODS.GET,
        "/api/v1/logout"
    )
}

// export const getAllUsersAPI = (name = "") => async (dispatch) => {
//     await makeRequest(
//         dispatch,
//         usersRequest,
//         usersSuccess,
//         userFailure,
//         METHODS.GET,
//         `/api/v1/users?name=${name}`
//     );
// };




// export const getUserProfileAPI = (id) => async (dispatch) => {
//     await makeRequest(
//          dispatch, 
//          userProfileRequest,
//          userProfileSuccess,
//          userProfileFailure,
//          METHODS.GET,
//         `/api/v1/user/${id}`, 
//     )
// }

