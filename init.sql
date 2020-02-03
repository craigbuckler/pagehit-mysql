-- installation
SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- create database
DROP DATABASE IF EXISTS `pagehit`;
CREATE DATABASE `pagehit` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pagehit`;

-- create hit table
DROP TABLE IF EXISTS `hit`;
CREATE TABLE `hit` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'record ID',
  `hash` binary(16) NOT NULL COMMENT 'URL hash',
  `ip` int(4) unsigned DEFAULT NULL COMMENT 'client IP address',
  `ua` varchar(200) DEFAULT NULL COMMENT 'client useragent string',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'hit time',
  PRIMARY KEY (`id`),
  KEY `hash_time` (`hash`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='page hits';
