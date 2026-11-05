import postModel from "../models/postmodel.js";

// CREATE A POST
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const newPost = await postModel.create({
      title,
      content,
      category,
      image: image || "",
      author: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "Post Created Successfully.",
      data: newPost,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL POSTS + SEARCH + CATEGORY FILTER
export const getAllPosts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }
    const posts = await postModel
      .find(filter)
      .populate("author", "username")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      totalPosts: posts.length,
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// GET A SINGLE POST
export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel
      .findById(id)
      .populate("author", "username");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE A POST
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const updateData = { title, content, category };
    if (image) {
      updateData.image = image;
    }
    const updatedPost = await postModel.findOneAndUpdate(
      { _id: id, author: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found or You Are Not the Author.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post Updated Successfully.",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE A POST BY AN ADMIN
export const adminDeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await postModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully by admin.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to delete post.",
    });
  }
};

// DELETE A POST
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await postModel.findOneAndDelete({
      _id: id,
      author: req.user.id,
    });
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found or You Are Not the Author.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post Deleted Successfully.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};