const express = require('express')
const {
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
    getBlog,
    changeBlogPosition,
} = require('../controllers/projects.js');
const { verifyAdminJWT } = require('../middleware/verifyJWT.js');


const router = express.Router();
router.post("/", verifyAdminJWT, addBlog);
router.get("/:page", getBlogs);
router.get("/sing/:id", getBlog);
router.post("/update", verifyAdminJWT, updateBlog)
router.post("/position", verifyAdminJWT, changeBlogPosition)
router.delete("/delete/:id", verifyAdminJWT, deleteBlog);

module.exports = router;