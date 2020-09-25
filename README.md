# BiotaPhy SAGE2 App
[![Build Status](https://travis-ci.org/mielliott/biotaphy-sage2.svg?branch=master)](https://travis-ci.org/mielliott/biotaphy-sage2)
[![codecov](https://codecov.io/gh/mielliott/biotaphy-sage2/branch/master/graph/badge.svg)](https://codecov.io/gh/mielliott/biotaphy-sage2)

## Overview

![](resources/biotaphy-sage2-overview.png)

## Start developing
```bash
cd $SAGE2_HOME/public/uploads/apps
git clone git@github.com:mielliott/biotaphy-sage2.git
npm install
```

### Compile
```bash
./bundle.sh
```
To automatically build the app while making changes to the source code,
```bash
./watch.sh
```

## Set up tests
To enable testing in Visual Code,
1. Install `jest` globally
```bash
npm install -g jest
```
2. Install the `jest` plugin in vscode
3. Press CTRL-Shift-P to open the command console, then find "Jest: Start Runner"

![](resources/start-jest.png)

4. If there are green checks next to your test functions, all is well

![](resources/test-in-vscode.png)
