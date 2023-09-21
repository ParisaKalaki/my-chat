FROM lukechannings/deno:v1.29.2

EXPOSE 7777

WORKDIR /app

COPY deps.js .

RUN deno cache deps.js

COPY . .

CMD [ "run", "--allow-env","--unstable", "--watch", "--allow-net", "--allow-read", "--allow-write", "--no-check", "app.js" ]
