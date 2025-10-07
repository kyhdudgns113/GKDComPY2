CREATE TABLE users (
  userOId CHAR(24) NOT NULL PRIMARY KEY,

  id VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  commAuth INT NOT NULL DEFAULT 0,
  commOId VARCHAR(24) NOT NULL DEFAULT 'admin',

  CONSTRAINT unique_commOId_id UNIQUE (commOId, id)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;