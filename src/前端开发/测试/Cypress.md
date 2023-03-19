# 1.安装配置

在项目根目录下通过命令安装 `npm install cypress --save-dev --foreground-scripts` (*由于安装Cypress比较慢，
添加`--foreground-scripts`这个参数可以比较清楚地看到当前下载进度*)。

在下载Cypress的过程中会遇到长时间下载不下来的问题。 可以先把安装包下载下来，然后通过离线的方式安装。

1. 下载[对应版本的Cypress安装包](https://download.cypress.io/desktop.json)
2.
离线方式安装Cypress，`CYPRESS_INSTALL_BINARY=~/Downloads/cypress.zip npm install cypress --save-dev --foreground-scripts`
