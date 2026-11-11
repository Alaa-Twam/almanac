FROM docker.io/library/node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# VITE
ARG VITE_NASA_API_KEY=DEMO_KEY
ENV VITE_NASA_API_KEY=$VITE_NASA_API_KEY
RUN npm run build

# Runtime
FROM docker.io/library/nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
