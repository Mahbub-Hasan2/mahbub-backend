const express = require('express')
const {
    addProject,
    updateProject,
    deleteProject,
    getProjects,
    getProject,
} = require('../controllers/projects.js');
const { verifyAdminJWT } = require('../middleware/verifyJWT.js');


const router = express.Router();
router.post("/", verifyAdminJWT, addProject);
router.get("/:page", getProjects);
router.get("/sing/:id", getProject);
router.post("/update", verifyAdminJWT, updateProject)
router.delete("/delete/:id", verifyAdminJWT, deleteProject);

module.exports = router;