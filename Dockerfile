# 1. Gunakan 'base image' Node.js yang ringan
FROM node:18-alpine

# 2. Tentukan folder kerja di dalam kontainer
WORKDIR /app

# 3. Copy file package.json dulu untuk instalasi library
COPY package*.json ./

# 4. Jalankan perintah install bumbu (library express dll)
RUN npm install

# 5. Copy seluruh sisa kode (app.js dll) ke dalam kontainer
COPY . .

# 6. Kasih tahu kalau API ini jalan di port 3000
EXPOSE 3000

# 7. Perintah untuk menyalakan API-nya
CMD ["node", "app.js"]