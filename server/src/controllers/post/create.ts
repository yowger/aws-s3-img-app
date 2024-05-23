import PostModel from "@/models/Post"

import type { Response, Request } from "express"

const create = async (req: Request, res: Response) => {
    const { title, content, author } = req.body

    if (!title || !content || !author) {
        return res
            .status(400)
            .json({ message: "Title, content, and author are required" })
    }

    const post = new PostModel({
        title,
        content,
        author,
    })

    await post.save()

    return res.status(201).json(post)
}

export default create
