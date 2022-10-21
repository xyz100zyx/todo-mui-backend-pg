import db from "../db.js"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  async register(req, res) {
    try {
      const { email, name } = req.body;

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      const user = await db
        .query(
          `insert into users (email, password, name) values ($1, $2, $3) RETURNING *`,
          [email, passwordHash, name]
        )
        .then((data) => data.rows[0]);

      const accessToken = await jwt.sign(
        {
          id: user.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
      );

      const { password, ...userData } = user;

      res.status(200).json({
        ...userData,
        accessToken
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Can't to connect to server...`,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await db
        .query(
          `
            select * from users where email=($1)
        `,
          [email]
        )
        .then((data) => data.rows[0]);

      if (!user) {
        res.status(400).json({
          message: "Uncorrect email or password",
        });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("Uncorrect email or password");
      }

      res.json({
        ...user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new UserController();
