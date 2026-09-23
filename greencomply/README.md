# GreenComply — working MVP scaffold

## Run
`npm install && npm run dev` then open http://localhost:3000. Run `npm test` for calculation tests. Node.js 20+ recommended.

## Scope
Interactive portfolio editor, effective-year scenario inputs, deterministic decimal calculation engine, three enterprise views, JSON audit export and API POST `/api/calculate`. Sample data is fictional. Assumptions are illustrative, not legal or GHG-accounting advice.

## Production gates (not yet implemented)
Do not deploy this scaffold for real customer or regulated data until tenant-scoped PostgreSQL persistence, enterprise authentication/RBAC, evidence ingestion, legal-reviewed effective-dated rules, source-based Scope 2 accounting, audit event log, encryption, rate limiting, monitoring, backups, CI/CD and security testing are added. No live BEE/CEA/REC integrations or statutory filing are claimed.