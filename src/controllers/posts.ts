import {Request, Response} from "express";

// Post type
type Post = {
    id: number;
    title: string;
    content: string;
    // Adding userid to post type for auth
    userId: number;
};

// List for posts
const posts: Post[] = [
    {
        id: 1,
        title: "First post",
        content: "Some forum post information",
        userId: 1
    },
    {
        id: 2,
        title: "Second post",
        content: "Some forum post information",
        userId: 2
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
    const user = (req as any).user;

    // No title or content handler
    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content required"
        })
    }

    const newPost: Post = {
        id: posts.length + 1,
        title,
        content,
        userId: user.id
    };

    posts.push(newPost);

    return res.status(201).json(newPost);
};

// Update Post
export const updatePost = (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const {title, content} = req.body;
    const post = posts.find((p) => p.id === postId);
    // Getting user for authentication
    const user = (req as any).user;
    

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

    // Checking is post user has same id as user trying to edit
    const isOwner = post.userId === user.id;
    // If user is super they can update any post
    const isSuperUser = user.role === "super"


    if (!isOwner && !isSuperUser) {
        return res.status(403).json({
            message: "Not authorized to update"
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
    // Getting user for auth
    const user = (req as any).user

    // No post found handler
    if (postIndex === -1) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const post = posts[postIndex];
    // Checking if post user has same id as user trying to delete
    const isOwner = post.userId === user.id
    // If user is super they can delete any post
    const isSuperUser = user.role === "super";

    if (!isOwner && !isSuperUser) {
        return res.status(403).json({
            message: "Not authorized to delete"
        })
    }

    const deletedPost = posts.splice(postIndex, 1)[0];
    
    return res.status(200).json({
        message: "Post deleted",
        post: deletedPost
    });
};
