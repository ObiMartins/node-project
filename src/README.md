# Simple Node.js PM2 Project

This is a small Node.js Express API project that can run normally with `node` or in the background with `pm2`.

## 1. Install dependencies

```bash
npm install
```

## 2. Run normally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/health
```

## 3. Install PM2 globally

```bash
npm install -g pm2
```

## 4. Run with PM2

```bash
pm2 start ecosystem.config.js
```

## 5. Useful PM2 commands

```bash
pm2 list
pm2 logs simple-node-api
pm2 restart simple-node-api
pm2 stop simple-node-api
pm2 delete simple-node-api
```

## 6. Keep app running after server reboot

```bash
pm2 startup
pm2 save
```

After running `pm2 startup`, PM2 may print another command. Copy and run that command too.

## Test POST request

```bash
curl -X POST http://localhost:3000/hello \
  -H "Content-Type: application/json" \
  -d '{"name":"Dennis"}'
```
# simple-node-project
