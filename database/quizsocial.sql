-- MariaDB dump 10.19-11.3.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: quizsocial
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `questionID` int(11) NOT NULL AUTO_INCREMENT,
  `quizID` int(11) DEFAULT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
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
INSERT INTO `questions` VALUES
(1,1,'question1','answer1','2024-04-08 01:25:26','2024-04-08 01:25:26'),
(2,1,'question2','answer2','2024-04-08 01:25:49','2024-04-08 01:25:49'),
(3,2,'1+1','2','2024-04-13 17:38:00','2024-04-13 17:38:00'),
(4,2,'7-3','4','2024-04-13 17:38:00','2024-04-13 17:38:00'),
(5,2,'100+0','100','2024-04-13 17:38:00','2024-04-13 17:38:00'),
(6,2,'2+8','10','2024-04-13 17:38:00','2024-04-13 17:38:00'),
(7,3,'1x1','1','2024-04-13 17:39:08','2024-04-13 17:39:08'),
(8,3,'10x10','100','2024-04-13 17:39:08','2024-04-13 17:39:08'),
(9,3,'8/2','4','2024-04-13 17:39:08','2024-04-13 17:39:08'),
(10,3,'3x11','33','2024-04-13 17:39:08','2024-04-13 17:39:08'),
(11,1,'What is the capital city of Japan?','Tokyo','2024-04-17 10:27:33','2024-04-17 10:27:33'),
(12,1,'Which planet is known as the Red Planet?','Mars','2024-04-17 10:27:33','2024-04-17 10:27:33'),
(13,1,'What year did the Berlin Wall fall?','1989','2024-04-17 10:32:07','2024-04-17 10:32:07'),
(14,1,'Who discovered penicillin?','Alexander Fleming','2024-04-17 10:32:07','2024-04-17 10:32:07'),
(15,1,'What is the hardest natural substance on Earth?','Diamond','2024-04-17 10:32:07','2024-04-17 10:32:07'),
(16,1,'What is the largest country in the world?','Russia','2024-04-17 10:32:07','2024-04-17 10:32:07'),
(17,1,'What novel is often cited as the bestselling single-volume book of all time?','Don Quixote','2024-04-17 10:32:07','2024-04-17 10:32:07');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_favorites`
--

DROP TABLE IF EXISTS `quiz_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz_favorites` (
  `quizID` int(11) DEFAULT NULL,
  `userID` char(36) NOT NULL,
  `favorited_date` timestamp NULL DEFAULT current_timestamp(),
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
INSERT INTO `quiz_favorites` VALUES
(2,'k.yuen','2024-04-16 02:08:47'),
(2,'h.zhang','2024-04-16 02:10:44'),
(3,'h.zhang','2024-04-16 02:10:51');
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
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quizzes` (
  `quizID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` char(36) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `num_favorites` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
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
INSERT INTO `quizzes` VALUES
(1,'b23c2d39-f009-11ee-b93a-085bd6555b53','Test set',0,'Quiz set for testing','2024-04-08 01:18:43','2024-04-08 01:18:43'),
(2,'e.walters','My Math quiz #1',2,NULL,'2024-04-13 17:35:36','2024-04-15 19:10:44'),
(3,'e.walters','My Math quiz #2',1,NULL,'2024-04-13 17:35:40','2024-04-15 19:10:51');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follows`
--

DROP TABLE IF EXISTS `user_follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_follows` (
  `follower_id` char(36) NOT NULL,
  `followed_id` char(36) NOT NULL,
  `followed_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`follower_id`,`followed_id`),
  KEY `followed_id` (`followed_id`),
  CONSTRAINT `user_follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`userID`),
  CONSTRAINT `user_follows_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follows`
--

LOCK TABLES `user_follows` WRITE;
/*!40000 ALTER TABLE `user_follows` DISABLE KEYS */;
INSERT INTO `user_follows` VALUES
('e.walters','h.zhang','2024-04-13 17:05:56'),
('e.walters','k.yuen','2024-04-13 17:05:49'),
('h.zhang','e.walters','2024-04-17 17:06:45'),
('h.zhang','k.yuen','2024-04-13 17:06:45'),
('k.yuen','h.zhang','2024-04-13 17:06:05');
/*!40000 ALTER TABLE `user_follows` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger follow_insert after insert on user_follows
for each row
update users set num_follows = num_follows + 1 where userID = new.followed_id */;;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger follow_delete after delete on user_follows
for each row
update users set num_follows = num_follows - 1 where userID = old.followed_id */;;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `userID` char(36) NOT NULL,
  `bio` text DEFAULT NULL,
  PRIMARY KEY (`userID`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES
('b23c2d39-f009-11ee-b93a-085bd6555b53',''),
('e.walters','Hello my name is Evan. I like making quizzes about math, cs, and sometimes geography!'),
('h.zhang','My name is Hanpei, This is my quiz social page!'),
('k.yuen','Helllllo');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` char(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `num_follows` int(11) DEFAULT 0,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('b23c2d39-f009-11ee-b93a-085bd6555b53','newUser','newuser@example.com','userPassword','2024-04-01 02:24:16','2024-04-01 02:24:16',0),
('e.walters','Evan 2k','waltersev@sonoma.edu','password','2024-04-13 17:02:21','2024-04-17 17:06:45',1),
('h.zhang','Zeroxa','zhangha@sonoma.edu','password','2024-04-13 17:04:13','2024-04-17 16:56:44',2),
('k.yuen','Kathy','yuenk@sonoma.edu','password','2024-04-13 17:03:48','2024-04-17 16:56:44',2);
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

-- Dump completed on 2024-04-18 16:33:19
