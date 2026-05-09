# API Documentation - Auth & Chat

Dokumentasi ini menjelaskan endpoint REST API dan event WebSocket yang tersedia untuk fitur autentikasi (Auth) dan obrolan (Chat) pada aplikasi.

---

## 🔐 1. Authentication (REST API)
Base URL: `/auth`

Semua endpoint di bawah ini (kecuali yang ditandai dengan `[Public]`) memerlukan header `Authorization: Bearer <token>`.

### 1.1 Register User `[Public]`
Mendaftarkan pengguna baru.
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body Request**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response** (201 Created):
  Mengembalikan data user yang berhasil diregistrasi (tanpa password).

### 1.2 Login User `[Public]`
Login menggunakan email dan password untuk mendapatkan token JWT.
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body Request**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR...",
    "user": {
      "id": "user-uuid",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
  ```

### 1.3 Login Google `[Public]`
Login menggunakan Google OAuth ID Token.
- **URL**: `/auth/google`
- **Method**: `POST`
- **Body Request**:
  ```json
  {
    "idToken": "google-oauth-id-token-string"
  }
  ```
- **Response** (200 OK):
  Mengembalikan `access_token` JWT dan data user.

### 1.4 Get Current User Profile
Mendapatkan profil dari user yang sedang login.
- **URL**: `/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200 OK):
  Mengembalikan payload dari user yang sedang login.

### 1.5 Logout
Melakukan logout untuk user yang sedang login.
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200 OK): Berhasil logout.

---

## 👥 2. Users (REST API)
Base URL: `/users`

### 2.1 Get All Users
Mendapatkan daftar semua user yang terdaftar di sistem.
- **URL**: `/users`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200 OK): Array berisi daftar user.

### 2.2 Search Users
Mencari user berdasarkan username atau email.
- **URL**: `/users/search?q={query}`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Query Params**:
  - `q` (string): Kata kunci pencarian (berdasarkan username atau email).
- **Response** (200 OK): Array berisi user yang cocok dengan pencarian.

---

## 💬 3. Chat Rooms & Messages (REST API)
Base URL: `/chats`

### 3.1 Get All User Rooms
Mendapatkan semua chat room yang dimiliki oleh user yang sedang login.
- **URL**: `/chats`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200 OK): Array berisi daftar room.

### 3.2 Create Direct Chat
Membuat atau mengambil room chat personal dengan user lain.
- **URL**: `/chats/direct`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body Request**:
  ```json
  {
    "targetUserId": "uuid-of-the-target-user"
  }
  ```
- **Response** (201 Created): Mengembalikan detail room chat.

### 3.3 Get Messages in Room
Mendapatkan riwayat pesan dalam sebuah room (mendukung pagination).
- **URL**: `/chats/:roomId/messages`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Query Params**:
  - `limit` (number, optional): Jumlah pesan yang diambil.
  - `offset` (number, optional): Offset / titik awal pengambilan pesan.
- **Response** (200 OK): Array berisi daftar pesan.

### 3.4 Send Message via REST (Alternatif WebSocket)
Mengirim pesan ke sebuah room menggunakan endpoint HTTP.
- **URL**: `/chats/:roomId/messages`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body Request**:
  ```json
  {
    "content": "Halo, apa kabar?",
    "type": "TEXT" // TEXT, IMAGE, AUDIO, VIDEO, etc
  }
  ```
- **Response** (201 Created): Mengembalikan detail pesan yang dikirim.

---

## 🔌 4. Real-time Chat (WebSockets)

Aplikasi menggunakan WebSockets (Socket.IO) untuk fungsionalitas obrolan secara real-time.

### 4.1 Connection
Saat terhubung ke server WebSocket, token JWT harus disertakan untuk autentikasi.
- **Client Handshake Auth**:
  ```javascript
  const socket = io('http://localhost:3000', {
    auth: {
      token: 'YOUR_JWT_TOKEN'
    }
  });
  ```
  *(Alternatif: token dapat dikirim melalui header Authorization)*.

### 4.2 Events yang Dipancarkan oleh Klien (Emit)

#### `join_room`
Bergabung ke sebuah spesifik room chat untuk mulai menerima pesan.
- **Payload**:
  ```json
  { "roomId": "room-uuid" }
  ```
- **Acknowledge/Response**: `{ "event": "joined", "data": "room-uuid" }`

#### `send_message`
Mengirim pesan baru ke sebuah room chat.
- **Payload**:
  ```json
  { 
    "roomId": "room-uuid", 
    "content": "Isi pesan", 
    "type": "TEXT" 
  }
  ```
- **Acknowledge/Response**: Mengembalikan object `Message` yang disimpan di database.

#### `typing_start`
Memberitahu user lain di dalam room bahwa kita sedang mengetik.
- **Payload**:
  ```json
  { "roomId": "room-uuid" }
  ```

#### `typing_end`
Memberitahu user lain di dalam room bahwa kita berhenti mengetik.
- **Payload**:
  ```json
  { "roomId": "room-uuid" }
  ```

#### `mark_as_read`
Menandai sebuah pesan telah dibaca oleh user saat ini.
- **Payload**:
  ```json
  { 
    "roomId": "room-uuid", 
    "messageId": "message-uuid" 
  }
  ```

### 4.3 Events yang Didengarkan oleh Klien (Listen)

#### `receive_message`
Terpicu ketika ada pesan baru yang masuk ke room tempat user bergabung.
- **Data**: Object Message (termasuk id, content, senderId, roomId, createdAt).

#### `user_typing`
Terpicu ketika user lain dalam room mulai atau berhenti mengetik.
- **Data**:
  ```json
  {
    "userId": "uuid-of-typist",
    "roomId": "room-uuid",
    "isTyping": true // true jika mulai mengetik, false jika berhenti
  }
  ```

#### `message_read`
Terpicu ketika pesan telah ditandai dibaca oleh user lain.
- **Data**:
  ```json
  {
    "messageId": "message-uuid",
    "userId": "uuid-of-reader",
    "roomId": "room-uuid"
  }
  ```
