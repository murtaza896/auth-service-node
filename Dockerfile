FROM alpine/git as clone
WORKDIR /app
RUN git clone https://github.com/murtaza896/auth-service-node.git

FROM node:12
WORKDIR /app
ARG EUREKA_SERVER_URL 
ARG EUREKA_SERVER_URL
ENV EUREKA_SERVER_URL=$EUREKA_SERVER_URL 
ENV EUREKA_SERVER_PORT=$EUREKA_SERVER_URL
COPY --from=clone /app/auth-service-node/package*.json /app
RUN npm install
COPY --from=clone /app/auth-service-node /app
CMD ["node", "app.js"]