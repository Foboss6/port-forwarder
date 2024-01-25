FROM sleavely/node-awscli:20.x

WORKDIR /

ARG PORT
ARG SESSION_CREDENTIALS
ARG DEFAULT_SERVICES_OBJECT

ENV PORT=${PORT}
ENV SESSION_CREDENTIALS=${SESSION_CREDENTIALS}
ENV DEFAULT_SERVICES_OBJECT=${DEFAULT_SERVICES_OBJECT}

COPY ./package.json ./
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src

RUN yarn install --frozen-lockfile
RUN yarn build

COPY ./dist .

EXPOSE 3000 3100 3200 3300

CMD ["yarn", "start"]
