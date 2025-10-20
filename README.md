# 🔖 Bookmark Manager

save, organize and search bookmarks. react + express + mariadb.

## features
- save bookmarks with auto favicon
- tag system
- search
- favorite bookmarks
- jwt auth

## setup
```bash
docker-compose up -d
cd server && cp .env.example .env && npm i && npm run dev
cd client && npm i && npm run dev
```

open http://localhost:5173

## api
| method | route | desc |
|--------|-------|------|
| POST | /api/auth/register | register |
| POST | /api/auth/login | login |
| GET | /api/bookmarks | list (?q=search) |
| POST | /api/bookmarks | create |
| PUT | /api/bookmarks/:id | update |
| DELETE | /api/bookmarks/:id | delete |
| GET | /api/tags | list tags |
| POST | /api/tags | create tag |

MIT
