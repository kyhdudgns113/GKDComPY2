CREATE TABLE weekRows (
  weekOId CHAR(24) NOT NULL PRIMARY KEY,

  clubOId CHAR(24) NOT NULL,
  endDateVal INT NOT NULL,
  startDateVal INT NOT NULL,
  title VARCHAR(255) NOT NULL,

  CONSTRAINT fk_weekRows_clubOId
    FOREIGN KEY (clubOId)
    REFERENCES clubs (clubOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_weekRow_clubOId_startDateVal_endDateVal UNIQUE (clubOId, startDateVal, endDateVal)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

CREATE TABLE weekRowDateInfos (
  weekOId CHAR(24) NOT NULL,
  dateVal INT NOT NULL,
  enemyName VARCHAR(255) NOT NULL,
  pitchOrder INT NOT NULL,
  dailyOrder VARCHAR(255) NOT NULL,
  comments VARCHAR(255) NOT NULL,

  CONSTRAINT fk_weekRowDateInfos_weekOId
    FOREIGN KEY (weekOId)
    REFERENCES weekRows (weekOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_weekRowDateInfo_weekOId_dateVal UNIQUE (weekOId, dateVal)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

CREATE TABLE rowMemberInfos (
  batterPower INT NOT NULL,
  memOId CHAR(24), -- 이거 unique 로 들어가면 안된다. 공백인 애들이 많을 수 있다.
  pitcherPower INT NOT NULL,
  position INT NOT NULL,
  rowMemName VARCHAR(255) NOT NULL, 
  weekOId CHAR(24) NOT NULL,

  CONSTRAINT fk_rowMemberInfos_weekOId
    FOREIGN KEY (weekOId)
    REFERENCES weekRows (weekOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_rowMemberInfo_weekOId_rowMemName UNIQUE (weekOId, rowMemName)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;