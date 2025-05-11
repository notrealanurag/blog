import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  CREATE_BLOG_MUTATION,
  BLOGS_QUERY,
  MY_BLOGS_QUERY,
} from "../../graphql/blog";

interface CreateBlogForm {
  title: string;
  content: string;
}

export const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [createBlog, { loading }] = useMutation(CREATE_BLOG_MUTATION, {
    onCompleted: () => {
      message.success("Blog post created successfully!");
      navigate("/my-green-stories", { replace: true });
    },
    onError: (error) => {
      message.error(error.message);
    },
    refetchQueries: [{ query: BLOGS_QUERY }, { query: MY_BLOGS_QUERY }],
  });

  const handleSubmit = async (values: CreateBlogForm) => {
    await createBlog({
      variables: {
        input: values,
      },
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <Card title="Share Your Eco-Thoughts 🌍">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the title!" },
              { min: 3, message: "Title must be at least 3 characters!" },
            ]}
          >
            <Input placeholder="What's on your mind about recycling?" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[
              { required: true, message: "Please input the content!" },
              { min: 10, message: "Content must be at least 10 characters!" },
            ]}
          >
            <Input.TextArea
              rows={6}
              placeholder="Share your thoughts about sustainability, recycling tips, or plastic reduction ideas..."
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Share Your Green Story 🌱
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
