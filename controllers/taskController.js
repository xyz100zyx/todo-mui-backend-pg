import db from "../db.js";

class TaskController {

  async getAll(req, res){
    try{
      const projectId = req.params.projectId;
      const tasks = await db.query(
        `select * from tasks where project_id=($1)`,
        [projectId]
      ).then(data => data.rows)

      console.log(tasks)
        res.json({
          tasks
        })

    }catch(err){
      console.log(err);
      res.status(500).json({
        message: "Can not get list of tasks",
      });  
    }
  }

  async create(req, res) {
    try {
      const projectId = req.params.projectId;
      const { description, timeToPass, priority } = req.body;

      const task = await db
        .query(
          `insert into tasks (project_id, description, time_to_pass, priority) values ($1, $2, $3, $4) RETURNING *`,
          [projectId, description, timeToPass, priority]
        )
        .then((data) => data.rows[0]);

      res.json({
        ...task,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Can not create a new task",
      });
    }
  }

  async delete(req, res) {
    try {
      const projectId = req.params.projectId;
      const taskId = req.body.taskId;

      await db.query(
        `delete from tasks where project_id = ($1) and id = ($2)`,
        [projectId, taskId]
      );

      console.log(taskId)

      res.json({
        success: true,
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Can not delete task",
      });
    }
  }

  async update(req, res) {
    try {
      const projectId = req.params.projectId;
      const { taskId, description, timeToPass, priority } = req.body;

      const newTask = await db
        .query(
          `update tasks
                set description=($2),
                    time_to_pass =($3),
                    priority = ($4)
                where id=($1) and project_id=($5)
                returning *`,
          [taskId, description, timeToPass, priority, projectId]
        ).then(data => data.rows[0])

      res.json({
        ...newTask,
      })
      
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Can not update task",
      });
    }
  }
}

export default new TaskController();
