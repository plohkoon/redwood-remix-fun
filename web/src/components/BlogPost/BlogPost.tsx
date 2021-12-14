import { Link, routes } from '@redwoodjs/router'

interface Post {
  id: number
  title: string
  body: string
  createdAt: string
}

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <article key={post.id}>
      <header>
        <h2>
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h2>
      </header>
      <p>{post.body}</p>
      <div>Posted at: {post.createdAt}</div>
    </article>
  )
}

export default BlogPost
