import db from "../db.js";

export class UserController {
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      const user = await db.query(
        `insert into users (email, password, name) values ($1, $2, $3) RETURNING *`,
        [email, password, name]).then(data => data.rows[0]);

      res.status(200).json({
        ...user,
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
        const { email, password} = req.body;

        
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Can't to connect to server...`,
      });
    }
  }
}

export default new UserController();
