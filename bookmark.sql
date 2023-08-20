-- CREATE TABLE IF NOT EXISTS `bookmark`.`User` (
--   `idUser` VARCHAR(12) NOT NULL,
--   `name` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`idUser`),
--   UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);

-- CREATE TABLE IF NOT EXISTS `bookmark`.`Bookmark` (
--   `usrid` VARCHAR(12) NOT NULL,
--   `bookmarkid` VARCHAR(45) NOT NULL,
--   `title` VARCHAR(45) NOT NULL,
--   UNIQUE INDEX `usrid_UNIQUE` (`usrid` ASC) VISIBLE,
--   PRIMARY KEY (`bookmarkid`),
--   UNIQUE INDEX `bookmarkid_UNIQUE` (`bookmarkid` ASC) VISIBLE,
--   CONSTRAINT `bookmarkuser`
--     FOREIGN KEY (`usrid`)
--     REFERENCES `bookmark`.`User` (`idUser`)
--     ON DELETE NO action
--     ON UPDATE NO ACTION);


-- CREATE TABLE IF NOT EXISTS `bookmark`.`Like` (
--   `idLike` VARCHAR(12) NOT NULL,
--   `userid` VARCHAR(45) NULL,
--   `bookmark` VARCHAR(45) NULL,
--   PRIMARY KEY (`idLike`),
--   UNIQUE INDEX `idLike_UNIQUE` (`idLike` ASC) VISIBLE,
--   UNIQUE INDEX `userid_UNIQUE` (`userid` ASC) VISIBLE,
--   INDEX `bm_idx` (`bookmark` ASC) VISIBLE,
--   CONSTRAINT `user`
--     FOREIGN KEY (`userid`)
--     REFERENCES `bookmark`.`User` (`idUser`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `bm`
--     FOREIGN KEY (`bookmark`)
--     REFERENCES `bookmark`.`Bookmark` (`bookmarkid`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION);
--     
--  CREATE TABLE IF NOT EXISTS `bookmark`.`Image` (
--   `idImage` VARCHAR(12) NOT NULL,
--   `imageurl` VARCHAR(45) NOT NULL,
--   `bmid` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`idImage`),
--   UNIQUE INDEX `bmid_UNIQUE` (`bmid` ASC) VISIBLE,
--   CONSTRAINT `bm_id_img`
--     FOREIGN KEY (`bmid`)
--     REFERENCES `bookmark`.`Bookmark` (`bookmarkid`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION);


--   CREATE TABLE IF NOT EXISTS `bookmark`.`Text` (
--   `idText` VARCHAR(12) NOT NULL,
--   `paragraph` VARCHAR(45) NOT NULL,
--   `bmid` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`idText`),
--   UNIQUE INDEX `bmid_UNIQUE` (`bmid` ASC) VISIBLE,
--   CONSTRAINT `bm_id_txt`
--     FOREIGN KEY (`bmid`)
--     REFERENCES `bookmark`.`Bookmark` (`bookmarkid`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION);
--   
--   
-- CREATE TABLE IF NOT EXISTS `bookmark`.`Link` (
--   `idLink` VARCHAR(12) NOT NULL,
--   `url` VARCHAR(45) NOT NULL,
--   `bmid` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`idLink`),
--   UNIQUE INDEX `bmid_UNIQUE` (`bmid` ASC) VISIBLE,
--   CONSTRAINT `bm_id_link`
--     FOREIGN KEY (`bmid`)
--     REFERENCES `bookmark`.`Bookmark` (`bookmarkid`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION);

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
select b.bookmarkid, b.title, usr.name, count(lk.userid) from bm as b
left join like_tb as lk on lk.bk = b.bookmarkid
left join user_tb as usr on usr.idUser = b.usrid
group by  b.bookmarkid, b.title;

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

-- select * from user_tb;





