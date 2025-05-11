import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { REGISTER_MUTATION } from "../../graphql/auth";
import { setAuthenticatedUser } from "../../store/authSlice";

interface RegisterForm {
  email: string;
  username: string;
  password: string;
}

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      dispatch(setAuthenticatedUser(data.register));
      message.success("Registration successful!");
      navigate("/");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleSubmit = async (values: RegisterForm) => {
    await register({
      variables: {
        input: values,
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <Card title="Register">
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
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 3, message: "Username must be at least 3 characters!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
