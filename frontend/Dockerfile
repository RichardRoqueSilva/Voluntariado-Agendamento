FROM node:18.20.4-alpine as build-app

WORKDIR /app-build

COPY . .

RUN npm i \
    && npx ng build --configuration=production

FROM nginx:stable-alpine3.19-slim

ENV API_HOST=backend
ENV API_PORT=8080

COPY --from=build-app /app-build/server/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-app /app-build/server/nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY --from=build-app /app-build/server/docker-entrypoint.sh /
COPY --from=build-app /app-build/server/mime.types /etc/nginx/mime.types
COPY --from=build-app /app-build/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["/bin/sh",  "-c", "exec nginx -g 'daemon off;'"]