::: hljs-center

## 华农C语言互助平台*v1.0* 

:::
### 首页
![01.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153474252460701.jpg)
### 说明
&nbsp;&nbsp;之前有好些朋友问过我C语言的一些问题，我才意识到除了计算机系的同学需要学习`C语言`外，还有很多专业的同学都需要学习`C语言`，`C语言`似乎是学校里一门必修课程，这门课程对于计算机系的同学而言是相对简单的，但对其他专业的同学可能不太友善。所以建立了这样一个平台，欢迎大家的提问、分享、解疑和互动!

### 使用

- #### 上机题库
&nbsp;&nbsp; 管理员会在后台编辑OJ系统`高级程序设计语言(c语言)`的每一道题，并且都会注上一份答案和详细的解答过程，如果你还不能理解参考答案，你可以在文章下方评论，会有很多同学帮助你理解。如果你有更好的解法，也可以在评论中留言。如果编辑有误的，也希望你能向管理员反馈一下，方便管理员修改。

- #### 分享
&nbsp;&nbsp; 你可以编辑分享一些关于C语言的知识，来帮助更多的同学。管理员也会根据文章的质量来置顶一些优秀文章。

- #### 问答
&nbsp;&nbsp; 如果有不懂的问题，你可以在问答部分提问，会有热心的同学来帮助你解答的。

- #### 反馈
&nbsp;&nbsp; 系统可能不太完善，发现问题时可以向管理员反馈。希望增加新功能的也可以向管理员反馈。

- #### 个人信息
&nbsp;&nbsp; 记住帐号密码是件麻烦的事情，所以系统没有额外设计自身的用户模块，个人基础信息来自[易班网](http://www.yiban.cn/)

### 部分截图(其他截图看**screenshot**)
![01_gaitubao_com_560x418.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153577921561401_gaitubao_com_560x418.jpg)![02_gaitubao_com_560x418.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153577924338102_gaitubao_com_560x418.jpg)
![06_gaitubao_com_256x468.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153577941787506_gaitubao_com_256x468.jpg)![12_gaitubao_com_256x468.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153577960661512_gaitubao_com_256x468.jpg)![08_gaitubao_com_256x468.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153577952655408_gaitubao_com_256x468.jpg)![09_gaitubao_com_256x468.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153577957761009_gaitubao_com_256x468.jpg)![10_gaitubao_com_256x468.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153577953953210_gaitubao_com_256x468.jpg)![07_gaitubao_com_256x468.jpg](http://ctiku.oss-cn-shenzhen.aliyuncs.com/153577942989207_gaitubao_com_256x468.jpg)

### 系统设计
`华农C语言互助平台` 按照RESTFUL接口规范,实现前后端完全分离
 - 前端使用[Vue框架](https://cn.vuejs.org/v2/guide/),UI选用了[ElementUi](http://element-cn.eleme.io/#/zh-CN/component/installation)，编辑器选择了[mavon-editor](https://github.com/hinesboy/mavonEditor)，做了响应式布局，适配部分手机
 - 开发时使用[Mock](http://mockjs.com/) 和 [Easy-mock](https://www.easy-mock.com/)模拟数据
 - 后端使用[egg框架](https://eggjs.org/zh-cn/intro/) + [mongoose](https://mongoosejs.com/docs/api.html),图片储存使用了阿里的[OSS](https://oss.console.aliyun.com/overview)
 - 第一次设计这样的系统，花了10来天编写前后端代码,还有很多不完善的地方，不足之处还请谅解
 - 待文档整理好后，再详细说明系统设计
 

### 后期系统的设想
- 增强和完善系统的功能，完善系统文档
- 开发相应的微信小程序，或者写个APP，更方便大家的使用
- 如果有好玩的想法，也可以向我反馈下

### 补充
**static** 文件储存的相关资源是为`PWA`服务的

### 协议
MIT