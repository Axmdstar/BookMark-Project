CREATE TABLE IF NOT EXISTS  `bm` (
   `usrid` varchar(12) NOT NULL,
   `bookmarkid` varchar(45) NOT NULL,
   `title` varchar(45) NOT NULL,
   PRIMARY KEY (`bookmarkid`),
   UNIQUE KEY `bookmarkid_UNIQUE` (`bookmarkid`),
   KEY `Users id_idx` (`usrid`),
   CONSTRAINT `Users id` FOREIGN KEY (`usrid`) REFERENCES `user_tb` (`idUser`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 CREATE TABLE `user_tb` (
   `idUser` varchar(25) NOT NULL,
   `name` varchar(45) NOT NULL,
   `password` varchar(16) DEFAULT NULL,
   `email` varchar(50) DEFAULT NULL,
   PRIMARY KEY (`idUser`),
   UNIQUE KEY `name_UNIQUE` (`name`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 CREATE TABLE `text_tb` (
   `text_id` varchar(45) NOT NULL,
   `paragraph` varchar(45) NOT NULL,
   `bmid` varchar(45) NOT NULL,
   PRIMARY KEY (`text_id`),
   KEY `text and bookmark_idx` (`bmid`),
   CONSTRAINT `text and bookmark` FOREIGN KEY (`bmid`) REFERENCES `bm` (`bookmarkid`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 CREATE TABLE `link_tb` (
   `link_id` varchar(45) NOT NULL,
   `url` varchar(200) NOT NULL,
   `bmid` varchar(45) NOT NULL,
   PRIMARY KEY (`link_id`),
   KEY `bookmarks Id_idx` (`bmid`),
   CONSTRAINT `bookmarks Id` FOREIGN KEY (`bmid`) REFERENCES `bm` (`bookmarkid`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 CREATE TABLE `image_tb` (
   `image_id` varchar(45) NOT NULL,
   `imageurl` varchar(200) NOT NULL,
   `bmid` varchar(45) NOT NULL,
   PRIMARY KEY (`image_id`),
   KEY `image and bookmark_idx` (`bmid`),
   CONSTRAINT `image and bookmark` FOREIGN KEY (`bmid`) REFERENCES `bm` (`bookmarkid`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 CREATE TABLE `like_tb` (
   `idLike` varchar(45) NOT NULL,
   `userid` varchar(45) DEFAULT NULL,
   `bk` varchar(45) DEFAULT NULL,
   PRIMARY KEY (`idLike`),
   UNIQUE KEY `idLike_UNIQUE` (`idLike`),
   KEY `bm_idx` (`bk`),
   KEY `like User_idx` (`userid`),
   CONSTRAINT `bm` FOREIGN KEY (`bk`) REFERENCES `bm` (`bookmarkid`),
   CONSTRAINT `like User` FOREIGN KEY (`userid`) REFERENCES `user_tb` (`idUser`) ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 Show create table image_tb
 
-- describe bookmark
-- INSERT INTO bookmark.user (idUser, name, password)
-- value("21xxxx","shifa","zaqxsw");

-- INSERT INTO bookmark.bm (usrid, bookmarkid, title)
-- value("21xxxx","book2mark","My Code Notes 2");

-- insert into text (idText, paragraph, bmid)
-- value("vdxge","hello to pain","asdfg");

-- insert into link_tb (idLink, url, bmid)
-- value("vdxlink43","https://www.w3school.com","asdfg");

-- insert into image (idImage, imageurl, bmid)
-- value("image_321","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5i76Wbd1oToESAdhei8urLUxGrn9799Xrow&usqp=CAU","iopjkl");

-- insert into bookmark.like (idLike, userid, bookmark)
-- value ("21rwdge", "qazxsw", "iopjkl"),("xxxx", "21xxxx", "iopjkl");

-- value("erwdge", "qazxsw", "asdfg" 
-- DELIMITER 
-- select *  from bookmark.like;
-- select * from image;
-- select * from link;
-- select * from user;
-- select * from text;
-- SELECT * FROM bm;

-- select distinct bm.bookmarkid, Count( bookmarkid ) as likeNumber  from bookmark.like, bm
-- group by bookmark.like.bookmark;

-- # ChatGpt Ans #
-- SELECT b.bookmarkid AS bookmark_id, b.title, COUNT(l.userid) AS like_count, usr.name FROM bm AS b
-- LEFT JOIN like_tb AS l ON l.bk = b.bookmarkid
-- left join user_tb As usr ON usr.idUser = b.usrid
-- GROUP BY b.bookmarkid, b.title;

-- # MyTake #
-- DELIMITER 
-- select b.bookmarkid, b.title, usr.name, count(lk.userid) from bm as b
-- left join like_tb as lk on lk.bk = b.bookmarkid
-- left join user_tb as usr on usr.idUser = b.usrid
-- group by  b.bookmarkid, b.title;

-- select * from bm
-- select * from user_tb;
-- select * from like_tb;

-- select  bookmarkid, title,
--   Getting txt, link, image as string separated by ; So in the frontend split it by ;
--   group_concat(distinct txt.paragraph SEPARATOR ';') as txt
-- , group_concat(distinct lid.url SEPARATOR ';') as url
-- , group_concat(distinct img.imageurl SEPARATOR ';' ) as imgs from bm
-- left join image_tb as img on img.bmid = bookmarkid
-- left join link_tb as lid on lid.bmid = bookmarkid
-- left join text_tb as txt on txt.bmid = bookmarkid
-- -- where bookmarkid = "asdfg"
-- group by bookmarkid, title;

-- INSERT INTO bm(usrid, bookmarkid, title)
-- values("qazxsw","uu32k","How");

-- select * from like_tb;
-- Insert into like_tb(idLike, userid, bk)
-- values();

-- mysqldump -u your_username -p your_database_name > dump.sql




