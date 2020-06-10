## 1.补齐依赖
```
npm install
```
或者
```
yarn install
```
## 2.启动项目
```
npm start
```
或者
```
yarn start
```
react-router-dom 4.0路由集中式处理

这是一个用于集中式处理react路由的库,路由集中式管理,一切将会变得简单起来

在vue的过程中,路由采用统一的集中式管理,但是在react,路由比较分散,不易于管理,在很多时候还是需要集中式的管理路由,方便协作,此库基于react-traing官方进行再次封装处理

完整代码已经推在了github地址: https://github.com/ilovede123/react-router-config 

码云地址: https://gitee.com/d718781500/react-router-config 

npm地址: https://www.npmjs.com/package/qf-router-config 

使用

1.安装

    npm i qf-router-config
    或者使用yarn
    yarn add qf-router-config

本示例采用create-react-app创建项目 这里就不多介绍,以下是src文件夹下的目录



2.src文件结构

    │  index.js
    │  router.js
    │
    └─pages
            page.js
            page1.js
            page2.js
            page3.js

3.配置路由

你可以像配置vue路由一样配置你的react路由,就像这样 

src/router.js

    import React from "react";
    import Page from "./pages/page"
    import Page1 from "./pages/page1"
    import Page2 from "./pages/page2"
    import Page3 from "./pages/page3"
    const routes = [
        {
            path: "/page",
            component: Page
        },
        {
            path: "/page1",
            component: Page1,
            children: [
                {
                    path: "/page1/page2",
                    component: Page2,
                    children: [
                        {
                            path: "/page1/page2/page3",
                            component: () => import(/*webpackChunkName:"page3"*/"@/pages/page3")
                        }
                    ]
                }
            ]
        },
        {
            path: "/",
            redirect:"/page"
        }
    ];
    
    export default { routes }



4.引入配置

在src/index.js 引入配置文件router.js和库qf-router-config,像使用组件一样使用这个库

    import React from 'react';
    import ReactDOM from 'react-dom';
    import router from "./router"//引入路由配置
    import CompileRouter from "qf-router-config" //引入库
    // import { BrowserRouter as Router } from 'react-router-dom';
    // console.log(CompileRouter);
    ReactDOM.render(
        <CompileRouter {...router} /> ,//直接使用
        document.getElementById('root')
    );
    

5. 传递路由router配置

在使用的时候 把router传递下去 就像这样

      <CompileRouter {...router} /> ,//直接使用

6.路由嵌套

接下来 如果要实现路由的嵌套,比如 我在page1组件中嵌套了page2组件,那么需要在page1组件中,再次调用<CompileRouter/>组件 并且 将props传递下去就像这样

     <CompileRouter {...props} /> ,//直接使用

例子: page1组件

    import React from "react"
    import CompileRouter from "../compileRouter"
    function Page1(props) {
        console.log(props)
        return (
            <div>
                <h1>page1</h1>
                <CompileRouter {...props}/>
            </div>
        )
    }
    export default Page1

7.路由懒加载(异步组件 异步加载)

支持组件按需加载的方式,只需要在配置的时候,使用()=>import()这种方式引入组件即可,就像这样

    const routes = [
        {
            path: "/page",
            /*webpackChunkName:"page3"*/使用webpack的code-split功能,将模块分割,这样写是为了设置分割木块的名字
            component: ()=>import(/*webpackChunkName:"page3"*/ "@/pages3")
        }
        ]



以下是demo的文件其它代码



page.js 

    import React from "react"
    // import Router from "../router"
    function Page() { 
        console.log(999)
        return(
            <div>
                <h1>page</h1>
            </div>
        )
    }
    export default Page
    

page1.js

    import React from "react"
    import CompileRouter from "../compileRouter"
    function Page1(props) {
        console.log(props)
        return (
            <div>
                <h1>page1</h1>
                <CompileRouter {...props}/>
            </div>
        )
    }
    export default Page1
    

page2.js

    import React from "react"
    import CompileRouter from "../compileRouter"
    function Page2(props) {
        console.log(props)
        return (
            <div>
                <h1>page2</h1>
                <CompileRouter {...props} />
            </div>
        )
    }
    export default Page2
    

page3.js

    import React from "react"
    
    export default (props) => {
        return (
            <h1>page3</h1>
        )
    }
    

最后欢迎大家交流指正


