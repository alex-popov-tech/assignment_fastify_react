# Keenethics home assignment

## Intro

For this home assignment I've started with Express & React in JS ( as written in requirements ),
but then after asking for details in chat I've decided to replace stack to Fastify + React + Vite + Typescript
( as Fastify is much better from terms of performance and support ). It was also decided to serve
static within Fastify, which is opinionated.

## Demo

TBD

### How to run with `docker compose` in production mode

```sh
docker compose up
```

That should build app in prod mode and run it along with mongodb locally with Docker.

## Development

### Prerequisites

- Node.js 20+

### Installation

```sh
npm install
cd backend
npm install
cp .env.example .env
cd ..
cd frontend
npm install
```

### How to run app in dev mode

Run mongodb instance and populate `backend/.env` file
In separate shell sessions run:
```sh
cd frontend && npm run dev
```
```sh
cd backend && npm run dev
```

And visit `localhost:3000` in browser.
