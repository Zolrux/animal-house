-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 17 2024 г., 16:55
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `animalhouse`
--

-- --------------------------------------------------------

--
-- Структура таблицы `animals`
--

CREATE TABLE `animals` (
  `id` int NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `animals`
--

INSERT INTO `animals` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Cat', '2024-01-07 14:39:50', '2024-01-07 14:39:50'),
(2, 'Dog', '2024-01-07 14:39:50', '2024-01-07 14:39:50'),
(3, 'Parrot', '2024-01-07 14:39:50', '2024-01-07 14:39:50'),
(4, 'Rabbit', '2024-01-07 14:39:50', '2024-01-07 14:39:50');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(13) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nickname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `status` enum('waiting','done','canceled') COLLATE utf8mb4_general_ci DEFAULT 'waiting',
  `arrivalDate` datetime NOT NULL,
  `departureDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  `animal_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `name`, `phone`, `email`, `nickname`, `comment`, `status`, `arrivalDate`, `departureDate`, `createdAt`, `updatedAt`, `user_id`, `animal_id`) VALUES
(1, 'Petro', '+380731234567', 'petronenko@ukr.net', 'ptr777', '', 'canceled', '2024-01-10 00:00:00', '2024-01-15 00:00:00', '2024-01-07 17:48:17', '2024-01-07 20:51:22', 2, 2),
(2, 'Nick', '+380960401476', 'zaharchuk0330@gmail.con', 'Pacha', 'no comment', 'done', '2024-01-07 00:00:00', '2024-01-22 00:00:00', '2024-01-07 20:58:09', '2024-01-07 20:58:28', 3, 2),
(3, 'Kolya', '+380631234567', 'kolya123@ukr.net', 'sodom', 'dglhdh sdklghsdklhkls', 'done', '2024-01-31 00:00:00', '2024-02-04 00:00:00', '2024-01-17 13:38:44', '2024-01-17 13:39:13', 4, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(13) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_general_ci DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `phone`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Kolya', 'Zakharchuk', '+380631234567', 'zakharchuk@gmail.com', '$2b$10$Nk.uiCiscIQSEgGkA9rgDeW.jF5kuZhJRTNUcIVJtaClDIO.KcnYO', 'admin', '2024-01-07 11:20:57', '2024-01-07 11:20:57'),
(2, 'Petro', 'Petrovich', '+380971234567', 'petrusik@gmail.com', '$2b$10$fCM1CNyvtjc24AZKCkLL1Ob2CzpOOCicFH/xhpSTqr8qd4vMFiFp2', 'user', '2024-01-07 17:23:20', '2024-01-07 17:23:20'),
(3, 'Nick', 'Zaharchuk', '+380960401476', 'zaharchuk0330@gmail.con', '$2b$10$7pFOI4l6K9lh/XOTu//KEuTwEznHPby37SxtU5uoH3WiklwxzfKPi', 'user', '2024-01-07 20:55:54', '2024-01-07 20:55:54'),
(4, 'Nick', 'Nickov', '+380739358073', 'nick@ukr.net', '$2b$10$A.q5Z9LGx46dCG1wQKiN1umCe2m5dju7l6E8UhKV9k0t/HQTdB2xy', 'user', '2024-01-17 13:32:04', '2024-01-17 13:32:04');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `animals`
--
ALTER TABLE `animals`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
