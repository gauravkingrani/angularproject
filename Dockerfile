FROM node:14.16.0-alpine as builder
WORKDIR /app
COPY package.json .

COPY . .
RUN npm install
RUN npm run build
EXPOSE 4200 49153
CMD ["npm"  "start"]


FROM nginx:1.17.1-alpine
#COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
COPY --from=builder /app/dist/e-care /usr/share/nginx/html

# FROM node:12-alpine as build-step
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build

# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/dist/SFEClient /usr/share/nginx/html
