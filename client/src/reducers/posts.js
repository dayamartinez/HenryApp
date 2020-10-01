import { GET_POSTS, ADD_POST, DELETE_POST, GET_POST_ACTIVE, POST_INACTIVE} from '../actions/posts'


const initialState ={
    posts:[],
    postDetail:{},

}

export default function posts(state = initialState, action){
    
    if (action.type === GET_POSTS){
        return {
            ...state,
            posts: action.payload
        }
    }

    if (action.type === ADD_POST){
        return {
            ...state,
            posts: action.payload
        }
    }
    if (action.type === DELETE_POST){
        return {
            ...state,
            posts: action.payload
        }
    }
    if(action.type === GET_POST_ACTIVE){
        return {
            ...state,
            posts: action.payload
        }
    }
    if(action.type === POST_INACTIVE){
        return {
            ...state,
            posts: action.payload
        }
    }

    return state
}