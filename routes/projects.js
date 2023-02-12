const express = require('express')
const {
    addProject,
    // updateProject,
    // deleteProject,
    // getProjects,
    // getProject,
    // getSearch,
    // getProjectsByNavFilter,
    // getProjectsForDash,
    // loginToken
} = require('../controllers/projects.js');
// const { verifyAdminJWT, verifyJWT } = require("../middleware/verifyJWT.js");


const router = express.Router();
router.post("/", addProject);
// router.post("/login", loginToken);
// router.get("/dash", verifyAdminJWT, getProjectsForDash);
// router.get("/:page", getProjects);
// router.get("/sing/:id", getProject);
// router.post("/update", verifyAdminJWT, updateProject);
// router.post("/search", getSearch);
// router.post("/navfilter", getProjectsByNavFilter);
// router.delete("/delete/:id", verifyAdminJWT, deleteProject);

module.exports = router;