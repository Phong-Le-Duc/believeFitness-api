# trainer-api

RESTful web API for the Trainer App.

## Install

```bash
npm install
```

## Run

```bash
npm start
```

## Documentation

<http://localhost:4000>

### Predefined Users

There are 5 predefined users in the API:

| username | password | role |
| --- | --- | --- |
| admin | 1234 | admin |
| user1 | 1234 | default |
| user2 | 1234 | default |
| user3 | 1234 | default |
| user4 | 1234 | default |

## Deploy Backend To Render

### 1) Push this repository to GitHub

Render deploys from a Git repository.

### 2) Create a Web Service in Render

Use these settings:

- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

### 3) Add environment variables in Render

Set these in Render > your service > Environment:

- `NODE_ENV=production`
- `JWT_SECRET=<long-random-secret>`
- `CORS_ORIGIN=https://your-frontend.netlify.app`
- `SQLITE_STORAGE=/var/data/database.sqlite3`

Notes:

- `PORT` is automatically provided by Render.
- You can allow multiple frontend domains by comma-separating `CORS_ORIGIN`.

### 4) Add a persistent disk

Because this API uses SQLite, attach a Render Disk so data survives restarts:

- Mount path: `/var/data`
- Database path env var: `SQLITE_STORAGE=/var/data/database.sqlite3`

If you skip a disk, data may reset on deploy/restart.

### 5) Health check (optional but recommended)

Set health check path to:

- `/healthz`

### 6) Verify deployment

After deploy, open:

- `https://<your-render-service>.onrender.com/healthz`

Expected response:

```json
{"status":"ok"}
```

## Deploy Frontend To Netlify

When you deploy your frontend, set its API base URL env var to your Render URL, for example:

- `VITE_API_URL=https://<your-render-service>.onrender.com`
- or `REACT_APP_API_URL=https://<your-render-service>.onrender.com`

Then make sure your frontend requests `/api/v1/...` from that base URL.
