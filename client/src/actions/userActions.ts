import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    TokenUser,
    UserLoginActionTypes,
    UserRegisterActionTypes,
    UserDetailActionTypes,
    User,
    UserUpdateProfileActionTypes,
    PasswordUser,
} from 'types/user'

export const login = (email: string, password: string): AppThunk => async (
    dispatch
) => {
    try {
        dispatch({ type: UserLoginActionTypes.USER_LOGIN_REQUEST })

        const config = {
            headers: { 'Content-Type': 'Application/json' }
        }

        const { data } = await axios.post<TokenUser>(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({ type: UserLoginActionTypes.USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: UserLoginActionTypes.USER_LOGIN_FAILURE,
            payload: errorHandler(error)
        })
    }
}

export const logout = (callback: () => void): AppThunk => async (dispatch) => {
    dispatch({ type: UserLoginActionTypes.USER_LOGOUT })
    dispatch({ type: UserDetailActionTypes.USER_DETAIL_RESET })
    localStorage.removeItem('userInfo')
    callback()
}

export const register = (
    name: string,
    email: string,
    password: string
): AppThunk => async (dispatch) => {
    try {
        dispatch({ type: UserRegisterActionTypes.USER_REGISTER_REQUEST })

        const config = {
            headers: { 'Content-Type': 'Application/json' }
        }
        const { data } = await axios.post<TokenUser>(
            '/api/users/register/',
            { name, email, password },
            config
        )

        dispatch({
            type: UserRegisterActionTypes.USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: UserLoginActionTypes.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: UserRegisterActionTypes.USER_REGISTER_FAILURE,
            payload: errorHandler(error)
        })
    }
}

export const getUserDetail = (): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: UserDetailActionTypes.USER_DETAIL_REQUEST })

        const { userInfo } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        const { data } = await axios.get<User>(`/api/users/profile/`, config)

        dispatch({
            type: UserDetailActionTypes.USER_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UserDetailActionTypes.USER_DETAIL_FAILURE,
            payload: errorHandler(error)
        })
    }
}

export const updateUserProfile = (user: PasswordUser): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST
        })

        const { userInfo } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        const { data } = await axios.put<TokenUser>(
            `/api/users/profile/update/`,
            user,
            config
        )

        dispatch({
            type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: UserLoginActionTypes.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE,
            payload: errorHandler(error)
        })
    }
}