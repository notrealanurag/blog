import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { client } from "./lib/apollo";
import { store } from "./store";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { BlogList } from "./components/blog/BlogList";
import { CreateBlog } from "./components/blog/CreateBlog";
import { MyBlogs } from "./components/blog/MyBlogs";
import { BlogDetail } from "./components/blog/BlogDetail";
import { Profile } from "./components/profile/Profile";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ConfigProvider theme={theme}>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/share-story"
                  element={
                    <PrivateRoute>
                      <CreateBlog />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-green-stories"
                  element={
                    <PrivateRoute>
                      <MyBlogs />
                    </PrivateRoute>
                  }
                />
                {/* Catch all route for 404 */}
                <Route path="*" element={<Navigate to="/404" replace />} />
                <Route
                  path="/404"
                  element={
                    <div style={{ textAlign: "center", padding: "50px" }}>
                      <h1>404 - Page Not Found</h1>
                      <p>The page you are looking for does not exist.</p>
                      <a href="/">Return to Home</a>
                    </div>
                  }
                />
              </Routes>
            </Layout>
          </Router>
        </ConfigProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
