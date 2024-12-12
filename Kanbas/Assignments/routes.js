import * as assignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {
    app.delete("/api/Assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await assignmentsDao.deleteAssignment(assignmentId);
        res.send(status);
    });
    app.put("/api/Assignments/:assignmentId", async (req, res) => {
        const {assignmentId} = req.params;
        const assignmentUpdates = req.body;
        const status = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });
}


