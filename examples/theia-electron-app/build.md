# build theia electron app

```bash 
yarn

yarn --cwd examples/theia-electron-app build
yarn --cwd examples/theia-electron-app download:plugins
yarn --cwd examples/theia-electron-app package 
CXXFLAGS="--std=c++14" yarn --cwd examples/theia-electron-app package

```
