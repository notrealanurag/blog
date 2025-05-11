import React, { useState } from "react";
import { Form, Input, Button, Card, message, Alert } from "antd";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_MUTATION } from "../../graphql/auth";
import { setAuthenticatedUser } from "../../store/authSlice";

interface LoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [sendCreds, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      dispatch(setAuthenticatedUser(data.login));
      message.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      const errorMsg = error.message.includes("Invalid credentials")
        ? "Invalid email or password. Please try again."
        : "An error occurred during login. Please try again.";
      setErrorMessage(errorMsg);
    },
  });

  const handleSubmit = async (values: LoginForm) => {
    setErrorMessage("");
    await sendCreds({
      variables: {
        input: values,
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <Card title="Login">
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
