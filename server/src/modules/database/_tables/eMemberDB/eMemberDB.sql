CREATE TABLE eMembers (

  commOId CHAR(24) NOT NULL,
  memName VARCHAR(255) NOT NULL,
  clubOId CHAR(24) NOT NULL,
  prevClubOId CHAR(24) NOT NULL,
  batterPower INT NOT NULL,
  pitcherPower INT NOT NULL,
  position INT NOT NULL,
  posIdx INT NOT NULL,

  CONSTRAINT fk_eMembers_commOId
    FOREIGN KEY (commOId)
    REFERENCES communities (commOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_eMembers_clubOId
    FOREIGN KEY (clubOId)
    REFERENCES clubs (clubOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_eMembers_commOId_memName UNIQUE (commOId, memName)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

