-- HEITINGO Database Schema V1.0

CREATE DATABASE IF NOT EXISTS heitingo_db;
USE heitingo_db;

-- 1. User Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50),
    avatar VARCHAR(255),
    role TINYINT DEFAULT 0 COMMENT '0: User, 1: Talent/Celebrity',
    level TINYINT DEFAULT 1 COMMENT 'Membership level (1-5)',
    inviter_id INT COMMENT 'Level 1 inviter',
    grand_inviter_id INT COMMENT 'Level 2 inviter',
    balance DECIMAL(10, 2) DEFAULT 0.00 COMMENT 'Commission balance',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Celebrity/Talent Table
CREATE TABLE IF NOT EXISTS celebrities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    real_name VARCHAR(100),
    height INT,
    weight INT,
    social_stats JSON COMMENT 'Fans count from Douyin, Bilibili, etc.',
    external_links JSON COMMENT 'Jump links based on level',
    rank_stars TINYINT DEFAULT 5,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Video Table
CREATE TABLE IF NOT EXISTS videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    video_url VARCHAR(255) NOT NULL,
    cover_url VARCHAR(255),
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    status TINYINT DEFAULT 1 COMMENT '1: Published, 0: Pending/Banned',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- 4. Mall Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    cover_image VARCHAR(255),
    category VARCHAR(50),
    stock INT DEFAULT 99,
    commission_rate DECIMAL(5, 2) DEFAULT 0.10 COMMENT 'Default 10%',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Orders & Distribution Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status TINYINT DEFAULT 0 COMMENT '0: Paid, 1: Completed, 2: Cancelled',
    commission_distributed TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS distribution_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL COMMENT 'Person receiving commission',
    amount DECIMAL(10, 2) NOT NULL,
    level TINYINT NOT NULL COMMENT '1 or 2',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
