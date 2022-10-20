import db from "../db.js";

class ProjectController {
  async create(req, res) {
    try {
      const { title, userId } = req.body;

      const project = await db
        .query(
          "insert into projects (title, user_id) values ($1, $2) RETURNING *",
          [title, userId]
        )
        .then((data) => data.rows[0]);

      res.status(200).json({
        ...project,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Can not create new project`,
        ...err,
      });
    }
  }

  async delete(req, res) {
    try {
      const { title, userId } = req.body;
      await db.query(
        `delete from projects
                where title = ($1) and user_id=($2)`,
        [title, userId]
      );

      const newProjects = await db.query(
        `select * from projects where user_id=($1)`,
        [userId])
        .then(data => data.rows);

      res.status(200).json(newProjects);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Can not delete new project`,
        ...err,
      });
    }
  }
}

export default new ProjectController();
