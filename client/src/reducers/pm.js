
import { GET_PM, PROMOTE_PM, GET_PM_DETAIL, DELETE_PM} from '../actions/pm'


const initialState ={
    pms:[],
    pmDetail:{},

}

export default function pm(state = initialState, action){
    
    if (action.type === GET_PM){
        return {
            ...state,
            pms: action.payload
        }
    }

    if (action.type === GET_PM_DETAIL){
        return {
            ...state,
            pmDetail: action.payload
        }
    }

    if (action.type === DELETE_PM){
        return {
            ...state,
            pms: state.pms.filter(pm => pm.id !== action.payload) 
        }
    }
    if (action.type === PROMOTE_PM){
        return {
            ...state,
            pms: action.payload
        }
    }


    return state
}