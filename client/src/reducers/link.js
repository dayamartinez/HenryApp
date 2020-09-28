import { GET_LINKS, ADD_LINK, DELETE_LINK} from '../actions/link'


const initialState ={
    links:[]
}

export default function link(state = initialState, action){
    
    if (action.type === GET_LINKS){
        return {
            ...state,
            links: action.payload
        }
    }

    if (action.type === ADD_LINK){
        return {
            ...state,
            links: state.links.concat(action.payload) 
        }
    }
    if (action.type === DELETE_LINK){
        return {
            ...state,
            links: state.links.filter(p => p.id !== action.payload) 
        }
    }

    return state
}