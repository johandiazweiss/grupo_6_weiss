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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Carnes'),(4,'Especias'),(5,'Otros'),(2,'Pescados'),(3,'Quesos');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (26,'2022-12-14 22:55:20','2022-12-14 22:55:20',NULL,'martin','Johnson','2022-12-20','martin123@gmail.com','$2a$12$5geyom4F/T9Pznkb/cUJbOtfK9oxUgIOwN3xLrDTQfPALdf9bxLiG',1,1),(27,'2022-12-14 22:56:04','2022-12-14 22:56:04',NULL,'Pedro','Zarza','2022-09-20','pedrozarza08@gmail.com','$2a$12$GSdeuF3CDcSalmRnrgmWp.xvAkYC0/APfJ4BYcsfg5gOlUIxm1H7.',1,2),(28,'2022-12-14 23:07:50','2022-12-14 23:09:42',NULL,'PEDRO','j','2022-11-29','martin@gmail.com','$2a$12$BqbSWdacOy3SBS8kNn4ENe2yPVulupYH2PsoDMdh5SsbeaCqVeswC',1,1);
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
  `price` decimal(8,2) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'2022-12-11 23:39:48','2022-12-14 10:59:29','2022-12-14 11:28:09','Ciervo Ahumado en aceite',1360.00,15,0,0,'Ciervo Ahumado envasado en frascos con aceite mezcla','Ciervo Ahumado envasado en frascos con aceite mezcla','Peso 200g, Peso escurrido 100g','product-img11122022203948ciervo-ahumado-aceite.jpg','product-img11122022203948ciervo-ahumado-aceite.jpg',1),(2,'2022-12-11 23:51:26','2022-12-11 23:51:26',NULL,'Trucha Ahumada en aceite',1840.00,15,0,0,'Trucha Ahumada envasada en frascos con aceite mezcla','Trucha Ahumada envasada en frascos con aceite mezcla','Peso 200g, Peso escurrido 100g','product-img11122022205126trucha-ahumada-aceite.jpg','product-img11122022205126trucha-ahumada-aceite.jpg',2),(3,'2022-12-11 23:56:28','2022-12-11 23:56:28',NULL,'Queso en Aceite de Oliva',1060.00,30,0,0,'Quesitos en Aceite de Oliva envasado en frascos','Quesitos en Aceite de Oliva envasado en frascos','Peso 200g, Peso escurrido 100g','product-img11122022205628QuesoAceite.jpg','product-img11122022205628QuesoAceite.jpg',3),(4,'2022-12-12 00:02:12','2022-12-14 05:53:07',NULL,'Molinillo Premium Pimienta Negra',799.00,0,0,0,'Es la pimienta más fuerte en aroma y apenas picante con un dejo dulce','Cuanto m?s molida est?, m?s aroma pierde ya que sus aceites se volatilizan m?s f?cilmente, por eso te recomendamos molerla justo antes de ser utilizada. Con los granos enteros se hacen salsas y marinadas','70 grs','product-img1112202221212pimienta-negra.jpg','product-img1112202221212pimienta-negra.jpg',4),(5,'2022-12-12 13:28:51','2022-12-12 13:28:51',NULL,'Picada Weiss',8000.00,15,0,0,'Para dos personas','Contiene pescado, ciervo y queso ahumado, junto con pate de salmon y trucha','100 grs de cada producto','product-img12122022102851picada2.jpg','product-img12122022102851picada2.jpg',5),(6,'2022-12-12 13:31:12','2022-12-12 13:31:12',NULL,'Queso Especiado con Ajo',750.00,0,1,0,'Queso fundido y especiado con ajo x 100grs','Queso fundido y especiado con ajo x 100grs','100 grs','product-img12122022103112quesoEspeciadoAjo.jpg','product-img12122022103112quesoEspeciadoAjo.jpg',3),(7,'2022-12-12 13:32:16','2022-12-12 13:32:16',NULL,'Queso Especiado con Alcaparras',750.00,0,0,0,'Queso fundido y especiado con alcaparras','Queso fundido y especiado con alcaparras','100 grs','product-img12122022103216queso-alcaparras.jpg','product-img12122022103216queso-alcaparras.jpg',3),(8,'2022-12-12 13:33:23','2022-12-12 13:33:23',NULL,'Queso Especiado con Hierbas',750.00,15,0,0,'Queso fundido y especiado con finas hierbas','Queso fundido y especiado con finas hierbas x 100 grs','100 grs','product-img12122022103323queso-hierbas.jpg','product-img12122022103323queso-hierbas.jpg',3),(9,'2022-12-12 13:34:17','2022-12-12 13:34:17',NULL,'Queso Especiado con Oregano',750.00,30,0,0,'Queso fundido y especiado con oregano','Queso fundido y especiado con oregano','100 grs','product-img12122022103417queso-oregano.jpg','product-img12122022103417queso-oregano.jpg',3),(10,'2022-12-12 13:35:22','2022-12-12 13:35:22',NULL,'Queso Especiado con Pimentón',750.00,15,0,0,'Queso fundido y especiado con pimentón','Queso fundido y especiado con piment?n','100 grs','product-img12122022103522queso-pimenton.jpg','product-img12122022103522queso-pimenton.jpg',3),(11,'2022-12-12 13:36:10','2022-12-12 13:36:10',NULL,'Queso Especiado con Pimienta',750.00,0,0,0,'Queso fundido y especiado con pimienta','Queso fundido y especiado con pimienta','100 grs','product-img12122022103610queso-pimienta.jpg','product-img12122022103610queso-pimienta.jpg',3),(12,'2022-12-12 13:39:22','2022-12-14 11:15:11','2022-12-14 11:16:32','Ciervo en Escabeche',1470.00,15,1,0,'Ciervo en Escabeche envasado en frascos','Ciervo en Escabeche envasado en frascos','Peso 330g, Peso escurrido 180g','product-img12122022103922ciervo-escabeche.jpg','product-img12122022103922ciervo-escabeche.jpg',1),(13,'2022-12-12 13:40:31','2022-12-12 13:40:31',NULL,'Paté de Salmón Ahumado',800.00,0,0,0,'Paté de Salmón Ahumado envasado en frascos','Pat? de Salm?n Ahumado envasado en frascos','80 grs','product-img12122022104031pasta-salmon-ahumado.jpg','product-img12122022104031pasta-salmon-ahumado.jpg',2),(14,'2022-12-12 13:41:16','2022-12-12 13:41:16',NULL,'Paté de Trucha Ahumada',800.00,15,0,0,'Paté de Trucha Ahumada envasada en frascos','Pat? de Trucha Ahumada envasada en frascos','80 grs','product-img12122022104116pasta-trucha-ahumada.jpg','product-img12122022104116pasta-trucha-ahumada.jpg',2),(15,'2022-12-12 13:43:24','2022-12-12 13:43:24',NULL,'Salmón Ahumado en Aceite',2800.00,15,0,0,'Salmón Ahumado envasado en frascos con aceite de maíz y girasol','Salm?n Ahumado envasado en frascos con aceite de ma?z y girasol','Peso 200g, Peso escurrido 100g','product-img12122022104324salmon-ahumado-aceite.jpg','product-img12122022104324salmon-ahumado-aceite.jpg',2),(16,'2022-12-12 13:44:23','2022-12-12 13:44:23',NULL,'Salmón Ahumado vacío en filetes',4170.00,0,1,0,'Salmón Ahumado envasado al vacío en filetes','Salm?n Ahumado envasado al vac?o en filetes','250 grs','product-img12122022104423salmon-filet-ahumado.jpg','product-img12122022104423salmon-filet-ahumado.jpg',2),(17,'2022-12-12 13:45:28','2022-12-12 13:45:28',NULL,'Trucha Ahumada Mariposa',1205.00,15,0,0,'Trucha Ahumada Caliente envasada al vacío','Trucha Ahumada Caliente envasada al vac?o','120 grs','product-img12122022104528trucha-ahumada-mariposa.jpg','product-img12122022104528trucha-ahumada-mariposa.jpg',2),(18,'2022-12-12 13:46:16','2022-12-12 13:46:16',NULL,'Trucha en Escabeche-Frasco',1860.00,0,0,0,'Trucha en Escabeche envasada en frascos','Trucha en Escabeche envasada en frascos','Peso 330g, Peso escurrido 180g','product-img12122022104616trucha-escabeche.jpg','product-img12122022104616trucha-escabeche.jpg',2),(19,'2022-12-12 13:49:48','2022-12-12 13:49:48',NULL,'Molinillo Premium Sabor Provenzal',590.00,0,0,0,'El ajo y el perejil son dos condimentos que por separado son indispensables en nuestra cocina, pero que, además, juntos realzan el sabor de infinidad de platos y los hacen más vistosos.','Provenzal combina muy bien con mariscos y diferentes preparaciones con pastas, pescados y verduras. Queda muy bien en unas papas al horno. Ingredientes: Sal Gruesa, Ajo y Perejil','100 grs','product-img12122022104948provenzal.jpg','product-img12122022104948provenzal.jpg',4),(20,'2022-12-12 13:50:56','2022-12-12 13:50:56',NULL,'Molinillo Premium Mix de Pimientas',1015.00,15,1,0,'Mix de pimientas especialmente seleccionadas','La combinaci?n de aromas y colores de Pimientas es ideal para usar por ejemplo, sobre quesos semiduros, previamente rociados con aceite de oliva.','60 grs','product-img12122022105056mix-pimienta.jpg','product-img12122022105056mix-pimienta.jpg',4),(21,'2022-12-12 13:51:47','2022-12-12 13:51:47',NULL,'Molinillo Premium Sabores Rústicos',590.00,0,0,0,'Mix Rustico se utiliza para acompañar las carnes asadas, pollos o para marinar pescados y aves; también se usa como aderezo de ensaladas','Este mix tiene la cualidad de realzar el sabor de la carne y se considera que ha contribuido a la fama internacional del asado. Ingredientes: Sal Gruesa, Aji Molido, Perejil, Ajo Granulado y Or?gano','100 grs','product-img12122022105147sabores-rusticos.jpg','product-img12122022105147sabores-rusticos.jpg',4),(22,'2022-12-12 13:52:51','2022-12-12 13:52:51',NULL,'Molinillo Premium Sal & Ajo Granulado',630.00,0,0,1,'Ideal para condimentar pures, papas fritas y verduras','Sal gruesa y Ajo','100 grs','product-img12122022105251sal-ajo.jpg','product-img12122022105251sal-ajo.jpg',4),(23,'2022-12-12 13:53:37','2022-12-12 13:53:37',NULL,'Molinillo Premium Sal con Pepperoni',590.00,15,0,0,'Aderezo realizado a base de ajíes secos molidos','El producto resultante contiene el intenso sabor picante caracter?stico de los aj?es. Sal con Pepperoni queda muy bien en preparaciones con salsas, en pizzas, pastas y marinadas. Ingredientes: Sal Gruesa, Aji Molido','100 grs','product-img12122022105337sal-pepperoni.jpg','product-img12122022105337sal-pepperoni.jpg',4),(24,'2022-12-12 23:24:53','2022-12-14 05:51:29',NULL,'Ciervo Ahumado',856.00,0,0,0,'Ciervo Ahumado envasado en sobres al vacío, fileteado','Ciervo Ahumado envasado en sobres al vac?o, fileteado','100 grs','product-img12122022202453ciervo-ahumado (1).jpg','product-img12122022202453ciervo-ahumado (1).jpg',1),(25,'2022-12-12 23:32:04','2022-12-12 23:32:04',NULL,'Paté de Ciervo Ahumado',750.00,0,0,0,'Paté de Ciervo Ahumado envasado en frascos','Pat? de Ciervo Ahumado envasado en frascos','x80grs','product-img1212202220324pasta-ciervo.jpg','product-img1212202220324pasta-ciervo.jpg',1),(26,'2022-12-14 02:54:39','2022-12-14 10:16:27','2022-12-14 10:29:25','EDITADO',100.00,50,0,0,'cccccccc','cccccccccc','ccccccccccc','product-img1412202223728default.png','product-img1412202223728default.png',2),(27,'2022-12-14 10:34:39','2022-12-14 10:34:39','2022-12-14 10:34:49','guiso',4000.00,25,0,0,'cccc','cccc','cccc','product-img1412202273439default.png','product-img1412202273439default.png',5),(28,'2022-12-14 10:42:03','2022-12-14 10:53:12','2022-12-14 10:56:16','aa',310.00,0,1,0,'dasda','asdasdad','asdasdas','product-img1412202275312product-img14122022042default.png','product-img1412202275312product-img14122022042default.png',2),(29,'2022-12-14 10:56:02','2022-12-14 10:56:02','2022-12-14 10:56:14','aaaaaaaaaaaa',567.00,0,0,0,'asdadsad','sada','dsadsadadsa','product-img141220227562default.png','product-img141220227562default.png',2),(30,'2022-12-14 11:02:54','2022-12-14 11:05:23','2022-12-14 11:05:25','sdfs',4000.00,0,0,0,'asdfaf','dfasdfasd','afsdfasfdas','product-img141220228254ciervo-ahumado (1).jpg','product-img141220228254ciervo-ahumado (1).jpg',4),(31,'2022-12-14 11:06:07','2022-12-14 11:09:44','2022-12-14 11:10:40','555555',5000.00,25,1,0,'55555','555','5555','product-img14122022867arrollado-salmon-thumb.jpg','product-img14122022867arrollado-salmon-thumb.jpg',4),(32,'2022-12-14 11:21:21','2022-12-14 11:21:21','2022-12-14 11:21:32','papa frita',34234.00,0,0,0,'sfddasdfasf','fdas','fdafsdfas','product-img1412202282121pasta-ciervo.jpg','product-img1412202282121pasta-ciervo.jpg',5),(33,'2022-12-14 18:42:09','2022-12-14 18:42:09','2022-12-14 18:49:10','aaaas',1000.00,15,0,1,'hola','Contiene pescado, ciervo y queso ahumado, junto con pate de salmon y trucha','100 grs de cada producto','product-img12122022102851picada2.jpg','product-img12122022102851picada2.jpg',1),(34,'2022-12-14 22:31:10','2022-12-14 22:31:24',NULL,'PRODUCTO PARA EDITAR',500.00,0,0,0,'aaaaaaaaaaaaa','sssssssssssss','adsasaasasasa','product-img14122022193110pasta-ciervo.jpg','product-img14122022193110pasta-ciervo.jpg',1),(35,'2022-12-14 23:12:57','2022-12-14 23:13:28','2022-12-14 23:14:25','PRODUCTO PARA EDITAR2',4000.00,0,0,0,'aaaqaaaaaaa','ddddddddd','vvvvvvvvvvvvvvv','product-img14122022201257pasta-ciervo.jpg','product-img14122022201257pasta-ciervo.jpg',2);
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

-- Dump completed on 2022-12-23 15:47:41
