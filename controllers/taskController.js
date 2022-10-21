import db from "../db.js";

class TaskController{
    async create(req, res){
        try{
            const projectId = req.params.projectId;
            const {taskDescription, timeToPass, priority} = req.body;

            const task = await db.query(`insert into tasks (project_id, description, time_to_pass, priority) values ($1, $2, $3, $4) RETURNING *`, [projectId, taskDescription, timeToPass, priority]).then(data => data.rows[0])

            res.json({
                ...task
            })


        }catch(err){
            console.log(err)
            res.status(500).json({
                message: 'Can not create a new task'
            })
        }

    }
}

export default new TaskController();