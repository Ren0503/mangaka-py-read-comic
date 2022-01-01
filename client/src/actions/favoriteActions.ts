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