### Typescript 实现短域名服务（细节可以百度/谷歌）

撰写两个API接口

- 短域名存储接口：接受长域名信息，返回短域名信息
- 短域名读取接口：接受短域名信息，返回长域名信息。

限制：

- 短域名长度最大为8个字符

递交作业内容

1. 源代码 （已提交）
2. 单元测试代码以及单元测试覆盖率（http接口通过postman及前端页面调通，服务部分由http的请求来调用测试）
3. API集成测试案例以及测试结果 （做了页面来请求，已调通，本想部署在互联网上，域名没有备案，提供不了服务，截图了一下）
4.简单的框架设计图，以及所有做的假设（short_url.ts提供接口，主要包括四个接口：列表、长短转换、跳转，database.ts提供数据库操作及长短域名转换；  简单框架设计图请见附件流程图，主要转换思路为通过数据库插入数据的id进行进制转换，进而得到短域名）
5. 涉及的SQL或者NoSQL的Schema，注意标注出Primary key 和Index 如果有。（该数据库做了shorturl及fullurl的对应，其中shorturl设置了index）

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for url_object
-- ----------------------------
DROP TABLE IF EXISTS `url_object`;
CREATE TABLE `url_object`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shorturl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `fullurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `shortindex`(`shorturl`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;


