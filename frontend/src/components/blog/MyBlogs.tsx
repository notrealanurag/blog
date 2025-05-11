import React, { useEffect } from "react";
import { Typography } from "antd";
import { useQuery } from "@apollo/client";
import { MY_BLOGS_QUERY } from "../../graphql/blog";
import { BlogCardList } from "./BlogCardList";

const { Title, Text } = Typography;

export const MyBlogs: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(MY_BLOGS_QUERY);

  // Refetch data when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Title level={2}>My Eco-Stories 🌿</Title>
      {data.myBlogs.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Text type="secondary">You haven't shared any eco-thoughts yet.</Text>
          <div style={{ marginTop: "1rem" }}>
            <Text type="secondary">
              Click on "Share Your Story" in the navigation menu to start making
              a difference! 🌍
            </Text>
          </div>
        </div>
      ) : (
        <BlogCardList blogs={data.myBlogs} showAuthor={false} />
      )}
    </div>
  );
};
