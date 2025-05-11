import type { ThemeConfig } from "antd";

// Custom colors
export const colors = {
  primary: "#228B22",
  secondary: "#A6D608",
  mint: "#B8EFCF",
  background: "#F9F9F9",
  text: "#333333",
};

// Ant Design theme configuration
export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#228b22",
    colorPrimaryHover: "#a6d608",
    colorBgContainer: "#f9f9f9",
    colorText: "#333333",
    colorBorder: "#b8efcf",
    borderRadius: 8,
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  components: {
    Layout: {
      bodyBg: "#f9f9f9",
    },
    Card: {
      colorBgContainer: "#f9f9f9",
      colorBorder: "#b8efcf",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    Button: {
      colorPrimary: "#228b22",
      colorPrimaryHover: "#a6d608",
      colorPrimaryActive: "#1a6b1a",
    },
    Menu: {
      colorItemBg: "transparent",
      colorItemText: colors.text,
      colorItemTextHover: colors.primary,
      colorItemTextSelected: colors.primary,
    },
  },
};
