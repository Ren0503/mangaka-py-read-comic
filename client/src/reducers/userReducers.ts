import {
    UserLoginState,
    UserLoginActionTypes,
    UserLoginAction,
    UserRegisterState,
    UserRegisterActionTypes,
    UserRegisterAction,
    UserDetailState,
    UserDetailsAction,
    UserDetailActionTypes,
    UserUpdateProfileState,
    UserUpdateProfileAction,
    UserUpdateProfileActionTypes,
} from 'types/user'

const userLoginReducerInitialState: UserLoginState = {
    loading: false
}

export const userLoginReducer = (
    state: UserLoginState = userLoginReducerInitialState,
    action: UserLoginAction
) => {
    switch (action.type) {
        case UserLoginActionTypes.USER_LOGIN_REQUEST:
            return { loading: true }
        case UserLoginActionTypes.USER_LOGIN_SUCCESS:
            return {
                loading: userLoginReducerInitialState.loading,
                userInfo: action.payload
            }
        case UserLoginActionTypes.USER_LOGIN_FAILURE:
            return {
                loading: userLoginReducerInitialState.loading,
                error: action.payload
            }
        case UserLoginActionTypes.USER_LOGOUT:
            return {}
        default:
            return state
    }
}

const userRegisterReducerInitialState: UserRegisterState = {
    loading: false
}

export const userRegisterReducer = (
    state: UserRegisterState = userRegisterReducerInitialState,
    action: UserRegisterAction
) => {
    switch (action.type) {
        case UserRegisterActionTypes.USER_REGISTER_REQUEST:
            return { loading: true }
        case UserRegisterActionTypes.USER_REGISTER_SUCCESS:
            return {
                loading: userRegisterReducerInitialState.loading,
                userInfo: action.payload
            }
        case UserRegisterActionTypes.USER_REGISTER_FAILURE:
            return {
                loading: userRegisterReducerInitialState.loading,
                error: action.payload
            }
        default:
            return state
    }
}
const userDetailReducerInitialState: UserDetailState = {
	loading: false
}

export const userDetailReducer = (
	state: UserDetailState = userDetailReducerInitialState,
	action: UserDetailsAction
) => {
	switch (action.type) {
		case UserDetailActionTypes.USER_DETAIL_REQUEST:
			return { loading: true }
		case UserDetailActionTypes.USER_DETAIL_SUCCESS:
			return {
				loading: userDetailReducerInitialState.loading,
				user: action.payload
			}
		case UserDetailActionTypes.USER_DETAIL_FAILURE:
			return {
				loading: userDetailReducerInitialState.loading,
				error: action.payload
			}
		case UserDetailActionTypes.USER_DETAIL_RESET:
			return {}
		default:
			return state
	}
}

const userUpdateProfileReducerInitialState: UserUpdateProfileState = {
	loading: false
}

export const userUpdateProfileReducer = (
	state: UserUpdateProfileState = userUpdateProfileReducerInitialState,
	action: UserUpdateProfileAction
) => {
	switch (action.type) {
		case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST:
			return { loading: true }
		case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS:
			return {
				loading: userUpdateProfileReducerInitialState.loading,
				userInfo: action.payload,
				success: true
			}
		case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE:
			return {
				loading: userUpdateProfileReducerInitialState.loading,
				error: action.payload
			}
		case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET:
			return {}
		default:
			return state
	}
}