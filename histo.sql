-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: myrestaurant
-- ------------------------------------------------------
-- Server version	5.7.12-log

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
-- Current Database: `myrestaurant`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `myrestaurant` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `myrestaurant`;

--
-- Table structure for table `databasechangelog`
--

DROP TABLE IF EXISTS `databasechangelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangelog`
--

LOCK TABLES `databasechangelog` WRITE;
/*!40000 ALTER TABLE `databasechangelog` DISABLE KEYS */;
INSERT INTO `databasechangelog` VALUES ('00000000000001','jhipster','classpath:config/liquibase/changelog/00000000000000_initial_schema.xml','2017-02-24 18:29:45',1,'EXECUTED','7:1750f80ec0af9d70c81e2520143b3353','createTable tableName=jhi_user; createIndex indexName=idx_user_login, tableName=jhi_user; createIndex indexName=idx_user_email, tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableN...','',NULL,'3.5.3',NULL,NULL,'7957382997'),('20170224101812-1','jhipster','classpath:config/liquibase/changelog/20170224101812_added_entity_Desk.xml','2017-02-24 18:29:45',2,'EXECUTED','7:edfac6ed3d7cb372d9e46511faa9a9e7','createTable tableName=desk','',NULL,'3.5.3',NULL,NULL,'7957382997'),('20170224101812-1','jhipster','classpath:config/liquibase/changelog/20170224101812_added_entity_Ordre.xml','2017-02-24 18:29:45',3,'EXECUTED','7:2211dbc1aebb445fbf0d868689998bda','createTable tableName=ordre','',NULL,'3.5.3',NULL,NULL,'7957382997'),('20170224101812-1','jhipster','classpath:config/liquibase/changelog/20170224101812_added_entity_Payment.xml','2017-02-24 18:29:45',4,'EXECUTED','7:9abbbafbbc19126fcea362aae64b5e0e','createTable tableName=payment','',NULL,'3.5.3',NULL,NULL,'7957382997'),('20170224101812-1','jhipster','classpath:config/liquibase/changelog/20170224101812_added_entity_Product.xml','2017-02-24 18:29:45',5,'EXECUTED','7:4022f8bc6064e936dbbeb294ded87189','createTable tableName=product','',NULL,'3.5.3',NULL,NULL,'7957382997'),('20170224101812-1','jhipster','classpath:config/liquibase/changelog/20170224101812_added_entity_Restaurant.xml','2017-02-24 18:29:45',6,'EXECUTED','7:c65216fbcd133649ff2e5e199e851432','createTable tableName=restaurant','',NULL,'3.5.3',NULL,NULL,'7957382997'),('20170224101812-2','jhipster','classpath:config/liquibase/changelog/20170224101812_added_entity_constraints_Desk.xml','2017-02-24 18:29:46',7,'EXECUTED','7:c68599f97b8283c034dd924241f21a24','addForeignKeyConstraint baseTableName=desk, constraintName=fk_desk_restaurant_id, referencedTableName=restaurant','',NULL,'3.5.3',NULL,NULL,'7957382997'),('20170224101812-2','jhipster','classpath:config/liquibase/changelog/20170224101812_added_entity_constraints_Ordre.xml','2017-02-24 18:29:46',8,'EXECUTED','7:afdba1e9c8d1a7de53d94388fc453fa5','addForeignKeyConstraint baseTableName=ordre, constraintName=fk_ordre_desk_id, referencedTableName=desk; addForeignKeyConstraint baseTableName=ordre, constraintName=fk_ordre_payment_id, referencedTableName=payment','',NULL,'3.5.3',NULL,NULL,'7957382997'),('20170224101812-2','jhipster','classpath:config/liquibase/changelog/20170224101812_added_entity_constraints_Payment.xml','2017-02-24 18:29:46',9,'EXECUTED','7:5b91e62c3aa24b1717f0fc7d57947c46','addForeignKeyConstraint baseTableName=payment, constraintName=fk_payment_desk_id, referencedTableName=desk','',NULL,'3.5.3',NULL,NULL,'7957382997');
/*!40000 ALTER TABLE `databasechangelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `databasechangeloglock`
--

DROP TABLE IF EXISTS `databasechangeloglock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `databasechangeloglock`
--

LOCK TABLES `databasechangeloglock` WRITE;
/*!40000 ALTER TABLE `databasechangeloglock` DISABLE KEYS */;
INSERT INTO `databasechangeloglock` VALUES (1,'\0',NULL,NULL);
/*!40000 ALTER TABLE `databasechangeloglock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desk`
--

DROP TABLE IF EXISTS `desk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desk` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `client_number` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `restaurant_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_desk_restaurant_id` (`restaurant_id`),
  CONSTRAINT `fk_desk_restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desk`
--

LOCK TABLES `desk` WRITE;
/*!40000 ALTER TABLE `desk` DISABLE KEYS */;
INSERT INTO `desk` VALUES (1,'01','unoccupied',10,15.00,NULL),(2,'02','unoccupied',6,175.00,NULL),(3,'03','occupied',1,222.00,NULL),(4,'05','occupied',8,66.00,NULL),(5,'06',NULL,6,28.00,NULL),(6,'07','unoccupied',6,100.00,NULL);
/*!40000 ALTER TABLE `desk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_authority`
--

DROP TABLE IF EXISTS `jhi_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_authority`
--

LOCK TABLES `jhi_authority` WRITE;
/*!40000 ALTER TABLE `jhi_authority` DISABLE KEYS */;
INSERT INTO `jhi_authority` VALUES ('ROLE_ADMIN'),('ROLE_CASHIER'),('ROLE_RESPON'),('ROLE_ROOT'),('ROLE_SERVER'),('ROLE_SYSTEM'),('ROLE_USER');
/*!40000 ALTER TABLE `jhi_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_persistent_audit_event`
--

DROP TABLE IF EXISTS `jhi_persistent_audit_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_persistent_audit_event` (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `principal` varchar(50) NOT NULL,
  `event_date` timestamp NULL DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `idx_persistent_audit_event` (`principal`,`event_date`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_persistent_audit_event`
--

LOCK TABLES `jhi_persistent_audit_event` WRITE;
/*!40000 ALTER TABLE `jhi_persistent_audit_event` DISABLE KEYS */;
INSERT INTO `jhi_persistent_audit_event` VALUES (1,'admin','2017-02-24 17:31:02','AUTHENTICATION_SUCCESS'),(2,'server','2017-02-24 17:31:15','AUTHENTICATION_SUCCESS'),(3,'server','2017-02-24 17:41:10','AUTHENTICATION_SUCCESS'),(4,'server','2017-02-24 17:41:50','AUTHENTICATION_SUCCESS'),(5,'server','2017-02-28 13:27:29','AUTHENTICATION_SUCCESS'),(6,'admin','2017-02-28 13:28:29','AUTHENTICATION_SUCCESS'),(7,'admin','2017-02-28 15:29:04','AUTHENTICATION_SUCCESS'),(8,'admin','2017-02-28 15:29:43','AUTHENTICATION_SUCCESS'),(9,'admin','2017-02-28 15:37:02','AUTHENTICATION_SUCCESS'),(10,'admin','2017-02-28 17:14:43','AUTHENTICATION_SUCCESS'),(11,'admin','2017-03-01 10:11:01','AUTHENTICATION_SUCCESS'),(12,'admin','2017-03-01 13:35:58','AUTHENTICATION_SUCCESS'),(13,'admin','2017-03-01 15:00:40','AUTHENTICATION_SUCCESS'),(14,'admin','2017-03-01 16:29:27','AUTHENTICATION_SUCCESS'),(15,'admin','2017-03-01 16:41:23','AUTHENTICATION_SUCCESS'),(16,'admin','2017-03-01 21:58:05','AUTHENTICATION_SUCCESS'),(17,'admin','2017-03-01 21:58:22','AUTHENTICATION_SUCCESS'),(18,'admin','2017-03-02 16:28:01','AUTHENTICATION_SUCCESS'),(19,'admin','2017-03-03 08:52:57','AUTHENTICATION_SUCCESS'),(20,'admin','2017-03-03 09:15:22','AUTHENTICATION_SUCCESS'),(21,'admin','2017-03-03 09:56:07','AUTHENTICATION_SUCCESS'),(22,'admin','2017-03-03 14:27:21','AUTHENTICATION_SUCCESS'),(23,'admin','2017-03-03 14:27:30','AUTHENTICATION_SUCCESS'),(24,'admin','2017-03-03 14:51:16','AUTHENTICATION_SUCCESS'),(25,'admin','2017-03-03 22:03:48','AUTHENTICATION_SUCCESS'),(26,'admin','2017-03-10 15:01:26','AUTHENTICATION_SUCCESS'),(27,'admin','2017-03-10 21:30:18','AUTHENTICATION_SUCCESS'),(28,'admin','2017-03-10 22:58:10','AUTHENTICATION_SUCCESS'),(29,'admin','2017-03-13 14:39:10','AUTHENTICATION_SUCCESS'),(30,'admin','2017-03-13 14:47:49','AUTHENTICATION_SUCCESS'),(31,'admin','2017-03-13 15:46:17','AUTHENTICATION_SUCCESS'),(32,'admin','2017-03-15 13:58:31','AUTHENTICATION_SUCCESS'),(33,'admin','2017-03-15 14:05:05','AUTHENTICATION_SUCCESS'),(34,'admin','2017-03-24 15:41:54','AUTHENTICATION_SUCCESS'),(35,'admin','2017-03-24 15:50:47','AUTHENTICATION_SUCCESS'),(36,'admin','2017-03-24 17:01:37','AUTHENTICATION_SUCCESS'),(37,'admin','2017-04-27 12:51:51','AUTHENTICATION_SUCCESS'),(38,'admin','2017-04-27 14:56:41','AUTHENTICATION_SUCCESS'),(39,'admin','2017-06-06 14:13:19','AUTHENTICATION_SUCCESS'),(40,'admin','2017-07-04 13:54:22','AUTHENTICATION_SUCCESS'),(41,'admin','2017-07-04 14:38:34','AUTHENTICATION_SUCCESS'),(42,'admin','2017-07-27 12:58:44','AUTHENTICATION_SUCCESS'),(43,'admin','2017-07-27 13:11:01','AUTHENTICATION_SUCCESS'),(44,'admin','2017-07-27 14:34:21','AUTHENTICATION_SUCCESS'),(45,'admin','2017-07-27 15:19:15','AUTHENTICATION_SUCCESS'),(46,'admin','2017-07-27 16:09:06','AUTHENTICATION_SUCCESS'),(47,'admin','2017-07-27 16:23:53','AUTHENTICATION_SUCCESS'),(48,'admin','2017-07-27 16:27:47','AUTHENTICATION_SUCCESS'),(49,'admin','2017-07-28 09:22:48','AUTHENTICATION_SUCCESS'),(50,'admin','2017-07-28 12:40:28','AUTHENTICATION_SUCCESS'),(51,'admin','2017-07-28 12:40:54','AUTHENTICATION_SUCCESS'),(52,'admin','2017-07-28 13:16:26','AUTHENTICATION_SUCCESS'),(53,'admin','2017-07-28 13:42:29','AUTHENTICATION_SUCCESS'),(54,'admin','2017-07-28 14:08:01','AUTHENTICATION_SUCCESS'),(55,'admin','2017-07-28 15:49:07','AUTHENTICATION_SUCCESS'),(56,'admin','2017-07-28 15:54:13','AUTHENTICATION_SUCCESS'),(57,'admin','2017-07-31 08:44:00','AUTHENTICATION_SUCCESS'),(58,'admin','2017-07-31 11:16:42','AUTHENTICATION_SUCCESS'),(59,'admin','2017-07-31 13:35:54','AUTHENTICATION_SUCCESS'),(60,'admin','2017-07-31 14:39:11','AUTHENTICATION_SUCCESS'),(61,'admin','2017-07-31 14:51:22','AUTHENTICATION_SUCCESS'),(62,'admin','2017-07-31 15:30:12','AUTHENTICATION_SUCCESS'),(63,'admin','2017-08-01 08:44:36','AUTHENTICATION_SUCCESS'),(64,'admin','2017-08-01 10:27:09','AUTHENTICATION_SUCCESS'),(65,'admin','2017-08-01 12:35:49','AUTHENTICATION_SUCCESS'),(66,'admin','2017-08-03 12:29:57','AUTHENTICATION_SUCCESS'),(67,'admin','2017-08-03 16:09:03','AUTHENTICATION_SUCCESS'),(68,'admin','2017-08-04 09:03:13','AUTHENTICATION_SUCCESS'),(69,'admin','2017-08-04 09:24:50','AUTHENTICATION_SUCCESS'),(70,'admin','2017-08-04 11:37:39','AUTHENTICATION_SUCCESS'),(71,'admin','2017-08-07 11:34:05','AUTHENTICATION_SUCCESS'),(72,'admin','2017-08-07 13:37:42','AUTHENTICATION_SUCCESS'),(73,'admin','2017-08-07 13:49:26','AUTHENTICATION_SUCCESS'),(74,'admin','2017-08-07 13:54:11','AUTHENTICATION_SUCCESS'),(75,'admin','2017-08-07 14:29:21','AUTHENTICATION_SUCCESS'),(76,'admin','2017-08-07 14:55:59','AUTHENTICATION_SUCCESS'),(77,'admin','2017-08-07 15:12:18','AUTHENTICATION_SUCCESS'),(78,'admin','2017-08-07 15:40:09','AUTHENTICATION_SUCCESS'),(79,'admin','2017-08-07 15:49:42','AUTHENTICATION_SUCCESS'),(80,'admin','2017-08-08 11:45:12','AUTHENTICATION_SUCCESS'),(81,'admin','2017-08-09 08:58:02','AUTHENTICATION_SUCCESS'),(82,'admin','2017-08-09 10:15:36','AUTHENTICATION_SUCCESS'),(83,'admin','2017-08-09 11:14:49','AUTHENTICATION_SUCCESS'),(84,'admin','2017-08-09 14:52:36','AUTHENTICATION_SUCCESS'),(85,'admin','2017-08-10 08:36:07','AUTHENTICATION_SUCCESS'),(86,'admin','2017-08-10 09:04:11','AUTHENTICATION_SUCCESS'),(87,'admin','2017-08-10 09:19:45','AUTHENTICATION_SUCCESS'),(88,'admin','2017-08-10 11:29:34','AUTHENTICATION_SUCCESS'),(89,'admin','2017-08-10 12:18:36','AUTHENTICATION_SUCCESS'),(90,'admin','2017-08-10 13:56:23','AUTHENTICATION_SUCCESS'),(91,'admin','2017-08-10 15:58:08','AUTHENTICATION_SUCCESS'),(92,'admin','2017-08-11 09:01:19','AUTHENTICATION_SUCCESS'),(93,'admin','2017-08-16 07:35:13','AUTHENTICATION_SUCCESS'),(94,'admin','2017-08-16 07:35:13','AUTHENTICATION_SUCCESS'),(95,'admin','2017-08-16 07:59:33','AUTHENTICATION_SUCCESS'),(96,'admin','2017-08-16 10:16:33','AUTHENTICATION_SUCCESS'),(97,'admin','2017-08-16 12:12:40','AUTHENTICATION_SUCCESS'),(98,'admin','2017-08-17 13:29:50','AUTHENTICATION_SUCCESS'),(99,'admin','2017-08-18 13:35:00','AUTHENTICATION_SUCCESS'),(100,'admin','2017-08-18 15:03:58','AUTHENTICATION_SUCCESS'),(101,'admin','2017-08-18 15:13:57','AUTHENTICATION_SUCCESS'),(102,'admin','2017-08-18 15:28:46','AUTHENTICATION_SUCCESS'),(103,'admin','2017-08-18 15:35:28','AUTHENTICATION_SUCCESS'),(104,'admin','2017-08-21 08:31:19','AUTHENTICATION_SUCCESS'),(105,'admin','2017-08-21 11:08:29','AUTHENTICATION_SUCCESS'),(106,'admin','2017-08-21 14:58:00','AUTHENTICATION_SUCCESS'),(107,'admin','2017-08-22 08:32:57','AUTHENTICATION_SUCCESS'),(108,'admin','2017-08-22 10:49:53','AUTHENTICATION_SUCCESS'),(109,'admin','2017-08-24 15:25:34','AUTHENTICATION_SUCCESS'),(110,'admin','2017-08-24 15:29:32','AUTHENTICATION_SUCCESS'),(111,'admin','2017-08-24 15:31:17','AUTHENTICATION_SUCCESS'),(112,'admin','2017-09-05 08:53:28','AUTHENTICATION_SUCCESS'),(113,'admin','2017-09-05 10:06:10','AUTHENTICATION_SUCCESS'),(114,'admin','2017-09-05 12:11:24','AUTHENTICATION_SUCCESS'),(115,'admin','2017-09-05 12:37:08','AUTHENTICATION_SUCCESS'),(116,'admin','2017-09-07 08:12:29','AUTHENTICATION_SUCCESS'),(117,'admin','2017-09-07 09:14:11','AUTHENTICATION_SUCCESS');
/*!40000 ALTER TABLE `jhi_persistent_audit_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_persistent_audit_evt_data`
--

DROP TABLE IF EXISTS `jhi_persistent_audit_evt_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_persistent_audit_evt_data` (
  `event_id` bigint(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`,`name`),
  KEY `idx_persistent_audit_evt_data` (`event_id`),
  CONSTRAINT `fk_evt_pers_audit_evt_data` FOREIGN KEY (`event_id`) REFERENCES `jhi_persistent_audit_event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_persistent_audit_evt_data`
--

LOCK TABLES `jhi_persistent_audit_evt_data` WRITE;
/*!40000 ALTER TABLE `jhi_persistent_audit_evt_data` DISABLE KEYS */;
INSERT INTO `jhi_persistent_audit_evt_data` VALUES (1,'remoteAddress','127.0.0.1'),(2,'remoteAddress','127.0.0.1'),(3,'remoteAddress','127.0.0.1'),(4,'remoteAddress','127.0.0.1'),(5,'remoteAddress','127.0.0.1'),(6,'remoteAddress','127.0.0.1'),(7,'remoteAddress','127.0.0.1'),(8,'remoteAddress','127.0.0.1'),(9,'remoteAddress','127.0.0.1'),(10,'remoteAddress','127.0.0.1'),(11,'remoteAddress','127.0.0.1'),(12,'remoteAddress','127.0.0.1'),(13,'remoteAddress','127.0.0.1'),(14,'remoteAddress','127.0.0.1'),(15,'remoteAddress','127.0.0.1'),(16,'remoteAddress','127.0.0.1'),(17,'remoteAddress','127.0.0.1'),(18,'remoteAddress','127.0.0.1'),(19,'remoteAddress','127.0.0.1'),(20,'remoteAddress','127.0.0.1'),(21,'remoteAddress','127.0.0.1'),(22,'remoteAddress','127.0.0.1'),(23,'remoteAddress','127.0.0.1'),(24,'remoteAddress','127.0.0.1'),(25,'remoteAddress','127.0.0.1'),(26,'remoteAddress','127.0.0.1'),(27,'remoteAddress','127.0.0.1'),(28,'remoteAddress','127.0.0.1'),(29,'remoteAddress','127.0.0.1'),(30,'remoteAddress','127.0.0.1'),(31,'remoteAddress','127.0.0.1'),(32,'remoteAddress','127.0.0.1'),(33,'remoteAddress','127.0.0.1'),(34,'remoteAddress','127.0.0.1'),(35,'remoteAddress','127.0.0.1'),(36,'remoteAddress','127.0.0.1'),(37,'remoteAddress','127.0.0.1'),(38,'remoteAddress','127.0.0.1'),(39,'remoteAddress','127.0.0.1'),(40,'remoteAddress','127.0.0.1'),(41,'remoteAddress','127.0.0.1'),(42,'remoteAddress','127.0.0.1'),(43,'remoteAddress','127.0.0.1'),(44,'remoteAddress','127.0.0.1'),(45,'remoteAddress','127.0.0.1'),(46,'remoteAddress','127.0.0.1'),(47,'remoteAddress','127.0.0.1'),(48,'remoteAddress','127.0.0.1'),(49,'remoteAddress','127.0.0.1'),(50,'remoteAddress','127.0.0.1'),(51,'remoteAddress','127.0.0.1'),(52,'remoteAddress','127.0.0.1'),(52,'sessionId','4305IMJST2Gu1gB0RiXoq3ustj07XPFTIPeK2YY0'),(53,'remoteAddress','127.0.0.1'),(54,'remoteAddress','127.0.0.1'),(55,'remoteAddress','127.0.0.1'),(56,'remoteAddress','127.0.0.1'),(57,'remoteAddress','127.0.0.1'),(58,'remoteAddress','127.0.0.1'),(59,'remoteAddress','127.0.0.1'),(60,'remoteAddress','127.0.0.1'),(61,'remoteAddress','127.0.0.1'),(61,'sessionId','Nvvxc582hI9GGNdWGAug10TealSS1OV8CCnuqdnF'),(62,'remoteAddress','127.0.0.1'),(62,'sessionId','9Rk5-GwyCCyGIuanvh9Uxuzfj5Mm29cJADcHprTT'),(63,'remoteAddress','127.0.0.1'),(64,'remoteAddress','127.0.0.1'),(65,'remoteAddress','127.0.0.1'),(66,'remoteAddress','127.0.0.1'),(67,'remoteAddress','127.0.0.1'),(68,'remoteAddress','127.0.0.1'),(69,'remoteAddress','127.0.0.1'),(70,'remoteAddress','127.0.0.1'),(71,'remoteAddress','127.0.0.1'),(72,'remoteAddress','127.0.0.1'),(73,'remoteAddress','127.0.0.1'),(74,'remoteAddress','127.0.0.1'),(75,'remoteAddress','127.0.0.1'),(76,'remoteAddress','127.0.0.1'),(77,'remoteAddress','127.0.0.1'),(78,'remoteAddress','127.0.0.1'),(79,'remoteAddress','127.0.0.1'),(80,'remoteAddress','127.0.0.1'),(81,'remoteAddress','127.0.0.1'),(82,'remoteAddress','127.0.0.1'),(83,'remoteAddress','127.0.0.1'),(84,'remoteAddress','127.0.0.1'),(85,'remoteAddress','127.0.0.1'),(86,'remoteAddress','127.0.0.1'),(87,'remoteAddress','127.0.0.1'),(88,'remoteAddress','127.0.0.1'),(89,'remoteAddress','127.0.0.1'),(90,'remoteAddress','127.0.0.1'),(91,'remoteAddress','127.0.0.1'),(92,'remoteAddress','127.0.0.1'),(93,'remoteAddress','127.0.0.1'),(94,'remoteAddress','127.0.0.1'),(95,'remoteAddress','127.0.0.1'),(96,'remoteAddress','127.0.0.1'),(97,'remoteAddress','127.0.0.1'),(98,'remoteAddress','127.0.0.1'),(99,'remoteAddress','127.0.0.1'),(100,'remoteAddress','127.0.0.1'),(100,'sessionId','OdPcl-9pX4K1-vm2FN6J4t9viNFady_sgFwx6xNp'),(101,'remoteAddress','127.0.0.1'),(102,'remoteAddress','127.0.0.1'),(103,'remoteAddress','127.0.0.1'),(104,'remoteAddress','127.0.0.1'),(105,'remoteAddress','127.0.0.1'),(106,'remoteAddress','127.0.0.1'),(107,'remoteAddress','127.0.0.1'),(108,'remoteAddress','127.0.0.1'),(109,'remoteAddress','127.0.0.1'),(110,'remoteAddress','127.0.0.1'),(111,'remoteAddress','127.0.0.1'),(112,'remoteAddress','127.0.0.1'),(113,'remoteAddress','127.0.0.1'),(114,'remoteAddress','127.0.0.1'),(114,'sessionId','OlttAk6MO6YvOFLA15VSpYqihdhKxSCCJKcD7XQI'),(115,'remoteAddress','127.0.0.1'),(116,'remoteAddress','127.0.0.1'),(117,'remoteAddress','127.0.0.1');
/*!40000 ALTER TABLE `jhi_persistent_audit_evt_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_persistent_token`
--

DROP TABLE IF EXISTS `jhi_persistent_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_persistent_token` (
  `series` varchar(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `token_value` varchar(20) NOT NULL,
  `token_date` date DEFAULT NULL,
  `ip_address` varchar(39) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`series`),
  KEY `fk_user_persistent_token` (`user_id`),
  CONSTRAINT `fk_user_persistent_token` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_persistent_token`
--

LOCK TABLES `jhi_persistent_token` WRITE;
/*!40000 ALTER TABLE `jhi_persistent_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `jhi_persistent_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_user`
--

DROP TABLE IF EXISTS `jhi_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `lang_key` varchar(5) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NOT NULL,
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `idx_user_login` (`login`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `idx_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_user`
--

LOCK TABLES `jhi_user` WRITE;
/*!40000 ALTER TABLE `jhi_user` DISABLE KEYS */;
INSERT INTO `jhi_user` VALUES (1,'root','$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC','Administrator','Administrator','root@localhost','','','en',NULL,NULL,'system','2017-02-24 17:29:44',NULL,'system',NULL),(2,'system','$2a$10$mE.qmcV0mFU5NcKh73TZx.z4ueI/.bDWbj0T1BYyqP481kGGarKLG','System','System','system@localhost','','','en',NULL,NULL,'system','2017-02-24 17:29:44',NULL,'system',NULL),(3,'anonymoususer','$2a$10$j8S5d7Sr7.8VTOYNviDPOeWX8KcYILUVJBsYV83Y5NtECayypx9lO','Anonymous','User','anonymous@localhost','','','en',NULL,NULL,'system','2017-02-24 17:29:44',NULL,'system',NULL),(4,'admin','$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC','Administrator','Administrator','admin@localhost','','','en',NULL,NULL,'system','2017-02-24 17:29:44',NULL,'system',NULL),(5,'user','$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K','User','User','user@localhost','','','en',NULL,NULL,'system','2017-02-24 17:29:44',NULL,'system',NULL),(6,'respon','$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC','Administrator','Administrator','respon@localhost','','','en',NULL,NULL,'system','2017-02-24 17:29:44',NULL,'system',NULL),(7,'server','$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC','Administrator','Administrator','server@localhost','','','en',NULL,NULL,'system','2017-02-24 17:29:44',NULL,'system',NULL),(8,'cashier','$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC','Administrator','Administrator','cashier@localhost','','','en',NULL,NULL,'system','2017-02-24 17:29:44',NULL,'system',NULL);
/*!40000 ALTER TABLE `jhi_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jhi_user_authority`
--

DROP TABLE IF EXISTS `jhi_user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `fk_authority_name` (`authority_name`),
  CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jhi_user_authority`
--

LOCK TABLES `jhi_user_authority` WRITE;
/*!40000 ALTER TABLE `jhi_user_authority` DISABLE KEYS */;
INSERT INTO `jhi_user_authority` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_ADMIN'),(4,'ROLE_ADMIN'),(8,'ROLE_CASHIER'),(6,'ROLE_RESPON'),(7,'ROLE_SERVER'),(1,'ROLE_USER'),(2,'ROLE_USER'),(4,'ROLE_USER'),(5,'ROLE_USER'),(7,'ROLE_USER'),(8,'ROLE_USER');
/*!40000 ALTER TABLE `jhi_user_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordre`
--

DROP TABLE IF EXISTS `ordre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordre` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `desk_id` bigint(20) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ordre_desk_id` (`desk_id`),
  KEY `fk_ordre_payment_id` (`payment_id`),
  CONSTRAINT `fk_ordre_desk_id` FOREIGN KEY (`desk_id`) REFERENCES `desk` (`id`),
  CONSTRAINT `fk_ordre_payment_id` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordre`
--

LOCK TABLES `ordre` WRITE;
/*!40000 ALTER TABLE `ordre` DISABLE KEYS */;
INSERT INTO `ordre` VALUES (2,'Poulet roti',NULL,10.00,NULL,NULL),(3,'Poulet roti',NULL,10.00,NULL,NULL),(5,'Stack haché',NULL,8.00,2,NULL),(8,'Gratin',NULL,15.00,3,NULL),(10,'Stack haché',NULL,8.00,3,NULL),(12,'Gratin',NULL,15.00,4,NULL),(13,'Stack haché',NULL,8.00,4,NULL),(14,'Stack haché',NULL,8.00,4,NULL),(16,'Poulet roti',NULL,10.00,3,NULL),(18,'Confit canard',NULL,12.00,3,NULL),(19,'Stack haché',NULL,8.00,3,NULL),(20,'Gratin',NULL,15.00,3,NULL),(22,'Stack haché',NULL,8.00,3,NULL),(23,'Confit canard',NULL,12.00,3,NULL),(25,'Poulet roti',NULL,10.00,3,NULL),(26,'Poulet roti',NULL,10.00,2,NULL),(27,'Gratin',NULL,15.00,2,NULL),(28,'Confit canard',NULL,12.00,2,NULL),(29,'Stack haché',NULL,8.00,3,NULL),(30,'Gratin',NULL,15.00,4,NULL),(31,'Gratin',NULL,15.00,3,NULL),(32,'Poulet roti',NULL,10.00,3,NULL),(33,'Stack haché',NULL,8.00,3,NULL),(35,'Gratin',NULL,15.00,3,NULL),(36,'Stack haché',NULL,8.00,2,NULL),(37,'Confit canard',NULL,12.00,2,NULL),(38,'Gratin',NULL,15.00,2,NULL),(39,'Poulet roti',NULL,10.00,2,NULL),(40,'Poulet roti',NULL,10.00,2,NULL),(42,'Poulet roti',NULL,10.00,2,NULL),(49,'Stack haché',NULL,8.00,2,NULL),(50,'Confit canard',NULL,12.00,2,NULL),(52,'Poulet roti',NULL,10.00,4,NULL),(53,'Poulet roti',NULL,10.00,4,NULL),(54,'Gratin',NULL,15.00,3,NULL),(55,'Gratin',NULL,15.00,2,NULL),(56,'Poulet roti',NULL,10.00,3,NULL),(58,'Gratin',NULL,15.00,3,NULL),(59,'Stack haché',NULL,8.00,3,NULL),(60,'Poulet roti',NULL,10.00,3,NULL),(61,'Poulet roti',NULL,10.00,2,NULL),(62,'Gratin',NULL,15.00,1,NULL),(64,'Confit canard',NULL,12.00,5,NULL),(65,'Stack haché',NULL,8.00,5,NULL),(66,'Poulet roti',NULL,10.00,2,NULL),(67,'Poulet roti',NULL,10.00,2,NULL),(68,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,3,NULL),(69,'Stack haché',NULL,8.00,5,NULL),(72,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,6,NULL),(73,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,6,NULL),(76,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,6,NULL),(78,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,6,NULL),(79,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,6,NULL),(82,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,6,NULL),(84,'Stack haché',NULL,8.00,6,NULL),(85,'Confit canard',NULL,12.00,6,NULL),(86,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,6,NULL),(87,'Poulet rôti aux croûtons et pommes de terre',NULL,10.00,6,NULL);
/*!40000 ALTER TABLE `ordre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `desk_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_payment_desk_id` (`desk_id`),
  CONSTRAINT `fk_payment_desk_id` FOREIGN KEY (`desk_id`) REFERENCES `desk` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'card',10.00,3),(2,'ticket',6.00,3),(3,'cash',10.00,3),(4,'check',10.00,2),(5,'card',30.00,3),(7,'card',33.00,3),(8,'card',15.00,3),(9,'check',15.00,3);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Poulet rôti aux croûtons et pommes de terre',10.00,'Poulet rôti aux croûtons et pommes de terre'),(2,'Stack haché',8.00,NULL),(3,'Confit canard',12.00,'Confit canard'),(4,'Gratin dauphinois',15.00,'Gratin dauphinois'),(5,'Paupiettes de veau rôties',18.00,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-07 14:25:14
