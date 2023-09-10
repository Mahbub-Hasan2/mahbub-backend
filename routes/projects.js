const express = require('express')
const {
    addProject,
    updateProject,
    deleteProject,
    getProjects,
    getProject,
    changeProjectPosition,
} = require('../controllers/projects.js');
const { verifyAdminJWT } = require('../middleware/verifyJWT.js');


const router = express.Router();
router.post("/", addProject);
router.get("/:page", getProjects);
router.get("/sing/:id", getProject);
router.post("/update", verifyAdminJWT, updateProject)
router.post("/position", verifyAdminJWT, changeProjectPosition)
// router.delete("/delete/:id", verifyAdminJWT, deleteProject);
router.delete("/delete/:id", deleteProject);

module.exports = router;