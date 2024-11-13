FROM node:20-alpine AS base-image

ENV USER_NAME=microservice
ENV APP_HOME=/opt/$USER_NAME

RUN npm i -g npm@10 && apk update && apk upgrade --available && apk add --update curl && mkdir -p $APP_HOME

WORKDIR $APP_HOME

COPY ["package.json", "package-lock.json", "./"]
RUN npm i  

COPY ["tsconfig.json", "./"]
COPY ["tsconfig.build.json", "./"]
COPY ["src", "./src/"]
COPY ["envs/docker", "./envs/docker"]

RUN npm run build

CMD [ "npm", "run", "start" ]

# Copia todos los archivos del proyecto al contenedor
COPY . /opt/microservice
