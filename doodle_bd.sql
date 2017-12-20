-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 20 Avril 2017 à 18:36
-- Version du serveur :  5.7.17-0ubuntu0.16.04.1
-- Version de PHP :  7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `doodle`
--

-- --------------------------------------------------------

--
-- Structure de la table `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date_creation` date NOT NULL,
  `pre_jour` date NOT NULL,
  `last_jour` date NOT NULL,
  `titre` varchar(55) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `agenda`
--

INSERT INTO `agenda` (`id`, `id_user`, `date_creation`, `pre_jour`, `last_jour`, `titre`, `description`) VALUES
(10, 33, '2017-04-16', '2017-04-16', '2017-04-30', 'rendez-vous', '');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `color` varchar(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `statut` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1 : user normal ,2 : admin',
  `password` varchar(255) NOT NULL,
  `cle` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `nom`, `prenom`, `color`, `email`, `statut`, `password`, `cle`) VALUES
(28, 'abderrahman', 'idouhammou', '#17b510', 'idouhammou.a@gmail.com', '1', '30b6d495d5e8b0821eb43fc9635846da', '44f19981401461d6cb15a261c41cb0fc'),
(33, 'abdel', 'idouhammou', '#000000', 'ia@gmail.com', '2', 'd9c93c1d4f0de7120a052968edd89350', '805f6f56038c04242cc2f3cebbe526f8'),
(34, 'hind', 'amri', '#c30b00', 'a@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(40, 'abderrahman', 'idouhammou', '#17b510', 'idouhammou.a@gmail.com', '1', '30b6d495d5e8b0821eb43fc9635846da', '44f19981401461d6cb15a261c41cb0fc'),
(43, 'abdel', 'idouhammou', '#000065', 'ia@gmail.com', '2', 'd9c93c1d4f0de7120a052968edd89350', '805f6f56038c04242cc2f3cebbe526f8'),
(44, 'hind', 'amri', '#c39000', 'aa@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(45, 'hind', 'amri', '#c35670', 'ab@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(46, 'hind', 'amri', '#c30000', 'ac@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(47, 'hind', 'amri', '#c30560', 'ad@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(48, 'hind', 'amri', '#c31200', 'ae@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(49, 'hind', 'amri', '#c30033', 'af@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(50, 'hind', 'amri', '#c30044', 'ag@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(51, 'hind', 'amri', '#c32300', 'ah@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(52, 'hind', 'amri', '#c35600', 'a@gmail.com', '2', '590b385b4c6ecd29f7dfc64272c7869d', '1829aa9ff2ebc50b29a44d3a50c4e39f'),
(53, '      idouhammou', '      idouhammou', '#d13232', '  kdjs@gmail.com', '1', '011ffdf8fd3ed54699697e34ebe7675d', '24f9f24148c4ea995a4cb8bd919f1593');

-- --------------------------------------------------------

--
-- Structure de la table `vote`
--

CREATE TABLE `vote` (
  `id` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idAgenda` int(11) NOT NULL,
  `date_vote` date NOT NULL,
  `date_choix` date NOT NULL,
  `annuler` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `vote`
--

INSERT INTO `vote` (`id`, `idUser`, `idAgenda`, `date_vote`, `date_choix`, `annuler`) VALUES
(323, 33, 10, '2017-04-20', '2017-04-24', 1),
(324, 33, 10, '2017-04-20', '2017-04-26', 1),
(325, 33, 10, '2017-04-20', '2017-04-26', 1),
(326, 50, 10, '2017-04-20', '2017-04-20', 0),
(327, 33, 10, '2017-04-20', '2017-04-22', 1),
(328, 33, 10, '2017-04-20', '2017-04-20', 1),
(329, 33, 10, '2017-04-20', '2017-04-24', 1),
(330, 33, 10, '2017-04-20', '2017-04-28', 1),
(331, 33, 10, '2017-04-20', '2017-04-30', 1),
(332, 33, 10, '2017-04-20', '2017-04-18', 1),
(333, 33, 10, '2017-04-20', '2017-04-16', 0),
(334, 33, 10, '2017-04-20', '2017-04-21', 1),
(335, 33, 10, '2017-04-20', '2017-04-20', 1),
(336, NULL, 10, '2017-04-20', '2017-04-24', 0),
(337, 33, 10, '2017-04-20', '2017-04-28', 0),
(338, 33, 10, '2017-04-20', '2017-04-19', 0),
(339, 33, 10, '2017-04-20', '2017-04-25', 0),
(340, 33, 10, '2017-04-20', '2017-04-22', 0),
(341, 33, 10, '2017-04-20', '2017-04-21', 0),
(342, 33, 10, '2017-04-20', '2017-04-17', 0),
(343, 33, 10, '2017-04-20', '2017-04-18', 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vote`
--
ALTER TABLE `vote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAgenda` (`idAgenda`),
  ADD KEY `idUser` (`idUser`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT pour la table `vote`
--
ALTER TABLE `vote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=344;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `agenda_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `vote`
--
ALTER TABLE `vote`
  ADD CONSTRAINT `vote_ibfk_3` FOREIGN KEY (`idAgenda`) REFERENCES `agenda` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vote_ibfk_4` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
