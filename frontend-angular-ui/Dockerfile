# Stage 1: build
FROM node:14 AS development

WORKDIR /naveen/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@12.0.0

COPY . .

RUN npm run build

EXPOSE 4200

# FROM nginx:1.15.8-alpine

# COPY --from=development /naveen/frontend/src/app /naveen/share/nginx/html

# FROM node:12.16.1-alpine as builder
# WORKDIR /naveen/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# FROM nginx:1.15.8-alpine
# COPY --from=builder /naveen/src/app/ /naveen/share/nginx/html
