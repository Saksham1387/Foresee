
![Forsee Banner](https://fuchsia-legal-roundworm-794.mypinata.cloud/ipfs/bafybeicg2jye77lr5ok4eh7de33ujtxffllf2ynqdzc2ze423bxdbphkby)

# Foresee — A Probo like Betting Platform

**Foresee** is a full-stack prediction market and betting platform, inspired by Probo, built with a modular architecture optimized for scalability and performance.

This monorepo powers a decentralized-style betting system with a matching engine, real-time WebSocket updates, database abstraction layer, and inter-service messaging via Redis.

---

## 📦 Monorepo Structure

```
foresee/
├── apps/
│   ├── api/           # Core API service (GraphQL/REST)
│   ├── orderbook/     # Matching engine service
│   ├── db-service/    # Dedicated DB interaction service
│   └── ws/            # WebSocket gateway for real-time updates
├── packages/
│   └── shared/        # Shared libraries/utilities/types
├── .env               # Environment variables
├── docker-compose.yml
└── README.md
```

---

## 🚀 Features

* 📈 **Orderbook-based matching engine** — Inspired by financial exchanges
* 🔄 **WebSocket support** — For real-time market updates and event streams
* 🧩 **Service-oriented architecture** — Clean separation of concerns
* 📡 **Redis-backed message queue** — Fast and scalable inter-service communication
* 📚 **DB service abstraction** — Handles all persistence and retrieval operations

---

## 🛠️ Tech Stack

* **Node.js** (TypeScript)
* **Redis** — Pub/Sub and message queuing
* **PostgreSQL / MongoDB** — Pluggable DB support
* **WebSocket (WS)** — Real-time communication

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/foresee.git
cd foresee
```

### 2. Start All Services

Or if using a monorepo task runner (e.g., `turbo`, `nx`, `lerna`):

```bash
bun install
bun dev 
```

---

## 🧱 Services Overview

### `apps/api`

* Exposes endpoints for market creation, placing bets, querying market data.
* Can be REST or GraphQL depending on implementation.

### `apps/orderbook`

* Core of the matching engine
* Matches YES/NO shares based on price and time priority
* Consumes messages from Redis (e.g., new bet orders)

### `apps/db-service`

* Responsible for DB reads/writes
* Acts as a microservice for persistence
* Can be accessed via RPC or message bus

### `apps/ws`

* WebSocket server for pushing market updates to clients
* Subscribes to Redis channels to broadcast changes

---

## 📬 Messaging System

* All services communicate via **Redis Pub/Sub** channels.
* Example channels:

  * `orders:new`
  * `market:depth`
  * `matched:trades`

This decoupled architecture allows each component to scale independently.

---

