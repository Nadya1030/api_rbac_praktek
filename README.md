# api_rbac_praktek

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.8. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


endpoint untuk POSTMAN :
Register
POST http://localhost:4000/api/auth/register
{
  "email": "user@mail.com",
  "password": "1234567",
  "roleId": "580b3c75-164f-4a3d-9891-9063c472740a"
}

Login:
POST http://localhost:4000/api/auth/login
{
  "email": "user@mail.com",
  "password": "1234567"
}
AUTH TOKEN :"bearer token" 

TESTING APAKAH BENAR USER ATAU ADMIN:
GET http://localhost:4000/api/test
tab Authorization :
bearer token :
output :
{
    "message": "Auth success",
    "user": {
        "id": "3cdbdd5e-c742-4f49-806b-6ddec133b9b4",
        "role": "USER",
        "iat": 1777437583,
        "exp": 1777523983
    }
}

cek permissioin admin atau user:
GET http://localhost:4000/api/admin
http://localhost:4000/api/admin
tab Authorization :
bearer token :
admin:
{
    "message": "Welcome Admin"
}
user:
{
    "message": "No access"
}

