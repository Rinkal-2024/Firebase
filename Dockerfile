FROM node:18 AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist/fire-base-crud /usr/share/nginx/html
ENV FIREBASE_API_KEY="AIzaSyCgDGHSApowEjPhZeQDCahDocMUCwp6lU4"
ENV FIREBASE_AUTH_DOMAIN="mean-auth-cb617.firebaseapp.com"
ENV FIREBASE_DATABASE_URL="https://mean-auth-cb617-default-rtdb.asia-southeast1.firebasedatabase.app"
ENV FIREBASE_PROJECT_ID="mean-auth-cb617"
ENV FIREBASE_STORAGE_BUCKET="mean-auth-cb617.appspot.com"
ENV FIREBASE_MESSAGING_SENDER_ID="12461046933"
ENV FIREBASE_APP_ID="1:12461046933:web:9823beea10fd5141d5af9c"
ENV FIREBASE_MEASUREMENT_ID="G-XKTMSN53WV"

COPY ./nginx-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80
