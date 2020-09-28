import { GET_POSTS, ADD_POST, DELETE_POST} from '../actions/posts'


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
            posts: state.posts.concat(action.payload) 
        }
    }
    if (action.type === DELETE_POST){
        return {
            ...state,
            posts: state.posts.filter(p => p.id !== action.payload) 
        }
    }

    return state
}