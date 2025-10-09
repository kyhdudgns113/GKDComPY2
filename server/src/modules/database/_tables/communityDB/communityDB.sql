CREATE TABLE communities (
  commOId CHAR(24) NOT NULL PRIMARY KEY,

  banClubOId CHAR(24), -- 일단 NULL 이었다가 나중에 넣어줘야한다. 또한, 이거 사라진다고 공동체가 사라지면 안된다.
  commName VARCHAR(255) NOT NULL UNIQUE,
  maxUsers INT NOT NULL DEFAULT 5,
  maxClubs INT NOT NULL DEFAULT 5,
  subClubOId CHAR(24) -- 후보군 더미클럽
  
)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;
