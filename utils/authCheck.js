import jwt from 'jsonwebtoken';

export const authCheck = async (req, res, next) => {
    const accessToken = (req.headers.authorization).split(' ')[1];
    if(access_token){
        try{
            const userId = (await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)).id;
            req.userId = userId;
            next()
        }catch(err){
            res.status(403).json({
                err,
                message: 'Нет доступа',
            })
            next()
        }
    }
}