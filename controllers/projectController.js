import db from "../db.js";

class ProjectController {
  async create(req, res) {
    try {
      const { title } = req.body;
      /*const userId = Number.parseInt(req.params.userId);*/
      const userId = req.userId;

      if(!userId){
        res.status(401).json({
          message: 'Unauthorized error :('
        })
      }

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
      const { projectId } = req.body;
      /*const userId = req.params.userId;*/

      const userId = req.userId;

      if(!userId){
        res.status(401).json({
          message: 'Unauthorized error :('
        })
      }

      await db.query(
          `delete from tasks
            where project_id=($1)`,
          [projectId]
      );
      await db.query(
        `delete from projects
                where id = ($1) and user_id=($2)`,
        [projectId, userId]
      );

      const newProjects = await db
        .query(`select * from projects where user_id=($1)`, [userId])
        .then((data) => data.rows);

      res.status(200).json(newProjects);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Can not delete new project`,
        ...err,
      });
    }
  }

  async getAll(req,res) {
    try{
      const userId = req.userId;


      if(!userId){
        res.status(401).json({
          message: 'Unauthorized error :('
        })
      }

      const projects = await db.query(
        `select * from projects where user_id=($1)`,
        [userId]
      ).then(data => data.rows)

      res.json({
        projects
      })

    }catch(err){
      console.log(err);
      res.status(500).json({
        message: `Can not get projects`,
        ...err,
      });
    }
  }

}

export default new ProjectController();
