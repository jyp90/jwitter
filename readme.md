## Install NPM

$ npm i express express-async-errors bcrypt jsonwebtoken

---

### Install Dotenv

$ npm i dotenv

---

### Install socket.io

$ npm i socket.io

---

### Install mysql

$ npm i mysql2

---

### Install sequelize

$ npm install --save sequelize

---

# Jwitter API 명세

# Auth

- `User` Schema
    
    ```json
    {
      id: string // 사용자의 고유한 아이디
      username: string,  // 사용자 닉네임 (아이디)
      password: string,  // 사용자 비밀번호
      name: string,  // 사용자 이름
      email: string,  // 사용자 이메일
      url: string (optional) // 사용자 프로파일 사진 URL
    }
    ```
    

### `POST`/auth/signup

Request

```json
{
    username,
    password,
    name,
    email,
    url
}
```

Response

```json
{
	token,
	username
}
```

### `POST`/auth/login

Request

```json
{
	username,
	password
}
```

Response 

```json
{
	token,
	username
}
```

### `GET` /auth/me

```json
{
	token,
	username
}
```