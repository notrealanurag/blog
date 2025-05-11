import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  Card,
  Typography,
  Space,
  Button,
  Spin,
  Popconfirm,
  message,
  Form,
  Input,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  BLOG_QUERY,
  UPDATE_BLOG_MUTATION,
  DELETE_BLOG_MUTATION,
} from "../../graphql/blog";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
  };
}

interface UpdateBlogInput {
  title: string;
  content: string;
}

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [form] = Form.useForm();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const { loading, error, data } = useQuery(BLOG_QUERY, {
    variables: { id },
  });

  const [updateBlog] = useMutation(UPDATE_BLOG_MUTATION, {
    onCompleted: () => {
      message.success("Blog updated successfully!");
      setIsEditing(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const [deleteBlog] = useMutation(DELETE_BLOG_MUTATION, {
    onCompleted: () => {
      message.success("Blog deleted successfully!");
      navigate("/my-green-stories", { replace: true });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  if (loading) return <Spin size="large" />;
  if (error) return <div>Error: {error.message}</div>;

  const blog: Blog = data.blog;
  const isOwner = currentUser && blog.author.id === currentUser.id;

  const handleEdit = () => {
    form.setFieldsValue({
      title: blog.title,
      content: blog.content,
    });
    setIsEditing(true);
  };

  const handleUpdate = async (values: UpdateBlogInput) => {
    await updateBlog({
      variables: {
        id,
        input: values,
      },
    });
  };

  const handleDelete = async () => {
    await deleteBlog({
      variables: { id },
    });
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={{
            title: blog.title,
            content: blog.content,
          }}
        >
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Please input the title!" },
              { min: 3, message: "Title must be at least 3 characters!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Please input the content!" },
              { min: 10, message: "Content must be at least 10 characters!" },
            ]}
          >
            <TextArea rows={10} />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Space>
        </Form>
      );
    }

    return (
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={2}>{blog.title}</Title>
        <Space>
          <Text type="secondary">By {blog.author.username}</Text>
          <Text type="secondary">•</Text>
          <Text type="secondary">
            {new Date(blog.createdAt).toLocaleDateString()}
          </Text>
        </Space>
        <Paragraph style={{ fontSize: 16, whiteSpace: "pre-wrap" }}>
          {blog.content}
        </Paragraph>
      </Space>
    );
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <Space style={{ marginBottom: 20 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Back
        </Button>
        {isOwner && !isEditing && (
          <>
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this blog?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )}
      </Space>
      <Card>{renderContent()}</Card>
    </div>
  );
};
