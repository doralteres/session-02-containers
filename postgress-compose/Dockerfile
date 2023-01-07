FROM node:18

RUN apt update

RUN apt install -y postgresql postgresql-contrib

EXPOSE 3000

USER node

WORKDIR /var/lib/users_app

COPY . .

RUN yarn

ENTRYPOINT ["./wait-for-postgres.sh", "db", "yarn", "start"]
