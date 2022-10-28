import jwt from "jsonwebtoken";

const authCheck = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        if (accessToken) {
          req.userId = (
            await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
          ).id;
          next();
        }
      } catch (err) {
        res.status(403).json({
          err,
          message: "Нет доступа",
        });
        next();
      }
};

export default authCheck;
