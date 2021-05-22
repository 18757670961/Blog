---
title: Dynamic Programming
author: Desmond
catalog: true
abbrlink: 71b19194
date: 2020-07-26 22:48:29
header-img: 71b19194/head.jpg
tags: Algorithm
categories:
top:
---

## 动态规划 Dynamic Programming 

------



### 定义

- **递归**求解子问题 (重叠子问题)
- **备忘录 / DP table**: 将已计算的值存储在表中



### 效果

将复杂度由指数级降为**多项式级**



### 性质

- **最优子结构**: 问题的最优解包含子问题的最优解 (子问题相互独立)
- **子问题重叠**: 不同子问题的重复运算
- **无后效性**: 当前的若干个状态值一旦确定, 则此后过程的演变就只和这若干个状态的值有关, 和之前是采取哪种手段或经过哪条路径演变到当前的这若干个状态没有关系
- **状态转移方程**



### 核心问题

**穷举**找**最值**



### 实现方法

- **自底向上** / "**人人为我**" 递推型

  最小的可能输入参数值 -> 逐步增大参数值 -> 将已计算的值存储在表中

  **[ 利用较小参数计算较大参数 ]**

- **自顶向下** / "**我为人人**" 递推型

  分解为子问题 -> 判断是否存在已计算的值 (递归的最先操作) -> 求解并记住解 (递归的最终操作)



### 一般方法

- **递归 -> 动规**

  - 递归函数 n 个参数 -> n 维数组
  - 数组下标 -> 递归函数参数的取值范围
  - 数组元素的值 -> 递归函数参数的取值范围

- 从边界值开始逐步填充数组 (计算递推函数的逆过程)

- **将原问题分解为子问题** (形式相同, 规模更小, 保存解)

- **确定状态**

  - 状态 -> 和子问题相关的各个变量的一组取值
  - 状态的值 -> 状态所对应的子问题 (一个或多个) 的解
  - 状态空间 -> 所有状态的集合 (与时间复杂度直接相关)

- **确定初始状态 (边界状态) 的值**

- **确定状态转移方程 (递推公式)** 

  明确 **base case** -> 明确 [**状态**] -> 明确 [**选择**] -> 定义 dp 数组/函数的含义

  ```
  # 初始化 base case
  dp[0][0][...] = base
  # 进行状态转移
  for 状态1 in 状态1的所有取值：
      for 状态2 in 状态2的所有取值：
          for ...
              dp[状态1][状态2][...] = 求最值(选择1，选择2...)
  ```




### 斐波那契数列

- **递归实现 O(2^n)** 

  ```java
  int RecursiveFibonacci(int n)
  {
  	if (n == 0)
          return 0;
      if (n == 1)
          return 1;
      
      // 同一参数值的函数被多次调用
      return RecursiveFibonacci(n - 1) + RecursiveFibonacci(n - 2);
  }
  ```

  ![](71b19194/recursive.png)

- **自底向上实现 [ 时间O(n) 空间O(n) ]**

  ```java
  int fib(int N) {
      vector<int> dp(N + 1, 0);
      // base case
      dp[1] = dp[2] = 1;
      for (int i = 3; i <= N; i++)
          dp[i] = dp[i - 1] + dp[i - 2];
      return dp[N];
  }
  ```

  ![](71b19194/dp.png)

- **自顶向下实现 [ 时间O(n) 空间O(n) ]**

  ```java
  int fib(int N) {
      if (N < 1) return 0;
      // 备忘录全初始化为 0
      vector<int> memo(N + 1, 0);
      // 进行带备忘录的递归
      return helper(memo, N);
  }
  
  int helper(vector<int>& memo, int n) {
      // base case 
      if (n == 1 || n == 2) return 1;
      // 已经计算过
      if (memo[n] != 0) return memo[n];
      memo[n] = helper(memo, n - 1) + helper(memo, n - 2);
      return memo[n];
  }
  ```

  ![](71b19194/memory.png)

- **状态压缩 [ 时间O(n) 空间O(1) ]**

  ```java
  int fib(int n) {
      if (n == 2 || n == 1) 
          return 1;
      int prev = 1, curr = 1;
      for (int i = 3; i <= n; i++) {
          int sum = prev + curr;
          // 只需存储之前的两个状态
          prev = curr;
          curr = sum;
      }
      return curr;
  }
  ```


------



#### [数字三角形](http://poj.org/problem?id=1163)

**思路** [O(n^2)]：

- 如果每算出一个 MaxSum(r, j) 就保存起来，下次用到其值的时候直接取用，则可免去重复计算。那么可以用O(n^2) 时间完成计算。因为三角形的数字总数是 n(n+1)/2
- 没必要用二维 maxSum 数组存储每一个 MaxSum(r, j), 只要从底层一行行向上递推，那么只要一维数组maxSum[100] 即可, 即只要存储一行的 MaxSum 值就可以。
- 进一步考虑，连 maxSum 数组都可以不要，直接用 D 的第 n 行替代 maxSum 即可。

```c
/******* 自底向上 & 滚动数组 ********/

#include <iostream>
#include <algorithm>
#define MAX 101
using namespace std;

int main()
{
    int D[MAX][MAX];
    int* maxSum;

    int n;
    cin >> n;

    int i, j;
    for (i = 1; i <= n; i++)
        for (j = 1; j <= i; j++)
            cin >> D[i][j];

    maxSum = D[n];

    for (i = n - 1; i >= 1; i--)
        for (j = 1; j <= i; j++)
            maxSum[j] = max(maxSum[j], maxSum[j + 1]) + D[i][j];

    cout << maxSum[1] << endl;
}
```

------



#### [最长上升子序列](http://bailian.openjudge.cn/practice/2757/)

**思路** [O(n^2)]：

- **找子问题**：

  “求以 ak（k=1, 2, 3 … N）为终点的最长上升子序列的长度” 一个上升子序列中最右边的那个数，称为该子序列的 “终点”。虽然这个子问题和原问题形式上并不完全一样，但是只要这 N 个子问题都解决了，那么这 N 个子问题的解中，最大的那个就是整个问题的解。

- **确定状态**：

  子问题只和一个变量 -- 数字的位置相关。因此序列中数的位置 k 就是 “状态”，而状态 k 对应的 “值”，就是以 ak 做为 “终点” 的最长上升子序列的长度。状态一共有 N 个。

- **找出状态转移方程**：

  maxLen(k) 表示以 ak 做为 “终点” 的最长上升子序列的长度，那么：

  初始状态：maxLen (1) = 1 

  maxLen (k) = max { maxLen (i)：1 <= i < k 且 ai < ak 且 k≠1 } + 1 若找不到这样的i, 则 maxLen(k) = 1

  maxLen (k) 的值，就是在 ak 左边，“终点” 数值小于 ak，且长度最大的那个上升子序列的长度再加1。因为 ak 左边任何 “终点” 小于 ak 的子序列，加上 ak 后就能形成一个更长的上升子序列。

```c
#include <iostream>
#include <cstring>
#include <algorithm>
using namespace std;

// 人人为我

int main()
{
    int n;
    cin >> n;
    int a[n];
    int maxLen[n];

    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        maxLen[i] = 1;
    }

    for (int i = 2; i <= n; i++)
    {
        for (int j = 1; j < i; j++)
        {
            if (a[i] > a[j])
                maxLen[i] = max(maxLen[i], maxLen[j] + 1);
        }
    }

    cout << *max_element(maxLen + 1, maxLen + n + 1);
}

/****************************************************************/

// 我为人人

int main()
{
    int n;
    cin >> n;
    int a[n];
    int maxLen[n];

    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        maxLen[i] = 1;
    }

    for (int i = 1; i <= n; i++)
    {
        for (int j = i + 1; j <= n; j++)
        {
            if (a[j] > a[i])
                maxLen[j] = max(maxLen[j], maxLen[i] + 1);
        }
    }

    cout << *max_element(maxLen + 1, maxLen + n + 1);
}
```

------



#### [最长公共子序列](http://bailian.openjudge.cn/practice/1458)

**思路**：

- **确定状态**：MaxLen(i, j) -- s1的左边 i 个字符形成的子串，与 s2 左边的 j 个字符形成的子串的最长公共子序列的长度 (i, j从0 开始算）

  MaxLen(n, 0) = 0 ( n = 0 … s1） 	MaxLen(0, n) = 0 ( n = 0 … s2）

- **找出状态转移方程**：

  if ( s1[i - 1] == s2[j - 1] )  // s1 的最左边字符是 s1[0]

  ​	MaxLen(i, j) = MaxLen(i - 1, j - 1) + 1;

  else

  ​	MaxLen(i, j) = Max(MaxLen(i, j - 1), MaxLen(i - 1, j));

  S1[i - 1] != s2[j - 1] 时，MaxLen(S1, S2) 不会比 MaxLen(S1, S2j-1 ) 和 MaxLen(S1i-1, S2) 两者之中任何一个小，也不会比两者都大

```c
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    char sz1[1000];
    char sz2[1000];
    int maxLen[1000][1000];

    while (cin >> sz1 >> sz2)
    {
        int length1 = strlen(sz1);
        int length2 = strlen(sz2);
        int nTmp;

        int i, j;
        for (i = 0; i <= length1; i++)
            maxLen[i][0] = 0;
        for (j = 0; j <= length2; j++)
            maxLen[0][j] = 0;

        for (i = 1; i <= length1; i++)
        {
            for (j = 1; j<= length2; j++)
            {
                if (sz1[i - 1] == sz2[j - 1])
                    maxLen[i][j] = maxLen[i - 1][j - 1] + 1;
                else
                {
                    maxLen[i][j] = max(maxLen[i][j - 1], maxLen[i - 1][j]);
                }
            }
        }

        cout << maxLen[length1][length2] << endl;
    }
}
```

------



#### [最佳加法表达式](http://bailian.openjudge.cn/practice/4152/)

**思路**：假定数字串长度是 n，添完加号后，表达式的最后一个加号添加在第 i 个数字后面，那么整个表达式的最小值，就等于在前 i 个数字中插入 m – 1 个加号所能形成的最小值，加上第 i + 1到第 n 个数字所组成的数的值（i从1开始算）。

```c
#include <iostream>
#include <cmath>
#include <cstring>
#include <algorithm>
#include <iomanip>
#include <queue>
#include <stack>
#include <vector>
#include <set>
#include <map>
using namespace std;
const int Maxlen = 55;
int m;
string s;
string maxv = "999999999999999999999999999999999999999999999999999999999";
string dp[Maxlen][Maxlen];
string num[Maxlen][Maxlen];

int cmp(string &num1, string &num2)
{
    int len1 = num1.length(), len2 = num2.length();
    if (len1 != len2)
    {
        return len1 - len2;
    }
    for (int i = len1 - 1; i >= 0; --i)
    {
        if (num1[i] != num2[i])
        {
            return num1[i] - num2[i];
        }
    }
    return 0;
}

void add(string &num1, string &num2, string &num3)
{
    int len1 = num1.length(), len2 = num2.length();
    int c = 0;
    for (int i = 0; i < Maxlen; ++i)
    {
        int t;
        if (i < len1 && i < len2)
        {
            t = num1[i] - '0' + num2[i] - '0' + c;
        }
        else if (i < len1 && i >= len2)
        {
            t = num1[i] - '0' + c;
        }
        else if (i < len2 && i >= len1)
        {
            t = num2[i] - '0' + c;
        }
        else
        {
            break;
        }
        num3.append(1, t % 10 + '0');
        c = t / 10;
    }
    while (c)
    {
        num3.append(1, c % 10 + '0');
        c = c / 10;
    }
}

int main()
{
    while (cin >> m >> s)
    {
        reverse(s.begin(), s.end());
        int len = s.length();
        for (int i = 1; i <= len; ++i)
        {
            for (int j = i; j <= len; ++j)
            {
                num[i][j] = s.substr(i - 1, j - i + 1);
            }
        }

        for (int i = 1; i <= len; ++i)
        {
            dp[0][i] = num[1][i];
        }

        for (int i = 1; i <= m; ++i)
        {
            for (int j = i + 1; j <= len; ++j)
            {
                string minv = maxv;
                string tmp;
                for (int k = i; k <= j - 1; ++k)
                {
                    tmp.clear();
                    add(dp[i - 1][k], num[k + 1][j], tmp);
                    if (cmp(minv, tmp) > 0)
                    {
                        minv = tmp;
                    }
                }
                dp[i][j] = minv;
            }
        }
        reverse(dp[m][len].begin(), dp[m][len].end());
        cout << dp[m][len] << endl;
    }
    return 0;
}
```

------



#### [神奇的口袋](http://bailian.openjudge.cn/practice/2755)

**思路**：

- 此问题仅在询问容积40是否可达，40是个很小的数，可以考虑对值域空间，即对容积的可达性进行动态规 划。
- 定义一维数组 int sum[41]，依次放入物品，计算每次放入物品可达的容积，并在相应空间设置记录，最后判断 sum[40] 是否可达，到达了几次。

```c
#include <iostream>
#define MAX 41
using namespace std;

int main()
{
    int n, i, j, input;
    int sum[MAX] = {0};

    cin >> n;
    for (i = 0; i < n; i++)
    {
        cin >> input;

        for (j = 40; j >= 1; j--)
            if (sum[j] > 0 && j + input <= 40)
                sum[j + input] += sum[j]; // 如果j有sum[j]种方式可达, 则每种方式加上input就可达j+input

        sum[input]++;
    }

    cout << sum[40] << endl;
}
```

------



#### [Charm Bracelet](http://poj.org/problem?id=3624)

**思路**：本题如用记忆型递归，需要一个很大的二维数组，会超内存。注意到这个二维数组的下一行的值，只用到了 上一行的正上方及左边的值，因此可用滚动数组的思想，只要一行即可。即可以用一维数组，用 “人人为我” 递推型动规实现。

```c
#include <iostream>
#include <algorithm>
using namespace std;
int w[3403];
int d[3403];
int f[12881] = {0};

int main()
{
    int n, m;

    while (cin >> n >> m)
    {
        for (int i = 1; i <= n; i++)
            cin >> w[i] >> d[i];

        for (int i = 1; i <= n; i++)
        {
            for (int j = m; j >= w[i]; j--)
            {
                if (i == 1)
                    f[j] = d[i];
                else
                    f[j] = max(f[j], f[j - w[i]] + d[i]);
            }
        }

        cout << f[m] << endl;
    }
}
```

------



#### [滑雪](http://bailian.openjudge.cn/practice/1088)

**思路** [O(n^2)]：

- L(i, j) 表示从点 (i, j) 出发的最长滑行长度。一个点 (i, j)，如果周围没有比它低的点，L(i, j) = 1
- L(i, j) 等于 (i, j) 周围四个点中，比 (i, j) 低，且 L 值最大的那个点的 L 值，再加1
- 将所有点按高度从小到大排序。每个点的 L 值都初始化为1。从小到大遍历所有的点。经过一个点 (i, j) 时，用递推公式求 L(i, j)

```c
// 人人为我

#include <iostream>
#include <algorithm>
using namespace std;

int r, c;
int height[101][101];
int length[101][101];

struct ski
{
    int x;
    int y;
    int h;

    bool operator<(const ski &f) const
    {
        return h < f.h;
    }
} s[10000];

int main()
{
    while (cin >> r >> c)
    {
        int count = 0;
        for (int i = 1; i <= r; i++)
        {
            for (int j = 1; j <= c; j++)
            {
                cin >> height[i][j];
                s[count].x = i;
                s[count].y = j;
                s[count].h = height[i][j];
                length[i][j] = 1;
                count++;
            }
        }

        sort(s, s + count);

        int maxLen = 1;
        for (int i = 1; i < count; i++)
        {
            int a = s[i].x;
            int b = s[i].y;
            int c = s[i].h;
            int max = 0;

            if (height[a - 1][b] < c && length[a - 1][b] > max)
                max = length[a - 1][b];

            if (height[a + 1][b] < c && length[a + 1][b] > max)
                max = length[a + 1][b];

            if (height[a][b + 1] < c && length[a][b + 1] > max)
                max = length[a][b + 1];

            if (height[a][b - 1] < c && length[a][b - 1] > max)
                max = length[a][b - 1];

            if (max > 0)
                length[a][b] = max + 1;

            if (length[a][b] > maxLen)
                maxLen = length[a][b];
        }

        cout << maxLen << endl;
    }
}
```

