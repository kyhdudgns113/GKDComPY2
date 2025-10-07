CREATE TABLE chatRooms (
  chatRoomOId CHAR(24) NOT NULL PRIMARY KEY,

  clubOId CHAR(24) NOT NULL,
  numChat INT NOT NULL DEFAULT 0,

  CONSTRAINT fk_chatRooms_clubOId 
    FOREIGN KEY (clubOId) 
    REFERENCES clubs (clubOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

CREATE TABLE chats (
  chatIdx INT NOT NULL,
  chatRoomOId CHAR(24) NOT NULL,

  date DATETIME NOT NULL,
  userId VARCHAR(255) NOT NULL,
  userOId CHAR(24) NOT NULL, -- fk 설정 안한다. 이미 삭제된 유저가 있을 수 있음

  content TEXT NOT NULL,

  CONSTRAINT fk_chats_chatRoomOId
    FOREIGN KEY (chatRoomOId)
    REFERENCES chatRooms (chatRoomOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;
