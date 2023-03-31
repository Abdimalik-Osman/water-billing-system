-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2022 at 05:44 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waterbilling`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `customers_sp` (IN `_home_code` INT, IN `_fullname` VARCHAR(50), IN `_address` VARCHAR(30), IN `_phone` INT(20), IN `_status` VARCHAR(30), IN `_registerDate` DATE, IN `_action` VARCHAR(30))  BEGIN
IF _action = 'insert' THEN
INSERT INTO `customers`(`fullname`, `address`, `phone`, `status`, `registerDate`) VALUES (_fullname,
  _address,_phone,_status,_registerDate);
SELECT 'inserted' as Message;
ELSEIF _action = 'update' THEN
UPDATE `customers` SET `fullname`=_fullname,`address`=_address,`phone`=_phone,`status`=_status,`registerDate`=_registerDate WHERE `home_code` = _home_code;
SELECT 'updated' as Message;
ELSE 
SELECT 'Unknown Command' as Message;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_customer_sp` (IN `_home_code` INT)  BEGIN 
DELETE FROM `customers` WHERE `home_code` = _home_code;
SELECT 'deleted' as Message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_invoice_sp` (IN `_ID` INT)  BEGIN

DELETE FROM `invoice` WHERE `invoiceNum` = _ID; 
SELECT 'deleted' AS Message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_menus_sp` (IN `_ID` INT)  BEGIN 
DELETE FROM `menus` WHERE `menuID` = _ID;
SELECT 'deleted' as Message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_payment_sp` (IN `_ID` INT)  BEGIN

DELETE FROM `payment` WHERE `paymentID` = _ID; 
SELECT 'deleted' AS Message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user_sp` (IN `_ID` INT)  BEGIN 
DELETE FROM `users` WHERE `user_ID` = _ID;
SELECT 'deleted' as Message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fiil_home_code_sp` ()  BEGIN
SELECT DISTINCT(`home_code`),`fullname` FROM `customers`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fill_customer_sp` ()  BEGIN



SELECT home_code, fullname, phone FROM `customers`;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `fill_user_sp` ()  BEGIN
SELECT `user_ID`, `username`, `type`  FROM `users`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `invoice_report_sp` (IN `_custom` VARCHAR(20), IN `_from` DATE, IN `_to` DATE)  BEGIN
iF _custom = 'all' THEN
	SET @from = '0000-00-00';
	SET @to = '9999-01-01';
ELSE
	SET @from = _from;
	SET @to = _to;
END IF;

SELECT * FROM `invoice` 
WHERE `registerDate` BETWEEN @from AND @to;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `invoice_sp` (IN `_ID` INT, IN `_home_code` INT, IN `_last_read` FLOAT(10,3), IN `_months` VARCHAR(30), IN `_action` VARCHAR(20))  BEGIN
SET @fullName=(SELECT DISTINCT(`fullname`) FROM `customers` WHERE `home_code` = _home_code);
SET @Address=(SELECT DISTINCT(`address`) FROM `customers` WHERE `home_code` = _home_code);
SET @tell=(SELECT DISTINCT(`phone`) FROM `customers` WHERE `home_code` = _home_code);
SET @current = (SELECT SUM(`lastRead`) FROM `invoice` WHERE `home_code` = _home_code);

IF _action = 'insert' THEN
INSERT INTO `invoice`(`home_code`, `fullname`, `address`, `phone`, `currentRead`, `lastRead`, `months`) VALUES (_home_code,@fullName,@Address,@tell,@current,_last_read,_months);
SELECT 'inserted' AS Message;
ELSEIF _action = 'update' THEN
UPDATE `invoice` SET `home_code`=_home_code,`fullname`=@fullName,`address`=@Aaddress,`phone`=@tell,	`lastRead`=_last_read,`months`=_months WHERE `invoiceNum` = _ID;
SELECT 'updated' AS Message;
ELSE 
SELECT 'Unknown Command' AS Message;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `load_nav_user_sp` (IN `_user` INT)  BEGIN

SELECT m.module, m.name menu, m.link
FROM `userroles` ur
LEFT JOIN `menus` m ON m.menuID = ur.menuID
WHERE ur.user_ID = _user ORDER BY m.module;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login_sp` (IN `_username` VARCHAR(20), IN `_password` INT(6))  BEGIN

IF EXISTS(SELECT `user_ID` FROM `users` WHERE `username`= _username AND `password` = _password) THEN
	IF EXISTS( SELECT `user_ID` FROM `users` WHERE `username`= _username AND `password` = _password AND `status`= 'active') THEN
    SELECT `user_ID`, `username`, `type` FROM `users` 		WHERE `username` = _username AND `password` = 			_password;
    ELSE
    	SELECT 'InActive' 		AS Message;
    END IF;
ELSE
	SELECT 'InCorrect' AS Message;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `menu_sp` (IN `_ID` INT, IN `_Name` VARCHAR(50), IN `_link` VARCHAR(100), IN `_module` VARCHAR(30), IN `_user_ID` INT, IN `_registerDate` DATE, IN `_action` VARCHAR(20))  BEGIN
IF _action = 'insert' THEN

INSERT INTO `menus`( `name`,link, `module`, `user_ID`,`registerDate`) VALUES (_name,_link,_module,
  _user_ID,_registerDate);
SELECT 'inserted' as Message;
ELSEIF _action = 'update' THEN
UPDATE `menus` SET `name`=_name,`link`=_link,`module`=_module,`user_ID`=_user_ID, `registerDate`=_registerDate WHERE `menuID` = _ID;
SELECT 'updated' as Message;

ELSE
SELECT 'unknown command' AS Message;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payment_report_SP` (IN `_custom` VARCHAR(20), IN `_home_code` INT, IN `_months` VARCHAR(30))  BEGIN
IF _custom = ' ' AND _home_code = '' AND _months = '' THEN
SELECT *FROM `payments`;
ELSEIF _months = _months AND _custom = ' ' AND _home_code = ''  THEN
SELECT *FROM `payments` WHERE `months` LIKE concat('%',_months,'%');

ELSEIF _home_code = _home_code AND _custom = ' ' AND _months = '' THEN
SELECT * FROM `payments` WHERE `home_code` = _home_code;
ELSEIF _custom = ' ' AND _home_code = _home_code AND _months = _months  THEN
SELECT *FROM `payments` WHERE `months` LIKE concat('%',_months,'%') AND `home_code` = _home_code; 

END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `payment_sp` (IN `_ID` INT, IN `_home_code` INT, IN `_amount` FLOAT(10,2), IN `_months` VARCHAR(30), IN `_action` VARCHAR(20))  BEGIN
SET @fullName=(SELECT DISTINCT(`fullname`) FROM `invoice` WHERE `home_code` = _home_code);
SET @Address=(SELECT DISTINCT(`address`) FROM `invoice` WHERE `home_code` = _home_code);
SET @invoice=(SELECT DISTINCT(`invoiceNum`) FROM `invoice` WHERE `months` = _months AND `fullname`= @fullname);
SET @usage = (SELECT `usage_MC` FROM `invoice` WHERE `home_code` = _home_code AND `months` = _months);
SET @total = (SELECT `total` FROM `invoice` WHERE `home_code` =_home_code AND `months` = _months);
SET @rate = (SELECT DISTINCT(`rate`) FROM `invoice`);
IF _action = 'insert' THEN
INSERT INTO `payments`(`home_code`, `fullname`, `address`, `usage_MC`, `rate`, `total`, `amountPaid`, `invoiceNum`,`months`) VALUES (_home_code,@fullname,@address,@usage,@rate,@total,  _amount,@invoice,_months);
SELECT 'inserted' AS Message;
ELSEIF _action = 'update' THEN
UPDATE `payments` SET `amountPaid`=_amount WHERE `home_code`=home_code;
SELECT 'updated' AS Message;
ELSE
SELECT 'Unknown Message';
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_customers_sp` (IN `_home_code` INT)  BEGIN
IF _home_code ='' THEN
SELECT * FROM customers;
ELSE
SELECT * FROM customers WHERE home_code = _home_code;
end IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_invoice_sp` (IN `_ID` INT)  BEGIN
IF _ID ='' THEN
SELECT * FROM `invoice`;
ELSE
SELECT * FROM `invoice` WHERE `invoiceNum` = _ID;
end IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_menus_sp` (IN `_ID` INT)  BEGIN
IF _ID ='' THEN
SELECT * FROM menus;
ELSE
SELECT * FROM menus WHERE menuID = _ID;
end IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_payment_sp` (IN `_ID` INT)  BEGIN
IF _ID ='' THEN
SELECT * FROM `payments`;
ELSE
SELECT * FROM `payments` WHERE `paymentID` = _ID;
end IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_user_rolls_sp` (IN `_ID` INT)  BEGIN

IF _ID = '' THEN
SELECT `ID`, u.username, m.name, u.`registerDate` FROM `userroles` ur
LEFT JOIN `users` u ON u.user_ID = ur.user_ID
LEFT JOIN `menus` m ON m.menuID = m.menuID;

ELSE
SELECT * FROM `userroles`  WHERE `userroles`.ID = _ID;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_user_sp` (IN `_ID` INT)  BEGIN
IF _ID ='' THEN
SELECT * FROM users;
ELSE
SELECT * FROM users WHERE user_ID = _ID;
end IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `statistics_sp` ()  BEGIN
SET @customers = (SELECT COUNT(*) FROM `customers`);
SET @invoice = (SELECT COUNT(*) FROM `invoice`);
SET @payments = (SELECT SUBSTR(SUM(`total`),1,7) FROM `payments`);
SET @users = (SELECT COUNT(*) FROM `users`);
SET @balance = (SELECT  SUBSTR(SUM(`balance`),1,7)  FROM `payments`);
SELECT @users users, @customers customers, @invoice invoice, @payments payments, @balance balance;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_user_rolls_sp` (IN `_user_ID` INT, IN `_menuID` INT, IN `_loop` INT)  BEGIN
IF _loop = 0 THEN
DELETE FROM user_rolls WHERE userroles.user_ID = _user_ID;
END IF;

INSERT INTO `userroles`(`user_ID`, `menuID`) VALUES (_user_ID, _menuID);

SELECT 'Inserted' AS Message;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_sp` (IN `_ID` INT, IN `_fullname` VARCHAR(100), IN `_username` VARCHAR(50), IN `_password` INT(6), IN `_type` VARCHAR(30), IN `_status` VARCHAR(20), IN `_registerDate` DATE, IN `_action` VARCHAR(20))  BEGIN

IF _action= 'insert' THEN
INSERT INTO `users`(`fullname`,`username`, `password`, `type`, `status`, `registerDate`) VALUES (_fullname,_username,_password,_type,_status,_registerDate);

SELECT 'inserted' AS Message;
ELSEIF _action = 'update' THEN
UPDATE `users` SET `fullname`=_fullname,`username`=_username,
`password`=_password,`type`=_type,`status`=_status,`registerDate`=_registerDate
WHERE user_ID = _ID;
SELECT 'updated' AS Message;
ELSE
SELECT 'Unknown Commad' AS Message;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_menu_get` ()  BEGIN
SELECT menuID, module, name as menu FROM `menus`  ORDER BY module;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_rolls_fetch_sp` (IN `_user` INT)  BEGIN
SELECT `user_ID`, `menuID` FROM `userroles` WHERE `user_ID` = _user;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_rolls_sp` (IN `_ID` INT, IN `_user_ID` INT, IN `_menuID` INT, IN `_action` VARCHAR(20))  BEGIN 
IF _action = 'insert' THEN
INSERT INTO `userroles`( `user_ID`, `menuID`) VALUES (_user_ID,_menuID);
SELECT 'inserted' AS Massage;
ELSEIF _action = 'update' THEN
UPDATE `userroles` SET `user_ID`=_user_ID,`menuID`=_menuID WHERE `ID` = _ID;
SELECT 'updated' AS Massage;
END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `home_code` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `address` varchar(30) NOT NULL,
  `phone` int(20) NOT NULL,
  `status` varchar(30) NOT NULL,
  `registerDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`home_code`, `fullname`, `address`, `phone`, `status`, `registerDate`) VALUES
(1, 'Abdullahi Osman Hassan', 'wadajir', 615185316, 'active', '2022-04-03'),
(2, 'Aisha Osman Hassan', 'Doolow', 66537322, 'active', '2022-04-02'),
(3, 'Abdurizak Abdullahi Hassan', 'wadajir', 4426273, 'active', '2022-04-07'),
(4, 'Mustafa Abubkar Abdullahi', 'Howl wadaag', 61778323, 'active', '2022-04-07'),
(5, 'Xafsa Abdulkadir Mohamed', 'Boondhere', 61527373, 'active', '2022-04-07'),
(6, 'Saalim Abubakar Ahmed', 'Kaaraan', 61728333, 'active', '2022-04-07'),
(7, 'Anwar Omar Abdi', 'Kaxda', 61555555, 'inActive', '2022-04-07');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoiceNum` int(11) NOT NULL,
  `home_code` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` int(20) NOT NULL,
  `currentRead` float(10,2) NOT NULL DEFAULT 0.00,
  `lastRead` float(10,2) NOT NULL,
  `usage_MC` float(10,2) GENERATED ALWAYS AS (`lastRead` - `currentRead`) VIRTUAL,
  `rate` float NOT NULL DEFAULT 1.3,
  `total` float(10,2) GENERATED ALWAYS AS (`usage_MC` * `rate`) VIRTUAL,
  `months` varchar(30) NOT NULL,
  `registerDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoiceNum`, `home_code`, `fullname`, `address`, `phone`, `currentRead`, `lastRead`, `rate`, `months`, `registerDate`) VALUES
(1, 1, 'Abdullahi Osman Hassan ', 'Wadajir', 615185316, 0.00, 10.00, 1.3, 'january', '2022-04-11 13:14:10'),
(5, 2, 'Aisha Osman Hassan', 'Doolow', 66537322, 0.00, 20.00, 1.3, 'january', '2022-04-11 17:57:13'),
(9, 3, 'Abdurizak Abdullahi Hassan', 'wadajir', 4426273, 0.00, 18.00, 1.3, 'january', '2022-04-11 18:20:01'),
(12, 6, 'Saalim Abubakar Ahmed', 'Kaaraan', 61728333, 0.00, 25.00, 1.3, 'january', '2022-04-11 18:22:22'),
(31, 2, 'Aisha Osman Hassan', 'Doolow', 66537322, 20.00, 25.00, 1.3, 'february', '2022-04-21 09:17:23'),
(32, 3, 'Abdurizak Abdullahi Hassan', 'wadajir', 4426273, 18.00, 30.00, 1.3, 'february', '2022-04-21 09:18:19'),
(35, 6, 'Saalim Abubakar Ahmed', 'Kaaraan', 61728333, 25.00, 33.00, 1.3, 'february', '2022-04-21 09:19:54'),
(36, 1, 'Abdullahi Osman Hassan', 'wadajir', 615185316, 10.00, 25.00, 1.3, 'february', '2022-04-21 09:21:13'),
(41, 2, 'Aisha Osman Hassan', 'Doolow', 66537322, 45.00, 55.00, 1.3, 'march', '2022-04-21 10:47:21'),
(43, 1, 'Abdullahi Osman Hassan', 'wadajir', 615185316, 35.00, 42.00, 1.3, 'march', '2022-04-21 11:00:54'),
(44, 4, 'Mustafa Abubkar Abdullahi', 'Howl wadaag', 61778323, 0.00, 15.00, 1.3, 'january', '2022-04-21 11:06:48'),
(45, 5, 'Xafsa Abdulkadir Mohamed', 'Boondhere', 61527373, 0.00, 18.00, 1.3, 'january', '2022-04-21 11:08:04'),
(46, 4, 'Mustafa Abubkar Abdullahi', 'Howl wadaag', 61778323, 15.00, 28.00, 1.3, 'february', '2022-04-21 11:11:22'),
(47, 4, 'Mustafa Abubkar Abdullahi', 'Howl wadaag', 61778323, 43.00, 51.00, 1.3, 'march', '2022-04-21 11:12:23'),
(48, 5, 'Xafsa Abdulkadir Mohamed', 'Boondhere', 61527373, 18.00, 30.00, 1.3, 'february', '2022-04-21 11:13:07'),
(49, 5, 'Xafsa Abdulkadir Mohamed', 'Boondhere', 61527373, 48.00, 55.00, 1.3, 'march', '2022-04-21 11:13:29'),
(50, 3, 'Abdurizak Abdullahi Hassan', 'wadajir', 4426273, 48.00, 53.00, 1.3, 'march', '2022-04-21 11:14:38'),
(51, 6, 'Saalim Abubakar Ahmed', 'Kaaraan', 61728333, 58.00, 62.00, 1.3, 'march', '2022-04-21 11:15:21');

--
-- Triggers `invoice`
--
DELIMITER $$
CREATE TRIGGER `delete_payment_tr` AFTER DELETE ON `invoice` FOR EACH ROW BEGIN

#NEW
#OLD
DELETE FROM `payments` WHERE `invoiceNum` = OLD.invoiceNum;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_payment_tr` AFTER UPDATE ON `invoice` FOR EACH ROW BEGIN

UPDATE `payments` SET `home_code`=NEW.home_code,`fullname`=NEW.fullname,`address`=NEW.address,`usage_MC`=NEW.usage_MC,`rate`=NEW.rate,`total`=NEW.total,`months`=NEW.months WHERE `invoiceNum` = NEW.invoiceNum;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `menuID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `link` varchar(100) NOT NULL,
  `module` varchar(30) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `registerDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`menuID`, `name`, `link`, `module`, `user_ID`, `registerDate`) VALUES
(1, 'Admin', 'dashboard.php', 'Admin', 14, '2022-04-05'),
(2, 'Employee', 'invoice.php', 'staff', 17, '2022-04-13'),
(10, 'Customer', 'customers.php', 'Admin', 18, '2022-04-14'),
(11, 'Payment Report', 'payment.php', 'Admin', 15, '2022-04-15'),
(14, 'User Rolls', 'user_rolls.php', 'Admin', 15, '2022-04-05'),
(15, 'Invoice Report', 'invoice_report.php', 'Admin', 15, '2022-04-05'),
(16, 'Payment Report', 'payment_report.php', 'Admin', 15, '2022-04-05');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `paymentID` int(11) NOT NULL,
  `home_code` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `paymentDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `usage_MC` float(10,2) NOT NULL,
  `rate` float(10,2) NOT NULL,
  `total` float(10,3) NOT NULL,
  `amountPaid` float(10,2) NOT NULL,
  `balance` float GENERATED ALWAYS AS (`total` - `amountPaid`) VIRTUAL,
  `invoiceNum` int(11) NOT NULL,
  `months` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`paymentID`, `home_code`, `fullname`, `address`, `paymentDate`, `usage_MC`, `rate`, `total`, `amountPaid`, `invoiceNum`, `months`) VALUES
(16, 1, 'Abdullahi Osman Hassan ', 'Wadajir', '2022-04-11 17:49:50', 10.00, 1.30, 13.000, 10.00, 1, 'january'),
(18, 2, 'Aisha Osman Hassan', 'Doolow', '2022-04-11 19:05:01', 20.00, 1.30, 26.000, 26.00, 5, 'january'),
(19, 3, 'Abdurizak Abdullahi Hassan', 'wadajir', '2022-04-11 19:06:05', 18.00, 1.30, 23.400, 22.00, 9, 'january'),
(22, 6, 'Saalim Abubakar Ahmed', 'Kaaraan', '2022-04-11 19:08:33', 25.00, 1.30, 32.500, 32.50, 12, 'january'),
(31, 1, 'Abdullahi Osman Hassan', 'wadajir', '2022-04-21 09:26:30', 15.00, 1.30, 19.500, 19.50, 36, 'february'),
(32, 2, 'Aisha Osman Hassan', 'Doolow', '2022-04-21 09:27:10', 5.00, 1.30, 6.500, 4.00, 31, 'february'),
(33, 3, 'Abdurizak Abdullahi Hassan', 'wadajir', '2022-04-21 09:27:49', 12.00, 1.30, 15.600, 15.00, 32, 'february'),
(35, 6, 'Saalim Abubakar Ahmed', 'Kaaraan', '2022-04-21 10:10:52', 8.00, 1.30, 10.400, 10.40, 35, 'february'),
(36, 2, 'Aisha Osman Hassan', 'Doolow', '2022-04-21 10:51:50', 10.00, 1.30, 13.000, 12.00, 41, 'march'),
(37, 1, 'Abdullahi Osman Hassan', 'wadajir', '2022-04-21 11:01:33', 7.00, 1.30, 9.100, 9.10, 43, 'march'),
(38, 4, 'Mustafa Abubkar Abdullahi', 'Howl wadaag', '2022-04-21 11:09:36', 15.00, 1.30, 19.500, 19.50, 44, 'january'),
(39, 5, 'Xafsa Abdulkadir Mohamed', 'Boondhere', '2022-04-21 11:10:52', 18.00, 1.30, 23.400, 23.40, 45, 'january'),
(40, 3, 'Abdurizak Abdullahi Hassan', 'wadajir', '2022-04-21 11:17:35', 5.00, 1.30, 6.500, 3.00, 50, 'march'),
(41, 6, 'Saalim Abubakar Ahmed', 'Kaaraan', '2022-04-21 11:20:08', 4.00, 1.30, 5.200, 5.20, 51, 'march'),
(42, 5, 'Xafsa Abdulkadir Mohamed', 'Boondhere', '2022-04-21 11:21:39', 12.00, 1.30, 15.600, 10.00, 48, 'february'),
(43, 5, 'Xafsa Abdulkadir Mohamed', 'Boondhere', '2022-04-21 11:22:54', 7.00, 1.30, 9.100, 9.10, 49, 'march'),
(44, 4, 'Mustafa Abubkar Abdullahi', 'Howl wadaag', '2022-04-21 11:24:35', 13.00, 1.30, 16.900, 10.00, 46, 'february'),
(45, 4, 'Mustafa Abubkar Abdullahi', 'Howl wadaag', '2022-04-21 11:25:09', 8.00, 1.30, 10.400, 10.40, 47, 'march');

-- --------------------------------------------------------

--
-- Table structure for table `userroles`
--

CREATE TABLE `userroles` (
  `ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `menuID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userroles`
--

INSERT INTO `userroles` (`ID`, `user_ID`, `menuID`) VALUES
(1, 14, 1),
(2, 15, 1),
(5, 15, 2),
(6, 15, 10),
(8, 14, 10),
(11, 14, 2),
(12, 17, 2),
(14, 18, 2),
(23, 14, 11),
(24, 14, 14),
(27, 15, 11),
(28, 15, 14),
(30, 14, 15),
(31, 15, 15);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_ID` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` int(6) NOT NULL,
  `type` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `registerDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_ID`, `fullname`, `username`, `password`, `type`, `status`, `registerDate`) VALUES
(14, 'Ahmed Osman Hassan', 'salafi', 11111, 'admin', 'active', '2022-05-07'),
(15, 'Abdimalik Osman Hassan', 'duqa', 22222, 'admin', 'active', '2022-04-06'),
(17, 'Xafsa Abdulkadir Mohamed', 'xafsa', 12345, 'employee', 'active', '2022-04-03'),
(18, 'Abshir Abdullahi Shirow', 'shire', 33333, 'employee', 'inActive', '2022-04-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`home_code`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoiceNum`),
  ADD UNIQUE KEY `home_code` (`home_code`,`months`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`menuID`),
  ADD KEY `user_ID` (`user_ID`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`paymentID`),
  ADD UNIQUE KEY `home_code` (`home_code`,`months`),
  ADD KEY `foreign key` (`invoiceNum`);

--
-- Indexes for table `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_ID`),
  ADD UNIQUE KEY `username` (`username`,`password`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `home_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoiceNum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `menuID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `paymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `userroles`
--
ALTER TABLE `userroles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`home_code`) REFERENCES `customers` (`home_code`) ON UPDATE CASCADE;

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `users` (`user_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `foreign key` FOREIGN KEY (`invoiceNum`) REFERENCES `invoice` (`invoiceNum`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`home_code`) REFERENCES `customers` (`home_code`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
