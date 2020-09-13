---
title: Depth-first Search
author: Desmond
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

------



#### [城堡问题](http://bailian.openjudge.cn/practice/2815)

**思路**：

- 把方块看作是节点，相邻两个方块之间如果没有墙，则在方块之间连一条边，这样城堡就能转换成一个图。
- 求房间个数，实际上就是在求图中有多少个极大连通子图。
- 一个连通子图，往里头加任何一个图里的其他点，就会变得不连通，那么这个连通子图就是极大连通子图。
- 对每一个房间，深度优先搜索，从而给这个房间能够到达的所有位置染色。最后统计一共用了几种颜色，以及每种颜色的数量。

```c++
#include <iostream>
#include <stack>
#include <cstring>
using namespace std;

int r, c; // row and column
int room[60][60];
int color[60][60] = {0}; // 标记方块是否染过色
int maxRoomArea = 0, roomNum = 0;
int roomArea;

void dfs(int i, int k)
{
    if (color[i][k])
        return;
    
    roomArea++;
    color[i][k] = roomNum;

    if ((room[i][k] & 1) == 0)
        dfs(i, k - 1);
    if ((room[i][k] & 2) == 0)
        dfs(i - 1, k);
    if ((room[i][k] & 4) == 0)
        dfs(i, k + 1);
    if ((room[i][k] & 8) == 0)
        dfs(i + 1, k);
}

int main() 
{
    cin >> r >> c;

    for (int i = 1; i <= r; i++)
        for (int k = 1; k <= c; k++)
            cin >> room[i][k];
    
    for (int i = 1; i <= r; i++)
    {
        for (int k = 1; k <= c; k++)
        {
            if (!color[i][k])
            {
                roomNum++;
                roomArea = 0;
                dfs(i, k);
                maxRoomArea = max(roomArea, maxRoomArea);
            }
        }
    }

    cout << roomNum << endl;
    cout << maxRoomArea << endl;
}
```

------



#### [踩方格](http://bailian.openjudge.cn/practice/4103/)

**思路**：从 (i, j) 出发，走 n 步的方案数，等于以下三项之和：

- 从 (i+1, j) 出发，走 n-1 步的方案数。前提：(i+1, j) 还没走过
- 从(i, j+1) 出发，走 n-1 步的方案数。前提：(i, j+1) 还没走过
- 从 (i, j-1) 出发，走 n-1 步的方案数。前提：(i, j-1) 还没走过

```c++
#include <iostream>
#include <cstring>
using namespace std;

int visited[30][50] = {0};

int ways(int i, int j, int n)
{
    if (n == 0)
        return 1;
    
    visited[i][j] = 1;

    int num = 0;
    if (!visited[i][j - 1])
        num += ways(i, j - 1, n - 1);
    if (!visited[i][j + 1])
        num += ways(i, j + 1, n - 1);
    if (!visited[i + 1][j])
        num += ways(i + 1, j, n - 1);

    visited[i][j] = 0;

    return num;
}

int main()
{
    int n;
    cin >> n;
    
    cout << ways(0, 25, n) << endl;
}
```

------



#### [Roads](http://poj.org/problem?id=1724)

**思路**：从城市1开始深度优先遍历整个图，找到所有能到达 N 的走法， 选一个最优的。

**最优性剪枝**：

- 1）如果当前已经找到的最优路径长度为 L，那么在继续搜索的过程中，总长度已经大于等于 L 的走法，就可以直接放弃，不用走到底了
- 2）如果到达某个状态 A 时，发现前面曾经也到达过 A，且前面那次到达 A 所花代价更少，则剪枝。这要求保存到达状态 A 的到目前为止的最少代价。 **(保存中间计算结果用于最优性剪枝)**

```c++
#include <iostream> 
#include <vector> 
#include <cstring> 
using namespace std; 

int k, n, r;
int minLen = 1 << 30; // 当前找到的最优路径的长度
int totalLen; // 正在走的路径的长度
int totalCost; // 正在走的路径的花销
int visited[110] = {0}; // 标记城市是否已经走过
int minL[110][10100]; // minL[i][j]表示从1到i点的花销为j的最短路的长度

struct Road
{
    int d, l, t;
};

vector<vector<Road>> cityMap(110); // 邻接表 cityMap[i]为从点i有路连到的城市集合

void dfs(int s)
{
    if (s == n)
    {
        minLen = min(minLen, totalLen);
        return;
    }

    for (int i = 0; i < cityMap[s].size(); i++)
    {
        int d = cityMap[s][i].d; // s有路连到d
        if (!visited[d])
        {
            int cost = totalCost + cityMap[s][i].t;

            if (cost > k)
                continue;
            if (totalLen + cityMap[s][i].l >= minLen || totalLen + cityMap[s][i].l >= minL[d][cost])
                continue;
            
            totalLen += cityMap[s][i].l;
            totalCost += cityMap[s][i].t;
            minL[d][cost] = totalLen;
            visited[d] = 1;
            dfs(d);
            visited[d] = 0;
            totalCost -= cityMap[s][i].t;
            totalLen -= cityMap[s][i].l;
        }
    }
}

int main()
{
    cin >> k >> n >> r;

    for (int i = 0; i < r; i++)
    {
        int s;
        Road r;
        cin >> s >> r.d >> r.l >>r.t;

        if (s != r.d)
            cityMap[s].push_back(r);
    }

    for (int i = 0; i < 110; i++)
        for (int j = 0; j < 10100; j++)
            minL[i][j] = 1 << 30;
    
    totalLen = 0;
    totalCost = 0;
    visited[1] = 1;
    minLen = 1 << 30;

    dfs(1);

    if (minLen < (1 << 30))
        cout << minLen << endl;
    else
        cout << -1 << endl;
}
```

------



#### [生日蛋糕](http://poj.org/problem?id=1190)

**思路**：

- 从底层往上搭蛋糕，而不是从顶层往下搭。在同一层进行尝试的时候，半径和高度都是从大到小试
- **剪枝**：
  - 搭建过程中发现已建好的面积已经不小于目前求得的最优表面积，或者预见到搭完后面积一定会不小于目前最优表面积，则停止搭建**（最优性剪枝）**
  - 搭建过程中预见到再往上搭，高度已经无法安排，或者半径已经无法安排，则停止搭建**（可行性剪枝）**
  - 搭建过程中发现还没搭的那些层的体积，一定会超过还缺的体积，则停止搭建**（可行性剪枝）**
  - 搭建过程中发现还没搭的那些层的体积，最大也到不了还缺的体积，则停止搭建**（可行性剪枝）**

```c++
#include <iostream> 
#include <vector> 
#include <cstring> 
#include <cmath> 
using namespace std;

int N, M;
int minArea = 1 << 30; // 最优表面积
int area = 0; // 正在搭建中的蛋糕的表面积
int minV[30]; // minV[n]表示n层蛋糕最小的体积
int minA[30]; // minA[n]表示n层蛋糕的最小侧表面积

// 求在n层蛋糕, 底层最大半径r, 最高高度h的情况下, 能凑出来的最大体积
int maxVforNRH(int n, int r, int h)
{
    int v = 0;
    for (int i = 0; i < n; i++)
        v += (r - i) * (r - i) * (h - i);
    return v;
}

// 要用n层去凑体积v, 最底层半径不能超过r, 高度不能超过h
// 求出最小表面积放入minArea
void dfs(int v, int n, int r, int h)
{
    if (n == 0)
    {
        if (v)
            return;
        else
        {
            minArea = min(minArea, area);
            return;
        }
    }

    if (v <= 0)
        return;
    if (minV[n] > v)
        return; // 可行性剪枝
    if (area + minA[n] >= minArea)
        return; // 最优性剪枝
    if (h < n || r < n)
        return; // 可行性剪枝
    if (maxVforNRH(n, r, h) < v)
        return; // 可行性剪枝(最强)
    
    // 从大到小
    for (int rr = r; rr >= n; rr--)
    {
        if (n == M)
            area = rr * rr;

        for (int hh = h; hh >= n; hh--)
        {
            area += 2 * rr * hh;
            dfs(v - rr * rr * hh, n - 1, rr - 1, hh - 1);
            area -= 2 * rr * hh;
        }
    }
}

int main()
{
    cin >> N >> M;
    minV[0] = 0;
    minA[0] = 0;

    for (int i = 1; i <= M; i++)
    {
        minV[i] = minV[i - 1] + i * i * i;
        minA[i] = minA[i - 1] + 2 * i * i;
    }

    if (minV[M] > N)
        cout << 0 << endl;
    else
    {
        int maxH = (N - minV[M - 1]) / (M * M) + 1; // 最底层体积不超过 (N-minV[M-1]), 且半径至少M
        int maxR = sqrt(double(N - minV[M - 1]) / M) + 1; // 底层高度至少为M
        area = 0;
        minArea = 1 << 30;
        dfs(N, M, maxR, maxH);

        if (minArea == 1 << 30)
            cout << 0 << endl;
        else
            cout << minArea << endl;
    }
}
```

