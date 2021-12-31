import thunk, { ThunkAction, ThunkDispatch} from 'redux-thunk'
import { createStore, applyMiddleware, Action } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ReduxState } from 'types/ReduxState'
import reducer from 'reducers/combineReducers'

export type AppDispatch = ThunkDispatch<ReduxState, unknown, Action<string>>

export type AppThunk = ThunkAction<
	Promise<void>,
	ReduxState,
	unknown,
	Action<string>
>

const userInfoFromStorage = localStorage.getItem('userInfo')
const userInfo = userInfoFromStorage
	? JSON.parse(userInfoFromStorage)
	: undefined


const initialState = {
	userLogin: { userInfo }
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store