全程健康档案浏览器1.1.0

（INFR-DMP-HCR ）

概要设计说明书

+------------+----------+---------------------------+
| 文件状态： | 当前版本 | 1.1                       |
|            |          |                           |
| \[√\]草稿  |          |                           |
|            |          |                           |
| \[         |          |                           |
| \]正式发布 |          |                           |
|            |          |                           |
| \[         |          |                           |
| \]正在修改 |          |                           |
|            +----------+---------------------------+
|            | 作 者    | 向国柱                    |
|            +----------+---------------------------+
|            | 审 批    |                           |
+------------+----------+---------------------------+

**修订记录**

  ----------- -------------- ------------ ------------ ---------------------------------
   **日期**    **修订版本**   **修改人**   **核定人**            **修订内容**

   2023-8-11      0.0.1                       张淅                   新建

   2026-8-19      0.0.2         向国柱                             增量修改

                                                       

                                                       
  ----------- -------------- ------------ ------------ ---------------------------------

目录

[1. 引言 [2](#引言)](#引言)

[1.1 编写目的 [2](#编写目的)](#编写目的)

[1.2 项目背景 [2](#项目背景)](#项目背景)

[1.3 适用范围 [2](#适用范围)](#适用范围)

[2. 系统设计概述 [2](#系统设计概述)](#系统设计概述)

[2.1 目标 [2](#目标)](#目标)

[2.2 运行环境 [2](#运行环境)](#运行环境)

[2.3 限制和约束 [2](#限制和约束)](#限制和约束)

[3. 总体设计 [3](#总体设计)](#总体设计)

[3.1 总体结构 [3](#总体结构)](#总体结构)

[3.2 处理流程 [3](#项目包图)](#项目包图)

[3.3 三方对接 [3](#三方对接)](#三方对接)

[3.4 模块设计 [3](#模块设计)](#模块设计)

[3.5 模块类图 [5](#_Toc153180745)](#_Toc153180745)

[3.6 接口设计 [5](#接口设计)](#接口设计)

[3.7 数据结构设计 [5](#数据结构设计)](#数据结构设计)

[3.8 错误处理设计 [8](#_Toc153180748)](#_Toc153180748)

[3.9 技术架构图 [8](#技术架构图)](#技术架构图)

#  引言

## 编写目的

本文档的编写目的在于明确阐述全程健康档案浏览器软件的新功能和设计的核心宗旨和目标，为项目的各方利益相关者提供清晰的指导，确保对设计方向和原则的共识，并为后续开发阶段打下坚实的基础。

## 项目背景

随着医疗改革的深入，政府在推动医疗信息化、健康管理等领域的发展，而随着医疗信息化的发展，个人的健康信息被电子化管理，为我们基于电子化健康医疗的服务应用开发提供了数据基础。随着公众健康意识的提高，使得人们越来越需要全面、长期、个性化的健康管理服务。全程健康档案浏览器项目能够满足公众对于自身健康信息的全面了解和管理的需求**。**

。

## 适用范围

系统名称：全程健康档案浏览器

系统实现功能：登录注册、用户实名认证、个人设置、隐私权限设置、家庭成员绑定
、档案信息调阅、调阅记录、健康摘要、报告AI解读、慢病专项管理、重点人群健康管理、健康教育、预防接种

# 系统设计概述

## 目标

通过将居民的健康档案数据统一采集，实现区域卫生信息资源的互通，为每位社区居民形成一份完整的个人健康档案。居民用户可以从平台调阅区内各在社区卫生服务中心的个人健康档案信息。

## 运行环境

单服务硬件要求：最佳4核16G，最低2核6G

环境要求：centos7/openeuler22.03，jdk8

## 限制和约束

技术限制：全程健康档案浏览器依赖短信服务和实名认证服务，认证和发送短信会产生费用。

# 总体设计

## 总体结构

下图为全程健康档案浏览器1.0.0总体结构：

![](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image2.png){width="6.488888888888889in"
height="4.097916666666666in"}

## 技术架构图

全程健康档案浏览器1.1.0技术体系架构可归纳为下图

![全程健康档案技术架构图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image3.png){width="6.495138888888889in"
height="8.0375in"}

## 项目包图

![](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image4.png){width="6.03125in"
height="7.375in"}

## 处理流程

用户登录与身份认证流程：

1\. 打开 App，进入登录页，输入手机号。

2\. 获取并输入短信验证码，提交登录请求。

3\. 系统校验验证码；校验失败则提示重新获取/输入（可重试）。

4\. 校验通过后，判断是否首次登录：

\- \*\*首次登录\*\*：进入实名认证页，填写姓名 +
身份证号；系统校验通过后建立/绑定本人健康档案（含家庭医生签约信息），登录成功进入首页。

\- \*\*非首次登录\*\*：直接登录成功进入首页。

4.  首页默认以\*\*本人视角\*\*展示：顶部显示本人姓名、出生日期、身份证号（脱敏）、建档单位、签约状态；中部为档案数据入口卡片（就医记录、检查检验报告、用药记录、公共服务等）。

家庭成员添加与切换流程：

1\. 进入「个人中心 →
家庭成员管理」，查看已添加成员列表与剩余可添加名额。

2\. 点击「添加成员」，填写成员身份信息并提交申请。

3\. 系统校验成员关系（户主/血缘关系）并向目标成员发起授权确认：

\- \*\*对方未确认\*\*：保留申请记录，待对方确认。

\- \*\*对方已确认且已登录\*\*：建立家庭成员授权关系，成员出现在列表。

4\. 在首页点击「切换」，弹出已添加成员列表，选择目标成员。

5\. 系统校验成员关系与授权状态：

\- \*\*无授权/授权已失效\*\*：提示无权限，需先重新获得成员授权。

\-
\*\*有授权\*\*：切换成功，首页/档案/报告/随访数据全部刷新为所选成员视角。

6\. 使用完毕可切换回本人视角。

隐私权限管理流程：

医域边界（机构级屏蔽）

1\. 进入「医域边界设置」页。

2\. 从医疗机构列表中选择不允许查看本人档案的机构（可多选）。

3\.
已选机构将无法调阅本人任何健康档案数据（诊疗记录、检验报告、随访记录等全部数据）。

4\. 支持「清除 / 重置 / 保存」；保存后即时生效。

隐私保险箱（模块级屏蔽）

1\.
进入「隐私保险箱」页，选择目标业务模块（门诊记录、检验检查、体检报告、慢病随访、健康摘要等）。

2\. 选择屏蔽方式（三选一）：

\- \*\*不屏蔽\*\*：该模块数据正常展示。

\- \*\*全部屏蔽\*\*：该模块全部数据对外不可见。

\-
\*\*部分屏蔽\*\*：进入「选择屏蔽数据」页，可按时间筛选（全部/近半年/近一年/近三年/自定义区间），支持「全选当前筛选结果」或逐条勾选具体数据。

3\. 确认屏蔽并保存；保存后对应数据对医务人员不可见。

调阅安全锁（密码验证）

1\. 进入「调阅安全锁」页，点击「开启调阅安全锁」。

2\. 设置 6 位数字密码并二次确认（两次不一致时提示重新输入）。

3\. 开启后，他人调阅本人档案时需输入密码验证，验证通过方可查看。

访问即时通（短信通知）

1\. 进入「访问即时通」页，开启「短信通知」开关。

2\.
开启后，他人调阅本人档案时系统实时发送短信（预览示例：调阅机构、调阅医生、调阅内容、时间）。

3\.
页面展示近期调阅通知列表（机构、医生、调阅内容、时间），可追溯访问记录。

个人档案调阅：用户完成注册和实名认证之后，即可调阅个人档案。

![个人档案调阅时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image5.png){width="6.475in"
height="3.422222222222222in"}

调阅他人档案：提供调阅密码或者取得授权之后，即可调阅他人档案。

![他人档案调阅时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image6.png){width="6.475in"
height="5.1125in"}

## 三方对接

三方系统集成本服务需要提供三方系统中用户的手机姓名和身份证号即可。接口见3.4接口设计。

## 接口设计

本系统中所涉及到的接口，主要是第三方的访问平台时的总入口，当请求通过总入口进入平台系统后，根据请求参数，对请求鉴权、转发等最终到达目标服务

  ----------- ---------------------------------------------------------------
  功能说明    三方微信小程序集成档案浏览器登录接口

  访问格式    http://xxx.xxx.xxx.xxx:port/hcr/#/wx/tripartiteLogin

  请求方式    post

  访问示例1   http://192.168.124.164:6130/hcr/#/wx/tripartiteLogin
  ----------- ---------------------------------------------------------------

  -------------- ---------------- -------------- -------------- --------------
  参数           参数名称         数据类型       约束           说明

  js_code        小程序登录代码   String         必填           

  phone_num      手机号           String         必填           

  identity_num   身份证号         String         必填           

  user_name      姓名             String         必填           
  -------------- ---------------- -------------- -------------- --------------

# **模块设计**

本节将会对全程健康档案浏览器1.1.0模块功能进说明，列出模块的大概功能以及模块间的关系

1.  诊疗服务

诊疗服务模块包括检查报告、检验报告、门诊记录、住院记录、用药记录。用户可以自由查看所选时间范围内的报告信息。

  -------------- --------------------------------------------------------------------------------------------------------------------
      模块名                                                             功能

     检查报告                                     可查看用户在多个机构的检查报告信息和检查报告详情。

     检验报告                 可查看用户在多个机构的检检验报告信息和检验报告详情。可以通过点击某一项指标查看该指标趋势。

     门诊记录                   查看用户多个机构的门诊记录，点击单一门诊记录查看该门诊记录所包含的检验检查用药等信息。

     住院记录                   查看用户多个机构的住院记录，点击单一住院记录查看该门诊记录所包含的检验检查用药等信息。

     用药记录                                               可查看用户多个机构的发药记录。

     病案首页                    查看用户多个机构的门急诊病案首页，展示就诊基本信息、诊断信息、手术操作及医疗费用等。

    AI报告解读    基于检查报告和检验报告，通过AI智能生成深度解读报告，支持关键指标提取、异常项预警、健康建议以及与历史报告对比分析。
  -------------- --------------------------------------------------------------------------------------------------------------------

整体时序图

![检查记录与就医时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image7.png){width="6.471527777777778in"
height="7.276388888888889in"}

检查报告与检验报告的AI报告解读（AI生成的报告存库，便于之后的AI报告查看，减少token消耗）

AI报告解读流程图

![AI报告流程图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image8.png){width="2.76875in"
height="10.11736111111111in"}

AI报告解读时序图

![AI报告时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image9.png){width="6.478472222222222in"
height="4.251388888888889in"}

2.  公共卫生

公共卫生模块包括用户健康档案、健康体检、高血压管理、糖尿病管理、中医管理、糖尿病管理、儿童管理、妇女保健、慢阻肺、高危管理、肿瘤管理、心脑血管、老年人自理能力评估、健康教育、预防接种。用户可自行查看相关数据。

  -------------------- --------------------------------------------------------------------------------------------------------------------
         模块名                                                                功能

        居民档案               健康档案展示用户基本信息和健康信息。居民信息包括姓名住址等详细信息等。健康信息包括身高体重过敏史等。

        健康体检                  健康体检包括用户多个机构的体检记录和体检记录详细。可查看记录有无异常，各项指标是否正常等功能。

       高血压管理                                            高血压管理展示用户高血压情况和随访记录。

        中医管理                                 中医管理展示用户中医治疗记录，包括中医保健指导和体质辨识报告等。

       糖尿病管理                                          糖尿病管理展示用户糖尿病信息和对应随访记录。

        儿童管理                                                     儿童健康档案以及儿保记录

        妇女保健                                                      孕产妇建档以及产检记录

         慢阻肺         展示用户慢阻肺专项档案及随访记录，包括确诊信息、危险因素、肺功能等辅助检查结果，以及随访分类、控制情况和干预建议。

         肺结核                            展示用户肺结核首次入户访视及随访记录，包括服药率、症状表现、不良反应等信息。

        高危管理             展示用户高血压、糖尿病等高危人群专项档案及随访记录，包括高危异常指标、体征检查、生活方式指导与随访结果。

        肿瘤管理                      展示用户肿瘤专项档案及随访记录，包括肿瘤分期、诊断与治疗信息、卡氏评分及随访指导内容。

        心脑血管                     展示用户心脑血管评估结果及随访记录，包括心脑血管分级、危险因素、体征检查与随访干预意见。

   老年人自理能力评估         基于健康体检数据，展示老年人健康状态自我评估、生活自理能力评估、认知功能初筛与情感状态初筛等评估结果。

        健康教育                      展示用户健康教育记录，包括干预方式、干预地点、干预医生、健康教育处方与健康指导意见等。

        预防接种                   展示用户疫苗接种记录，包括疫苗名称、接种剂次、接种单位、接种部位、疫苗批号与生产企业等信息。
  -------------------- --------------------------------------------------------------------------------------------------------------------

公卫模块查询时序图

![公卫时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image10.png){width="6.458333333333333in"
height="6.361805555555556in"}

3.  消息管理

消息管理包含调阅消息和系统消息

  -------------- --------------------------------------------------------
      模块名                               功能

     调阅消息         展示三方或家庭成员对当前用户健康档案的调阅记录

     系统消息             展示系统消息，包括家庭成员绑定等消息。
  -------------- --------------------------------------------------------

调阅消息时序图

![档案调阅消息时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image11.png){width="6.471527777777778in"
height="4.585416666666666in"}

系统消息时序图

![系统消息时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image12.png){width="6.483333333333333in"
height="5.375in"}

4.  个人管理

个人管理模块包括家庭成员管理、我的健康档案、我的健康监测、隐私权限设置。

  -------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      模块名                                                                                                               功能

   家庭成员管理                                                                                 用户可添加家庭成员，添加之后可查看对应家庭成员的健康档案。

   我的健康档案                                                                                              展示当前用户的健康档案基本信息。

   我的健康监测                                                                                           展示当前用户近期血压血糖心率测量信息。

   隐私权限管理   允许用户对个人健康档案进行隐私管理，配置各业务模块是否对三方展示，包括医域边界（屏蔽指定医疗机构）、隐私保险箱（按模块屏蔽诊疗业务数据）、调阅安全锁（调阅档案需密码验证）、访问即时通（档案被调阅时实时短信通知）等。

     健康摘要                                                           基于个人健康档案，AI自动生成居民健康综合分析报告，包括主要健康问题、异常检查指标、潜在疾病风险与健康建议。
  -------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  家庭成员管理

家庭成员切换流程图

![家庭成员切换流程](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image13.png){width="4.0777777777777775in"
height="10.104166666666666in"}

家庭成员切换流程图

![家庭成员切换时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image14.png){width="6.486805555555556in"
height="4.924305555555556in"}

2.  隐私权限管理

流程图

![mermaid-diagram-2026-08-20-154321](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image15.png){width="6.479861111111111in"
height="6.414583333333334in"}

时序图

![mermaid-diagram-2026-08-20-155322](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image16.png){width="6.48125in"
height="7.101388888888889in"}

隐私保险箱具体流程

![隐私保险箱流程图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image17.png){width="6.4847222222222225in"
height="9.18125in"}

5.  用户管理

用户管理模块包括用户登录注册，密码重置等功能。

  -------------- --------------------------------------------------------
      模块名                               功能

     登录注册              登录验证包括短信认证实名认证等功能。

     密码重置                   重置密码和忘记密码等功能。
  -------------- --------------------------------------------------------

用户登录流程

![](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image18.jpeg){width="4.257638888888889in"
height="8.332638888888889in"}

![](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image19.png){width="4.833333333333333in"
height="9.736805555555556in"}

用户注册

![](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image20.jpeg){width="4.811805555555556in"
height="6.884722222222222in"}

实名认证

![](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image21.jpeg){width="3.825in"
height="9.924305555555556in"}

**修改密码**

![](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image22.jpeg){width="4.625in"
height="9.279166666666667in"}

6.  []{#_Toc153180745 .anchor}扫码功能

5.1.6.1 档案分享

用户选定特定的档案生成相关的分享二维码，其他人用微信扫这个二维码即可查看相应档案信息

流程图

![档案分享流程图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image23.png){width="3.9930555555555554in"
height="10.115972222222222in"}

时序图

![档案分享时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image24.png){width="6.492361111111111in"
height="8.479861111111111in"}

5.1.6.2 扫码确认

医生查看患者档案时生成二维码，手机微信扫码确认

流程图

![微信扫码确认](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image25.png){width="5.276388888888889in"
height="10.113194444444444in"}

时序图

![微信扫码时序图](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image26.png){width="6.479861111111111in"
height="9.984722222222222in"}

## 模块类图

![](d:\AI_Project\Longitudinal-health-record\merge_docs\c_media/media/image27.png){width="6.483333333333333in"
height="5.7625in"}

# **数据结构设计**

健康体检检验记录 ：TB_JKTJ_JKTJJYJL

  ------------- -------------------- ---------------- -----------
     字段名          数据元名称       数据类型及格式   长度精度

   CJKTJJYJLID   健康体检检验记录ID      NVARCHAR         36

     CTJJGDM        体检机构代码         NVARCHAR         30

    CSJBSFLX       数据标识符类型        NVARCHAR          2

     CSJBSH          数据标识号          NVARCHAR         50

   CJKTJJBXXID   健康体检基本信息ID      NVARCHAR         36

    CJCXMDLBM     检测项目大类编码       NVARCHAR         20

    CJCXMDLMC     检测项目大类名称       NVARCHAR         50

    CJCEXMBM        检测项目编码         NVARCHAR         32

     CJCXMBM        检查项目编码         NVARCHAR         32

     CJCZBBM        检测指标编码         NVARCHAR         20

     CJCZBMC        检测指标名称         NVARCHAR         100

      CJCFF           检测方法           NVARCHAR         32

      DBGRQ           报告日期             DATE       

     CJCZBJG        检测指标结果         NVARCHAR         128

      CJLDW           计量单位           NVARCHAR         20

     CCKZFW          参考值范围          NVARCHAR         128

      CYCTS           异常提示           NVARCHAR          2

     CJCRBM          检测人编码          NVARCHAR         36

     CJCRXM          检测人姓名          NVARCHAR         50

     CSHRBM          审核人编码          NVARCHAR         36

     CSHRXM          审核人姓名          NVARCHAR         50

       IXH              序号               INT        

    DSJYWSCSJ     数据业务生成时间       DATETIME     

     CLRRBM          录入人编码          NVARCHAR         36

     CLRRXM          录入人姓名          NVARCHAR         50

     DSJCJSJ        数据创建时间         DATETIME     

     DSJZLSJ        数据增量时间         DATETIME     

     CYWSYID         业务索引ID          NVARCHAR         200

      CMJDM           密级代码           NVARCHAR          8

      BSJZT           数据状态             BIT        

     CSJCJPC        数据采集批次         NVARCHAR         50

    DTSJCJSJ        数据采集时间         DATETIME     

    DTSJGXSJ        数据更新时间         DATETIME     

    CSJCJDQDM     数据采集地区代码       NVARCHAR         20

    CSJCJJGMC     数据采集机构名称       NVARCHAR         70
  ------------- -------------------- ---------------- -----------

健康体检基本信息表：TB_JKTJ_JKTJJBXX

  ------------------ -------------------------------- ---------------- -----------
        字段名                  数据元名称             数据类型及格式   长度精度

       CTJJGDM                 体检机构代码               NVARCHAR         30

     CJKTJJBXXID            健康体检基本信息ID            NVARCHAR         36

       CGRDABSF               个人档案标识符              NVARCHAR         36

        CBSFLX                  标识符类型                NVARCHAR         16

        CTJBH                    体检编号                 NVARCHAR         20

       CZJLXBM                 证件类型编码               NVARCHAR          2

       CZJLXMC                 证件类型名称               NVARCHAR         20

        CZJHM                    证件号码                 NVARCHAR         18

         CXM                       姓名                   NVARCHAR         50

        DTJRQ                    体检日期                   DATE       

       CZRYSBM                 责任医师编码               NVARCHAR         36

       CZRYSXM                 责任医师姓名               NVARCHAR         50

        CZZBM                    症状编码                 NVARCHAR         100

        CZZMC                    症状名称                 NVARCHAR         255

       CQTZZNR                 其它症状内容               NVARCHAR         500

         NTW                       体温                   DECIMAL          4,1

         IML                       脉率                     INT        

        IHXPL                    呼吸频率                   INT        

        IZSSY                    左收缩压                   INT        

        IZSZY                    左舒张压                   INT        

        IYSSY                    右收缩压                   INT        

        IYSZY                    右舒张压                   INT        

         NSG                       身高                   DECIMAL          5,1

         NTZ                       体重                   DECIMAL          5,1

        NMBTZ                    目标体重                 DECIMAL          5,1

         NYW                       腰围                   DECIMAL          5,1

        NTZZS                    体质指数                 DECIMAL          5,2

        NTW_A                      臀围                   DECIMAL          5,1

        NYTWBZ                  腰臀围比值                DECIMAL          4,2

    CLNRJKZTZWPGBM      老年人健康状态自我评估编码        NVARCHAR          2

    CLNRJKZTZWPGMC      老年人健康状态自我评估名称        NVARCHAR         10

    CLNRSHZLNLPGBM      老年人生活自理能力评估编码        NVARCHAR          2

   CLNRSHZLNLPGJGMC   老年人生活自理能力评估结果名称      NVARCHAR         10

    CLNRRZGNCSJGBM      老年人认知功能初筛结果编码        NVARCHAR         30

    CLNRRZGNCSJGMC      老年人认知功能初筛结果名称        NVARCHAR         10

      ILNRZLSCPF            老年人智力筛查评分              INT        

    CLNRQGZTCSJGBM      老年人情感状态初筛结果编码        NVARCHAR         30

    CLNRQGZTCSJGMC      老年人情感状态粗筛结果名称        NVARCHAR         10

       ILNRYYPF               老年人抑郁评分                INT        

       CDLPLBM                 锻炼频率编码               NVARCHAR          2

       CDLPLMC                 锻炼频率名称               NVARCHAR         50

       IMCDLSJ                 每次锻炼时间                 INT        

       NJCDLSJ                 坚持锻炼时间               DECIMAL          5,0

       CDLFSSM                 锻炼方式说明               NVARCHAR         200

       CYSXGBM                 饮食习惯编码               NVARCHAR         16

       CYSXGMC                 饮食习惯名称               NVARCHAR         50

       CXYZKBM                 吸烟状况编码               NVARCHAR          2

       CXYZKMC                 吸烟状况名称               NVARCHAR         20

        IRXYL                    日吸烟量                 NUMERIC           5

       IKSXYNL                 开始吸烟年龄                 INT        

        IJYNL                    戒烟年龄                   INT        

       CYJPLBM                 饮酒频率编码               NVARCHAR          2

       CYJPLMC                 饮酒频率名称               NVARCHAR          4

        IRYJL                    日饮酒量                 NUMERIC          ,1

       CJJQKBM                 戒酒情况编码                 BIT        

       CJJQKMC                 戒酒情况名称               NVARCHAR         20

        IJJNL                    戒酒年龄                   INT        

       IKSYJNLS              开始饮酒年龄(岁)               INT        
  ------------------ -------------------------------- ---------------- -----------

居民拓展信息表：TB_GRDA_JMTZXXB

  -------------- ------------------------------ ---------------- -----------
      字段名               数据元名称            数据类型及格式   长度精度

     CGRDABSF            个人档案标识符             NVARCHAR         36

      CBSFLX               标识符类型               NVARCHAR         16

   CYLFYZFFSBM        医疗费用支付方式编码          NVARCHAR         20

   CYLFYZFFSMC        医疗费用支付方式名称          NVARCHAR         90

   CYLFYZFQTMC        医疗费用支付其他名称          NVARCHAR         255

     CYWGMSBM            药物过敏史编码             NVARCHAR         50

     CYWGMSMC            药物过敏史名称             NVARCHAR         255

    CYWGMSQTMC         药物过敏史其他名称           NVARCHAR         255

      CBLSBM               暴露史编码               NVARCHAR         50

      CBLSMC               暴露史名称               NVARCHAR         255

      BSSSBZ               手术史标志                 BIT        

      BWSSBZ               外伤史标志                 BIT        

      BSXSBZ               输血史标志                 BIT        

    CFQJZSJBBM         父亲家族史疾病代码           NVARCHAR         50

    CFQJZSJBMC         父亲家族史疾病名称           NVARCHAR         255

   CFQJZSJBQTMC      父亲家族史疾病其他名称         NVARCHAR         255

    CMQJZSJBBM         母亲家族史疾病代码           NVARCHAR         50

    CMQJZSJBMC         母亲家族史疾病名称           NVARCHAR         255

   CMQJZSJBQTMC      母亲家族史疾病其他名称         NVARCHAR         255

    CXMJZSJBBM         兄妹家族史疾病代码           NVARCHAR         50

    CXMJZSJBMC         兄妹家族史疾病名称           NVARCHAR         255

   CXMJZSJBQTMC      兄妹家族史疾病其他名称         NVARCHAR         255

    CZNJZSJBBM         子女家族史疾病代码           NVARCHAR         50

    CZNJZSJBMC         子女家族史疾病名称           NVARCHAR         255

   CZNJZSJBQTMC      子女家族史疾病其他名称         NVARCHAR         255

     BYCBSBZ              遗传病史标志                BIT        

     CYCBSMC              遗传病史名称              NVARCHAR         100

    BCFPFSSBZ           厨房排风设施标志              BIT        

    CCFPFSSBM           厨房排风设施代码            NVARCHAR          2

    CCFPFSSMC           厨房排风设施名称            NVARCHAR         50

     CRLLXBM              燃料类型代码              NVARCHAR          2

     CRLLXMC              燃料类型名称              NVARCHAR         50

      CYSBM                 饮水代码                NVARCHAR          2

      CYSMC                 饮水名称                NVARCHAR         50

      CCSBM                 厕所代码                NVARCHAR          2

      CCSMC                 厕所名称                NVARCHAR         20

      CQXLBM               禽畜栏代码               NVARCHAR          2

      CQXLMC               禽畜栏名称               NVARCHAR         50

       CNHH                  农合号                 NVARCHAR         20

      CYLKH                 医疗卡号                NVARCHAR         50

      CYLBXH               医疗保险号               NVARCHAR         50

     CJTDABH              家庭档案编号              NVARCHAR         17

      CXXKSM             健康信息卡说明             NVARCHAR         200

    CMXBHBQKBM    健康信息卡慢性病患病情况编码      NVARCHAR         10

    CMXBHBQKMC    健康信息卡慢性病患病情况名称      NVARCHAR         30

    CMXBHBQKQT    健康信息卡慢性病患病情况其他      NVARCHAR         255

       CGMS             健康信息卡过敏史            NVARCHAR         300

     DSJCJSJ              数据创建时间              DATETIME     

     CCJJGDM              创建机构代码              NVARCHAR         36

     CCJJGMC              创建机构名称              NVARCHAR         70

      CLRRBM               录入人编码               NVARCHAR         36

      CLRRXM               录入人姓名               NVARCHAR         50

     DSJZLSJ              数据增量时间              DATETIME     

      CMJDM                 密级代码                NVARCHAR          8

      BSJZT                 数据状态                  BIT        

     CSJCJPC              数据采集批次              NVARCHAR         50

     DTSJCJSJ             数据采集时间              DATETIME     

     DTSJGXSJ             数据更新时间              DATETIME     

    CSJCJDQDM           数据采集地区代码            NVARCHAR         20

    CSJCJJGMC           数据采集机构名称            NVARCHAR         70
  -------------- ------------------------------ ---------------- -----------

高血压评估基本信息：TB_MBGL_GXYPGJBXX

  ------------- ---------------------- ---------------- -----------
     字段名           数据元名称        数据类型及格式   长度精度

    CGXYPGID         高血压评估ID          NVARCHAR         32

    CGXYZXID       高血压档案信息ID        NVARCHAR         32

    CSJBSFLX        数据标识符类型         NVARCHAR          2

     CSJBSH           数据标识号           NVARCHAR         50

      ISSY              收缩压               INT        

      ISZY              舒张压               INT        

   CXXGBWXYSBM   心血管病危险因素代码      NVARCHAR         32

   CXXGBWXYSMC   心血管病危险因素名称      NVARCHAR         255

    CBQGSHBM        靶器官损害代码         NVARCHAR         32

    CBQGSHMC        靶器官损害名称         NVARCHAR         255

    CSFTNBBM        是否糖尿病代码         NVARCHAR          2

    CSFTNBMC        是否糖尿病名称         NVARCHAR         10

     CXTQKBM         血糖情况代码          NVARCHAR         30

     CXTQKMC         血糖情况名称          NVARCHAR         150

    CNXGBMSBM      脑血管病描述代码        NVARCHAR         30

    CNXGBMSMC      脑血管病描述名称        NVARCHAR         150

      BXZB             是否心脏              BIT        

    CXZBMSBM        心脏病描述代码         NVARCHAR         30

    CXZBMSMC        心脏病描述名称         NVARCHAR         150

      BSZB            是否肾脏病             BIT        

    CSZBMSBM        肾脏病描述代码         NVARCHAR         30

    CSZBMSMC        肾脏病描述名称         NVARCHAR         150

     BZWXGB         是否周围血管病           BIT        

   CZWXGBMSBM     周围血管病描述代码       NVARCHAR         30

   CZWXGBMSMC     周围血管病描述名称       NVARCHAR         150

     BSWMBB         是否视网膜病变           BIT        

   CSWMBBMSBM     视网膜病变描述代码       NVARCHAR         30

   CSWMBBMSMC     视网膜病变描述名称       NVARCHAR         150

     BXTQKQT     是否存在其他血糖情况        BIT        

    CXTQKQTMS      其他血糖情况描述        NVARCHAR         100

    CXYFJJGBM      血压分级结果代码        NVARCHAR          2

    CXYFJJGMC      血压分级结果名称        NVARCHAR         50

    CWXFCJGBM      危险分层结果代码        NVARCHAR          2

    CFJGLJGMC      分级管理结果名称        NVARCHAR         50

     CJYXGBM         降压效果代码          NVARCHAR          2

     CJYXGMC         降压效果名称          NVARCHAR         50

     CZTPJBM         总体评价代码          NVARCHAR          2

     CZTPJMC         总体评价名称          NVARCHAR         50

     CPGYSID         评估医生编码          NVARCHAR         32

     CPGYSMC         评估医生姓名          NVARCHAR         50

      DPGRQ            评估日期              DATE       

       IZT               状态                INT        

      CZXYY            注销原因            NVARCHAR         300

      BNXGB          是否脑血管病            BIT        

    CFJGLJGBM      分级管理结果代码        NVARCHAR          2

    CWXFCJGMC      危险分级结果名称        NVARCHAR         50

     DSJCJSJ         数据创建时间          DATETIME     

     CCJJGDM         创建机构代码          NVARCHAR         36

     CCJJGMC         创建机构名称          NVARCHAR         70

     CLRRBM           录入人编码           NVARCHAR         36

     CLRRXM           录入人姓名           NVARCHAR         50

     DSJZLSJ         数据增量时间          DATETIME     

     CYWSYID          业务索引ID           NVARCHAR         200

      CMJDM            密级代码            NVARCHAR          8

      BSJZT            数据状态              BIT        

     CSJCJPC         数据采集批次          NVARCHAR         50

    DTSJCJSJ         数据采集时间          DATETIME     

    DTSJGXSJ         数据更新时间          DATETIME     

    CSJCJDQDM      数据采集地区代码        NVARCHAR         20

    CSJCJJGMC      数据采集机构名称        NVARCHAR         70
  ------------- ---------------------- ---------------- -----------

高血压随访信息：TB_MBGL_GXYSFXX

  ----------------- ------------------------------ ---------------- -----------
       字段名                 数据元名称            数据类型及格式   长度精度

     CGXYSFXXID            高血压随访信息ID            NVARCHAR         36

       CYLJGDM               医疗机构代码              NVARCHAR         30

      CGXYDAID               高血压档案ID              NVARCHAR         36

      CSJBSFLX              数据标识符类型             NVARCHAR          2

       CSJBSH                 数据标识号               NVARCHAR         50

        DSFSJ                  随访时间                DATETIME     

       CSFFSBM               随访方式编码              NVARCHAR          2

       CSFFSMC               随访方式名称              NVARCHAR         20

       CSFZTBM               随访状态编码              NVARCHAR          2

       CSFZTMC               随访状态名称              NVARCHAR         20

       DSFYYSJ          失访原因/死亡原因时间          DATETIME     

        CSFYY             失访原因/死亡原因            NVARCHAR         200

        CZZBM                  症状编码                NVARCHAR         200

        CZZMC                  症状名称                NVARCHAR         255

       CQTZZMC               其它症状名称              NVARCHAR         255

        ISSY                    收缩压                   INT        

        ISZY                    舒张压                   INT        

     IWFYXYSPSSY         未服药血压水平收缩压            INT        

         NTZ                     体重                  DECIMAL          5,1

        NMBTZ                  目标体重                DECIMAL          5,1

         NSG                     身高                  DECIMAL          5,1

        NTZZS                  体质指数                DECIMAL          5,2

      BZBDMBDBZ            足背动脉搏动标志              BIT        

     CZBDMBDBZBM         足背动脉搏动标志编码          NVARCHAR          2

     CZBDMBDBZMC         足背动脉搏动标志名称          NVARCHAR         20

        CQTTZ                  其他体征                NVARCHAR         100

       NMBTZZS               目标体质指数              DECIMAL          5,2

         IXL                     心率                    INT        

       CQTYXTZ               其他阳性体征              NVARCHAR         100

       NZDGCZ                 总胆固醇值               DECIMAL          5,1

       NGYSZZ                 甘油三酯值               DECIMAL          5,1

   NXQDMDZDBDGCJCZ   血清低密度脂蛋白胆固醇检测值      DECIMAL          5,1

        IRXYL                  日吸烟量                  INT        

       IMBRXYL               目标日吸烟量                INT        

        IRYJL                  日饮酒量                  INT        

       IMBRYJL               目标日饮酒量                INT        

        IYDZC                  运动周次                  INT        

        IYDSC                  运动时长                  INT        

       IMBYDZC               目标运动周次                INT        

       IMBYDSC               目标运动时长                INT        

       CXLDZBM               心理调整编码              NVARCHAR          2

       CXLDZMC               心理调整名称              NVARCHAR         10

      CSYLQKBM              摄盐量情况编码             NVARCHAR          2

      CSYLQKMC              摄盐量情况名称             NVARCHAR         10

     CMBSYLQKBM           目标摄盐量情况编码           NVARCHAR          2

     CMBSYLQKMC           目标摄盐量情况名称           NVARCHAR         10

    CSFZYXWPJJGBM      随访遵医行为评价结果编码        NVARCHAR         30

    CSFZYXWPJJGMC      随访遵医行为评价结果名称        NVARCHAR         50

       DFZJCRQ               辅助检查日期                DATE       

       CFZJCJG               辅助检查结果              NVARCHAR         200

         NYW                     腰围                  DECIMAL          5,1

       NYSJYYW               医生建议腰围              DECIMAL          5,1

       IYSJYXL               医生建议心率                INT        

    CMQFYWZLCSBM        目前非药物治疗措施编码         NVARCHAR         30

    CMQFYWZLCSMC        目前非药物治疗措施名称         NVARCHAR         100

      BYWBLFYBM            药物不良反应编码              BIT        

      CYWBLFYMS            药物不良反应描述            NVARCHAR         100

      CFYYCXBM              服药依从性编码             NVARCHAR          2

      CFYYCXMC              服药依从性名称             NVARCHAR         10

      CCCSFFLBM            此次随访分类编码            NVARCHAR          2

      CCCSFFLMC            此次随访分类名称            NVARCHAR         20

        CZZYY                  转诊原因                NVARCHAR         200

       CZZKSDM               转诊科室代码              NVARCHAR         36

       CZZKSMC               转诊科室名称              NVARCHAR         50

       CZRJGDM               转入机构代码              NVARCHAR         36

       CZRJGMC               转入机构名称              NVARCHAR         70

       CSFYSBM               随访医师编码              NVARCHAR         36

       CSFYSXM               随访医师姓名              NVARCHAR         50

       CSFTDBM               随访团队编码              NVARCHAR         36

       CSFTDMC               随访团队名称              NVARCHAR         50

       DXCSFSJ               下次随访时间              DATETIME     

       CCJJGDM               创建机构代码              NVARCHAR         36

       CCJJGMC               创建机构名称              NVARCHAR         70

       DSJCJSJ               数据创建时间              DATETIME     

       DSJZLSJ               数据增量时间              DATETIME     

       CYWSYID                业务索引ID               nvarchar         200

         IZT                     状态                    INT        

        CMJDM                  密级代码                NVARCHAR          8

        BSJZT                  数据状态                  BIT        

       CSJCJPC               数据采集批次              NVARCHAR         50

      DTSJCJSJ               数据采集时间              DATETIME     

      DTSJGXSJ               数据更新时间              DATETIME     

      CSJCJDQDM            数据采集地区代码            NVARCHAR         20

      CSJCJJGMC            数据采集机构名称            NVARCHAR         70

      CGXYSFLSH            高血压随访流水号            NVARCHAR         100

       CZZYYBM               转诊原因编码              NVARCHAR         100

       CZZYYMC               转诊原因名称              NVARCHAR         20
  ----------------- ------------------------------ ---------------- -----------

糖尿病评估基本信息：TB_MBGL_TNBPGJBXX

  ----------- ------------------ ---------------- -----------
    字段名        数据元名称      数据类型及格式   长度精度

   CTNBPGID      糖尿病评估ID        NVARCHAR         32

   CTNBZXID    糖尿病档案信息ID      NVARCHAR         32

   CSJBSFLX     数据标识符类型       NVARCHAR          2

    CSJBSH        数据标识号         NVARCHAR         50

    CKFXTBM      空腹血糖代码        NVARCHAR          2

    CKFXTMC      空腹血糖名称        NVARCHAR         10

    CCHXTBM      餐后血糖代码        NVARCHAR          2

    CCHXTMC      餐后血糖名称        NVARCHAR         10

   CTHXHDBBM   糖化血红蛋白代码      NVARCHAR          2

   CTHXHDBMC   糖化血红蛋白名称      NVARCHAR         10

    CXYPJBM      血压评价代码        NVARCHAR          2

    CXYPJMC      血压评价名称        NVARCHAR         10

   CBMIPJBM      BMI评价代码         NVARCHAR          2

   CBMIPJMC      BMI评价名称         NVARCHAR         10

    CZDGCBM      总胆固醇代码        NVARCHAR          2

    CZDGCMC      总胆固醇名称        NVARCHAR         10

   CGMDDGCBM   高密度胆固醇代码      NVARCHAR          2

   CGMDDGCMC   高密度胆固醇名称      NVARCHAR         10

   CDMDDGCBM   低密度胆固醇代码      NVARCHAR          2

   CDMDDGCMC   低密度胆固醇名称      NVARCHAR         10

     CXYBM         吸烟代码          NVARCHAR          2

     CXYMC         吸烟名称          NVARCHAR         10

     CYJBM         饮酒代码          NVARCHAR          2

     CYJMC         饮酒名称          NVARCHAR         10

    CTYDLBM      体育锻炼代码        NVARCHAR          2

    CTYDLMC      体育锻炼名称        NVARCHAR         10

   CSYSRLBM     食盐摄入量代码       NVARCHAR          2

   CSYSRLMC     食盐摄入量名称       NVARCHAR         10

    CZYXWBM      遵医行为代码        NVARCHAR          2

    CZYXWMC      遵医行为名称        NVARCHAR         10

     CYSBM         饮食代码          NVARCHAR          2

     CYSMC         饮食名称          NVARCHAR         10

    CXLZTBM      心理状态代码        NVARCHAR          2

    CXLZTMC      心理状态名称        NVARCHAR         10

    CGLCDBM      管理程度代码        NVARCHAR          2

    CGLCDMC      管理程度名称        NVARCHAR         10

    CJTXGBM      降糖效果代码        NVARCHAR          2

    CJTXGMC      降糖效果名称        NVARCHAR         30

    CZTPJBM      总体评价代码        NVARCHAR          2

    CZTPJMC      总体评价名称        NVARCHAR         10

    CPGYSID      评估医生编码        NVARCHAR         32

    CPGYSMC      评估医生姓名        NVARCHAR         50

     DPGRQ         评估日期            DATE       

      IZT            状态              INT        

     CZXYY         注销原因          NVARCHAR         100

    DSJCJSJ      数据创建时间        DATETIME     

    CCJJGDM      创建机构代码        NVARCHAR         36

    CCJJGMC      创建机构名称        NVARCHAR         70

    CLRRBM        录入人编码         NVARCHAR         36

    CLRRXM        录入人姓名         NVARCHAR         50

    DSJZLSJ      数据增量时间        DATETIME     

    CYWSYID       业务索引ID         NVARCHAR         200

     CMJDM         密级代码          NVARCHAR          8

     BSJZT         数据状态            BIT        

    CSJCJPC      数据采集批次        NVARCHAR         50

   DTSJCJSJ      数据采集时间        DATETIME     

   DTSJGXSJ      数据更新时间        DATETIME     

   CSJCJDQDM   数据采集地区代码      NVARCHAR         20

   CSJCJJGMC   数据采集机构名称      NVARCHAR         70
  ----------- ------------------ ---------------- -----------

糖尿病随访信息：TB_MBGL_TNBSF

  ----------------- ------------------------------ ---------------- -----------
       字段名                 数据元名称            数据类型及格式   长度精度

       CGLJGDM               管理机构代码              NVARCHAR         30

     CTNBSFXXID            糖尿病随访信息ID            NVARCHAR         36

     CTNBDAXXID            糖尿病档案信息ID            NVARCHAR         36

      CGRDABSF              个人档案标识符             NVARCHAR         36

       CBSFLX                 标识符类型               NVARCHAR         16

        DSFSJ                  随访时间                  DATE       

       CSFFSBM               随访方式编码              NVARCHAR          2

       CSFFSMC               随访方式名称              NVARCHAR         20

       CSFZTBM               随访状态编码              NVARCHAR          2

       CSFZTMC               随访状态名称              NVARCHAR         20

     DSFSJ_SWSJ           失访时间/死亡时间              DATE       

     CSFYY_SWYY           失访原因/死亡原因            NVARCHAR         200

        CZZBM                  症状编码                NVARCHAR         200

        CZZMC                  症状名称                NVARCHAR         255

       CQTZZNR               其它症状内容              NVARCHAR         255

     CZBDMBDBWDM         足背动脉搏动部位代码          NVARCHAR         10

     CZBDMBDBWMC         足背动脉搏动部位名称          NVARCHAR         20

      CDXTFYBM              低血糖反应编码             NVARCHAR          2

      CDXTFYMC              低血糖反应名称             NVARCHAR         20

     CTNBJZSBZBM         糖尿病家族史标志编码          NVARCHAR          1

     CTNBJZSBZMC         糖尿病家族史标志名称          NVARCHAR         10

       BGLHDBZ               规律活动标志                BIT        

      CGLHDZLBM            规律活动种类编码            NVARCHAR          1

      CGLHDZLMC            规律活动种类名称            NVARCHAR         100

       CYDPLDM               运动频率代码              NVARCHAR          2

       CYDPLMC               运动频率名称              NVARCHAR         20

      CMBYDPLDM            目标运动频率代码            NVARCHAR          2

      CMBYDPLMC            目标运动频率名称            NVARCHAR         20

        IYDZC                  运动周次                  INT        

        IYDSC                  运动时长                  INT        

       IMBYDZC               目标运动周次                INT        

       IMBYDSC               目标运动时长                INT        

         NSG                     身高                  DECIMAL          5,1

         NTZ                     体重                  DECIMAL          5,2

        NMBTZ                  目标体重                DECIMAL          5,1

        NTZZS                  体质指数                DECIMAL         18,2

       NMBTZZS               目标体质指数              DECIMAL         18,2

        IRZSL                  日主食量                  INT        

       IMBRZSL               目标日主食量                INT        

       CYSQKBM               饮食情况编码              NVARCHAR          2

       CYSQKMC               饮食情况名称              NVARCHAR         10

        ISSY                    收缩压                   INT        

        ISZY                    舒张压                   INT        

        CQTTZ                  其他体征                NVARCHAR         500

         NYW                     腰围                  DECIMAL          5,1

         NTW                     臀围                  DECIMAL          5,1

        NYTB                    腰臀比                 DECIMAL          4,2

       CQTYXTZ               其他阳性体征              NVARCHAR         100

        IRXYL                  日吸烟量                  INT        

       IMBRXYL               目标日吸烟量                INT        

        IRYJL                  日饮酒量                  INT        

       IMBRYJL               目标日饮酒量                INT        

       CTZQTMS               体征其他描述              NVARCHAR         200

       CXLDZBM               心理调整编码              NVARCHAR          2

       CXLDZMC               心理调整名称              NVARCHAR         10

       CZYXWBM               遵医行为编码              NVARCHAR          2

       CZYXWMC               遵医行为名称              NVARCHAR         10

       NKFXTZ                 空腹血糖值               DECIMAL          5,2

     CKFXTCLFSDM         空腹血糖测量方式代码          NVARCHAR          1

     CKFXTCLFSMC         空腹血糖测量方式名称          NVARCHAR         20

       NSJXTZ                 随机血糖值               DECIMAL          4,1

     CSJXTCLFSBM         随机血糖测量方式编码          NVARCHAR          1

     CSJXTCLFSMC         随机血糖测量方式名称          NVARCHAR         20

       NTNLCSZ               糖耐量测试值              DECIMAL          4,1

    CTNLXTCLFSDM        糖耐量血糖测量方式代码         NVARCHAR          1

    CTNLXTCLFSMC        糖耐量血糖测量方式名称         NVARCHAR         20

       NCHXTZ              餐后2小时血糖值             DECIMAL          4,1

     CCHXTCLFSDM      餐后2小时血糖测量方式代码        NVARCHAR          1

     CCHXTCLFSMC      餐后2小时血糖测量方式名称        NVARCHAR         20

      NTHXHDBZ              糖化血红蛋白值             DECIMAL          4,1

       NZDGCZ                 总胆固醇值               DECIMAL          5,2

   NXQGMDZDBDGCJCZ   血清高密度脂蛋白胆固醇检测值      DECIMAL          5,2

   NXQDMDZDBDGCJCZ   血清低密度脂蛋白胆固醇检测值      DECIMAL          5,2

       NGYSZZ                 甘油三酯值               DECIMAL          3,1

     NNWLBDB_NJG         尿微量白蛋白/尿肌酐           DECIMAL          5,1

      NNDBDLJCZ            尿蛋白定量检测值            DECIMAL          5,1

       DFZJCRQ               辅助检查日期                DATE       

       CFZJCJG               辅助检查结果              NVARCHAR         100

      CFYYCXBM              服药依从性编码             NVARCHAR          2

      CFYYCXMC              服药依从性名称             NVARCHAR         10

      BYWBLFYBZ            药物不良反应标志              BIT        

      CYWBLFYMS            药物不良反应描述            NVARCHAR         100

      CCCSFFLBM            此次随访分类编码            NVARCHAR          2

      CCCSFFLMC            此次随访分类名称            NVARCHAR         20

      CYDSZLBM              胰岛素种类编码             NVARCHAR          2

      CYDSZLMC              胰岛素种类名称             NVARCHAR         50

      CYDSYFYL              胰岛素用法用量             NVARCHAR         100

        BZZBZ                  转诊标志                  BIT        

       CZZYYMS               转诊原因描述              NVARCHAR         200

       CZZKSDM               转诊科室代码              NVARCHAR         36

       CZZKSMC               转诊科室名称              NVARCHAR         50

       CZRJGDM               转入机构代码              NVARCHAR         36

       CZRJGMC               转入机构名称              NVARCHAR         70

       CSFJYDM               随访建议代码              NVARCHAR         20

       CSFJYMC               随访建议名称              NVARCHAR         100

       CSFYSBM               随访医师编码              NVARCHAR         36

       CSFYSXM               随访医师姓名              NVARCHAR         50

       CZRYSBM               责任医生编码              NVARCHAR         36

       CZRYSXM               责任医生姓名              NVARCHAR         50

       CSFKSDM               随访科室代码              NVARCHAR         36

       CSFKSMC               随访科室名称              NVARCHAR         50

       CSFTDDM               随访团队代码              NVARCHAR         36

       CSFTDMC               随访团队名称              NVARCHAR         50

      CSFYLJGDM            随访医疗机构代码            NVARCHAR         36

      CSFYLJGMC            随访医疗机构名称            NVARCHAR         70

       DXCSFSJ               下次随访时间              DATETIME     

       DSJCJSJ               数据创建时间              DATETIME     

       CCJJGDM               创建机构代码              NVARCHAR         36

       CCJJGMC               创建机构名称              NVARCHAR         70

       CLRRBM                 录入人编码               NVARCHAR         36

       CLRRXM                 录入人姓名               NVARCHAR         50

       DSJZLSJ               数据增量时间              DATETIME     

       CYWSYID                业务索引ID               nvarchar         200

        CMJDM                  密级代码                NVARCHAR          8

        BSJZT                  数据状态                  BIT        

       CSJCJPC               数据采集批次              NVARCHAR         50

      DTSJCJSJ               数据采集时间              DATETIME     

      DTSJGXSJ               数据更新时间              DATETIME     

      CSJCJDQDM            数据采集地区代码            NVARCHAR         20

      CSJCJJGMC            数据采集机构名称            NVARCHAR         70

         IZT                     状态                    INT        

        CZXYY                  注销原因                NVARCHAR         100

      CTNBSFLSH            糖尿病随访流水号            NVARCHAR         100

       CZZYYBM               转诊原因编码              NVARCHAR         20

       CZZYYMC               转诊原因名称              NVARCHAR         100

       CYDSSPM              胰岛素商品没名             NVARCHAR         100
  ----------------- ------------------------------ ---------------- -----------

# 异常设计

本节对系统运行过程中可能出现的异常及处理机制进行说明，保证系统在异常情况下能够正确处理并记录问题。

异常分类：系统异常分为业务异常、系统异常和第三方接口异常三类。业务异常指因业务规则校验不通过产生的异常，如验证码错误、调阅密码错误、实名认证失败等，系统将向用户返回明确的错误提示；系统异常指程序运行过程中产生的异常，如数据库连接失败、服务不可用等，系统将记录错误日志并返回统一的错误信息；第三方接口异常指调用短信服务、实名认证服务等外部接口时产生的异常，系统将进行重试，重试失败后给出相应提示。

处理机制：系统对异常进行统一捕获与处理，所有异常均记录日志，包括异常发生时间、异常类型、异常信息、堆栈信息及请求参数等，便于问题定位与追溯；涉及数据变更的业务操作采用事务机制，操作失败时自动回滚，保证数据一致性；调阅授权、隐私权限等关键操作失败时，同步返回调用方并给出提示。

# 维护设计

系统在系统检查与维护方面，采用日志模块记录系统运行过程状态以及出现的问题。

系统外部接口调用前后都要进行日志的详细记录，方便接口调试；系统中重要的状态信息的变化都要通过日志记录下来，方便查问题时还原现场，推断程序运行过程；系统入口与出口记录输入与输出，方便定位问题；任何业务异常都进行日志详细记录；日志记录要求清晰准确，能够通过日志准确定位系统问题。

系统输出调试日志一定程度上会影响到系统运行效率，出于系统性能考虑，默认情况下，日志级别设为"ERROR"，调试信息不会输出。当需要输出调试信息时，开发人员手工修改系统配置文件中的日志级别为"DEBUG"，从而获取相关调试信息
