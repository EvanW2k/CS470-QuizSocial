-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: quizsocial
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `questionID` int NOT NULL AUTO_INCREMENT,
  `quizID` int DEFAULT NULL,
  `question` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionID`),
  KEY `quiz_set_id` (`quizID`),
  CONSTRAINT `fk_quiz_id_2` FOREIGN KEY (`quizID`) REFERENCES `quizzes` (`quizID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,'question1','answer1','2024-04-08 01:25:26','2024-04-08 01:25:26'),(2,1,'question2','answer2','2024-04-08 01:25:49','2024-04-08 01:25:49'),(3,2,'1+1','2','2024-04-13 17:38:00','2024-04-13 17:38:00'),(4,2,'7-3','4','2024-04-13 17:38:00','2024-04-13 17:38:00'),(5,2,'100+0','100','2024-04-13 17:38:00','2024-04-13 17:38:00'),(6,2,'2+8','10','2024-04-13 17:38:00','2024-04-13 17:38:00'),(7,3,'1x1','1','2024-04-13 17:39:08','2024-04-13 17:39:08'),(8,3,'10x10','100','2024-04-13 17:39:08','2024-04-13 17:39:08'),(9,3,'8/2','4','2024-04-13 17:39:08','2024-04-13 17:39:08'),(10,3,'3x11','33','2024-04-13 17:39:08','2024-04-13 17:39:08'),(11,1,'What is the capital city of Japan?','Tokyo','2024-04-17 10:27:33','2024-04-17 10:27:33'),(12,1,'Which planet is known as the Red Planet?','Mars','2024-04-17 10:27:33','2024-04-17 10:27:33'),(13,1,'What year did the Berlin Wall fall?','1989','2024-04-17 10:32:07','2024-04-17 10:32:07'),(14,1,'Who discovered penicillin?','Alexander Fleming','2024-04-17 10:32:07','2024-04-17 10:32:07'),(15,1,'What is the hardest natural substance on Earth?','Diamond','2024-04-17 10:32:07','2024-04-17 10:32:07'),(16,1,'What is the largest country in the world?','Russia','2024-04-17 10:32:07','2024-04-17 10:32:07'),(17,1,'What novel is often cited as the bestselling single-volume book of all time?','Don Quixote','2024-04-17 10:32:07','2024-04-17 10:32:07');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_favorites`
--

DROP TABLE IF EXISTS `quiz_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_favorites` (
  `quizID` int DEFAULT NULL,
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `favorited_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `fk_user_id` (`userID`),
  KEY `fk_quiz_id` (`quizID`),
  CONSTRAINT `fk_quiz_id` FOREIGN KEY (`quizID`) REFERENCES `quizzes` (`quizID`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_favorites`
--

LOCK TABLES `quiz_favorites` WRITE;
/*!40000 ALTER TABLE `quiz_favorites` DISABLE KEYS */;
INSERT INTO `quiz_favorites` VALUES (2,'k.yuen','2024-04-16 02:08:47'),(2,'h.zhang','2024-04-16 02:10:44'),(3,'h.zhang','2024-04-16 02:10:51');
/*!40000 ALTER TABLE `quiz_favorites` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_on_fav_insert` AFTER INSERT ON `quiz_favorites` FOR EACH ROW update quizzes set num_favorites = num_favorites+1 where quizID = new.quizID */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_on_fav_delete` AFTER DELETE ON `quiz_favorites` FOR EACH ROW update quizzes set num_favorites = num_favorites-1 where quizID = old.quizID */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `quiz_ratings`
--

DROP TABLE IF EXISTS `quiz_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_ratings` (
  `quizID` int NOT NULL,
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rating` float DEFAULT NULL,
  `rated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  KEY `quizID` (`quizID`),
  KEY `userID` (`userID`),
  CONSTRAINT `quiz_ratings_ibfk_1` FOREIGN KEY (`quizID`) REFERENCES `quizzes` (`quizID`),
  CONSTRAINT `quiz_ratings_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_ratings`
--

LOCK TABLES `quiz_ratings` WRITE;
/*!40000 ALTER TABLE `quiz_ratings` DISABLE KEYS */;
INSERT INTO `quiz_ratings` VALUES (2,'k.yuen',3.5,'2024-04-19 17:58:58');
/*!40000 ALTER TABLE `quiz_ratings` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `rating_insert` AFTER INSERT ON `quiz_ratings` FOR EACH ROW update quizzes set rating = (select avg(rating) from quiz_ratings where quizID = new.quizID) where quizID = new.quizID */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `rating_delete` AFTER DELETE ON `quiz_ratings` FOR EACH ROW if (select count(*) from quiz_ratings where quizID = old.quizID) > 0 then
update quizzes set rating = (select avg(rating) from quiz_ratings where quizID = old.quizID) where quizID = old.quizID;
else
UPDATE quizzes SET rating = NULL WHERE quizID = OLD.quizID;
end if */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `quizID` int NOT NULL AUTO_INCREMENT,
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rating` float DEFAULT NULL,
  `num_favorites` int NOT NULL DEFAULT '0',
  `isPublic` tinyint(1) DEFAULT '1',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`quizID`),
  KEY `user_id` (`userID`),
  CONSTRAINT `fk_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES (1,'b23c2d39-f009-11ee-b93a-085bd6555b53','Test set',NULL,0,1,'Quiz set for testing','2024-04-08 01:18:43','2024-04-08 01:18:43'),(2,'e.walters','My Math quiz #1',3.5,2,1,NULL,'2024-04-22 00:00:00','2024-04-22 20:10:59'),(3,'e.walters','My Math quiz #2',NULL,1,1,NULL,'2024-04-13 17:35:40','2024-04-15 19:10:51');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follows`
--

DROP TABLE IF EXISTS `user_follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_follows` (
  `follower_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `followed_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `followed_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follower_id`,`followed_id`),
  KEY `followed_id` (`followed_id`),
  CONSTRAINT `user_follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `user_follows_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follows`
--

LOCK TABLES `user_follows` WRITE;
/*!40000 ALTER TABLE `user_follows` DISABLE KEYS */;
INSERT INTO `user_follows` VALUES ('Donald-Duck-122','Daffy_Duck','2024-04-24 12:17:56'),('Donald-Duck-122','e.walters','2024-04-19 17:43:11'),('Donald-Duck-122','george.washington','2024-04-19 17:43:01'),('Donald-Duck-122','quizMaker22','2024-04-19 17:43:28'),('e.walters','h.zhang','2024-04-13 17:05:56'),('e.walters','k.yuen','2024-04-22 20:31:28'),('george.washington','Donald-Duck-122','2024-04-19 17:42:33'),('george.washington','Joe.Smith','2024-04-19 17:42:27'),('george.washington','new.user','2024-04-19 17:42:21'),('h.zhang','e.walters','2024-04-17 17:06:45'),('h.zhang','k.yuen','2024-04-13 17:06:45'),('Jennifer_W','e.walters','2024-04-19 17:45:45'),('Joe.Smith','ali.kooshesh','2024-04-19 17:44:32'),('Joe.Smith','e.walters','2024-04-19 17:44:27'),('Joe.Smith','h.zhang','2024-04-19 17:44:39'),('Joe.Smith','quizMaker22','2024-04-19 17:44:43'),('k.yuen','h.zhang','2024-04-13 17:06:05'),('user55443245','e.walters','2024-04-19 17:43:49'),('user55443245','h.zhang','2024-04-19 17:43:55'),('user55443245','k.yuen','2024-04-19 17:44:04');
/*!40000 ALTER TABLE `user_follows` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `follow_insert` AFTER INSERT ON `user_follows` FOR EACH ROW update users set num_follows = num_follows + 1 where userID = new.followed_id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `follow_delete` AFTER DELETE ON `user_follows` FOR EACH ROW update users set num_follows = num_follows - 1 where userID = old.followed_id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `imageURL` text COLLATE utf8mb4_general_ci,
  `color` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`userID`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES ('ali.kooshesh','','https://i.imgur.com/V4RclNb.png',NULL),('b23c2d39-f009-11ee-b93a-085bd6555b53','','https://i.imgur.com/V4RclNb.png',NULL),('Daffy_Duck','Quacktastic comedian with a flair for the dramatic','https://i.imgur.com/4kXExgW.jpeg',NULL),('Donald-Duck-122','Sailor extraordinaire and Disney\'s feathered icon!','https://i.imgur.com/8vLUh6z.png',NULL),('e.walters','Hello my name is Evan. I like making quizzes about math, cs, and sometimes geography! I am also a CS major at SSU!','https://i.imgur.com/q7OMfuDb.jpg',NULL),('george.washington','Founding Father, Commander-in-Chief of the Continental Army, and first President of the United States.','https://i.imgur.com/5q2jg9ib.jpg',NULL),('h.zhang','My name is Hanpei, This is my quiz social page!','https://i.imgur.com/V4RclNb.png',NULL),('Jennifer_W','','https://i.imgur.com/V4RclNb.png',NULL),('Joe.Smith','','https://i.imgur.com/V4RclNb.png',NULL),('k.yuen','Helllllo','https://i.imgur.com/V4RclNb.png',NULL),('Math.Tutor','','https://i.imgur.com/V4RclNb.png',NULL),('new.user','','https://www.catschool.co/wp-content/uploads/2023/06/orange-tabby-kitten.png',NULL),('quizMaker22','','https://i.imgur.com/V4RclNb.png',NULL),('user55443245','','https://i.imgur.com/V4RclNb.png',NULL);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `num_follows` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ali.kooshesh','ali.kooshesh',NULL,'MyPassword',1,'2024-04-19 14:09:48','2024-04-19 17:44:32'),('b23c2d39-f009-11ee-b93a-085bd6555b53','newUser','newuser@example.com','userPassword',0,'2024-04-01 02:24:16','2024-04-01 02:24:16'),('Daffy_Duck','The Real Daffy Duck',NULL,'321',1,'2024-04-19 17:22:41','2024-04-24 12:17:56'),('Donald-Duck-122','Donald-Duck-122',NULL,'abc',1,'2024-04-19 17:16:22','2024-04-19 17:42:33'),('e.walters','Evan_Walters','waltersev@sonoma.edu','password',6,'2024-04-13 17:02:21','2024-04-22 19:46:33'),('george.washington','Washington',NULL,'1776',1,'2024-04-19 17:30:22','2024-04-24 12:10:42'),('h.zhang','Zeroxa','zhangha@sonoma.edu','password',4,'2024-04-13 17:04:13','2024-04-19 17:44:39'),('Jennifer_W','Jennifer_W',NULL,'password',0,'2024-04-19 17:45:21','2024-04-19 17:45:21'),('Joe.Smith','Joe.Smith',NULL,'123',1,'2024-04-19 16:22:39','2024-04-19 17:42:27'),('k.yuen','Kathy','yuenk@sonoma.edu','password',3,'2024-04-13 17:03:48','2024-04-22 20:31:28'),('Math.Tutor','Math.Tutor',NULL,'pass',0,'2024-04-19 17:27:34','2024-04-19 17:27:34'),('new.user','Cat Attack',NULL,'mypassword',1,'2024-04-19 13:58:46','2024-04-24 12:32:53'),('quizMaker22','quizMaker22',NULL,'quiz',2,'2024-04-19 17:26:59','2024-04-19 17:44:43'),('user55443245','user55443245',NULL,'quizSocialUser',0,'2024-04-19 17:26:13','2024-04-19 17:26:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `addProfileWithUserInsert` AFTER INSERT ON `users` FOR EACH ROW insert into user_profile
values (NEW.userID, '') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 12:33:26
