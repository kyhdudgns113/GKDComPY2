CREATE TABLE members (
  memOId CHAR(24) NOT NULL PRIMARY KEY,

  batterPower INT NOT NULL,
  clubOId CHAR(24) NOT NULL,
  commOId CHAR(24) NOT NULL,
  memberComment TEXT NOT NULL,
  memName VARCHAR(255) NOT NULL,
  pitcherPower INT NOT NULL,
  position INT NOT NULL,

  CONSTRAINT fk_members_commOId
    FOREIGN KEY (commOId)
    REFERENCES users (commOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_members_commOId_memName UNIQUE (commOId, memName),

  CONSTRAINT fk_members_clubOId
    FOREIGN KEY (clubOId)
    REFERENCES clubs (clubOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

CREATE TABLE cards (
  memOId CHAR(24) NOT NULL,
  
  cardName VARCHAR(255),
  posIdx INT NOT NULL,
  skillIdx0 INT DEFAULT 0,
  skillIdx1 INT DEFAULT 1,
  skillIdx2 INT DEFAULT 2,
  skillLevel0 INT DEFAULT 0,
  skillLevel1 INT DEFAULT 0,
  skillLevel2 INT DEFAULT 0,

  CONSTRAINT fk_cards_memOId 
    FOREIGN KEY (memOId)
    REFERENCES members (memOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_cards_memOId_posIdx UNIQUE (memOId, posIdx)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;
