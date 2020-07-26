---
title: Depth-first Search
author: Desmond
iframe: 'http://huangxuan.me/js-module-7day/'
catalog: true
abbrlink: 7bb877cf
date: 2020-07-26 23:02:01
header-img: 7bb877cf/head.jpg
tags: Algorithm
categories:
top:
---

## 深度优先搜索 DFS

------



### 定义

从起点出发，走过的点要做标记，发现有没走过的点，就随意挑一个往前走，走不了就回退，此种路径搜索策略就称为 “深度优先搜索”，简称 “深搜”。

其实称为 “远度优先搜索” 更容易理解些。因为这种策略能往前走一步就往前走一 步，总是试图走得更远。所谓远近 (或深度），就是以距离起点的步数来衡量的。



### 在图上寻找最优（步数最少）路径

```c++
Node bestPath[MAX_LEN];
Node path[MAX_LEN]; // MAX_LEN 节点总数
int minSteps = INFINITE; // 最优路径步数
int depth;

void dfs(Node n) {
    
    if (n为终点) {
        path[depth] = n;
        if (depth < minSteps) {
            minSteps = depth;
            拷贝path到bestPath;
        }
        return;
    }
    
    if (n为旧点)
        return;
    
    if (depth >= minSteps)
        return; // 最优性剪枝
    
    将n标记为旧点;
    path[depth] = n;
    depth++;
    
    对和v相邻的每个节点nn
        dfs(nn);
    
    将n恢复为新点;
    depth--;
    
}

int main() {
    
    将所有点都标记为新点;
    depth = 0;
    dfs(起点);
    
    if (minSteps != INFINITE) {
        for (int i = 0; i <= minSteps; i++)
            cout << bestPath[i] << endl;
    }
}
```



### 图的表示方法 [邻接表]

每个节点 n 对应一个一维数组 (vector)，里面存放从 n 连出去的边，边的信息包括另一顶点，还可能包含边权值等。

![](7bb877cf/dfs.png)