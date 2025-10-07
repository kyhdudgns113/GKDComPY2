CREATE TABLE clubs (
  clubOId CHAR(24) NOT NULL PRIMARY KEY,

  chatRoomOId CHAR(24) NOT NULL,
  clubName VARCHAR(255) NOT NULL,
  commOId CHAR(24) NOT NULL,
  docOId CHAR(24) NOT NULL,

  lastAddPrevWeekDate INT NOT NULL DEFAULT 0,
  numOfAddedPrevWeek INT NOT NULL DEFAULT 0,

  CONSTRAINT fk_clubs_commOId
    FOREIGN KEY (commOId)
    REFERENCES communities (commOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE

  CONSTRAINT unique_commOId_clubName UNIQUE (commOId, clubName)
  
)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;