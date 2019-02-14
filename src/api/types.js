import { get, post , put , del} from './index.js';
import { TYPES } from './urls.js';

export const getType = function(type){
    return get(`${TYPES}?type=${type}`)
}

export const getTypes = function(){
    return get(TYPES);
}

export const createType = function(type){
    return post(TYPES,type)
}
