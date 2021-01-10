FROM node:14.15-buster-slim
WORKDIR /root/workplace
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org
RUN echo environment ready
# RUN npm run build
# RUN echo build done
RUN ls -l

RUN echo finished
# CMD npm build
