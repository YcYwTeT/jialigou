-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.5-10.0.14-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 jialigou 的数据库结构
DROP DATABASE IF EXISTS `jialigou`;
CREATE DATABASE IF NOT EXISTS `jialigou` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `jialigou`;


-- 导出  表 jialigou.products 结构
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `proid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `imgstart` int(11) NOT NULL DEFAULT '0',
  `imgend` int(11) NOT NULL DEFAULT '0',
  `supply` varchar(50) COLLATE utf8_spanish_ci NOT NULL DEFAULT '0',
  `price` int(11) DEFAULT '0',
  `integral` int(11) DEFAULT '0',
  `sortAll` varchar(50) COLLATE utf8_spanish_ci DEFAULT '个护美妆',
  `sortFir` varchar(50) COLLATE utf8_spanish_ci DEFAULT '0',
  `hot` int(11) DEFAULT '0' COMMENT '0：非热 1：热',
  `new` int(11) DEFAULT '0' COMMENT '0：非新 1：新',
  `isindex` int(11) DEFAULT '0' COMMENT '1：显示在主页的小图片 2：显示在主页中图片  3：显示在主页大图片',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '0：已下架 -1：已售完 1：正常',
  PRIMARY KEY (`proid`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- 正在导出表  jialigou.products 的数据：~71 rows (大约)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
REPLACE INTO `products` (`proid`, `name`, `imgstart`, `imgend`, `supply`, `price`, `integral`, `sortAll`, `sortFir`, `hot`, `new`, `isindex`, `status`) VALUES
	(1, '骏升时尚旅行箱1+1特惠组\r\n', 1, 5, '20121610\r\n', 299, 103, '服装箱包', '箱包', 0, 0, 2, 1),
	(2, '艾芭莎手工定制廓形版双面呢羊毛大衣\r\n', 6, 7, '20121434\r\n', 599, 0, '服装箱包', '女装', 0, 0, 3, 0),
	(3, 'KEEFE棉麻休闲宽版裙裤超值套组\r\n', 8, 8, '20122912\r\n', 199, 137, '服装箱包', '女装', 0, 0, 1, 1),
	(4, '（提货券）德国UKS智能烟灶超值组', 114, 116, '20122932', 1980, 1980, '家居用品', '厨房电器', 2, 0, 1, 1),
	(5, '（双12）婵之云天然纤维素无钢圈立体聚拢内衣秒杀组\r\n', 15, 17, '20122080', 149, 0, '服装箱包', '女装', 0, 0, 1, 0),
	(6, '迪菲怡金丝绒蕾丝连衣裙特惠组', 20, 23, '20122922', 299, 131, '服装箱包', '女装', 0, 0, 1, -1),
	(7, '芷秀花漾雪纺衫阔腿裤套装4件\r\n', 13, 14, '20123086', 199, 102, '服装箱包', '女装', 0, 0, 1, -1),
	(8, '（双12）爱澜依牛皮笑脸女士拎包1+1组', 18, 19, '20122042\r\n', 169, 0, '服装箱包', '箱包', 0, 0, 1, 0),
	(9, '可姿燕窝紧致面膜超值组', 24, 25, '20121233', 199, 137, '个护美妆', '面部护理', 0, 0, 2, 1),
	(10, '娇源导入导出仪超声波离子美容仪器家用脸部排毒洁面仪嫩肤祛斑', 26, 28, '20122803', 299, 79, '个护美妆', '美容工具', 0, 0, 3, 1),
	(11, '雪肤莱V7水光素颜润肤精华套组', 29, 31, '20122264', 199, 119, '个护美妆', '面部护理', 0, 0, 1, 1),
	(12, '邦维丝轻松染发梳超值组', 32, 33, '20122539', 199, 137, '个护美妆', '美发护理', 0, 0, 1, -1),
	(13, '（海）吕臻萃恒护多效洗发水400ml', 34, 35, '20121593', 68, 32, '个护美妆', '美发护理', 0, 0, 1, -1),
	(14, '（自）娇源吸黑头仪器洁面仪毛孔清洁器去黑头神器美容仪电动吸粉刺油脂', 36, 38, '20122797', 299, 79, '个护美妆', '美容工具', 0, 0, 1, 1),
	(15, '（自）一叶子黑松露舒缓紧纹蝶翼眼膜', 39, 40, '20123011', 99, 0, '个护美妆', '面部护理', 0, 0, 1, 0),
	(16, '朗圣洁生物活性固齿修复牙膏升级组', 41, 43, '20117812', 199, 162, '个护美妆', '口腔护理', 0, 0, 1, -1),
	(17, '茅台集团原浆酒15金瓶升级组（12瓶）', 44, 45, '20120677', 499, 638, '食品生鲜', '酒水茶饮', 0, 0, 2, 1),
	(18, '汤臣倍健健力多-关节营养素钙片', 46, 48, '20121531', 298, 178, '食品生鲜', '营养保健', 0, 0, 3, 1),
	(19, '愚哥鄱阳湖酒糟鱼7+7+7特卖组', 49, 51, '20123070', 129, 35, '食品生鲜', '休闲食品', 0, 0, 1, 1),
	(20, '（海）雪峰山原生态散养乌骨鸡', 52, 53, '20123216', 199, 0, '食品生鲜', '生鲜食品', 0, 0, 1, 0),
	(21, '鲜奢养生果茶超值组', 54, 54, '20122821', 298, 180, '食品生鲜', '酒水茶饮', 0, 0, 1, -1),
	(22, '（开仓）阿尔帝挪威三文鱼劲爆组', 55, 57, '20122533', 169, 119, '食品生鲜', '休闲食品', 0, 0, 1, 1),
	(23, '野山熊蜂蜜柚子茶秒杀组', 58, 58, '20123135', 99, 42, '食品生鲜', '酒水茶饮', 0, 0, 1, 1),
	(24, '原瓶进口天鹅超级波尔多', 59, 60, '20122971', 398, 230, '食品生鲜', '酒水茶饮', 0, 0, 1, 1),
	(25, '唯眠纺舒适乳胶床垫1.8米', 61, 62, '20121561', 1799, 924, '家电数码', '床品套件', 0, 0, 2, 1),
	(26, '（双11）西门子610升对开门无霜变频冰', 63, 66, '20121630', 6499, 445, '家电数码', '生活家电', 0, 0, 3, 1),
	(27, '奥克斯冷风空调扇夏日组惠', 67, 68, '20120891', 299, 164, '家电数码', '生活家电', 0, 0, 1, 1),
	(28, '（自）美的全自动煮多功能免过滤预约迷你家用智能豆浆机', 69, 73, '20122749', 359, 62, '家电数码', '厨房电器', 0, 0, 1, 1),
	(29, '（自）北欧欧慕（nathome）多功能电热锅电火锅家用电炒锅不粘锅4L', 74, 78, '20122708', 199, 68, '家电数码', '厨房电器', 0, 0, 1, 1),
	(30, '（周年庆）东芝55英寸智能网络LED电视（厂送）', 79, 79, '20121804', 2799, 239, '家电数码', '生活家电', 0, 0, 1, 1),
	(31, '（自）北欧欧慕（nathome）三明治机早餐机电饼铛吐司三文治机烤面包机帕尼尼机', 80, 84, '20122767', 199, 68, '家电数码', '厨房电器', 0, 0, 1, 1),
	(32, '（券）美的545L超大容积对开门冰箱', 85, 86, '20123074', 2999, 0, '家电数码', '大家电', 0, 0, 1, 1),
	(33, '西门子8公斤洗烘一体变频滚筒', 87, 90, '20121621', 1599, 0, '家电数码', '生活家电', 1, 0, 2, 0),
	(34, '普兰多泰国进口乳胶床垫1.8', 91, 92, '20120372', 1799, 1078, '布艺家纺', '床品套件', 0, 0, 0, 1),
	(35, '普兰多泰国进口乳胶床垫1.5米', 93, 95, '20120373', 1599, 958, '布艺家纺', '床品套件', 0, 0, 0, 1),
	(36, 'BOSSWAYCLUB超越时光多功能机', 96, 98, '20123090', 1680, 1149, '服装箱包', '配饰', 1, 0, 1, 1),
	(37, '祥云瑞气全自动黑檀木茶盘套组', 99, 99, '20121121', 998, 511, '家居用品', '餐饮用具\r\n', 1, 0, 1, 1),
	(38, '康乐美水洗冰丝凉席3+3特惠组', 100, 104, '20123112', 299, 104, '布艺家纺', '凉席', 0, 1, 2, 1),
	(39, '库思特交流变频落地扇', 105, 106, '20123029', 299, 129, '家电数码', '生活家电', 0, 1, 1, 1),
	(40, '小禾吸入式环保灭蚊灯1+1特惠', 107, 107, '20123219', 199, 137, '家电数码', '生活家电', 0, 1, 1, 1),
	(41, '可李司魔术折叠衣架欢乐组', 108, 109, '20123223', 199, 132, '家居用品', '清洁收纳', 0, 1, 1, 1),
	(42, '新西兰纽西小精灵蜂胶牙膏家庭组', 110, 110, '20123107', 298, 169, '个护美妆', '口腔护理', 0, 1, 1, 1),
	(43, 'ARSA120周年真钻纪念男表', 111, 111, '20121750', 2990, 2045, '服装箱包', '配饰', 2, 0, 1, 1),
	(44, '德国UKS-12L智能恒温热水器（天然气）', 112, 112, '20122933', 1280, 482, '家居用品', '卫浴健身', 2, 0, 1, 1),
	(45, '德国UKS-16L智能恒温热水器(天然气)', 113, 113, '20122934', 2380, 895, '家居用品', '卫浴健身', 2, 0, 1, 1),
	(47, 'skinlady多效精油皂臻享组', 117, 117, '20121230', 199, 137, '个护美妆', '全身护理', 0, 0, 0, 1),
	(48, '朗圣洁生物活性牙膏2+3特惠组', 41, 43, '20121694', 99, 50, '个护美妆', '口腔护理', 0, 0, 0, 1),
	(49, '赛伯特娇阳焗油染发膏特惠组', 118, 118, '20121454', 298, 202, '个护美妆', '美发护理', 1, 0, 1, 1),
	(50, '耶顿香爱懒人紧致腹膜组', 119, 119, '20123308', 299, 211, '个护美妆', '全身护理', 0, 0, 0, -1),
	(51, '歌丽姬宝美白祛斑素颜精华霜', 120, 121, '20123291', 299, 0, '个护美妆', '面部护理', 0, 0, 0, 1),
	(52, '藤井三位一体染发膏超值护理组', 122, 123, '20123226', 299, 206, '个护美妆', '美发护理', 0, 0, 0, 1),
	(53, '可贝尔水光蜗牛修护眼纹消眼贴膜', 124, 124, '20123139', 299, 221, '个护美妆', '口腔护理', 0, 0, 0, 1),
	(54, '美优美首乌生姜防脱养发洗护10件组', 125, 126, '20122295', 199, 137, '个护美妆', '美发护理', 0, 0, 0, 1),
	(55, '朗圣洁生物活性牙膏3+6特惠组', 127, 127, '20121013', 199, 154, '个护美妆', '口腔护理', 0, 0, 0, 1),
	(56, '脐美人排毒贴健康轻松组', 128, 129, '20123130', 299, 202, '个护美妆', '全身护理', 0, 0, 0, 1),
	(57, 'LACELLONI玻尿酸水光精华液', 130, 131, '20123335', 598, 438, '个护美妆', '面部护理', 0, 0, 0, 1),
	(58, '歌丽姬宝类蛇毒至尊臻钻精华霜', 132, 133, '20123094', 598, 466, '个护美妆', '面部护理', 0, 0, 0, 1),
	(59, '冰希黎女士香氛套组', 134, 135, '20121680', 199, 154, '个护美妆', '面部护理', 0, 0, 0, 1),
	(60, '康乐美水洗冰丝凉席3+3特惠组', 100, 104, '20123112', 299, 104, '布艺家纺', '凉席', 0, 0, 0, 1),
	(61, '（自）北欧欧慕（nathome）多功能电热锅电火锅家用电炒锅不粘锅4L', 74, 78, '20122708', 199, 68, '家电数码', '厨房电器', 0, 0, 0, 1),
	(62, '康乐美水洗冰丝凉席3+3特惠组', 100, 104, '20123112', 299, 104, '布艺家纺', '凉席', 0, 0, 0, 1),
	(63, '汤臣倍健健力多-关节营养素钙片', 46, 48, '20121531', 298, 178, '食品生鲜', '营养保健', 0, 0, 0, 1),
	(64, '美优美首乌生姜防脱养发洗护10件组', 125, 126, '20122295', 199, 137, '个护美妆', '美发护理', 0, 0, 0, 1),
	(65, '朗圣洁生物活性固齿修复牙膏升级组', 41, 43, '20117812', 199, 162, '个护美妆', '口腔护理', 0, 0, 0, -1),
	(66, '（双12）婵之云天然纤维素无钢圈立体聚拢内衣秒杀组\r\n', 15, 17, '20122080', 149, 0, '服装箱包', '女装', 0, 0, 1, 0),
	(67, '芷秀花漾雪纺衫阔腿裤套装4件\r\n', 13, 14, '20123086', 199, 102, '服装箱包', '女装', 0, 0, 0, -1),
	(68, '（自）美的全自动煮多功能免过滤预约迷你家用智能豆浆机', 69, 73, '20122749', 359, 62, '家电数码', '厨房电器', 0, 0, 0, 1),
	(69, '赛伯特娇阳焗油染发膏特惠组', 118, 118, '20121454', 298, 202, '个护美妆', '美发护理', 0, 0, 0, 1),
	(70, 'LACELLONI玻尿酸水光精华液', 130, 131, '20123335', 598, 438, '个护美妆', '面部护理', 1, 0, 1, 1),
	(71, '驴夫太极大物竿全家福套组4.5米', 137, 139, '20123904', 598, 310, '家居用品', '日用杂货', -1, 0, 1, 1),
	(72, '（双11）西门子484升变频混冷无霜多门冰箱', 140, 140, '20121881', 6299, 431, '家电数码', '生活家电', 0, 0, 0, 1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;


-- 导出  表 jialigou.prostatus 结构
DROP TABLE IF EXISTS `prostatus`;
CREATE TABLE IF NOT EXISTS `prostatus` (
  `username` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `proid` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `custatus` int(11) NOT NULL COMMENT '0 : 待付款，1：待发货 ，2：待收货，3：待评论'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- 正在导出表  jialigou.prostatus 的数据：~8 rows (大约)
/*!40000 ALTER TABLE `prostatus` DISABLE KEYS */;
REPLACE INTO `prostatus` (`username`, `proid`, `qty`, `custatus`) VALUES
	('1', 1, 2, 2),
	('1', 3, 1, 0),
	('1', 64, 1, 0),
	('1', 67, 1, 3),
	('1', 23, 1, 2),
	('1', 14, 2, 1),
	('1', 56, 1, 1),
	('1', 42, 1, 3);
/*!40000 ALTER TABLE `prostatus` ENABLE KEYS */;


-- 导出  表 jialigou.users 结构
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `idxid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_spanish_ci NOT NULL DEFAULT '0',
  `password` varchar(50) COLLATE utf8_spanish_ci NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '0：已删除 1：未删除',
  PRIMARY KEY (`idxid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- 正在导出表  jialigou.users 的数据：~8 rows (大约)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`idxid`, `username`, `password`, `status`) VALUES
	(1, '', '', 1),
	(2, '1', '1', 1),
	(3, '13420195931', 'a123456', 1),
	(4, '13420195932', 'a123456', 1),
	(5, '13412345678', 'a123456', 1),
	(6, '13712345678', 'a12345', 1),
	(7, '13333333333', 'a123456', 1),
	(8, '13420195933', 'a123456', 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
