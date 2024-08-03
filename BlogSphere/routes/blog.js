const { Router } = require("express");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

const router = Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

// Render the Add Blog page
router.get('/add-new', (req, res) => {
  if (!req.user) {
    return res.redirect('/user/signin');
  }
  return res.render('addBlog', { user: req.user });
});

// Handle the creation of a new blog
router.post('/', upload.single('coverImage'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body content is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('addBlog', { 
      user: req.user, 
      errors: errors.array()
    });
  }

  const { title, body } = req.body;

  if (!req.file) {
    return res.status(400).render('addBlog', { 
      user: req.user, 
      errors: [{ msg: 'Cover image is required' }]
    });
  }

  try {
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImage: `uploads/${req.file.filename}`,
    });
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

// Render a single blog and its comments
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

    return res.render("blog", {
      user: req.user,
      blog: blog,
      comments: comments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

// Handle posting a comment
router.post("/comment/:blogId", [
  body('content').notEmpty().withMessage('Comment content is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).redirect(`/blog/${req.params.blogId}`);
  }

  try {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
