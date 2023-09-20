import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    let uuid_token = localStorage.getItem('uuid_token')

    // 判断本地存储是否有id
    if(!uuid_token){
        localStorage.setItem('uuid_token',uuidv4())
    }

    return uuid_token
}