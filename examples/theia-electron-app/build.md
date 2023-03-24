# build theia electron app

```bash 

nvm use v16.19.1

yarn

yarn --cwd examples/theia-electron-app build
yarn --cwd examples/theia-electron-app download:plugins
yarn --cwd examples/theia-electron-app package 
CXXFLAGS="--std=c++14" yarn --cwd examples/theia-electron-app package

```
