CREATE DATABASE IF NOT EXISTS gkdcompy;

USE gkdcompy;

-- ============================================
-- GKD Community Database - Create All Tables
-- ============================================
-- 외래키 의존성을 고려한 테이블 생성 순서
-- ============================================

-- 1. communities 테이블 (가장 먼저 생성 - 다른 테이블의 기반)
CREATE TABLE communities (
  commOId CHAR(24) NOT NULL PRIMARY KEY,

  banClubOId CHAR(24), -- 일단 NULL 이었다가 나중에 넣어줘야한다. 또한, 이거 사라진다고 공동체가 사라지면 안된다.
  commName VARCHAR(255) NOT NULL UNIQUE,
  maxUsers INT NOT NULL DEFAULT 5,
  maxClubs INT NOT NULL DEFAULT 5,
  subClubOId CHAR(24) -- 후보군 더미클럽
  
)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

-- 2. users 테이블 (communities와 독립적)
CREATE TABLE users (
  userOId CHAR(24) NOT NULL PRIMARY KEY,

  userId VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL, 
  commAuth INT NOT NULL DEFAULT 0,
  commOId VARCHAR(24) NOT NULL DEFAULT 'admin',

  CONSTRAINT unique_commOId_userId UNIQUE (commOId, userId)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

-- 3. clubs 테이블 (communities 참조)
CREATE TABLE clubs (
  clubOId CHAR(24) NOT NULL PRIMARY KEY,

  chatRoomOId CHAR(24) NOT NULL,
  clubIdx INT NOT NULL,
  clubName VARCHAR(255) NOT NULL,
  commOId CHAR(24) NOT NULL,
  docOId CHAR(24) NOT NULL,

  lastAddPrevWeekDate INT NOT NULL DEFAULT 0,
  numOfAddedPrevWeek INT NOT NULL DEFAULT 0,

  CONSTRAINT fk_clubs_commOId
    FOREIGN KEY (commOId)
    REFERENCES communities (commOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_commOId_clubName UNIQUE (commOId, clubName)
  
)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

-- 4. chatRooms 테이블 (clubs 참조)
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

-- 5. chats 테이블 (chatRooms 참조)
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

-- 6. members 테이블 (users, clubs 참조)
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

-- 7. cards 테이블 (members 참조)
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

-- 8. weekRows 테이블 (clubs 참조)
CREATE TABLE weekRows (
  weekOId CHAR(24) NOT NULL PRIMARY KEY,

  clubOId CHAR(24) NOT NULL,
  endDateVal INT NOT NULL,
  startDateVal INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  weekComments VARCHAR(255) NOT NULL,

  CONSTRAINT fk_weekRows_clubOId
    FOREIGN KEY (clubOId)
    REFERENCES clubs (clubOId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT unique_weekRow_clubOId_startDateVal_endDateVal UNIQUE (clubOId, startDateVal, endDateVal)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;

-- 9. weekRowDateInfos 테이블 (weekRows 참조)
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

-- 10. rowMemberInfos 테이블 (weekRows 참조)
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

-- 11. dailyRecords 테이블 (weekRows, clubs 참조)
CREATE TABLE dailyRecords (
  clubOId CHAR(24) NOT NULL, -- 어느 클럽에서 발생한 기록인지 빠르게 알기위해 필요함
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

  CONSTRAINT fk_dailyRecords_rowMemName
    FOREIGN KEY (weekOId, rowMemName)
    REFERENCES rowMemberInfos (weekOId, rowMemName)
    ON UPDATE CASCADE

  CONSTRAINT unique_dailyRecords_rowMemName_dateVal UNIQUE (rowMemName, dateVal, weekOId)

)   CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs;


-- 12. docs 테이블 (clubs 참조)
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


-- ============================================
-- 완료: 모든 테이블이 외래키 의존성 순서대로 생성됨
-- ============================================

