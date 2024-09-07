<h1> Getting Started </h1>

1. Create file .env
   
2. Setup database connection in .env
   
Example :
```bash
DATABASE_URL="mysql://username:password@host:port/db_name"
```
3. Run the command below in terminal

```bash
npx prisma migrate dev --name init
```

```bash
npm run dev
```

You can test the API with url :

http://localhost:3000/api/users

http://localhost:3000/api/users/{id}

Or

http://localhost:3000/api/jobs

http://localhost:3000/api/jobs/{id}
