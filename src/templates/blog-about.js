import React from 'react';
import PageLayout from '../components/page-layout';
import ReactMarkdown from "react-markdown"
import './index.less';


export default ({data,location}) => {
  return (
    <PageLayout location={location}>
      <ReactMarkdown children={content} />
    </PageLayout>
  )
};

const content = `
# 关于我

## 英文名Uknowzheng
首先，Uknowzheng这个名字是来自T厂校招时无意间想到的名字，名为你懂得（U Known），慢慢的变成了属于自己的另外个名字，后来又沿用至今。


## 经历
作为一个校招进入T厂的幸运儿，程序员社畜，二次元技术宅，我的生活既充实又简单。走过了好几次跳槽（T厂/A厂/H厂/T厂）的经历，让我对自己有了更深层的审视，自己到底想要什么。比起无穷无尽的在日常需求开发，我还是希望能够分享一些自己的心得体会，能帮到一些人，或是博得赞许，都是有意义的。


## 文章分享计划
最后，关于对今后想分享的内容的一些想法，
- 第一，希望分享编程方面的知识，力求把门槛降低，让每个童鞋都能上手试一下，都能拥有自己个性化的网站，需要什么工具的时候也能自食其力；
- 第二，分享一年的工作生活总结，学到的一些道理；


## 个人标签
OK，内容说完了，接下来有几个很明确的个人标签，关于家乡，工作以及爱好之类的
- 汕尾陆丰（沿海城市/鱼米之乡）
- 幸运儿（毕业进大厂/摇中车牌/摇中房子）
- 技术宅（喜欢折腾很多技术）
- 游戏迷（7岁开始接触电脑游戏，从小到大保守玩过500种游戏）


## Talk is cheap, show me the code.
- WebSite: http://uknowzheng.github.io/
- Github: https://github.com/uknowzheng
- Wechat: unknownzheng
- Telegram: ProgramrUK


## 寄语 
你一定能够成为你想要去成为的人
`