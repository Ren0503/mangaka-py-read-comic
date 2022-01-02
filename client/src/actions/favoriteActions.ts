import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    Favorite,
    FavoriteAddActionTypes,
    FavoriteUserActionTypes,
} from 'types/favorite'

export const listFavorites = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({
            type: FavoriteUserActionTypes.FAVORITE_MY_REQUEST
        })

        const { userInfo } = getState().userLogin

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`
			}
		}

		const { data } = await axios.get<Favorite[]>(
			`/api/users/my_favorites`,
			config
		)

		dispatch({
			type: FavoriteUserActionTypes.FAVORITE_MY_SUCCESS,
			payload: data
		})
    } catch (error) {
		dispatch({
			type: FavoriteUserActionTypes.FAVORITE_MY_FAILURE,
			payload: errorHandler(error)
		})
	}
}

export const addFavorite = (mangaId: string): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({
			type: FavoriteAddActionTypes.FAVORITE_ADD_REQUEST
		})

		const { userInfo } = getState().userLogin
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

		await axios.get(`/api/users/favorite/${mangaId}/`, config)

		dispatch({
			type: FavoriteAddActionTypes.FAVORITE_ADD_SUCCESS
		})
	} catch (error) {
		dispatch({
			type: FavoriteAddActionTypes.FAVORITE_ADD_FAILURE,
			payload: errorHandler(error)
		})
	}
}