# Game Creator API

API สำหรับจัดการข้อมูลนักพัฒนาเกม (Creators) และเกม (Games) สร้างด้วย [Bun](https://bun.sh/), [ElysiaJS](https://elysiajs.com/), และ [PostgreSQL](https://www.postgresql.org/) โดยใช้สถาปัตยกรรม MVC พร้อม TypeScript

## คุณสมบัติ

- RESTful API ครบถ้วนสำหรับ Creators และ Games
- แยกส่วน Controller, Model, Route อย่างชัดเจน (MVC)
- ใช้ PostgreSQL เป็นฐานข้อมูลหลัก
- ตรวจสอบและ validate ข้อมูล input ด้วย Elysia
- รองรับ TypeScript เต็มรูปแบบ
- สร้าง UUID อัตโนมัติ
- มีระบบ error handling ที่ดี

## โครงสร้างโปรเจค

```
.
├── src/
│   ├── config/           # การเชื่อมต่อฐานข้อมูล
│   ├── controllers/      # จัดการ logic ของ API
│   ├── database/         # SQL และสคริปต์ migration
│   ├── models/           # ฟังก์ชันสำหรับดึง/บันทึกข้อมูล
│   ├── routes/           # กำหนดเส้นทาง API
│   ├── types/            # TypeScript types
│   └── index.ts          # Entry point ของแอป
├── .env                  # ตัวแปรเชื่อมต่อฐานข้อมูล
├── docker-compose.yml    # สำหรับรัน PostgreSQL และ pgAdmin ด้วย Docker
├── package.json
└── README.md
```

## วิธีเริ่มต้นใช้งาน

### 1. ใช้งานผ่าน Docker (แนะนำ)

1. ติดตั้ง Docker และ Docker Compose
2. รันฐานข้อมูลและ pgAdmin:
   ```bash
   docker-compose up -d
   ```
3. ติดตั้ง dependencies:
   ```bash
   bun install
   ```
4. สร้างไฟล์ `.env` (ดูตัวอย่างใน `.env`)
5. รัน migration เพื่อสร้างตาราง:
   ```bash
   bun run src/database/migrate.ts
   ```
6. เริ่มเซิร์ฟเวอร์:
   ```bash
   bun run dev
   ```

### 2. ใช้งานกับ PostgreSQL ที่ติดตั้งเอง

1. ติดตั้ง PostgreSQL และสร้าง database ตามค่าที่กำหนดใน `.env`
2. ทำตามขั้นตอนที่ 3-6 ด้านบน

## การเข้าถึง

- **API**: http://localhost:3000
- **pgAdmin**: http://localhost:5050 (email: admin@admin.com, password: admin)
- **PostgreSQL**: localhost:5432 (user: myuser, password: mypassword, db: game_creator_db)

## ตัวอย่าง Endpoint

### Creators
- `GET /api/creators` - ดูรายชื่อนักพัฒนาเกมทั้งหมด
- `GET /api/creators/:id` - ดูข้อมูลนักพัฒนาเกมตาม id
- `POST /api/creators` - เพิ่มนักพัฒนาเกมใหม่
- `PUT /api/creators/:id` - แก้ไขข้อมูลนักพัฒนาเกม
- `DELETE /api/creators/:id` - ลบนักพัฒนาเกม
- `GET /api/creators/:id/games` - ดูเกมทั้งหมดของนักพัฒนา

### Games
- `GET /api/games` - ดูรายชื่อเกมทั้งหมด
- `GET /api/games/:id` - ดูข้อมูลเกมตาม id
- `GET /api/games/:id/with-creator` - ดูข้อมูลเกมพร้อมข้อมูลนักพัฒนา
- `POST /api/games` - เพิ่มเกมใหม่
- `PUT /api/games/:id` - แก้ไขข้อมูลเกม
- `DELETE /api/games/:id` - ลบเกม

## License

MIT