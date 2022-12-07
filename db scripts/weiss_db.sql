CREATE DATABASE  IF NOT EXISTS `weiss_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `weiss_db`;
-- MySQL dump 10.13  Distrib 5.7.39, for Win64 (x86_64)
--
-- Host: localhost    Database: weiss_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` tinyint(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'categoria de prueba');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `first_name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `last_name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(45) COLLATE utf8_bin NOT NULL,
  `password` varchar(150) CHARACTER SET latin1 NOT NULL,
  `newsletter` tinyint(1) DEFAULT 0,
  `role_id` tinyint(5) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_role_id_idx` (`role_id`),
  CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'2022-11-13 05:35:16','2022-12-07 00:00:34',NULL,'Pedro','Zarza','2001-08-06','pedrozarza08@gmail.com','$2a$12$eypvFwXZhbxMDRrqeLAiBeFyjVFi/jBWcm9km7P.M.WMqYi89DwTi',0,2),(2,'2022-11-13 05:38:27','2022-11-13 05:38:27',NULL,'jorge','jorge','2022-10-31','jorge123@gmail.com','$2a$12$6xQQ6YU8A/Fp6CMHgfdZ0uAwFH1gWCI5jGtdAgk7x4BGQz/znxJOS',1,1),(3,'2022-11-13 05:42:35','2022-11-13 05:42:35',NULL,'Pedro','Zarza','2022-11-03','08@gmail.com','$2a$12$7yjNFSdtJhxH8.d8p4YUE.iAxO55E3rAkHa9BPQtDrSBPTtvR4NyG',1,1),(4,'2022-11-13 05:44:18','2022-11-13 05:44:18',NULL,'Pedro','Zarza','2022-11-03','8@gmail.com','$2a$12$dDLSsDiEQIPcUKxZ57SmD.obSU6kuhRFPuz6HsCJ33ModAlR.u8Yi',1,1),(5,'2022-11-13 07:27:36','2022-11-13 07:27:36',NULL,'Jorge','Martin','1972-10-17','jorge123@yahoo.com','$2a$12$aBT33Pa2.XSpL9lyeUt.luAabF5CfjYPDBa7RLjqW6gIuYMPNFn1a',1,1),(6,'2022-11-13 07:40:51','2022-11-13 07:40:51',NULL,'Ines','Magnanini','2022-11-09','ines123@gmail.com','$2a$12$U9sN7x0Hm2tjThx7nmEUYOjwIRBgF1FxH3TRkRmh4VtMFMZLFDCve',1,1),(7,'2022-11-13 07:45:41','2022-11-13 07:45:41',NULL,'aaaaaaaaaaaaaa','aaaaaaaaaaaaaa','2022-11-01','aaaaaaaaaaaa@gmail.com','$2a$12$4W/72JjtyPk5tM/WqgSmCeQaq4ksx5UBl69OQwP0PHmHsTIE.eTHK',1,1),(8,'2022-11-13 07:49:04','2022-11-13 07:49:04',NULL,'Pedro','Zarza','2022-10-11','pzfdea08@gmail.com','$2a$12$.6CtaownEkRX8w5i05GnXeBozmADyHWEKCwGLZGx3HPjmOCAfGSDe',1,1),(9,'2022-11-13 07:59:04','2022-11-13 07:59:04',NULL,'Martin','Fernandez','2022-11-01','martin123@gmail.com','$2a$12$f0NVLkMSA/e9FZJnlswiUOnhGG.da0i7KUgsNjdr4MOr1sU2WaKhG',1,1),(10,'2022-11-13 08:05:02','2022-11-13 08:05:02',NULL,'Mohamed','Ortiz','2022-10-04','mohamed123@gmail.com','$2a$12$LQ..KHrPSacVKhUcWcMgh.yySgx0YT/Ry3u2hF3AyhRL/zdaGE5kC',1,1),(11,'2022-11-13 08:06:46','2022-11-13 08:06:46',NULL,'Juan','Climent','2022-10-25','juan123@gmail.com','$2a$12$8J2sRjgZqq2.vrJe1SWWD.VRvZu/UGtEYweD33KxZgbSpPE4qXFt.',1,1),(12,'2022-11-15 03:36:04','2022-12-06 19:42:40',NULL,'James','Doe','1978-07-23','james123@gmail.com','$2a$12$mSX2m8v3Z0WqwKW/FeZ24.X4fr7173SsjwXrdIdCgtQ.YlzrFBFW6',1,1),(14,'2022-11-15 10:06:24','2022-11-15 10:06:24',NULL,'aaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaa','0056-03-31','aaaaaaaaaaaaaaaaaa@gmail.com','$2a$12$OvQumvBX/alVsbKqPiRpTuTEtJvRVbbgfeCS8Rp3HFMMIt4b7dQSW',1,1),(15,'2022-12-05 01:43:23','2022-12-05 01:46:55',NULL,'LIONEL','Messi','1987-06-24','lio123@gmail.com','$2a$12$h4SEX0R8rewkmiRBJeqnNuMunFZjSpB/oFoNTV7pfp.ewlk5W.Dg.',1,1),(16,'2022-12-07 02:17:30','2022-12-07 02:19:25',NULL,'Martin','Phillips','1991-04-05','mail@gmail.com','$2a$12$qw4z7uRNQ0Rhlata3dQNzOGYVTMoIzc.WT.zGAaeyWDfxOp9nk/xe',1,1);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `offer_twoForOne` tinyint(1) DEFAULT 0,
  `offer_threeForTwo` tinyint(1) DEFAULT 0,
  `description` varchar(500) NOT NULL,
  `crafting_info` varchar(500) CHARACTER SET armscii8 NOT NULL,
  `additional_info` varchar(300) NOT NULL,
  `image_1` varchar(150) NOT NULL,
  `image_2` varchar(150) NOT NULL,
  `category_id` tinyint(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_category_id_idx` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,NULL,NULL,NULL,'Provoletas especiada',975.00,25,0,0,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut doloribus ea voluptatibus a placeat officiis eveniet vero quia doloremque. Consectetur saepe accusantium possimus voluptates consequatur a dicta iure perferendis incidunt!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut doloribus ea voluptatibus a p','Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut doloribus ea voluptatibus a p','ProvoletaEspecial.png','queso-ahumado.jpg',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` tinyint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'admin'),(1,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-06 23:43:17
