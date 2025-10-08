CREATE TABLE docs (
  docOId CHAR(24) NOT NULL PRIMARY KEY,

  clubOId CHAR(24) NOT NULL UNIQUE,
  contents TEXT NOT NULL,

  CONSTRAINT fk_docs_clubOId
    FOREIGN KEY (clubOId)
    REFERENCES clubs (clubOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;
