FROM node:16.15.1

 # 指定制作我们的镜像的联系人信息 
LABEL CHENGTONG=luoying66

# 将根目录下的文件都copy到container（运行此镜像的容器）       文件系统的app文件夹下
ADD . /app/
 
 # cd到app文件夹下
WORKDIR /app

  # 安装项目依赖包
RUN npm install 

FROM registry.cn-hangzhou.aliyuncs.com/aliyun-node/alinode:4.7.2

EXPOSE 6666

CMD ["npm", "run", "prod"]


 