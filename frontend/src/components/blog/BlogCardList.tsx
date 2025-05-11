import React from "react";
import { List, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Card } from "antd";

const { Text } = Typography;

const StyledCard = styled(Card)`
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    id: string;
    username: string;
  };
}

interface BlogCardListProps {
  blogs: Blog[];
  showAuthor?: boolean;
}

export const BlogCardList: React.FC<BlogCardListProps> = ({
  blogs,
  showAuthor = true,
}) => {
  const navigate = useNavigate();

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={blogs}
      renderItem={(blog: Blog) => (
        <List.Item>
          <StyledCard
            hoverable
            title={
              showAuthor ? (
                <div style={{ padding: "8px 0 8px" }}>
                  <h4 style={{ margin: 0 }}>{blog.title}</h4>
                  <Text type="secondary" style={{ fontWeight: 300 }}>
                    {blog.author?.username}
                  </Text>
                </div>
              ) : (
                blog.title
              )
            }
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>{blog.content.slice(0, 200)}...</Text>
              <Text type="secondary">
                {new Date(blog.createdAt).toLocaleDateString()}
              </Text>
            </Space>
          </StyledCard>
        </List.Item>
      )}
    />
  );
};
