---
layout: Post
title: Data Structure
author: Desmond
date: 2020-07-26 22:23:15
useHeaderImage: true
headerImage: https://6772-grp2020-4glv8fo5cd87cf9a-1302562267.tcb.qcloud.la/head-images/head.jpg?sign=97375a4739907a387a734ea173bda364&t=1653748651
headerMask: rgba(45, 55, 71, .5)
permalinkPattern: /post/:year/:month/:day/:slug/
tags: [Algorithm]
---

## 数据结构 Data Structure

---

### 数据结构的存储方式 **[结构基础]**：

- **数组** (顺序存储)

  - 随机访问，快速索引，节约存储空间
  - 扩容不易 (重新分配，全部复制) O(N)
  - 插入/删除不易 (搬移后面的所有数据) O(N)

- **链表** (链式存储)
  - 无扩容问题 (元素非连续，指针指向下一个元素)
  - 无插入/删除问题 (操作指针) O(1)
  - 无法随机访问 (存储空间不连续)
  - 消耗更多的存储空间 (指针)

### 数据结构的基本操作：

1. **遍历** + **访问** (增删查改)
2. **线性** (迭代) or **非线性** (递归)

- 数组遍历框架 (典型的线性迭代结构)

  ```java
  void traverse(int[] arr) {
      for (int i = 0; i < arr.length; i++) {
          // 迭代访问 arr[i]
      }
  }
  ```

- 链表遍历框架 (兼具迭代和递归结构)

  ```java
  /* 基本的单链表节点 */
  class ListNode {
      int val;
      ListNode next;
  }

  void traverse(ListNode head) {
      for (ListNode p = head; p != null; p = p.next) {
          // 迭代访问 p.val
      }
  }

  void traverse(ListNode head) {
      // 递归访问 head.val
      traverse(head.next)
  }
  ```

- 二叉树遍历框架 (典型的非线性递归遍历结构)

  ```java
  /* 基本的二叉树节点 */
  class TreeNode {
      int val;
      TreeNode left, right;
  }

  void traverse(TreeNode root) {
      traverse(root.left)
      traverse(root.right)
  }
  ```

- N 叉树遍历框架

  ```java
  /* 基本的 N 叉树节点 */
  class TreeNode {
      int val;
      TreeNode[] children;
  }

  void traverse(TreeNode root) {
      for (TreeNode child : root.children)
          traverse(child);
  }
  ```
