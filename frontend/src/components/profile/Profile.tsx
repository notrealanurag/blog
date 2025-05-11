import React from "react";
import { Card, Typography, Statistic, Avatar, Space, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined, FileOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { MY_BLOGS_QUERY } from "../../graphql/blog";
import type { RootState } from "../../store";

const { Title, Text } = Typography;

export const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: blogsData } = useQuery(MY_BLOGS_QUERY);

  const totalPosts = blogsData?.myBlogs?.length || 0;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Avatar
              size={100}
              style={{ backgroundColor: "#228B22" }}
              icon={!user?.username && <UserOutlined />}
            >
              {user?.username && user.username.charAt(0).toUpperCase()}
            </Avatar>
            <Title
              level={2}
              style={{ marginTop: "1rem", marginBottom: 0, color: "#228B22" }}
            >
              {user?.username}
            </Title>
            <Text type="secondary" style={{ color: "#333333" }}>
              {user?.email}
            </Text>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <Card
                style={{ backgroundColor: "#F9F9F9", borderColor: "#B8EFCF" }}
              >
                <Statistic
                  title="Total Posts"
                  value={totalPosts}
                  prefix={<FileOutlined style={{ color: "#228B22" }} />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{ backgroundColor: "#F9F9F9", borderColor: "#B8EFCF" }}
              >
                <Statistic
                  title="Member Since"
                  value={
                    user?.createdAt
                      ? new Date(user?.createdAt).toLocaleDateString()
                      : ""
                  }
                />
              </Card>
            </Col>
          </Row>
        </Space>
      </Card>
    </div>
  );
};
