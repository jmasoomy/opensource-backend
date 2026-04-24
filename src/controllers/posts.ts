import {Request, Response} from "express";

// Post type
type Post = {
    id: number;
    title: string;
    content: string;
};

// List for posts
const posts: Post[] = [
    {
        id: 1,
        title: "First post",
        content: "Some forum post information"
    },
    {
        id: 2,
        title: "Second post",
        content: "Some forum post information"
    }
];

// Get All Posts
export const getPosts = (req: Request, res: Response) => {
    return res.status(200).json(posts);
};

// Get Post By Id
export const getPostById = (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const post = posts.find((p) => p.id === postId);

    // No Post Handler
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    return res.status(200).json(post);
};

// Create Post
export const createPost = (req: Request, res: Response) => {
    const {title, content} = req.body;

    // No title or content handler
    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content required"
        })
    }

    const newPost: Post = {
        id: posts.length + 1,
        title,
        content
    };

    posts.push(newPost);

    return res.status(201).json(newPost);
};

// Update Post
export const updatePost = (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const {title, content} = req.body;
    const post = posts.find((p) => p.id === postId);

    // No Post Handler
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content are required"
        });
    }

    post.title = title;
    post.content = content;
    
    return res.status(200).json(post);
};

// Delete Post
export const deletePost = (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const postIndex = posts.findIndex((p) => p.id === postId);

    // No post found handler
    if (postIndex === -1) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const deletedPost = posts.splice(postIndex, 1)[0];
    
    return res.status(200).json({
        message: "Post deleted",
        post: deletedPost
    });
};
