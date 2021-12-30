module.exports = {
    base: '/luo_study/',
    /* 基础虚拟路径 */
    // dest: 'docs/dist', /* 打包文件基础路径, 在命令所在目录下 */
    title: '前端学习', // 标题
    description: '学习记录', // 标题下的描述
    themeConfig: {
        // logo: '/assets/img/logo.png',
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        // repo: "godbasin/vuepress-demo",
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        // repoLabel: "Github",
        // 假如你的文档仓库和项目本身不在一个仓库：
        // docsRepo: 'vuejs/vuepress',
        // 假如文档不是放在仓库的根目录下：
        // 这里我们是放置在docs下的
        // docsDir: "docs",
        // 假如文档放在一个特定的分支下：
        // 这里我们放在一个叫sourcecode的分支下，因为master需要用来放置生成的静态文件
        // docsBranch: "sourcecode",
        // 顶部导航配置
        nav: [
            { text: "概述", link: "/" },
            { text: "基础学习文档", link: "/basic/" },
            { text: "Vue学习文档", link: "/vue/" },
            // { text: '被删的个人博客', link: 'https://godbasin.github.io/', target: '_self', rel: '' },
            { text: '被删的个人博客', link: 'https://godbasin.github.io/' },
            { text: '被删的前端游乐场', link: 'http://www.godbasin.com/' },
            // 我们也可以添加FAQ的
            { text: 'FAQ', link: '/faq' },
            { text: 'Gitee', link: 'https://gitee.com/dong-cheng/luo_study' }
        ],
        // 左侧导航菜单配置
        sidebar: {
            "/basic/": [
                
                {
                    title: "基础学习之html", // 菜单名
                    collapsable: true, // 是否支持折叠菜单
                    children: [
                        "/basic/html/html.md",
                        "/basic/html/HTML+CSS.md"
                    ]
                },
                {
                    title: "基础学习之css", // 菜单名
                    collapsable: true, // 是否支持折叠菜单
                    children: [
                        "/basic/css/居中和BFC.md",
                        "/basic/css/动画.md", 
                        "/basic/css/圣杯与双飞翼布局.md", 
                        "/basic/css/媒体查询.md", 
                        "/basic/css/flex.md"
                    ]
                },
                {
                    title: "基础学习之javascript", // 菜单名
                    collapsable: true, // 是否支持折叠菜单
                    children: [
                        "/basic/javascript/数据类型.md",
                         "/basic/javascript/理解对象.md",
                         "/basic/javascript/原型与继承.md",
                         "/basic/javascript/函数进阶.md",
                         "/basic/javascript/类.md"
                        ]
                },
                {
                    title: 'TypeScript快速上手',
                    collapsable: true,
                    children: [{
                            title: '初识 TypeScript', // 标题
                            children: [ // 下级列表
                                '/basic/typescript/chapter1/01_初识TS',
                                '/basic/typescript/chapter1/02_安装TS',
                                '/basic/typescript/chapter1/03_HelloWorld',
                                '/basic/typescript/chapter1/04_webpack打包',
                            ]
                        },
                        {
                            title: 'TypeScript 常用语法',
                            children: [
                                '/basic/typescript/chapter2/1_type',
                                '/basic/typescript/chapter2/2_interface',
                                '/basic/typescript/chapter2/3_class',
                                '/basic/typescript/chapter2/4_function',
                                '/basic/typescript/chapter2/5_generic',
                                '/basic/typescript/chapter2/6_other',
                            ]
                        },
                        {
                            title:"TypeScript学习笔记",
                            children:[
                                '/basic/typescript/typescript学习/01 typescript简介.md',
                                '/basic/typescript/typescript学习/02 typescript基础入门.md',
                                '/basic/typescript/typescript学习/03 typescript面向对象.md',
                            ]
                        }
                    ]
                },
            ],
            "/vue/":[
              {
                title: "Vue2文档", // 菜单名
                collapsable: true, // 是否支持折叠菜单
                children: [ "/vue/vue2/vue01.md","/vue/vue2/vue02.md","/vue/vue2/vue项目学习.md",]
              },
              {
                title: "Vue3文档", // 菜单名
                collapsable: true, // 是否支持折叠菜单
                children: [ "/vue/vue3/vue3基础.md","/vue/vue3/vee-validate使用.md","/vue/vue3/vue3新特性.md",]
              },
            ],
            "/other/":[
              {
                title: "项目复杂场景", // 菜单名
                collapsable: true, // 是否支持折叠菜单
                children: [ "/other/project/project.md",]
              },
              {
                title: "项目发布部署", // 菜单名
                collapsable: true, // 是否支持折叠菜单
                children: [ "/other/ecs/vue项目部署.md",]
              }
            ],
        }
    },
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./public/images/favicon.ico` }]
    ]
}