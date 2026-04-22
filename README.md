# HEITINGO Backend API Documentation (V3.0)

Base URL: `http://localhost:3000/api`

## 1. Authentication
- **POST /auth/register**
  - Body: `{ "username", "password", "nickname", "inviter_id" (optional) }`
- **POST /auth/login**
  - Body: `{ "username", "password" }`
  - Returns: `{ "token", "user" }`

## 2. Short Video
- **GET /video/feed**
  - Returns: List of latest 10 videos.
- **POST /video/:id/like**
  - Interaction: Increments like count.

## 3. Talent (玩)
- **GET /talent/list**
  - Returns: List of all talents with their social stats and rank.
- **GET /talent/:id/link?userLevel=1**
  - Logic: Returns jump link based on the user's level.

## 4. Mall & Distribution
- **GET /mall/products**
  - Returns: All available 3D digital assets.
- **POST /mall/order**
  - Body: `{ "userId", "productId" }`
  - **Distribution Logic**:
    - Level 1 (Inviter): Gets **10%** commission.
    - Level 2 (Grand Inviter): Gets **5%** commission.
    - Balance is automatically updated in the `users` table.

---

## Technical Stack
- **Language**: Node.js (Express)
- **Database**: MySQL (Sequelize ORM)
- **Authentication**: JWT & BcryptJS
- **Commission Engine**: Real-time transaction-based distribution.

## Deployment
1. Run `npm install`.
2. Configure `.env` with MySQL credentials.
3. Import `schema.sql` to your MySQL instance.
4. Run `npm start`.
