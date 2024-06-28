import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port: number = 3000;
const getUrl = (): string => {
  const target: string | undefined = process.env.TARGET_URL;
  if (!target || target.length === 0)
    throw new Error("TARGET_URL environment variable is not set");
  return target;
};

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Expose-Headers", "Content-Length, Content-Range");
  next();
});

app.use(
  "/",
  createProxyMiddleware({
    target: getUrl(),
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {},
    onProxyRes: (proxyRes, req, res) => {},
  }),
);

app.listen(port, (): void => {
  console.log(`Server running at http://localhost:${port}/`);
});
