import { gql } from "@apollo/client";

export const BLOGS_QUERY = gql`
  query GetBlogs {
    blogs {
      id
      title
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const BLOG_QUERY = gql`
  query GetBlog($id: String!) {
    blog(id: $id) {
      id
      title
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const MY_BLOGS_QUERY = gql`
  query GetMyBlogs {
    myBlogs {
      id
      title
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
      title
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const UPDATE_BLOG_MUTATION = gql`
  mutation UpdateBlog($id: String!, $input: UpdateBlogInput!) {
    updateBlog(id: $id, input: $input) {
      id
      title
      content
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const DELETE_BLOG_MUTATION = gql`
  mutation DeleteBlog($id: String!) {
    deleteBlog(id: $id)
  }
`;
