FROM sleavely/node-awscli:20.x

WORKDIR /

ARG PORT
ARG SESSION_CREDENTIALS
ARG DEFAULT_SERVICES_OBJECT

ENV PORT=${PORT}
ENV SESSION_CREDENTIALS=${SESSION_CREDENTIALS}
ENV DEFAULT_SERVICES_OBJECT=${DEFAULT_SERVICES_OBJECT}


# Install kubectl
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    apt-transport-https \
    ca-certificates \
    curl \
    && curl -LO "https://dl.k8s.io/release/v1.28.2/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ./package.json ./
COPY ./yarn.lock ./yarn.lock
COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src

RUN yarn install --frozen-lockfile
RUN yarn build

COPY ./dist .

# COPY --from=kubectl /opt/bin/kubectl /usr/local/bin/

EXPOSE 3000 3100 3200 3300

CMD ["yarn", "start"]
