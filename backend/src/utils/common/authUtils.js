import jwt from 'jsonwebtoken'

import { JWT_SCERET } from '../../config/serverConfig.js'

export const createToken=(data)=>{

    return jwt.sign(data,JWT_SCERET,{
        expiresIn:"1h"
    })

}