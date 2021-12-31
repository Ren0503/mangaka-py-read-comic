import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    Favorite,
    FavoriteAddActionTypes,
    FavoriteUserActionTypes,
} from 'types/favorite'