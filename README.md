# yangjx-blocket-demo

## Desciption
yangjx-blocklet-demo of coding test

## Technology stack
Frontend：React
Backend：Node/Express
Database：nedb

## Requirements

- Node.js v12.x or above
- A running ABT Node instance on dev environment

## Getting Started

### 1. Install ABT Node

```shell
npm install -g @abtnode/cli
```

### 2. Get the Blocklet

```shell
git clone https://github.com/Baleen-Y/yangjx-blocket-demo.git
cd yangjx-blocket-demo
npm install # or yarn
```

### 3. Setup the node

```shell
abtnode init -f
abtnode start
```

> The ABT Node instance is stored under the `.abtnode` directory.


### 4. Deploy the Blocklet

```shell
npm run deploy
```

> The blocklet is bundled under the `.blocklet` directory

Then checkout the blocklet in your ABT Node Dashboard.