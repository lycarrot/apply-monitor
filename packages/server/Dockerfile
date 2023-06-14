FROM node:16.15.1 as node

 # 指定制作我们的镜像的联系人信息 
LABEL CHENGTONG=luoying66

RUN npm install pnpm -g 

# 将根目录下的文件都copy到container（运行此镜像的容器）       文件系统的app文件夹下
ADD . /app/
 
 # cd到app文件夹下
WORKDIR /app

  # 安装项目依赖包
RUN pnpm install

FROM registry.cn-hangzhou.aliyuncs.com/aliyun-node/alinode


COPY --from=node /app .

EXPOSE 6666

CMD ["npm", "run", "prod"]


 