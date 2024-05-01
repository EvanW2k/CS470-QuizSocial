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
  CONSTRAINT `fk_quiz_id_2` FOREIGN KEY (`quizID`) REFERENCES `quizzes` (`quizID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=498 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,'question1','answer1','2024-04-08 01:25:26','2024-04-08 01:25:26'),(2,1,'question2','answer2','2024-04-08 01:25:49','2024-04-08 01:25:49'),(3,2,'1+1','2','2024-04-13 17:38:00','2024-04-13 17:38:00'),(4,2,'7-3','4','2024-04-13 17:38:00','2024-04-13 17:38:00'),(5,2,'100+0','100','2024-04-13 17:38:00','2024-04-13 17:38:00'),(6,2,'2+8','10','2024-04-13 17:38:00','2024-04-13 17:38:00'),(7,3,'1x1','1','2024-04-13 17:39:08','2024-04-13 17:39:08'),(8,3,'10x10','100','2024-04-13 17:39:08','2024-04-13 17:39:08'),(9,3,'8/2','4','2024-04-13 17:39:08','2024-04-13 17:39:08'),(10,3,'3x11','33','2024-04-13 17:39:08','2024-04-13 17:39:08'),(11,1,'What is the capital city of Japan?','Tokyo','2024-04-17 10:27:33','2024-04-17 10:27:33'),(12,1,'Which planet is known as the Red Planet?','Mars','2024-04-17 10:27:33','2024-04-17 10:27:33'),(13,1,'What year did the Berlin Wall fall?','1989','2024-04-17 10:32:07','2024-04-17 10:32:07'),(14,1,'Who discovered penicillin?','Alexander Fleming','2024-04-17 10:32:07','2024-04-17 10:32:07'),(15,1,'What is the hardest natural substance on Earth?','Diamond','2024-04-17 10:32:07','2024-04-17 10:32:07'),(16,1,'What is the largest country in the world?','Russia','2024-04-17 10:32:07','2024-04-17 10:32:07'),(17,1,'What novel is often cited as the bestselling single-volume book of all time?','Don Quixote','2024-04-17 10:32:07','2024-04-17 10:32:07'),(18,2,'5x5','25','2024-04-24 14:48:16','2024-04-24 14:48:16'),(19,2,'100/5','20','2024-04-24 14:48:16','2024-04-24 14:48:16'),(22,2,'7 * 5','35','2024-04-24 14:48:16','2024-04-24 14:48:16'),(25,2,'9 * 3','27','2024-04-24 14:48:16','2024-04-24 14:48:16'),(27,2,'20 / 4','5','2024-04-24 14:48:16','2024-04-24 14:48:16'),(30,2,'√64','8','2024-04-24 14:51:46','2024-04-24 14:51:46'),(31,2,'14 + 3','17','2024-04-24 14:51:46','2024-04-24 14:51:46'),(32,2,'18 - 9','9','2024-04-24 14:51:46','2024-04-24 14:51:46'),(33,2,'7 * 4','28','2024-04-24 14:51:46','2024-04-24 14:51:46'),(35,2,'√121','11','2024-04-24 14:51:46','2024-04-24 14:51:46'),(86,7,'The Declaration of Independence was signed in which year?','1776','2024-04-30 19:48:31','2024-04-30 19:48:31'),(87,7,'The Battle of Hastings took place in which year?','1066','2024-04-30 19:48:31','2024-04-30 19:48:31'),(88,7,'The French Revolution began in which year?','1789','2024-04-30 19:48:31','2024-04-30 19:48:31'),(89,7,'The signing of the Magna Carta occurred in which year?','1215','2024-04-30 19:48:31','2024-04-30 19:48:31'),(90,7,'The fall of the Berlin Wall happened in which year?','1989','2024-04-30 19:48:31','2024-04-30 19:48:31'),(91,7,'The Emancipation Proclamation was issued in which year?','1863','2024-04-30 19:48:31','2024-04-30 19:48:31'),(92,7,'The Cuban Missile Crisis occurred in which year?','1962','2024-04-30 19:48:31','2024-04-30 19:48:31'),(93,7,'The Treaty of Versailles was signed in which year?','1919','2024-04-30 19:48:31','2024-04-30 19:48:31'),(94,7,'The Boston Tea Party took place in which year?','1773','2024-04-30 19:48:31','2024-04-30 19:48:31'),(95,7,'The end of World War I happened in which year?','1918','2024-04-30 19:48:31','2024-04-30 19:48:31'),(96,8,'What is the output of typeof null in JavaScript?','object','2024-04-30 19:50:43','2024-04-30 19:50:43'),(97,8,'What does the DOM stand for?','Document Object Model','2024-04-30 19:50:43','2024-04-30 19:50:43'),(98,8,'Which method in JavaScript is used to remove the last element of an array?','pop','2024-04-30 19:50:43','2024-04-30 19:50:43'),(99,8,'What is the result of 2 + \"2\" in JavaScript?','22','2024-04-30 19:50:43','2024-04-30 19:50:43'),(100,8,'What is a closure in JavaScript?','A closure is a function defined inside another function and has access to its lexical scope even when it is executed outside its lexical scope.','2024-04-30 19:50:43','2024-04-30 19:50:43'),(101,8,'What is the purpose of the `addEventListener` method in JavaScript?','To attach an event handler to an element without overwriting existing event handlers.','2024-04-30 19:50:43','2024-04-30 19:50:43'),(102,8,'What is the purpose of the `this` keyword in JavaScript?','To refer to the object that is currently executing the code.','2024-04-30 19:50:43','2024-04-30 19:50:43'),(103,8,'What is the difference between `==` and `===` in JavaScript?','`==` is used for loose equality comparison, while `===` is used for strict equality comparison.','2024-04-30 19:50:43','2024-04-30 19:50:43'),(104,8,'What is the output of `console.log(0.1 + 0.2 === 0.3)` in JavaScript?','false','2024-04-30 19:50:43','2024-04-30 19:50:43'),(105,8,'What does JSON stand for?','JavaScript Object Notation','2024-04-30 19:50:43','2024-04-30 19:50:43'),(106,8,'What is the name of this operator: \'...\'','Spread Operator','2024-04-30 19:52:37','2024-04-30 19:52:37'),(107,9,'Who is considered the father of Western philosophy?','Socrates','2024-04-30 20:07:53','2024-04-30 20:07:53'),(108,9,'Which ancient Greek philosopher is known for his dialogues and the Socratic method?','Plato','2024-04-30 20:07:53','2024-04-30 20:07:53'),(109,9,'Who was the student of Plato and the teacher of Alexander the Great?','Aristotle','2024-04-30 20:07:53','2024-04-30 20:07:53'),(110,9,'Who famously stated \"Cogito, ergo sum\" (\"I think, therefore I am\")?','René Descartes','2024-04-30 20:07:53','2024-04-30 20:07:53'),(111,9,'Which philosopher proposed the theory of utilitarianism, which states that the best action is the one that maximizes utility?','Jeremy Bentham','2024-04-30 20:07:53','2024-04-30 20:07:53'),(112,9,'Who wrote \"The Republic,\" a philosophical work discussing justice and the ideal state?','Plato','2024-04-30 20:07:53','2024-04-30 20:07:53'),(113,9,'Which German philosopher is known for his works on existentialism, including \"Thus Spoke Zarathustra\" and \"Beyond Good and Evil\"?','Friedrich Nietzsche','2024-04-30 20:07:53','2024-04-30 20:07:53'),(114,9,'Who is the author of \"Critique of Pure Reason,\" which explores the nature of human knowledge and reason?','Immanuel Kant','2024-04-30 20:07:53','2024-04-30 20:07:53'),(115,9,'Who is considered the founder of modern empiricism and wrote \"An Essay Concerning Human Understanding\"?','John Locke','2024-04-30 20:07:53','2024-04-30 20:07:53'),(116,9,'Who is the Chinese philosopher known for his teachings on ethics and morality in \"The Analects\"?','Confucius','2024-04-30 20:07:53','2024-04-30 20:07:53'),(117,10,'What does the acronym \"OOP\" stand for in C++ programming?','Object-Oriented Programming','2024-04-30 20:11:13','2024-04-30 20:11:13'),(118,10,'What is the main function used for in a C++ program?','Entry point of the program','2024-04-30 20:11:13','2024-04-30 20:11:13'),(119,10,'Which keyword is used to declare a class in C++?','class','2024-04-30 20:11:13','2024-04-30 20:11:13'),(120,10,'What is the difference between \"public\", \"private\", and \"protected\" in a class declaration?','\"public\" members are accessible from outside the class, \"private\" members are only accessible from within the class, and \"protected\" members are accessible from within the class and its subclasses','2024-04-30 20:11:13','2024-04-30 20:11:13'),(121,10,'What is a constructor in C++?','A special member function that initializes objects of a class','2024-04-30 20:11:13','2024-04-30 20:11:13'),(122,10,'What is the operator used for pointer declaration in C++?','The asterisk (*) symbol','2024-04-30 20:11:13','2024-04-30 20:11:13'),(123,10,'What is the purpose of the \"new\" operator in C++?','To dynamically allocate memory for a variable or object','2024-04-30 20:11:13','2024-04-30 20:11:13'),(124,10,'What is the standard input stream object in C++?','std::cin','2024-04-30 20:11:13','2024-04-30 20:11:13'),(125,10,'What is the standard output stream object in C++?','std::cout','2024-04-30 20:11:13','2024-04-30 20:11:13'),(126,10,'What does the keyword \"virtual\" indicate in C++?','That a member function can be overridden in a derived class','2024-04-30 20:11:13','2024-04-30 20:11:13'),(127,11,'In which year was George Washington inaugurated as the first President of the United States?','1789','2024-04-30 20:13:41','2024-04-30 20:13:41'),(128,11,'Which battle is considered George Washington\'s greatest military victory during the American Revolutionary War?','Battle of Yorktown','2024-04-30 20:13:41','2024-04-30 20:13:41'),(129,11,'Who served as George Washington\'s Vice President during his first term in office?','John Adams','2024-04-30 20:13:41','2024-04-30 20:13:41'),(130,11,'What is the name of George Washington\'s plantation home in Virginia?','Mount Vernon','2024-04-30 20:13:41','2024-04-30 20:13:41'),(131,11,'Which document did George Washington famously draft during the Constitutional Convention in 1787?','United States Constitution','2024-04-30 20:13:41','2024-04-30 20:13:41'),(132,11,'What was the name of the famous winter encampment where George Washington and his troops faced harsh conditions during the American Revolutionary War?','Valley Forge','2024-04-30 20:13:41','2024-04-30 20:13:41'),(133,11,'Who was appointed as the commander-in-chief of the Continental Army during the American Revolutionary War?','George Washington','2024-04-30 20:13:41','2024-04-30 20:13:41'),(134,11,'What title did George Washington hold prior to becoming President of the United States?','Commander-in-Chief of the Continental Army','2024-04-30 20:13:41','2024-04-30 20:13:41'),(135,11,'Which political party did George Washington belong to?','No party/Apolitical','2024-04-30 20:13:41','2024-04-30 20:13:41'),(136,11,'In which state was George Washington born?','Virginia','2024-04-30 20:13:41','2024-04-30 20:13:41'),(137,12,'What is the name of the princess in the movie \"Frozen\"?','Elsa','2024-04-30 20:16:21','2024-04-30 20:16:21'),(138,12,'Which Disney movie features a young lion named Simba?','The Lion King','2024-04-30 20:16:21','2024-04-30 20:16:21'),(139,12,'In \"Beauty and the Beast,\" what is the name of the enchanted castle?s head servant?','Lumière','2024-04-30 20:16:21','2024-04-30 20:16:21'),(140,12,'What is the name of the fairy in \"Peter Pan\" who helps the children fly?','Tinker Bell','2024-04-30 20:16:21','2024-04-30 20:16:21'),(141,12,'In \"The Little Mermaid,\" what is the name of Ariel\'s best friend, a flounder fish?','Flounder','2024-04-30 20:16:21','2024-04-30 20:16:21'),(142,12,'Who is the villain in Disney\'s \"The Lion King\"?','Scar','2024-04-30 20:16:21','2024-04-30 20:16:21'),(143,12,'What is the name of the boy who owns Woody and Buzz Lightyear in the \"Toy Story\" series?','Andy','2024-04-30 20:16:21','2024-04-30 20:16:21'),(144,12,'In \"Aladdin,\" what type of animal is Abu?','Monkey','2024-04-30 20:16:21','2024-04-30 20:16:21'),(145,12,'What is the name of the character who is both a teapot and a housemaid in \"Beauty and the Beast\"?','Mrs. Potts','2024-04-30 20:16:21','2024-04-30 20:16:21'),(146,12,'What is the name of the street rat who becomes a prince in \"Aladdin\"?','Aladdin','2024-04-30 20:16:21','2024-04-30 20:16:21'),(147,12,'What is the name of the snowman in \"Frozen\" who loves warm hugs?','Olaf','2024-04-30 20:18:05','2024-04-30 20:18:05'),(148,12,'In \"The Little Mermaid,\" what is the name of Ariel\'s father, the king of the sea?','King Triton','2024-04-30 20:18:05','2024-04-30 20:18:05'),(149,12,'What is the name of the horse in Disney\'s \"Tangled\"?','Maximus','2024-04-30 20:18:05','2024-04-30 20:18:05'),(150,12,'Who is the villain in \"Sleeping Beauty\" who curses Princess Aurora to sleep until true love\'s kiss?','Maleficent','2024-04-30 20:18:05','2024-04-30 20:18:05'),(151,12,'What is the name of the little elephant with big ears who learns to fly in Disney\'s \"Dumbo\"?','Dumbo','2024-04-30 20:18:05','2024-04-30 20:18:05'),(152,12,'In \"Cinderella,\" what kind of animal was transformed into a coachman by Cinderella\'s fairy godmother?','Mouse','2024-04-30 20:18:05','2024-04-30 20:18:05'),(153,12,'What is the name of the boy who visits the world of the dead in \"Coco\"?','Miguel','2024-04-30 20:18:05','2024-04-30 20:18:05'),(154,12,'In \"Moana,\" what is the name of the demigod who accompanies Moana on her journey?','Maui','2024-04-30 20:18:05','2024-04-30 20:18:05'),(155,12,'What is the name of the blue alien experiment in \"Lilo & Stitch\" who has a number 626 tattooed on his back?','Stitch','2024-04-30 20:18:05','2024-04-30 20:18:05'),(156,12,'In \"Finding Nemo,\" what type of fish is Nemo\'s father?','Clownfish','2024-04-30 20:18:05','2024-04-30 20:18:05'),(163,22,'Alabama','Montgomery','2024-04-30 20:52:07','2024-04-30 20:52:07'),(164,22,'Alaska','Juneau','2024-04-30 20:52:07','2024-04-30 20:52:07'),(165,22,'Arizona','Phoenix','2024-04-30 20:52:07','2024-04-30 20:52:07'),(166,22,'Arkansas','Little Rock','2024-04-30 20:52:07','2024-04-30 20:52:07'),(167,22,'California','Sacramento','2024-04-30 20:52:07','2024-04-30 20:52:07'),(168,22,'Colorado','Denver','2024-04-30 20:52:07','2024-04-30 20:52:07'),(169,22,'Connecticut','Hartford','2024-04-30 20:52:07','2024-04-30 20:52:07'),(170,22,'Delaware','Dover','2024-04-30 20:52:07','2024-04-30 20:52:07'),(171,22,'Florida','Tallahassee','2024-04-30 20:52:07','2024-04-30 20:52:07'),(172,22,'Georgia','Atlanta','2024-04-30 20:52:07','2024-04-30 20:52:07'),(173,22,'Hawaii','Honolulu','2024-04-30 20:52:07','2024-04-30 20:52:07'),(174,22,'Idaho','Boise','2024-04-30 20:52:07','2024-04-30 20:52:07'),(175,22,'Illinois','Springfield','2024-04-30 20:52:07','2024-04-30 20:52:07'),(176,22,'Indiana','Indianapolis','2024-04-30 20:52:07','2024-04-30 20:52:07'),(177,22,'Iowa','Des Moines','2024-04-30 20:52:07','2024-04-30 20:52:07'),(178,22,'Kansas','Topeka','2024-04-30 20:52:07','2024-04-30 20:52:07'),(179,22,'Kentucky','Frankfort','2024-04-30 20:52:07','2024-04-30 20:52:07'),(180,22,'Louisiana','Baton Rouge','2024-04-30 20:52:07','2024-04-30 20:52:07'),(181,22,'Maine','Augusta','2024-04-30 20:52:07','2024-04-30 20:52:07'),(182,22,'Maryland','Annapolis','2024-04-30 20:52:07','2024-04-30 20:52:07'),(183,22,'Massachusetts','Boston','2024-04-30 20:52:07','2024-04-30 20:52:07'),(184,22,'Michigan','Lansing','2024-04-30 20:52:07','2024-04-30 20:52:07'),(185,22,'Minnesota','St. Paul','2024-04-30 20:52:07','2024-04-30 20:52:07'),(186,22,'Mississippi','Jackson','2024-04-30 20:52:07','2024-04-30 20:52:07'),(187,22,'Missouri','Jefferson City','2024-04-30 20:52:07','2024-04-30 20:52:07'),(188,22,'Montana','Helena','2024-04-30 20:52:07','2024-04-30 20:52:07'),(189,22,'Nebraska','Lincoln','2024-04-30 20:52:07','2024-04-30 20:52:07'),(190,22,'Nevada','Carson City','2024-04-30 20:52:07','2024-04-30 20:52:07'),(191,22,'New Hampshire','Concord','2024-04-30 20:52:07','2024-04-30 20:52:07'),(192,22,'New Jersey','Trenton','2024-04-30 20:52:07','2024-04-30 20:52:07'),(193,22,'New Mexico','Santa Fe','2024-04-30 20:52:07','2024-04-30 20:52:07'),(194,22,'New York','Albany','2024-04-30 20:52:07','2024-04-30 20:52:07'),(195,22,'North Carolina','Raleigh','2024-04-30 20:52:07','2024-04-30 20:52:07'),(196,22,'North Dakota','Bismarck','2024-04-30 20:52:07','2024-04-30 20:52:07'),(197,22,'Ohio','Columbus','2024-04-30 20:52:07','2024-04-30 20:52:07'),(198,22,'Oklahoma','Oklahoma City','2024-04-30 20:52:07','2024-04-30 20:52:07'),(199,22,'Oregon','Salem','2024-04-30 20:52:07','2024-04-30 20:52:07'),(200,22,'Pennsylvania','Harrisburg','2024-04-30 20:52:07','2024-04-30 20:52:07'),(201,22,'Rhode Island','Providence','2024-04-30 20:52:07','2024-04-30 20:52:07'),(202,22,'South Carolina','Columbia','2024-04-30 20:52:07','2024-04-30 20:52:07'),(203,22,'South Dakota','Pierre','2024-04-30 20:52:07','2024-04-30 20:52:07'),(204,22,'Tennessee','Nashville','2024-04-30 20:52:07','2024-04-30 20:52:07'),(205,22,'Texas','Austin','2024-04-30 20:52:07','2024-04-30 20:52:07'),(206,22,'Utah','Salt Lake City','2024-04-30 20:52:07','2024-04-30 20:52:07'),(207,22,'Vermont','Montpelier','2024-04-30 20:52:07','2024-04-30 20:52:07'),(208,22,'Virginia','Richmond','2024-04-30 20:52:07','2024-04-30 20:52:07'),(209,22,'Washington','Olympia','2024-04-30 20:52:07','2024-04-30 20:52:07'),(210,22,'West Virginia','Charleston','2024-04-30 20:52:07','2024-04-30 20:52:07'),(211,22,'Wisconsin','Madison','2024-04-30 20:52:07','2024-04-30 20:52:07'),(212,22,'Wyoming','Cheyenne','2024-04-30 20:52:07','2024-04-30 20:52:07'),(220,27,'My Name is','Beard Man','2024-04-30 22:44:19','2024-04-30 22:44:19'),(221,27,'How old am I','100','2024-04-30 22:44:19','2024-04-30 22:44:19');
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
  CONSTRAINT `fk_quiz_id` FOREIGN KEY (`quizID`) REFERENCES `quizzes` (`quizID`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_favorites`
--

LOCK TABLES `quiz_favorites` WRITE;
/*!40000 ALTER TABLE `quiz_favorites` DISABLE KEYS */;
INSERT INTO `quiz_favorites` VALUES (2,'k.yuen','2024-04-16 02:08:47'),(2,'h.zhang','2024-04-16 02:10:44'),(3,'h.zhang','2024-04-16 02:10:51'),(11,'e.walters','2024-05-01 03:27:19'),(10,'e.walters','2024-05-01 04:43:47'),(9,'e.walters','2024-05-01 04:43:49'),(12,'e.walters','2024-05-01 04:43:59'),(8,'ali.kooshesh','2024-05-01 04:45:32'),(8,'e.walters','2024-05-01 05:04:49'),(22,'newUser99','2024-05-01 06:15:37');
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
  CONSTRAINT `quiz_ratings_ibfk_1` FOREIGN KEY (`quizID`) REFERENCES `quizzes` (`quizID`) ON DELETE CASCADE,
  CONSTRAINT `quiz_ratings_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_ratings`
--

LOCK TABLES `quiz_ratings` WRITE;
/*!40000 ALTER TABLE `quiz_ratings` DISABLE KEYS */;
INSERT INTO `quiz_ratings` VALUES (2,'k.yuen',3.5,'2024-04-19 17:58:58'),(3,'h.zhang',5,'2024-04-24 15:09:06'),(5,'h.zhang',2.5,'2024-04-24 15:09:06'),(6,'h.zhang',4.5,'2024-04-24 15:09:06'),(7,'k.yuen',3.5,'2024-04-30 19:49:03'),(9,'h.zhang',5,'2024-04-30 20:08:47'),(22,'e.walters',4,'2024-04-30 21:14:43'),(11,'e.walters',0.5,'2024-04-30 21:42:04'),(11,'k.yuen',2,'2024-04-30 21:42:39'),(12,'e.walters',4.5,'2024-04-30 21:44:02'),(8,'ali.kooshesh',2,'2024-04-30 21:45:25'),(8,'george.washington',3,'2024-04-30 22:00:09'),(8,'e.walters',1,'2024-04-30 22:04:45'),(3,'newUser99',2.5,'2024-05-01 00:26:08');
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
  CONSTRAINT `fk_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES (1,'b23c2d39-f009-11ee-b93a-085bd6555b53','Test set',NULL,0,1,'Quiz set for testing','2024-04-26 00:00:00','2024-04-30 20:21:34'),(2,'e.walters','My Math quiz #1',3.5,2,0,NULL,'2024-04-13 00:00:00','2024-04-30 20:21:34'),(3,'e.walters','My Math quiz #2',3.75,1,1,NULL,'2024-04-16 00:00:00','2024-05-01 00:26:10'),(5,'e.walters','Basic C++',2.5,0,1,NULL,'2024-04-04 00:00:00','2024-04-30 20:21:34'),(6,'e.walters','Biology of the Cell',4.5,0,0,NULL,'2024-04-17 00:00:00','2024-04-30 20:21:34'),(7,'k.yuen','History Quiz',3.5,0,1,NULL,'2024-04-14 00:00:00','2024-04-30 20:21:34'),(8,'ali.kooshesh','JavaScript Quiz',2,2,1,NULL,'2024-04-17 00:00:00','2024-04-30 22:04:49'),(9,'h.zhang','Philosophy Quiz',5,1,1,NULL,'2024-04-15 00:00:00','2024-04-30 21:43:49'),(10,'h.zhang','My New Quiz',NULL,1,1,NULL,'2024-04-21 00:00:00','2024-04-30 21:43:47'),(11,'george.washington','Quiz of ME',1.25,1,1,NULL,'2024-04-01 00:00:00','2024-04-30 21:42:39'),(12,'Donald-Duck-122','Disney Quiz',4.5,1,1,NULL,'2024-04-01 00:00:00','2024-04-30 21:44:02'),(22,'e.walters','Capitals',4,1,1,NULL,'2024-04-30 20:52:07','2024-04-30 23:15:37'),(27,'newUser99','About Me',NULL,0,0,NULL,'2024-04-30 22:43:26','2024-04-30 22:50:19');
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
INSERT INTO `user_follows` VALUES ('Donald-Duck-122','Daffy_Duck','2024-04-24 12:17:56'),('Donald-Duck-122','e.walters','2024-04-19 17:43:11'),('Donald-Duck-122','george.washington','2024-04-19 17:43:01'),('Donald-Duck-122','quizMaker22','2024-04-19 17:43:28'),('e.walters','Daffy_Duck','2024-04-30 19:44:36'),('e.walters','Donald-Duck-122','2024-04-30 19:44:41'),('e.walters','george.washington','2024-04-30 20:27:00'),('e.walters','h.zhang','2024-04-13 17:05:56'),('e.walters','k.yuen','2024-04-22 20:31:28'),('george.washington','Donald-Duck-122','2024-04-19 17:42:33'),('george.washington','Joe.Smith','2024-04-19 17:42:27'),('george.washington','new.user','2024-04-19 17:42:21'),('h.zhang','e.walters','2024-04-24 16:09:01'),('h.zhang','k.yuen','2024-04-13 17:06:45'),('Jennifer_W','e.walters','2024-04-19 17:45:45'),('Joe.Smith','ali.kooshesh','2024-04-19 17:44:32'),('Joe.Smith','e.walters','2024-04-19 17:44:27'),('Joe.Smith','h.zhang','2024-04-19 17:44:39'),('Joe.Smith','quizMaker22','2024-04-19 17:44:43'),('k.yuen','h.zhang','2024-04-13 17:06:05'),('user55443245','e.walters','2024-04-19 17:43:49'),('user55443245','h.zhang','2024-04-19 17:43:55'),('user55443245','k.yuen','2024-04-19 17:44:04');
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
  `imageURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `color` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`userID`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES ('ali.kooshesh','Professor of Computer Science at Sonoma State University','https://cs.sonoma.edu/sites/cs/files/styles/150x150/public/alikoosheshheadshot.jpg?itok=bIv_frSf',NULL),('b23c2d39-f009-11ee-b93a-085bd6555b53','','https://i.imgur.com/V4RclNb.png',NULL),('Daffy_Duck','Quacktastic comedian with a flair for the dramatic','https://i.imgur.com/4kXExgW.jpeg',NULL),('Donald-Duck-122','Sailor extraordinaire and Disney\'s feathered icon!','https://i.imgur.com/8vLUh6z.png',NULL),('e.walters','Hello my name is Evan. I like making quizzes about math, cs, and sometimes geography! I am also a CS major at SSU!','https://i.imgur.com/q7OMfuDb.jpg',NULL),('george.washington','Founding Father, Commander-in-Chief of the Continental Army, and first President of the United States.','https://i.imgur.com/5q2jg9ib.jpg',NULL),('h.zhang','My name is Hanpei, This is my quiz social page!','https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:55a3d046-d3e8-490f-9324-b3a773188bc7?quality=0.7&gen=ntrn&legacyStatusCode=true',NULL),('Jennifer_W','','https://i.imgur.com/V4RclNb.png',NULL),('Joe.Smith','','https://i.imgur.com/V4RclNb.png',NULL),('k.yuen','Hi there! I\'m Kathy, your friendly quiz creator! Join me on a journey of learning and fun as I share my passion for knowledge through quizzes. Follow me for weekly quizzes across various subjects, or dive into my profile to explore a wealth of my former creations. Let\'s learn together! ','https://pbs.twimg.com/media/DDTcWi5UwAAsQmL.jpg',NULL),('Math.Tutor','','https://i.imgur.com/V4RclNb.png',NULL),('new.user','','https://www.catschool.co/wp-content/uploads/2023/06/orange-tabby-kitten.png',NULL),('newUser99','My bio','https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',NULL),('quizMaker22','','https://i.imgur.com/V4RclNb.png',NULL),('user55443245','','https://i.imgur.com/V4RclNb.png',NULL);
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
INSERT INTO `users` VALUES ('ali.kooshesh','Koosh-Man',NULL,'MyPassword',1,'2024-04-19 14:09:48','2024-04-30 22:04:39'),('b23c2d39-f009-11ee-b93a-085bd6555b53','newUser','newuser@example.com','userPassword',0,'2024-04-01 02:24:16','2024-04-01 02:24:16'),('Daffy_Duck','The Real Daffy Duck',NULL,'321',2,'2024-04-19 17:22:41','2024-04-30 19:44:36'),('Donald-Duck-122','Donald-Duck-122',NULL,'abc',2,'2024-04-19 17:16:22','2024-04-30 19:44:41'),('e.walters','Evan_Walters','waltersev@sonoma.edu','space2000',6,'2024-04-13 17:02:21','2024-05-01 00:18:38'),('george.washington','Washington',NULL,'1776',2,'2024-04-19 17:30:22','2024-04-30 20:27:00'),('h.zhang','Zeroxa','zhangha@sonoma.edu','password',4,'2024-04-13 17:04:13','2024-04-19 17:44:39'),('Jennifer_W','Jennifer_W',NULL,'password',0,'2024-04-19 17:45:21','2024-04-19 17:45:21'),('Joe.Smith','Joe.Smith',NULL,'123',1,'2024-04-19 16:22:39','2024-04-19 17:42:27'),('k.yuen','Kathy','yuenk@sonoma.edu','password',3,'2024-04-13 17:03:48','2024-04-22 20:31:28'),('Math.Tutor','Math.Tutor',NULL,'pass',0,'2024-04-19 17:27:34','2024-04-19 17:27:34'),('new.user','Cat Attack',NULL,'mypassword',1,'2024-04-19 13:58:46','2024-04-24 12:32:53'),('newUser99','Hello World',NULL,'1234',0,'2024-04-30 22:31:49','2024-04-30 22:32:26'),('quizMaker22','quizMaker22',NULL,'quiz',2,'2024-04-19 17:26:59','2024-04-19 17:44:43'),('user55443245','user55443245',NULL,'quizSocialUser',0,'2024-04-19 17:26:13','2024-04-19 17:26:13');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `addProfileWithUserInsert` AFTER INSERT ON `users` FOR EACH ROW insert into user_profile (userID, bio, imageURL)
values (NEW.userID, '', 'https://i.imgur.com/V4RclNb.png') */;;
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

-- Dump completed on 2024-05-01  1:24:15
