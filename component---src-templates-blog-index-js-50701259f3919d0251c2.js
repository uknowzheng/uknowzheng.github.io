(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{TshS:function(e,t,a){"use strict";a.r(t);var n=a("9Hrx"),r=a("q1tI"),l=a.n(r),o=a("Wbzz"),s=a("Bl7J"),c=a("vrFN"),i=a("p3AD"),p=(a("VYsE"),function(e){function t(){return e.apply(this,arguments)||this}return Object(n.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.data,a=e.pageContext,n=a.totalPage,r=a.currentPage,p=a.pageScore,m=t.site.siteMetadata,u=t.allMarkdownRemark.edges;return l.a.createElement(s.a,{location:this.props.location,siteMetadata:m},l.a.createElement(c.a,{title:"All posts"}),l.a.createElement("article",{style:{width:Object(i.a)(28),height:"100%"}},u.map((function(e){var t=e.node,a=t.frontmatter.title||t.fields.slug,n=t.frontmatter.dateStr;return l.a.createElement("div",{key:t.fields.slug},l.a.createElement("h3",{style:{marginTop:Object(i.a)(.5),marginBottom:Object(i.a)(1/4)}},l.a.createElement(o.a,{style:{boxShadow:"none"},to:"/post/"+n+t.fields.slug},a)),l.a.createElement("small",null,t.frontmatter.date))})),l.a.createElement("div",{className:"page"},r-1>0&&l.a.createElement(o.a,{to:r-1==1?"/":"/page/"+r-1,rel:"prev"},"上一页"),(p||[]).map((function(e){return l.a.createElement(o.a,{style:{color:e===r?"red":null},to:1===e?"/":"/page/"+e},e)})),r+1<=n&&l.a.createElement(o.a,{to:"/page/"+(r+1),rel:"next"},"下一页"))))},t}(l.a.Component));t.default=p},VYsE:function(e,t,a){}}]);
//# sourceMappingURL=component---src-templates-blog-index-js-50701259f3919d0251c2.js.map