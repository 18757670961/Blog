---
title: Divide and Conquer
author: Desmond
iframe: 'http://huangxuan.me/js-module-7day/'
catalog: true
abbrlink: c9bcb73c
date: 2020-07-26 22:42:32
header-img: c9bcb73c/head.jpg
tags: Algorithm
categories:
top:
---

## 分治 Divide and Conquer

------



### 定义

- **分** (divide)：将初始问题分割成多个子问题 (与初始问题同类型，规模更小)
- **递归** (recursion)：递归求解子问题
- **治** (conquer)：合理组合子问题的解



### 优点

- **并行性**：不同子问题由不同处理器来执行
- **内存访问**：利用内存缓存机制 (子问题在缓存中求解)



### 缺点

递归的执行速度较慢 (反复的子问题调用，需要栈来存储)



### 归并排序 O(nlog(n))

```c++
#include <iostream> 
using namespace std;

// merge a[s,m] and a[m+1,e] to tmp, sort, then copy back to a[s,m]
void Merge(int a[], int s, int m, int e, int tmp[])
{
    int pb = 0;
    int p1 = s, p2 = m + 1;
    
    while (p1 <= m && p2 <= e)
    {
        if (a[p1] < a[p2])
            tmp[pb++] = a[p1++];
        else
            tmp[pb++] = a[p2++];
    }
    
    while (p1 <= m)
        tmp[pb++] = a[p2++];
    while (p2 <= e)
        tmp[pb++] = a[p2++];
    for (int i = 0; i < e - s + 1; i++)
        a[s + i] = tmp[i];
}

void MergeSort(int a[], int s, int e, int tmp[])
{
    if (s < e)
    {
        int m = s + (e - s) / 2;
        MergeSort(a, s, m, tmp);
        MergeSort(a, m + 1, e, tmp);
        Merge(a, s, m, e, tmp);
    }
}

int main()
{
    int a[10] = {13, 27, 19, 2, 8, 12, 2, 8, 30, 89};
    int b[10];
    int size = sizeof(a) / sizeof(int); 
    
    MergeSort(a, 0, size - 1, b);    
}
```



### 快速排序

```c++
#include <iostream> 
using namespace std;

void swap(int &a, int &b)
{
    int tmp = a;
    a = b;
    b = tmp;
}

void QuickSort(int a[], int s, int e)
{
    if (s >= e)
        return;
    
    int k = a[s];
    int i = s, j = e;
    while (i != j)
    {
        while (j > i && a[j] >= k)
            j--;
        
        swap(a[i], a[j]);
        
        while (i < j && a[i] <= k)
            i++;
        
        swap(a[i], a[j]);
    }
    
    QuickSort(a, s, i - 1);
    QuickSort(a, i + 1, e);
}

int main()
{
    int a[] = {93, 27, 30, 2, 8, 12, 2, 8, 30, 89};
    int size = sizeof(a) / sizeof(int);
    
    QuickSort(a, 0, size - 1);
}
```



### Binary search O(log(n))

```c++
int BinarySearch (int a[], int size, int p)
{
	int l = 0; // left pointer
    int r = size - 1; // right pointer
    
    while (l <= r) // range is not empty
    {
        int mid = l + (r - l) / 2; // avoid possible overflow caused by (l + r)
        
        if (p == a[mid])
            return mid;
        else if (p > a[mid])
            l = mid + 1;
        else
            r = mid - 1;
    }
    
    return -1; // search failed
}
```

