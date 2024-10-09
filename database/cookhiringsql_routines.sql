-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: cookhiringsql
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `vappliedjobs`
--

DROP TABLE IF EXISTS `vappliedjobs`;
/*!50001 DROP VIEW IF EXISTS `vappliedjobs`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vappliedjobs` AS SELECT 
 1 AS `appid`,
 1 AS `jobseekerid`,
 1 AS `jobseekername`,
 1 AS `jobid`,
 1 AS `jobdescription`,
 1 AS `userid`,
 1 AS `username`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vappliedjobs_all`
--

DROP TABLE IF EXISTS `vappliedjobs_all`;
/*!50001 DROP VIEW IF EXISTS `vappliedjobs_all`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vappliedjobs_all` AS SELECT 
 1 AS `appid`,
 1 AS `jobseekerid`,
 1 AS `jobseekername`,
 1 AS `jobseekeremail`,
 1 AS `jobid`,
 1 AS `jobdescription`,
 1 AS `userid`,
 1 AS `username`,
 1 AS `useremail`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vappliedjobs`
--

/*!50001 DROP VIEW IF EXISTS `vappliedjobs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vappliedjobs` AS select `aj`.`appid` AS `appid`,`aj`.`jobseekerid` AS `jobseekerid`,`js`.`jobseekername` AS `jobseekername`,`aj`.`jobid` AS `jobid`,`j`.`jobdescription` AS `jobdescription`,`aj`.`userid` AS `userid`,`ud`.`username` AS `username` from (((`applied_jobs` `aj` join `job_seeker` `js` on((`aj`.`jobseekerid` = `js`.`id`))) join `jobs` `j` on((`aj`.`jobid` = `j`.`id`))) join `user_details` `ud` on((`aj`.`userid` = `ud`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vappliedjobs_all`
--

/*!50001 DROP VIEW IF EXISTS `vappliedjobs_all`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vappliedjobs_all` AS select `aj`.`appid` AS `appid`,`aj`.`jobseekerid` AS `jobseekerid`,`js`.`jobseekername` AS `jobseekername`,`js`.`email` AS `jobseekeremail`,`aj`.`jobid` AS `jobid`,`j`.`jobdescription` AS `jobdescription`,`aj`.`userid` AS `userid`,`ud`.`username` AS `username`,`ud`.`email` AS `useremail` from (((`applied_jobs` `aj` join `job_seeker` `js` on((`aj`.`jobseekerid` = `js`.`id`))) join `jobs` `j` on((`aj`.`jobid` = `j`.`id`))) join `user_details` `ud` on((`aj`.`userid` = `ud`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  2:24:18
