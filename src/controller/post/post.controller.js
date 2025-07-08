import Post from "../../models/Post.js";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, author: req.user.id });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: "Post creation failed", error: err.message });
  }
};

// READ ALL
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Fetching posts failed", error: err.message });
  }
};

// READ ONE
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching post", error: err.message });
  }
};

// UPDATE
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not allowed" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ msg: "Update failed", error: err.message });
  }
};

// DELETE
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });
    if (!post) return res.status(404).json({ msg: "Post not found or unauthorized" });
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed", error: err.message });
  }
};
