---
layout: Post
title: Advanced Search
subtitle: 启发式搜索算法, 迭代加深搜索算法, Alpha-Beta 剪枝
author: Desmond
date: 2020-07-26 23:16:42
useHeaderImage: true
headerImage: https://6772-grp2020-4glv8fo5cd87cf9a-1302562267.tcb.qcloud.la/advanced-search/head.jpg?sign=cbab6044a71a4fbd51999d0d9cd9489d&t=1653727319
headerMask: rgba(45, 55, 71, .5)
permalinkPattern: /post/:year/:month/:day/:slug/
tags: [Algorithm]
---

## 高级搜索算法

---

### 启发式搜索算法（A\*）

- 在 BFS 算法中，若对每个状态 n 都设定估价函数 **f(n)=g(n)+h(n)**，并且每次从 Open 表中选节点进行扩展时，都选取 f 值最小的节点，则该搜索算法为启发式搜索算法，又称 A 算法。

- **g(n)**: 从起始状态到当前状态 n 的代价

- **h(n)**: 从当前状态 n 到目标状态的估计代价

- A 算法中的估价函数若选取不当，则可能找不到解，或找到的解也不是最优解。因此，需要对估价函数做一些限制，使得算法确保找到最优解（步数，即状态转移次数最少的解）。A\* 算法即为对估价函数做了特定限制，且确保找到最优解的 A 算法。

- **限制**:

  - g(n)是从 s0 到 n 的真实步数（未必是最优的），因此：g(n)>0 且 g(n)>=真实值

  - h(n)是从 n 到目标的估计步数。估计总是过于乐观的，即 h(n)<=真实值

  - h(n)**相容**: h 函数对任意状态 s1 和 s2 还满足: h(s1) <= h(s2) + c(s1,s2)，c(s1,s2)是 s1 转移到 s2 的步数

    即 h 相容能确保随着一步步往前走，**f 递增**

- A 算法的搜索效率很大程度上取决于估价函数 h(n)。一般说来，**在满足 h(n)≤h(n)的前提下，h(n)的值越大越好。**

```c
open = [start]
closed = []

// open表为空表示搜索结束了, 那就意味着无解！
while (open不为空)
{
    // 从open中取出估价值f最小的节点n
    if (n == target)
    {
        return // 找到了从start到n的路径
    }
    else
    {
        for n的每个子节点x
        {
            if x in open
            {
                计算新的f(x)
                比较open表中的旧f(x)和新f(x)
                if 新f(x) < 旧f(x)
                {
                    删掉open表里的旧f(x), 加入新f(x)
                }
            }
            else if x in closed
            {
                计算新的f(x)
                比较closed表中的旧f(x)和新f(x)
                if 新f(x) < 旧f(x)
                {
                    remove x from closed
                    add x to open
                }
            } // 比较新f(x)和旧f(x)实际上比的就是新旧g(x), 因为h(x)相等
            else
            {
                // x不在open, 也不在close, 是遇到的新结点
                计算f(x)
                add x to open
            }
        }

        add n to closed
    }
}
```

### 迭代加深搜索算法

- 算法思路
  - 总体上按照深度优先算法方法进行
  - 对搜索深度需要给出一个**深度限制 dm**，当深度达到了 dm 的时候，如果还没有找到解答，就停止对该分 支的搜索，换到另外一个分支继续进行搜索。
  - dm 从 1 开始，从小到大依次增大（因此称为迭代加深）
- 迭代加深搜索是**最优**的，也是**完备**的

### Alpha-Beta 剪枝

- **极大极小搜索法**

  MAX 和 MIN 对弈，轮到 MAX 走棋了，那么我们会遍历 MAX 的每一个可能走棋方法，然后对于前面 MAX 的每一个走棋方法，遍历 MIN 的每一个走棋方法，然后接着遍历 MAX 的每一个走棋方法，…… 直到分出胜负或者达到了搜索深度的限制。若达到搜索深度限制时尚未分出胜负，则根据当前局面的形式，给出一个得分，计算得分的方法被称为估价函数，不同游戏的估价函数如何设计和具体游戏相关。

  在搜索树中，轮到 MAX 走棋的节点即为**极大节点**，轮到 MIN 走棋的节点为**极小节点**。

  - 确定估价值函数，来计算每个棋局节点的估价值。估价值为正（越大），对 MAX 方越有利。估价值为负（越小），对 MIN 方越有利。

  - 从当前棋局的节点要决定下一步如何走时，以当前棋局节点为根，生成一棵深度为 n 的搜索树。不妨总是假设当前棋局节点是 MAX 节点。

  - 用局面估价函数计算出每个叶子节点的估价值

  - 若某个非叶子节点是极大节点，则其估价值为其子节点中估价值**最大**的那个节点的估价值

    若某个非叶子节点是极小节点，则其估价值为其子节点中估价值**最小**的那个节点的估价值

  - 选当前棋局节点的估价值最大的那个子节点，作为此步行棋的走法。

  ```c
  int MinMax(int depth)
  {
      if (SideToMove() == MAX_SIDE)
          return Max(depth);
      else
          return Min(depth);
  }

  int Max(int depth)
  {
      int best = -INFINITY;

      if (depth <= 0)
          return Evaluate();

      GenerateLegalMoves();

      while (MovesLeft())
      {
          MakeNextMove();
          val = Min(depth - 1);
          UnmakeMove();

          if (val > best)
              best = val
      }

      return best;
  }

  int Min(int depth)
  {
      int best = INFINITY;

      if (depth <= 0)
          return Evaluate();

      GenerateLegalMoves();

      while (MovesLeft())
      {
          MakeNextMove();
          val = Max(depth - 1);
          UnmakeMove();

          if (val < best)
              best = val;
      }

      return best;
  }
  ```

![](https://6772-grp2020-4glv8fo5cd87cf9a-1302562267.tcb.qcloud.la/advanced-search/pruning.png?sign=e4bac0ff68c19dcaa93119a34fc562f7&t=1622129389)

- **Alpha 剪枝**

  若结点 x 是 Min 节点，其兄弟节点（父节点相同的节点）中，已经求到的最大估价值是 b（有些兄弟节点的估价值，可能还没有算出来），那么在对 x 的子节点进行考查的过程中，如果一旦发现某子节点的估价值<=b，则不必再考查后面的 x 的子节点了。

  当搜索节点 X 时，若已求得某子节点 Y 的值为 2，因为 X 是一个极小节点，那么 X 节点得到的值肯定不大于 2。因此 X 节点的子节点即使都搜索了，X 节点值也不会超过 2。而节点 K 的值为 7，由于 R 是一个 Max 节点，那么 R 的取值已经可以肯定不会选 X 的取值了。因此 X 节点的 Y 后面子节点可以忽略，即图中第三层没有数字的节点可被忽略。此即为 alpha 剪枝 ---- 因被剪掉的节点是极大节点。

- **Beta 剪枝**

  若结点 x 是 Max 节点，其兄弟节点（父节点相同的节点）中，已经求到的最小估价值是 a（有些兄弟节点的估价值，可能还没有算出来） 那么在对 x 的子节点进行考查的过程中，如果一旦发现某子节点的估价值 >= a,则不必再考查后面的 x 的子节点了。

```c
function alphabeta(node, depth, α, β, maximizingPlayer)
    if depth = 0 or node is terminal node
        return the heuristic value of node
    if maximizingPlayer
        α := -INF;
		for each child of node
            α := max(α, alphabeta(child, depth - 1, α, β, not(maximizingPlayer)))
            if β <= α // β是node的兄弟节点到目前为止的最小估价值
                break
        return α
     else
     	β := INF;
		for each child of node
            β := min(β, alphabeta(child, depth - 1, α, β, not(maximizingPlayer)))
            if β <= α // α是node的兄弟节点到目前为止的最大估价值
                break
        return β

// 初始调用: alphabeta(origin, depth, -infinity, +infinity, TRUE)
// 在搜到底的情况下，infinity不一定是无穷大 infinity应该是主角赢的那个状态(胜负已分的状态)的估价值，而-infinity应该是主角输的那个状态(胜负已分的状态）的估价值。
```
