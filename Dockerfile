# 第一阶段：构建阶段
FROM node:20-alpine as build-stage

WORKDIR /app

# 先拷贝 package.json 以利用 Docker 缓存
COPY package*.json ./
RUN npm install

# 拷贝源代码并执行构建
COPY . .
RUN npm run build

# 第二阶段：运行阶段
FROM nginx:stable-alpine as production-stage

# 从构建阶段拷贝编译后的静态文件到 Nginx 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 拷贝自定义 Nginx 配置以支持 SPA 路由和 Gzip 压缩
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
