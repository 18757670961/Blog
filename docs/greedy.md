---
title: Greedy Algorithm
author: Desmond
tags: Algorithm
abbrlink: 9adfc48b
date: 2020-07-26 22:32:03
header-img: 9adfc48b/head.jpg
categories:
top:
catalog: true
---

## 贪心算法 Greedy Algorithm

------

### 定义

选取当前状态下的最优解，不考虑对后续决策的影响 (局部最优解 -> 全局最优解)

### 最优贪婪算法的基本性质

- **贪婪选择性质**
  
  局部最优解的选择不依赖于后续决策，通过迭代进行贪婪选择

- **最优子结构**
  
  原问题的最优解包含子问题的最优解

------

#### [圣诞老人的礼物 Santa Clau’s Gifts](http://bailian.openjudge.cn/practice/4110)

**思路** [O(nlogn)]：按礼物的价值/重量比从大到小依次选取礼物，对选取的礼物尽可能多地装，直到达到总重量w

```c
#include <iostream>
#include <algorithm>
using namespace std;

const double eps = 1e-6; // 浮点数比较

struct Candy
{
    int v, w;
    bool operator<(const Candy &c) const
    {
        return double(v) / w - double(c.v) / c.w > eps;
    }
} candies[110];

int main()
{
    int n, w;
    scanf("%d%d", &n, &w);

    for (int i = 0; i < n; i++)
        scanf("%d%d", &candies[i].v, &candies[i].w);

    sort(candies, candies + n);

    int totalW = 0;
    double totalV = 0;

    for (int i = 0; i < n; i++)
    {
        if (totalW + candies[i].w <= w)
        {
            totalW += candies[i].w;
            totalV += candies[i].v;
        }
        else
        {
            totalV += candies[i].v * double(w - totalW) / candies[i].w;
            break;
        }
    }

    printf("%.lf", totalV);
    return 0;
}
```

------

#### [电影节](http://bailian.openjudge.cn/practice/4151)

**思路** [O(nlogn)]：将所有电影按结束时间从小到大排序，第一步选结束时间最早的那部电影。 然后，每步都选和上一部选中的电影不冲突且结束时间最早的电影。

```c
#include <iostream>
#include <algorithm>
using namespace std;

struct Film
{
    int s, e; // start & end time
};

bool compare(const Film &x, const Film &y)
{
    return x.e < y.e;
}

int main()
{
    int n; // number of films
    cin >> n;

    while (n != 0)
    {
        Film films[n];

        for (int i = 0; i < n; i++)
        {
            cin >> films[i].s;
            cin >> films[i].e;
        }

        sort(films, films + n - 1, compare);

        int count = 1;
        int end = 0;
        for (int i = 1; i < n; i++)
        {
            if (films[i].s >= films[end].e)
            {
                count++;
                end = i;
            }
        }

        cin >> n;
        cout << count << endl;
    }

    return 0;
}
```

------

#### [Stall Reservations](http://bailian.openjudge.cn/practice/4144/)

**思路** [O(nlogn)]：

- 所有奶牛都必须挤奶。到了一个奶牛的挤奶开始时间，就必须为这个奶牛找畜栏。因此按照奶牛的开始时间逐个处理它们是必然的。 

- S(x) 表示奶牛x的开始时间。E(x) 表示x的结束时间。对 E(x), x 可以是奶牛，也可以是畜栏。畜栏的结束时间，就是正在其里面挤奶的奶牛的结束时间。同一个畜栏的结束时间是不断在变的。

- 1) 把所有奶牛按开始时间从小到大排序。 
  
  2) 为第一头奶牛分配一个畜栏。 
  
  3) 依次处理后面每头奶牛 i。处理 i 时，考虑已分配畜栏中，结束时间最早的畜栏 x。 
  
  ​    若 E(x) < S(i)，则不用分配新畜栏，i 可进入 x，并修改 E(x) 为 E(i) 
  
  ​    若 E(x) >= S(i)，则分配新畜栏 y，记 E(y) = E(i) 
  
  需要用优先队列存放已经分配的畜栏，并使得结束时间最早的畜栏始终位于队列头部。

```c
#include <iostream>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;

struct Cow
{
    int a, b; // time range
    int No;
    bool operator<(const Cow &c) const
    {
        return a < c.a;
    }
};

struct Stall
{
    int end; // end time
    int No;
    bool operator<(const Stall &s) const
    {
        return end > s.end;
    }
    Stall(int e, int n) : end(e), No(n) {}
};

int main()
{
    int n; // number of cows
    cin >> n;
    int pos[n]; // the no. of stall allocated to cow of no.i
    Cow cows[n];

    for (int i = 0; i < n; i++)
    {
        cin >> cows[i].a;
        cin >> cows[i].b;
        cows[i].No = i;
    }

    sort(cows, cows + n);

    int total = 0; // number of stalls
    priority_queue<Stall> pq;
    for (int i = 0; i < n; i++)
    {
        if (pq.empty())
        {
            total++;
            pq.push(Stall(cows[i].b, total));
            pos[cows[i].No] = total;
        }
        else
        {
            Stall st = pq.top();
            if (st.end < cows[i].a)
            {
                pq.pop();
                pos[cows[i].No] = st.No;
                pq.push(Stall(cows[i].b, st.No));
            }
            else
            {
                total++;
                pq.push(Stall(cows[i].b, total));
                pos[cows[i].No] = total;
            }
        }
    }

    cout << total << endl;
    for (int i = 0; i < n; i++)
    {
        cout << pos[i] << endl;
    }
}
```

------

#### [Radar Installation](http://bailian.openjudge.cn/practice/1328)

**思路** [O(nlogn)]：

- 对每个岛屿 P，可以算出覆盖它的雷达必须位于 x 轴上的区间 [Ps，Pe]。 如果有雷达位于某个 x 轴区间 [a,b]，称该雷达覆盖此区间。问题转换为，至少要在 x 轴上放几个雷达（点），才能覆盖全部区间 [P1s，P1e]，[P2s，P2e] .... [Pns，Pne]

- 如果可以找到一个雷达同时覆盖多个区间，那么把这多个区间按起点坐标从小到大排序，则最后一个区间（起点最靠右的）k 的起点，就能覆盖所有区间 **（重要结论）**

- 1) 将所有区间按照起点从小到大排序，并编号 0 - (n-1)，记为 seg[i]，seg[i].x1 是起点，seg[i].x2 是终点
  
  2) 依次考察每个区间的起点，看要不要在那里放雷达。开始，所有区间都没被覆盖，所以设置目前未被覆盖的区间的右端点的最小坐标值 noCoveredMinX2 = seg[0].x2
  
  3) 考察 seg[i] 时，若 noCoveredMinX2 >= seg[i].x1，先不急于在 seg[i].x1 放雷达，接着往下看，并看看是否要将 noCoveredMinX2 更新为 seg[i].x2。若 noCoveredMinX2 < seg[i].x1，则说明必须放一个雷达了，否则以后就再也覆盖不到 noCoveredMinX2 所属的区间了。这个雷达可放在 seg[i-1].x1。放完雷达后，令  noCoveredMinX2 = seg[i].x2，再继续

```c
#include <iostream>
#include <algorithm>
#include <cmath>
#include <vector>
using namespace std;

struct Island
{
    double a, b; // range in x-axis

    bool operator<(const Island &i) const
    {
        return a < i.a;
    }
};

int main()
{
    vector<int> cases;
    int n, d;
    cin >> n;
    cin >> d;

    while (n != 0 || d != 0)
    {
        Island islands[n];

        int flag = 0;
        for (int i = 0; i < n; i++)
        {
            int x, y;
            cin >> x;
            cin >> y;

            if (y > d)
                flag = 1;

            islands[i].a = x - sqrt(d * d - y * y);
            islands[i].b = x + sqrt(d * d - y * y);
        }

        if (flag == 1)
        {
            cases.push_back(-1);
            cout << "Case " << cases.size() << ": " << cases.back() << endl;
            cin >> n;
            cin >> d;
            continue;
        }

        sort(islands, islands + n);

        int radar = 1;
        double uncovered = islands[0].b;
        for (int i = 0; i < n; i++)
        {
            if (uncovered < islands[i].a)
            {
                radar++;
                uncovered = islands[i].b;
            }
            else if (uncovered > islands[i].b)
            {
                uncovered = islands[i].b;
            }
        }

        cases.push_back(radar);
        cout << "Case " << cases.size() << ": " << cases.back() << endl;
        cin >> n;
        cin >> d;
    }
}
```
