import { Link, routes } from '@redwoodjs/router'

interface Post {
  id: number
  title: string
  body: string
  createdAt: string
}

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <div key={post.id}>
      <p className="text-sm text-gray-500">
        <time dateTime={post.createdAt}>{post.createdAt}</time>
      </p>
      <a href="#" className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
        <p className="mt-3 text-base text-gray-500">{post.body}</p>
      </a>
    </div>
  )
}

export default BlogPost
