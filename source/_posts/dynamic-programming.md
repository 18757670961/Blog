---
title: Dynamic Programming
author: Desmond
iframe: 'http://huangxuan.me/js-module-7day/'
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

  