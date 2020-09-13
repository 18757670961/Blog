---
title: Divide and Conquer
author: Desmond
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

------



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

------



#### 输出前m大的数

**描述**：给定一个数组包含 n 个元素，统计前 m 大的数并且把这 m 个数从大到小输出。

**输入**：第一行包含一个整数 n，表示数组的大小。n < 100000。 第二行包含 n 个整数，表示数组的元素，整数之间以一个空格分开。每个整数的绝对值不超过100000000。 第三行包含一个整数 m。m < n。

**输出**：从大到小输出前 m 大的数，每个数一行。

**思路** [O(n+mlogm)]：把前 m 大的都弄到数组最右边，然后对这最右边 m 个元素排序，再输出

- **O(n) 时间内实现把前 m 大的都弄到数组最右边**：

  1）设 key = a[0], 将 key 挪到适当位置，使得比 key 小的元素都在 key 左边，比 key 大的元素都在 key 右边（线性时间完成）

  2）选择数组的前部或后部再进行 arrangeRight 操作

  - a = k	done
  - a > k    对右边 a-1 个元素再进行 arrangeRigth(k)
  - a < k    对左边 b 个元素再进行 arrangeRight(k-a)

```c++
#include <iostream>
#include <algorithm>
using namespace std;

void swap(int &a, int &b)
{
    int tmp = a;
    a = b;
    b = tmp;
}

int QuickSort(int a[], int s, int e)
{
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

    return i;
}

void arrangeRight(int a[], int s, int e, int k)
{
    // base case
    if (s >= e)
        return;

    // position of key
    int key = QuickSort(a, s, e);

    int current = e - key + 1;
    if (current == k)
    {
        return;
    }
    else if (current > k)
    {
        arrangeRight(a, key + 1, e, k);
    }
    else
    {
        arrangeRight(a, s, key - 1, k - current);
    }
}

int main()
{
    int n;
    cin >> n;
    int a[n];

    for (int i = 0; i < n; i++)
        cin >> a[i];

    int k;
    cin >> k;

    arrangeRight(a, 0, n - 1, k);

    sort(a + n - k, a + n);

    for (int i = n - 1; i >= n - k; i--)
    {
        cout << a[i] << endl;
    }
}
```

------



#### 求排列的逆序数

**描述**：

考虑 1,2,…,n (n <= 100000) 的排列 i1，i2，…，in，如果其中存在 j，k，满足 j < k 且 ij > ik，那么就称 (ij,ik) 是这个排列的一个逆序。

一个排列含有逆序的个数称为这个排列的逆序数。例如排列 263451 含有8个逆序 (2, 1), (6, 3), (6, 4), (6, 5), (6, 1), (3, 1), (4, 1), (5, 1)，因此该排列的逆序数就是8。

现给定 1, 2, …, n 的一个排列，求它的逆序数。

**思路** [O(nlogn)]：

- 将数组分成两半，分别求出左半边的逆序数和右半边的逆序数

- 再算有多少逆序是由左半边取一个数和右半边取一个数构成 (要求 O(n) 实现）

  **关键**：左半边和右半边都是排好序的。比如，都是从大到小排序的。这样，左右半边只需要从头到尾各扫一遍，就可以找出由两边各取一个数构成的逆序个数

```c++
#include <iostream>
#include <algorithm>
using namespace std;

bool compare(int a, int b)
{
    return a > b;
}

long long merge(int a[], int s, int m, int e)
{
    int temp[e - s + 1];
    for (int i = 0; i <= e - s; i++)
    {
        temp[i] = a[i + s]; // 避免原数组被排序
    }

    sort(temp, temp + m - s + 1, compare);
    sort(temp + m - s + 1, temp + e - s + 1, compare);

    int l = 0; // left half
    int r = m - s + 1; // right half
    long long count = 0;
    while (l <= (m - s) && r <= (e - s))
    {
        if (temp[l] > temp[r])
        {
            count += e - s - r + 1;
            l++;
        }
        else
        {
            r++;
        }
    }

    return count;
}

long long countReverse(int a[], int s, int e)
{
    if (s < e)
    {
        int m = s + (e - s) / 2;
        return merge(a, s, m, e) + countReverse(a, s, m) + countReverse(a, m + 1, e);
    }
    else
    {
        return 0;
    }
}

int main()
{
    int n;
    cin >> n;
    int a[n];

    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
    }

    cout << countReverse(a, 0, n - 1);
}
```

------



#### [Aggressive Cows](http://bailian.openjudge.cn/practice/2456)

**思路**：

- 先得到排序后的隔间坐标 x0, ..., xN-1 

- 在 [L, R] 内用二分法尝试 “**最大最近距离**” D = (L + R) / 2 (L,R初值为 [1, 1,000,000,000/C])

- 若 D 可行，则记住该 D，然后在新 [L,R] 中继续尝试 (L= D + 1) 

  若 D 不可行，则在新 [L,R] 中继续尝试 (R= D - 1) 

```c++
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    int n, c; // number of stalls and cows
    cin >> n;
    cin >> c;

    int stalls[n];
    for (int i = 0; i < n; i++)
        cin >> stalls[i];
    
    sort(stalls, stalls + n);

    int d; // largest min distance
    int l = 1; // min d
    int r = (stalls[n - 1] - stalls[0]) / (c - 1); // max d
    int solution;

    while (r >= l)
    {
        d = l + (r - l) / 2;
        int flag1 = 1;
        int last = 0; // position of last cow

        for (int i = 1; i < c; i++)
        {
            int flag2 = 0;
            for (int j = last + 1; j < n; j++)
            {
                if (stalls[j] - stalls[last] >= d)
                {
                    flag2 = 1;
                    last = j;
                    break;
                }
            }

            if (flag2 == 0)
            {
                flag1 = 0;
                break;
            }
        }

        if (flag1 == 0)
        {
            r = d - 1;
        }
        else
        {
            solution = d;
            l = d + 1;
        }
    }

    cout << solution;
}
```

