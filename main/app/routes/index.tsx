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
  const data = useLoaderData()

  return (
    <>
      <Form method="post">
        <input name="title" type="text" placeholder="title" />
        <input name="body" type="text" placeholder="body" />
        <button>Save!</button>
      </Form>
      { data ?
        <ul>
          {
            data.map((post) => {
              return (
                <li key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </li>
              )
            })
          }
        </ul> :
        <p>Loading</p>
      }
    </>
  )
}
