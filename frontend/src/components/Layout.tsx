import React, { useState, useEffect } from "react";
import {
  Layout as AntLayout,
  Menu,
  Button,
  notification,
  Avatar,
  Dropdown,
  Drawer,
  theme,
} from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { MenuProps } from "antd";
import { logout } from "../store/authSlice";
import type { RootState } from "../store";
import { socket } from "../lib/socket";
import {
  LogoutOutlined,
  UserOutlined,
  ProfileOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

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

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const { isAuthenticated, user: currentUser } = useSelector(
    (state: RootState) => state.auth
  );
  const [api, contextHolder] = notification.useNotification();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  // Get the current selected key based on pathname
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/my-green-stories") return "my-green-stories";
    if (path === "/share-story") return "share-story";
    return "";
  };

  React.useEffect(() => {
    // Subscribe to new blog notifications
    socket.on("newBlog", (blog: Blog) => {
      console.log("Received newBlog event:", blog);
      const isOwnBlog = currentUser && blog.author.id === currentUser.id;

      api.info({
        message: isOwnBlog
          ? "Your blog has been published!"
          : "New Blog Published",
        description: `${
          isOwnBlog ? "Your" : `${blog.author.username}'s`
        } blog "${blog.title}" has been published.`,
        placement: "topRight",
        duration: 5,
        showProgress: true,
        pauseOnHover: true,
        style: {
          background: token.colorBgElevated,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowSecondary,
          border: `1px solid ${token.colorBorderSecondary}`,
        },
        icon: isOwnBlog ? (
          <span style={{ color: token.colorSuccess }}>🎉</span>
        ) : (
          <span style={{ color: token.colorInfo }}>📝</span>
        ),
        className: "modern-notification",
      });
    });

    return () => {
      socket.off("newBlog");
    };
  }, [currentUser, api, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "home",
      label: <Link to="/">Eco Feed</Link>,
    },
    ...(isAuthenticated
      ? [
          {
            key: "my-green-stories",
            label: <Link to="/my-green-stories">My Green Stories</Link>,
          },
          {
            key: "share-story",
            label: <Link to="/share-story">Share Your Story</Link>,
          },
        ]
      : []),
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "greeting",
      label: (
        <div style={{ color: "#1890ff" }}>Hi {currentUser?.username}!</div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const getAvatarText = (username?: string) => {
    return username && username.length > 0
      ? (username[0]?.toUpperCase() ?? "U")
      : "U";
  };

  return (
    <AntLayout>
      {contextHolder}
      <style>
        {`
          .modern-notification .ant-notification-notice-message {
            font-weight: 600;
            color: ${token.colorTextHeading};
            margin-bottom: 4px;
          }
          .modern-notification .ant-notification-notice-description {
            color: ${token.colorTextSecondary};
          }
          .modern-notification .ant-notification-notice-progress {
            background: ${token.colorPrimaryBg};
          }
          .modern-notification .ant-notification-notice-progress-bar {
            background: ${token.colorPrimary};
          }
          .logo-link:hover {
            color: #1a6b1a;
            transform: scale(1.02);
          }
        `}
      </style>
      <Header
        style={{
          padding: 0,
          background: "#F9F9F9",
          borderBottom: "1px solid #B8EFCF",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Link
              to="/"
              className="logo-link"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginRight: isMobile ? "1rem" : "2rem",
                color: "#228B22",
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              Trash Talk
            </Link>
            {isMobile ? (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setIsMobileMenuVisible(true)}
              />
            ) : (
              <div style={{ flex: 1 }}>
                <Menu
                  mode="horizontal"
                  items={menuItems}
                  selectedKeys={[getSelectedKey()]}
                  style={{ border: "none", flex: 1 }}
                />
              </div>
            )}
          </div>
          <div>
            {isAuthenticated ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Avatar
                  style={{
                    backgroundColor: "#228B22",
                    cursor: "pointer",
                  }}
                  size="large"
                  icon={!currentUser?.username && <UserOutlined />}
                >
                  {currentUser?.username && getAvatarText(currentUser.username)}
                </Avatar>
              </Dropdown>
            ) : isMobile ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "login",
                      label: "Login",
                      onClick: () => navigate("/login"),
                    },
                    {
                      key: "register",
                      label: "Register",
                      onClick: () => navigate("/register"),
                    },
                  ],
                }}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  style={{
                    padding: "4px 8px",
                    height: "auto",
                  }}
                />
              </Dropdown>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <Button
                  type="link"
                  onClick={() => navigate("/login")}
                  style={{
                    padding: "4px 15px",
                    height: "auto",
                    fontSize: "16px",
                  }}
                >
                  Login
                </Button>
                <Button
                  type="primary"
                  onClick={() => navigate("/register")}
                  style={{
                    padding: "4px 15px",
                    height: "auto",
                    fontSize: "16px",
                  }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setIsMobileMenuVisible(false)}
        open={isMobileMenuVisible}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          selectedKeys={[getSelectedKey()]}
          style={{ border: "none" }}
        />
      </Drawer>

      <Content
        style={{
          padding: isMobile ? "16px" : "24px",
          minHeight: "calc(100vh - 64px)",
          background: "#F9F9F9",
        }}
      >
        {children}
      </Content>
    </AntLayout>
  );
};
