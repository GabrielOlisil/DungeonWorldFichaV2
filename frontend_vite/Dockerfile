FROM node:18-alpine AS build

ENV VITE_BACKEND_URL=http://localhost:8000
ENV VITE_REDIRECT_URL=http://localhost:3000/

WORKDIR /app

COPY package.json .



RUN npm install


COPY . .

RUN npm run build

FROM node:18-alpine

RUN npm i -g serve

FROM nginx:alpine

# Remove a configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia a nova configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos estáticos construídos
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]