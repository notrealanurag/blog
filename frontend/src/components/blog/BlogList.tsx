import React, { useEffect } from "react";
import { Typography } from "antd";
import { useQuery } from "@apollo/client";
import { BLOGS_QUERY } from "../../graphql/blog";
import { BlogCardList } from "./BlogCardList";

const { Title } = Typography;

export const BlogList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(BLOGS_QUERY);

  // Refetch data when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Title level={2}>Latest Trash Talk 🌱♻️</Title>
      <BlogCardList blogs={data.blogs} />
    </div>
  );
};
