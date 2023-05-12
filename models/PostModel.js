import { postModel, userModel } from '../database/models/models.js'

class PostModel {

  async createPost(user, textContent, attachments) {

    const post = await postModel.create({
      textContent,
      attachments,
      UserId: user.id
    })

    if (!post) return { "data": { "result": "Something went wrong" }, "status": 500 }

    return { "data": { "result": "Post created successfully", "postid": post.id }, "status": 200 }
  }

  async deletePost(user, postid) {
    const post = await postModel.findOne({
      where: {
        id: postid
      }
    });

    if (!post) return { "data": { "result": "Post not found" }, "status": 404 }

    if (post.UserId != user.id) return { "data": { "result": "You are not author of this post" }, "status": 403 }

    await post.destroy()

    return { 'data': { 'result': 'Post deleted successfully' }, 'status': 200 }
  }
}

let arg = new PostModel()
export default arg