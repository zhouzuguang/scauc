import  {get , post ,del ,put }from './index.js';
import {CATOLOGUES} from './urls.js';

export const getCatologue = function(query){
    return get(CATOLOGUES + query)
}


export const getCatologues = function(query=''){
    return get(CATOLOGUES + query)
}

export const updateByCatologueId = function(id,catologue){
        return put(CATOLOGUES + '/' +id,catologue);
}

export const createCatologue = function(catologue){
    return post(CATOLOGUES,catologue)
}
