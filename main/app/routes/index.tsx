import { MetaFunction, LoaderFunction, ActionFunction, Form } from 'remix'
import { useLoaderData, json, Link } from 'remix'
import { request as gqlRequest, gql } from 'graphql-request'

const query = gql`
  query {
    posts {
      id
      body
      title
      createdAt
    }
  }
`

const mutation = gql`
  mutation CreatePostMutation($input: CreatePostInput!){
    createPost(input: $input) {
      id
    }
  }
`

interface Post {
  id: number
  body: string
  title: string
  createdAt: string
}

export const loader: LoaderFunction = async () => {
  const data = await gqlRequest("http://localhost:8911/graphql", query)
  return json(data.posts)
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = await formData.get("title")
  const body = await formData.get("body")

  if (typeof title !== "string" || title.length === 0) {
    return json("Something went wrong", { status: 400 })
  }

  if (typeof body !== "string" || title.length === 0) {
    return json("Something went wrong", { status: 400 })
  }

  const variables = {
    input: {
      title,
      body
    }
  }

  const res = await gqlRequest("http://localhost:8911/graphql", mutation, variables)

  return json(res)
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const data: Post[] = useLoaderData()

  return (
    <>
      <div className="bg-white py-4 px-auto w-lg">
        <Form method="post" className="mx-auto block container">
          <h2 className="text-title">Submit a New Post!</h2>
          <input name="title" type="text" placeholder="title" />
          <input name="body" type="text" placeholder="body" />
          <button>Save!</button>
        </Form>
      </div>
      { data ?
        <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {
              data.map((post) => {
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
              })
            }
          </div>
        </div> :
        <p>Loading</p>
      }
    </>
  )
}
