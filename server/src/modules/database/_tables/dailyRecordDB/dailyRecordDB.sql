CREATE TABLE dailyRecords (
  dailyOId CHAR(24) NOT NULL PRIMARY KEY,

  clubOId CHAR(24) NOT NULL,
  comment TEXT NOT NULL,
  condError INT NOT NULL,
  dateVal INT NOT NULL,
  memOId CHAR(24),
  result0 INT NOT NULL,
  result1 INT NOT NULL,
  result2 INT NOT NULL,
  rowMemName VARCHAR(255) NOT NULL,
  weekOId CHAR(24) NOT NULL,

  CONSTRAINT fk_dailyRecords_weekOId
    FOREIGN KEY (weekOId)
    REFERENCES weekRows (weekOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_dailyRecords_clubOId
    FOREIGN KEY (clubOId)
    REFERENCES clubs (clubOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_dailyRecords_rowMemName_dateVal UNIQUE (rowMemName, dateVal)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;
