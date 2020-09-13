---
title: Cheat Sheet (Windows)
author: Desmond
catalog: true
tags: Windows
abbrlink: 50abf9ec
date: 2020-09-06 15:09:03
header-img: 50abf9ec/head.png
categories:
top:
---



# Cheat Sheet (Windows)



## 快捷键

|           组合键           |               功能                |
| :------------------------: | :-------------------------------: |
|         Win + Tab          |      启动 Task View 虚拟桌面      |
|       Win+ Ctrl + D        | 使用 Task View 虚拟桌面创建新桌面 |
|          Win + I           |         打开 Modern 设置          |
|          Win + K           |         启动媒体连接菜单          |
|          Win + P           |      启动多屏幕显示方式菜单       |
|          Win + A           |           打开操作中心            |
| Win + Space / Ctrl + Shift |      切换输入语言和键盘布局       |
|          Win + D           | 显示桌面，再次按下显示打开的窗口  |
|          Win + E           |        打开文件资源管理器         |
|          Win + L           |            锁定计算机             |
|          Win + R           |          打开运行对话框           |
|        Win + 方向键        |         调整窗口显示大小          |
|     Ctrl + Shift + Esc     |          打开任务管理器           |



## 配置 BIOS/MBR 分区结构

### 默认分区结构

![](50abf9ec/1.jpg)

创建默认分区结构可以使用 DiskPart 命令行工具完成。使用 Windows 10 操作系统安装光盘或U盘启动至安装界面，然后按下 Shift+F10 组合键打开命令提示符或使用 WinPE 启动至命令提示符，输入 diskpart 进入其命令操作界面并执行如下命令完成创建过程。

```powershell
select disk 0
# 选择要创建分区结构的硬盘为硬盘0。如果有多块硬盘可以使用 list disk 命令查看。

clean
# 清除硬盘所以数据及分区结构，请谨慎操作。

create partition primary size=350
# 创建大小为 350MB 的主分区，此分区即为系统分区。

format quick fs=ntfs label=”System”
# 格式化系统分区并使用 NTFS 文件系统，设置卷标为 System。

active
# 设置系统分区为“活动（active）”。

create partition primary size=30000
# 创建大小为 30GB 的主分区，此分区即为 Windows 分区。

format quick fs=ntfs label=”Windows”
# 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Windows。

assign letter=”C”
# 设置 Windows 分区盘符为 C:。

exit
# 退出 DiskPart 命令操作界面。
```

### 推荐分区结构

![](50abf9ec/2.jpg)

微软推荐分区结构只是在默认分区结构上增加了一个用于存储系统恢复映像的恢复分区，此分区为非必备分区。创建推荐分区结构，只需在 DiskPart 中执行如下命令即可完成：

```powershell
select disk 0
# 选择要创建分区结构的硬盘为硬盘0。如果有多块硬盘可以使用 list disk 命令查看。

clean
# 清除硬盘所以数据及分区结构，请谨慎操作。

create partition primary size=350
# 创建大小为 350MB 的主分区，此分区即为系统分区。

format quick fs=ntfs label=”System”
# 格式化系统分区并使用 NTFS 文件系统，设置卷标为 System。

active
# 设置系统分区为“活动（active）”。

create partition primary size=30000
# 创建大小为 30GB 的主分区，此分区即为 Windows 分区。

format quick fs=ntfs label=”Windows”
# 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Windows。

assign letter=C
# 设置 Windows 分区盘符为 C:。

create partition primary size=10000
# 创建大小为 10GB 的主分区，此分区即为恢复分区。

format quick fs=ntfs label=”Recovery”
# 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Recovery。

set id=27
# 设置恢复分区为隐藏分区。

exit
# 退出 DiskPart 命令操作界面。
```

同时，可以把上述命令保存至 txt 文本文件（createvol.txt），例如保存至 d 盘，然后使用 WinPE 或操作系统安装盘启动至命令提示符输入 diskpart/s d:\createvol.txt 命令等待其执行完成即可



## 配置 UEFI/GPT 分区结构

### 默认分区结构

![](50abf9ec/3.jpg)

创建默认分区结构，同样需要在 Windows 安装程序界面或 WinPE 环境下使用 DiakPart 命令行工具。在 DiskPart 中执行如下命令。

```powershell
select disk 0
# 选择要创建分区结构的硬盘为硬盘1，如果有多块硬盘可以使用 list disk 命令查看

clean
# 清除硬盘所有数据及分区结构，请谨慎操作。

convert gpt
# 转换分区表为 GPT 格式。

create partition primary size=300
# 创建大小为 300MB 的主分区，此分区即为 WinRE 恢复分区。

format quick fs=ntfs label=”WinRE”
# 格式化 WinRE 恢复分区并使用 NTFS 文件系统，设置卷标为 WinRE。

set id=de94bba4-06d1-4d40-a16a-bfd50179d6ac
# 设置 WinRE 恢复分区为隐藏分区。

gpt attributes=0x8000000000000001
# 设置 WinRE 恢复分区不能在磁盘管理器中被删除。

create partition efi size=100
# 创建大小为 100MB 的主分区，此分区即为 ESP 分区。

format quick fs=fat32 label=”System”
# 格式化 ESP 分区并使用 FAT32 文件系统，设置卷标为 System。

create partition msr size=128
# 创建大小为 128MB 的 MSR 分区。

create partition primary size=30000
# 创建大小为 30GB 的主分区，此分区即为 Windows 分区。

format quick fs=ntfs label=”Windows”
# 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Windows。

assign letter=”C”
# 设置 Windows 分区盘符为 C:。

exit
# 退出 DiskPart 命令操作界面。
```

### 推荐分区结构

![](50abf9ec/4.jpg)

推荐分区结构也是在默认分区结构的基础上新增一个用于存储恢复映像的恢复分区。 同样在 DiskPart 下执行如下命令完成创建过程。

```powershell
select disk 0
# 选择要创建分区结构的硬盘为硬盘1，如果有多块硬盘可以使用 list disk 命令查看。

clean
# 清除硬盘所以数据及分区结构，请谨慎操作。

convert gpt
# 转换分区表为 GPT 格式。

create partition primary size=300
# 创建大小为 300MB 的主分区，此分区即为 WinRE 恢复分区。

format quick fs=ntfs label=”WinRE”
# 格式化 WinRE 恢复分区并使用 NTFS 文件系统，设置卷标为 WinRE。

set id=de94bba4-06d1-4d40-a16a-bfd50179d6ac
# 设置 WinRE 恢复分区为隐藏分区。

gpt attributes=0x8000000000000001
# 设置 WinRE 恢复分区不能在磁盘管理器中被删除。

create partition efi size=100
# 创建大小为 100MB 的主分区，此分区即为 ESP 分区。

format quick fs=fat32 label=”System”
# 格式化 ESP 分区并使用 FAT32 文件系统，设置卷标为 System。

create partition msr size=128
# 创建大小为 128MB 的 MSR 分区。

create partition primary size=30000
# 创建大小为 30GB 的主分区，此分区即为 Windows 分区。

format quick fs=ntfs label=”Windows”
# 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Windows。

assign letter=C
# 设置 Windows 分区盘符为 C:。

create partition primary size=10000
# 创建大小为 10GB 的主分区，此分区即为恢复分区。

format quick fs=ntfs label=”Recovery”
# 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Recovery。

set id=de94bba4-06d1-4d40-a16a-bfd50179d6ac
# 设置恢复分区为隐藏分区。

gpt attributes=0x8000000000000001
# 设置恢复分区不能在磁盘管理器中被删除。

exit
# 退出 DiskPart 命令操作界面。
```



## 检测计算机使用固件类型

检测计算机使用何种固件最简单直接的方法是使用磁盘管理器或 DiskPart 命令行工具查看硬盘的分区结构是否具备 ESP 分区以及 MSR 分区。此外，还可以按下 Win+R 组合键，打开“运行”对话框输入 msinfo32 并按 Enter 键，打开“系统信息”，如下图所示，查看右侧列表中的“BIOS 模式”项目值，如果值为传统即为使用 BIOS 固件，如果值为 UEFI 即为使用 UEFI 固件。

![](50abf9ec/5.jpg)



## 制作安装 U 盘 (命令行)

以管理员身份运行命令提示符或 PowerShell 并输入 diskpart 进入其工作环境，然后执行如下命令。

```powershell
list disk
# 显示连接到计算机的硬盘列表。

select disk 2
# 本节示例插入的是一个 8G 的U盘，所以选择磁盘1。

clean
# 清除选中磁盘中的数据。

create partition primary
# 在U盘上创建主分区。

active
# 设置刚才创建的分区为活动分区。

format quick fs=ntfs
# 使用快速格式化方式格式化U盘并使用 NTFS 文件系统。

assign
# 为U盘分配盘符。

exit
# 退出 DiskPart 命令行工具。
```

解压 Windows 10 操作系统安装 ISO 文件至任意目录或使用文件资源管理器挂载镜像文件至虚拟光驱。本节示例挂载镜像文件到 F 盘，U 盘盘符为 G，然后继续在命令提示符中执行如下命令复制操作系统安装文件至U盘：

```powershell
xcopy F:\*.* /e g:
```

等待文件复制完毕，启动U盘即制作成功。



## 基本磁盘转换为动态磁盘

关于将基本磁盘转换为动态磁盘，请务必注意以下两点：

- 将基本磁盘转换为动态磁盘后，基本磁盘上全部现有主分区、扩展分区、逻辑分区都将变为动态磁盘上的简单卷。
- 在转换硬盘之前，请关闭运行在该硬盘上的所有程序。

### 使用图形界面

Windows 10 操作系统中，使用磁盘管理工具即可完成硬盘配置转换，操作步骤如下：

1. 按下 Win+X 组合键，在出现的菜单中选择“磁盘管理”，或者在“运行”对话框 中输入 diskmgmt.msc 并回车，打开磁盘管理操作界面。

2. 在下图中，选择要转换为动态磁盘的硬盘，然后单击右键在出现的菜单中选择 “转换到动态磁盘”。

   ![](50abf9ec/6.jpg)

3. 在出现的“转换为动态磁盘”界面中选择需要转换的硬盘，Windows 10 操作系统支持同时转换多个硬盘为动态磁盘。

4. 在磁盘转换确认界面中，核对要转换的硬盘是否正确，同时也可以单击 “详细信息”查看该硬盘的分区信息，然后单击“转换”，此时磁盘管理工具会提示， 如果转换该硬盘为动态磁盘将不能启动安装在该硬盘分区中的操作系统，由于转换的硬盘中无 Windows 分区，所以单击“是”继续进行转换。

5. 转换完成之后，操作系统不做任何提示，在磁盘管理界面中可查看之前使用基本磁盘配置的磁盘1已经被标注为动态，而且所属三个分区由之前蓝色主分区变成棕黄色的简单卷，标志硬盘配置转换成功。

### 使用 PowerShell 或命令提示符

使用 Windows 10 操作系统自带的命令行工具 DiskPart 同样可以完成转换任务。按下 Win+X 组合键，然后在出现的菜单中选择“Windows PowerShell（管理员）”或“命令提示符（管理员）”，在打开的 PowerShell 界面中执行如下命令。

```powershell
diskpart
# 运行 DiskPart 工具

list disk
# 显示所有联机的硬盘，并记下要转为动态磁盘的硬盘磁盘号，这里以转换磁盘1为例。

select disk 1
# 选择磁盘1为操作对象。

convert dynamic
# 对磁盘1进行转换操作，此步骤无任何提示，执行之前请认真核对磁盘信息是否正确。执行命令之后，等待程序执行完成提示，然后退出 DiskPart 命令环境即可。
```

**Tip：不能将安装有 Windows 10 操作系统的硬盘转换为动态磁盘，否则操作系统将无法启动。**



## 动态磁盘转换为基本磁盘

基本磁盘可以直接转换为动态磁盘，存储的数据完成无损，但是该过程单向不可逆。要想转回基本磁盘，只有把存储在该硬盘中的数据全部拷出，然后删除该硬盘上的卷才能转回基本磁盘。

### 使用图形界面

打开磁盘管理器界面，在需要进行转换的硬盘上依次选中其中的卷，然后单击右键并在出现的菜单中选择“删除卷”，待最后一个卷删除之后，该硬盘配置即可变成基本磁盘。

**Tip：删除卷之前请确保数据已转移或备份，此过程会清空硬盘所有数据。**

### 使用 PowerShell 或命令提示符

使用 Windows 10 操作系统自带的命令行工具 DiskPart 同样可以完成转换任务。按下 Win+X 组合键，然后在出现的菜单中选择“Windows PowerShell（管理员）”或“命令提示符（管理员）”，在打开的 PowerShell 界面中执行如下命令。

```powershell
diskpart
# 运行 DiskPart 工具。

list disk
# 显示所有联机的硬盘，并记下要转为基本磁盘的硬盘磁盘号，这里以转换磁盘1为例。

select disk 1
# 选择磁盘1为操作对象。

detail disk
# 显示该硬盘下所有卷的信息。

select volume 0
# 选中要删除的卷。

delete volume
# 删除选中的卷，如果硬盘有多个卷，分别选中删除即可。

convert basic
# 所有卷删除完毕之后，输入如上命令，等待程序提示完成，即可完成转换操作。
```



## 创建简单卷 [命令行]

简单卷是硬盘的逻辑单位，类似于基本磁盘中的分区。如果是从单个动态磁盘中对现有的简单卷进行扩展后（扩展的部分和被扩展的简单卷在同一个磁盘中），也称之为简单卷。简单卷是动态磁盘默认的卷类型且不具备容错能力。

```powershell
diskpart
# 运行 DiskPart 工具。

list disk
# 显示连接到计算机的所有硬盘，然后记下要创建简单卷的硬盘的磁盘号。

create volume simple size=15000 disk=2
# 创建简单卷。这里以在第三块硬盘上创建一个 15GB 大小的简单卷为例。如果不指定 size 参数即代表使用硬盘上所有未分配空间。

assign letter=F
# 指定盘符为 F。也可以使用 assign 命令自动分配盘符。

exit
# 退出 DiskPart 命令行工具

format f: /fs:ntfs
# 对刚创建的简单卷进行格式化操作，按照提示完成格式化操作之后即可使用该简单卷。
```



## 创建跨区卷 [命令行]

跨区卷是将多个硬盘的未使用空间合并到一个逻辑卷中，这样可以更有效地使用多个硬盘上的空间。如果包含一个跨区卷的硬盘出现故障，则整个卷将无法工作，且其上的数据都将全部丢失，跨区卷不具备容错能力。跨区卷只能使用 NTFS 文件系统，不能扩展使用 FAT 文件系统格式化的跨区卷。跨区卷最多能使用 32 个采用动态磁盘配置的硬盘空间。创建跨区卷最少需要两块硬盘，本节以两块 30GB 大小硬盘为例。

```powershell
diskpart
# 运行 DiskPart 工具。

list disk
# 显示所有联机的硬盘，并记录要创建跨区卷的硬盘磁盘号，这里以把磁盘1的空间扩展到磁盘2上为例。

create volume simple size=5000 disk=1
# 首先在磁盘1上创建大小为 5000MB 的简单卷。

list volume
# 显示要扩展到其他硬盘上的简单卷的卷号，这里卷号为5。

select volume 5
# 选择要扩展到其他硬盘上的简单卷。

extend size=5000 disk=2
# 将选择的卷扩展到磁盘2，并设定扩展大小为 5000MB。

format quick fs=ntfs
# 对扩展后的跨区卷进行格式化，格式化方式为快速格式化，使用 NTFS 文件系统。

assign
# 自动分配盘符，同时也可以使用 assign latter=X 命令指定盘符。盘符创建完成之后跨区卷也创建成功
```



## 创建带区卷 [命令行]

带区卷是将两个或更多硬盘上的可用空间区域合并到一个逻辑卷的组合方式。带区卷和跨区卷类似，但是带区卷使用 RAID-0 磁盘阵列配置模式，因此，在向带区卷中写入数据时，数据被分割成 64KB 的数据块，然后同时向阵列中的每一块硬盘写入不同的数据块，从而可以在多个硬盘上分布数据，此种数据存储方式显著提高了硬盘效率和读写性能。

带区卷不能被扩展或镜像，且不具备容错能力，因此，带区卷一旦创建成功就无法重新调整其大小。如果包含带区卷的其中一个硬盘出现故障，则整个带区卷将无法正常使用。当创建带区卷时，最好使用相同大小、型号和制造商的硬盘。

尽管不具备容错能力，但带区卷是所有 Windows 磁盘管理策略中性能最好的卷类型， 同时它通过在多个硬盘上分配 I/O 请求从而提高了 I/O 性能。

```powershell
diskpart
# 运行 DiskPart 工具。

list disk
# 显示所有联机的硬盘，并记录要创建带区卷的硬盘磁盘号，这里以使用磁盘1和磁盘2创建带区卷为例。

create volume stripe size=5000 disk=1,2
# 创建大小为 5000MB 的带区卷。

format quick fs=ntfs
# 对创建后的带区卷进行格式化，格式化方式为快速格式化，使用 NTFS 文件系统。

assign
# 自动分配盘符，同时也可以使用 assign latter=X 命令指定盘符。盘符创建完成之后带区卷也创建成功
```



## 创建镜像卷 [命令行]

镜像卷具备容错能力，其使用 RAID-1 磁盘阵列配置模式，通过创建两份相同的卷副 本，来提供冗余性确保数据安全。操作系统写入到镜像卷上的所有数据，都被同时写入到位于独立的物理硬盘上的两个镜像卷中。也就是说有两块硬盘，写入数据时操作系统会同时向这两块硬盘写入相同的数据，如果其中一个物理硬盘出现故障，则该故障硬盘上的数据将不能正常使用，但是操作系统可以使用另外一块无故障的硬盘继续读写数据。

和带区卷一样，镜像卷一旦创建成功就无法重新调整其大小，如果要调整大小只能删除现有镜像卷然后重新创建镜像卷。

```powershell
diskpart
# 运行 DiskPart 工具。

list disk
# 显示所有联机的硬盘，并记录要创建镜像卷的硬盘磁盘号，这里以使用磁盘1和磁盘2创建镜像卷为例。

select disk 1
# 选择磁盘1为操作对象。

create volume simple size=5000 disk=1
# 在磁盘1上创建大小为 5000MB 的简单卷。

add disk 2
# 添加磁盘2到刚创建的简单卷，组成镜像卷。

format quick fs=ntfs
# 对创建后的带区卷进行格式化，格式化方式为快速格式化，使用 NTFS 文件系统。

assign
# 自动分配盘符，同时也可以使用 assign latter=X 命令指定盘符。盘符创建完成之后镜像卷也创建成功
```



## 文件压缩

使用文件压缩功能是需注意以下几点内容：

- 文件压缩属于 NTFS 文件系统的内置功能，文件压缩和解压缩过程完全透明，无需用户干预。
- 文件压缩与解压缩过程需要消耗 CPU 资源，对于计算机性能有一定影响。
- 经过文件压缩的文件通过网络传输时，会丢失压缩属性并恢复原始大小。所以 NTFS 文件压缩功能与第三方压缩应用程序无法互相替代。
- 当对硬盘分区启用文件压缩功能，此后只要是存储于该分区的文件或文件夹会自动进行压缩。
- 在同一个 NTFS 分区中复制文件或文件夹时，文件或文件夹会自动继承目标位置文件夹的压缩属性，移动文件或文件夹则会保留原有压缩属性。
- 在不同 NTFS 分区之间对文件或文件夹进行移动、复制操作时，文件或文件夹会继承目标位置的文件夹的压缩属性
- 复制或移动压缩文件或文件夹至非 NTFS 分区时，文件或文件夹会丢失压缩属性并恢复原始大小。

### 图形界面

对文件或文件夹启用文件压缩只需选中要压缩对象并单击右键，在出现的菜单中选择 “属性”，然后在属性常规选项卡中选择“高级”，打开“高级属性”界面，勾选“压缩内容以便节省磁盘空间”复选框，如图 7-55 所示，最后单击“确定”即可完成文件或文件夹压缩。

文件或文件夹压缩完成后，其图标右下方会出现两个相对的蓝色箭头，以示与其他类型文件区别，如图 7-56 所示。

![](50abf9ec/7.jpg)

### 命令行

使用 compact 命令行工具同样可以完成文件或文件夹的压缩。以管理员身份运行命令提示符，执行 compact/? 即可查看 compact 命令行工具所有参数。

如果要压缩或解压缩文件夹只需执行如下命令：

```powershell
compact /C /S: 文件夹名称或文件夹路径（压缩）
compact /U /S: 文件夹名称或文件夹路径（解压缩）
```

如果只是压缩或解压缩文件，执行如下命令即可：

```powershell
compact /C 文件名或文件路径（压缩）
compact /U 文件名或文件路径（解压缩）
```

Windows 10 操作系统中，compact 命令行工具新增了 /EXE 参 数， 可对可执行文件进行压缩算法定制压缩，compact 提供 XPERSS4K（最快）、XPERSS8K、 XPERSS16K、LZX 四种压缩算法，其中 XPERSS4K 为默认压缩算法，LZX 为压缩程度最高的压缩算法。

本节以使用 LZX 算法压缩 exe 文件为例，执行如下命令即可：

```powershell
compact /C /EXE:LZX 文件名或文件路径
```

解压缩执行如下命令：

compact /U /EXE:LZX 文件名或文件路径

**Tip：使用 /EXE 参数压缩可执行文件之后，文件名称不会变成蓝色。**



## NTFS文件链接

### 硬链接（Hard Link）

硬链接（Hard Link）是指为一个文件创建一个或多个文件名，各文件名地位相等，删除任意一个文件名下的文件，对另外一个文件名的文件都没有任何影响，而且一个文件名下的文件更新，另外一个文件名下的文件也会同时更新。

使用硬链接时需注意如下内容：

- 硬链接只能链接非空文件，不能链接文件夹。
- 硬链接文件图标和普通文件图标相同，硬链接属于透明过程。
- 硬链接只能建立同一 NTFS 分区内的文件链接。
- 移除源文件不会影响硬链接。
- 删除其中一个硬链接不会影响源文件。
- 硬链接文件的任何更改都会影响源文件。
- 硬链接不占用硬盘空间。

创建硬链接需要使用 mklink 命令行工具完成。以管理员身份运行命令提示符，执行如下命令：

```powershell
mklink /H lizhipeng1.txt lizhipeng.txt
```

其中 lizhipeng1.txt 为创建的硬链接名称，可为其指定保存路径；lizhipeng.txt 为源文件， 等待命令执行完毕会提示创建成功

要删除硬链接，只需保留一个文件，删除其他文件即可。

### 软链接（Junction Link）

软链接又称联接，只支持文件夹的链接，不支持文件的链接。软链接在创建时不管使 用相对路径还是绝对路径，创建后全部转换为绝对路径。

使用软链接时需注意如下内容：

- 软链接只能链接文件夹，不能链接文件。
- 软链接文件图标和快捷方式图标相同。
- 软链接只能建立同一 NTFS 分区内的文件夹链接。
- 移除源文件夹会导致软链接无法访问。
- 删除软链接不会影响源文件夹。
- 软链接中的文件进行任何更改都会影响源文件。
- 软链接不占用硬盘空间。

创建软链接同样可以使用 mklink 命令行工具，以管理员身份运行命令提示符，执行如下命令：

```powershell
mklink /J lizhipeng1 lizhipeng
```

其中 lizhpneg1 为软链接名称，可为其指定保存路径，lizhipeng 为源文件夹名称，等待命令执行完毕会提示创建成功

软链接文件夹和快捷方式图标相同，如何去区别两者呢？在命令提示符下定位到软链接所在目录，然后执行 dir 命令，会显示当前目录下的文件或文件夹信息，其中有 JUNCTION 字样的即为软链接

![](50abf9ec/8.jpg)

删除软链接只需删除创建的软链接文件即可。

### 符号链接（Symbolic Link）

符号链接支持文件和文件夹，功能上最为类似快捷方式，但区别在于打开快捷方式会跳转回源文件路径，而符号链接则不会跳转，而使用创建后的路径。符号链接在创建的时候可以使用相对路径和绝对路径，创建链接后所对应的也是相对路径和绝对路 径。绝对路径在源文件不移动的情况下允许使用，而相对路径是相对于两个文件的路径，所以两个文件的相对位置没有改变就不会导致链接错误。

使用符号链接时需注意如下内容：

- 符号链接可以链接文件和文件夹。
- 符号链接文件图标和快捷方式图标相同。
- 符号链接可以跨 NTFS 分区创建文件或文件夹链接。
- 删除或移动源文件或文件夹，符号链接失效。
- 删除或移动链接文件不会影响源文件。
- 符号链接中的文件进行任何更改都会影响源文件
- 符号链接可以指向不存在的文件或文件夹。创建符号链接时，操作系统不会检查文件或文件夹是否存在。
- 符号链接不占用硬盘空间。

创建符号链接同样可以使用 mklink 命令行工具完成，在命令提示符中执行如下命令即可创建文件和文件夹的符号链接：

- 创建文件的符号链接

  ```powershell
  mklink lizhipeng1.txt D:\test\lizhipeng.txt
  ```

  其中 lizhipeng1.txt 为符号链接，D:\test\lizhipeng.txt 为源文件路径。

- 创建文件夹的符号链接

  ```powershell
  mklink /D lizhipeng1 D:\test\lizhipeng
  ```

  其中 lizhipeng1 为符号链接，D:\test\lizhipeng 源文件夹路径。

查看文件或文件夹是否为符号链接，只需在命令提示符下执行 dir 命令就会显示当前目录下的文件或文件夹信息，其中有 SYMLINKD（文件夹）或 SYMLINK（文件）字样的即为符号链接

删除符号链接只需删除符号链接文件夹或文件即可。



## Windows Subsystem for Linux 设置

Windows Subsystem for Linux（WSL）默认安装于 C:\Users\ 用户名 \AppData\Local\ Lxss\ 目录。该目录为隐藏目录，需要在文件资源管理器中直接输入地址访问，其中 Ubuntu on Windows 安装于该目录下的 rootfs 文件夹中

此外，还有 bash.exe 与 lxrun.exe 两个常用命令行程序来管理 WSL，可以在命令提示符或 PowerShell 中运行

**bash.exe 用于启动 Bash on Ubuntu on Windows 并运行 /bin/bash**

|         命令          |                             描述                             |
| :-------------------: | :----------------------------------------------------------: |
|         bash          | 在当前目录启动 bash shell，如果 bash 没有安装，自动执行 lxrun / install 命令进行安装 |
|        bash ~         |    启动 bash，并切换到用户的 Ubuntu 主目录，类似执行 cd ~    |
| bash -c "\<command\>" |          执行命令、打印输出结果，例如：bash -c “ls”          |

**lxrun.exe 用于管理 WSL，可以用来安装或卸载 Ubuntu 镜像**

|       命令       |                             描述                             |
| :--------------: | :----------------------------------------------------------: |
|      lxrun       |                        管理 WSL 实例                         |
|  lxrun /install  |                安装 Bash on Ubuntu on Windows                |
| lxrun /uninstall | 卸载并删除 Ubuntu。默认不删除用户的 Ubuntu 主目录 /full 参数会卸载并删除用户的 Ubuntu 主目录 |



## Hyper-V 虚拟机

### 开启 Hyper-V

Windows 10操作系统中默认没有启用 Hyper-V，需要用户手动启用，启用方法有如下两种：

- 使用 Cortana 中搜索“启用或关闭 Windows 功能”并打开。然后在打开的“Windows 功能”界面中勾选“Hyper-V”，然后单击“确定”，最后等待操作系统安装完成，重新启动计算机之后即可使用 Hyper-V。

  ![](50abf9ec/9.jpg)

- 在操作系统中挂载 Windows 10 操作系统安装镜像文件到虚拟光驱或插入操作系统安装光盘，这里以 H 为虚拟光驱盘符为例，然后以管理员身份运行命令提示符执行如下命令。

  ```powershell
  dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /Source:H:\sources\sxs
  ```

  等待命令执行完毕，最后按照提示重新启动计算机

### 创建虚拟机并安装操作系统

安装 Hyper-V 之后，可以创建虚拟机并在虚拟机上安装操作系统。Hyper-V 管理器提供了一站式的创建虚拟机向导，通过向导可以快捷轻松的创建虚拟机。

1. 在 Hyper-V 管理器右侧“操作”窗格中，单击“新建”，然后选择“虚拟机”，运行“新建虚拟机向导”。向导第一页为创建 Hyper-V 虚拟机注意事项，可勾选左下角 “不再显示此页”选项，下次创建虚拟机时将不再显示，然后单击“下一步”

   ![](50abf9ec/10.jpg)

2. 在“指定名称和位置”页中，设置创建的虚拟机名称以及存储位置。这里要注意的是，创建的虚拟机文件会比较大，文件默认存储于 C 盘，所以请注意存储虚拟机的硬盘分区可用空间。然后单击“下一步”。

   ![](50abf9ec/11.jpg)

3. 选择虚拟机版本。虚拟机版本分为两代，第一代指使用 BIOS 固件， 第二代指使用 UEFI 固件并开启安全启动功能。如果使用第二代虚拟机，则默认情况下只能安装 Windows 8 操作系统以后的操作系统版本，虚拟机一旦创建即无法修改版 本。这里选择第一代，然后单击“下一步”。

   ![](50abf9ec/12.jpg)

4. 在“分配内存”页中，设置虚拟机启动内存大小。在 Hyper-V 中虚拟内存最小可设置为 8MB，最大可为物理内存容量的 70%，请根据所要安装操作系统的要求合理设置虚拟内存大小。Hyper-V 支持动态内存，所谓动态内存就是针对不同虚拟机，在指定的内存范围内根据虚拟机中的应用优先级来自动调整虚拟机对物理内存的占用大小，在应用性能和内存占用大小方面进行自动平衡，以达到性能优化的目的。建议启用此功能，然后单击“下一步”。

   ![](50abf9ec/13.jpg)

5. 在“配置网络”页中，选择虚拟机连接网络所用到的网络交换机。 如果是第一次使用 Hyper-V，保持此页默认设置，然后单击“下一步”。

   ![](50abf9ec/14.jpg)

6. 在“连接虚拟硬盘”页中，指定要创建虚拟硬盘（VHD）的名称、位置以及大小。 虚拟磁盘用来安装操作系统，同时也可以使用已创建的虚拟磁盘。 虚拟硬盘大小按照使用需要合理设置即可。

   ![](50abf9ec/15.jpg)

7. 在”安装选项”页上，选择“从启动 CD/DVD-ROM 安装操作系统”。安装媒介可以选择物理驱动器中的安装光盘，也可以选择使用操作系统安装镜像文件，还可以选择在创建完虚拟机后再安装操作系统。选择相应选项之后，单击“下 一步”，随后会出现虚拟机的设置摘要，核对虚拟机设置信息，最后单击“完成”。此时，Hyper-V 开始自动按照设置的虚拟机参数开始创建虚拟机，等待完成即可。

   ![](50abf9ec/16.jpg)

### 虚拟机管理

- **Ctrl+Alt+Delete** ：顾名思义，就是实现 Ctrl+Alt+Delete 组合键的功能

- **启动**：按下此按钮即可启动虚拟机。

- **强制关闭**：相当于物理机上的电源按钮，操作系统无法通过正常途径关闭时，可以使用此按钮。

- **关闭**：软关机按钮，用来关闭虚拟机的功能按钮。使用此按钮的前提是必须要安装系统集成服务。

- **保存**：保存当前计算机的状态并关闭虚拟机，类似于挂起功能。

- **暂停**：暂时冻结虚拟机运行，并且释放所占用的 CPU 等资源。

- **重置**：重置虚拟机中的操作系统至首次安装后的状态，类似于手机的恢复出厂设置功能。

- **检查点**：检查点是将虚拟机在特定时刻的状态、磁盘数据和配置等做快照，如果虚拟机系统出现崩溃之类的错误，可以使用检查点备份还原至正常状态，检查点功能类似于系统还原。首次使用检查点功能将保存当前虚拟机所有状态，之后创建的检查点将采用增量方式进行存储，用以减小检查点所占存储空间。

- **还原**：使用最近的检查点还原虚拟机。

- **增强会话**：在 Windows 8.1 操作系统之前的 Hyper-V 中，用户无法通过虚拟机连接工具实现物理机与虚拟机之间的文件复制与粘贴操作，如要实现文件复制粘贴操作，需要使用远程桌面连接程序连接至虚拟机才能进行此类操作。在虚拟机中也无法实现声音播放以及使用 USB 设备的功能，但是 Windows 8.1 和 Windows 10 操 作系统中为 Hyper-V 添加了增强会话功能，开启增强会话功能之后，可进行如下操作：

  - 使用剪切板。
  - 定向虚拟机声卡至物理机。
  - 可使用物理机智能卡。
  - 可使用物理机 USB 设备。
  - 可使用物理机打印机。
  - 支持即插即用设备。
  - 可使用物理机硬盘分区。

  开启 Hyper-V 虚拟机连接增强会话模式有如下几点要求：

  - 虚拟机使用第二代版本。
  - 虚拟机操作系统必须是 Windows 8 以上版本。
  - 打开服务器增强会话模式。
  - 打开用户增强会话模式。

### 在 Hyper-V 中使用虚拟硬盘（.VHD 或 .VHDX 文件）

Windows 10 操作系统支持 VHDX 格式虚拟硬盘文件且支持从 VHDX 文件启动 （Windows 10 之前的操作系统不支持从 VHDX 文件启动），VHDX 相对于 VHD 的优点是可以创建最大 64TB 的虚拟硬盘。而且由于 Windows 10 操作系统具有更好的跨平台移动性，所以一个能在实机上启动的 VHD/VHDX 文件可以直接在 Windows 10 操作系统自己的 Hyper-V 虚拟机中启动运行。使用“新建虚拟机向导”创建的虚拟硬盘即为 VHDX 文件。

在“新建虚拟机向导”中的“连接虚拟硬盘”页，可以选择“使用现有虚拟硬盘”来启动已安装了操作系统的 VHDX 文件，配置好其他设置之后单击 “完成”，然后运行虚拟机即可使用。

![](50abf9ec/17.jpg)

### 配置 Hyper-V 虚拟网络

Hyper-V 是通过模拟一个标准的（ISO/OSI 二层）交换机来支持以下三种网络模式：

- **外部**：让虚拟机同外部网络连通。Hyper-V 通过将 Microsoft 虚拟交换机协议绑定至物理机网卡实现连接外部网络功能。如果虚拟机选择使用采用外部模式的虚拟交换机，则虚拟机相当于连接至外部网络（Internet）中的一台计算机，其可以与外部网络中的其他计算机进行相互访问。例如在由路由器设备组建的物理局域网络中，路由器会为虚拟机分配和物理机同等网段的 IP 地址。
- **内部**：使虚拟机使用由物理机作为网络设备组建的内部网络。使用此模式的虚拟交换机，要使虚拟机和物理机网络互通，需要物理机先行配置内部网络网关、子网掩码和 IP 地址，然后在虚拟机中设置相对应的 IP 地址、网关和子网掩码，此时虚拟机才能与物理机网络互通。默认情况下只允许虚拟机与物理主机互相访问，不能访问外部（物理网络上的计算机或外部网络如 Internet），外部也不能访问内部的虚拟机。如要使虚拟机访问网络，只需在物理机中对内部虚拟交换机启用网络共享功能即可。
- **专用**：只允许虚拟机之间互相访问，与物理机之间也不能相互访问。

由于 Hyper-V 的网络架构不同，所以必须要手动配置网络连接，虚拟机与物理机才能网络互通。本节以设置外部模式交换机为例，操作步骤如下：

1. 在 Hyper-V 管理器右侧“操作”窗格中选择“虚拟交换机管理器”，在随后出现的虚拟交换机管理界面中，选择要创建虚拟交换机类型，这里选择“外部”类型，然后单击“创建虚拟交换机”

   ![](50abf9ec/18.jpg)

2. 在虚拟交换机属性页面中，可以选择虚拟交换机连接至物理机哪个网络设备。这里选择当前物理计算机正在使用的网卡。然后单击“确定”，虚拟交换机创建完毕。

   ![](50abf9ec/19.jpg)

3. 打开虚拟机设置页面。在左侧一栏中选择“网络适配器”，打开网络适配器配置页面，页面顶端可以看到关于虚拟交换机的选项，在下拉列表中选择上一步创建的交换机，然后单击“确定”，等程序配置完毕之后，路由器等网络设备自动为虚拟机分配 IP 地址，虚拟机即可连接至 Internet。

   ![](50abf9ec/20.jpg)

创建虚拟交换机之后，打开物理机网络连接设置界面，即可看到创建的虚拟交换机， 可以像对待物理设备一样对其进行设置。

![](50abf9ec/21.jpg)



## 虚拟磁盘（VHD）

![](50abf9ec/22.jpg)

在 Windows 10 操作系统中支持新版虚拟磁盘文件即 VHDX 文件，与 VHD 文件相比， VHDX 支持更大的存储空间，还可以在计算机突然断电的情况下提供数据损坏保护， 并且优化动态磁盘和差分磁盘的结构对齐方式，以防止在使用了高级格式化功能（俗称 4K 对齐）的物理磁盘上出现读写性能下降的情况。

### 创建虚拟硬盘

3 种不同的 VHD 文件类型：

- **固定大小**：不会更改 VHD 已分配的存储空间大小。例如创建存储空间大小为 30GB 的 VHD，则无论写入其中的数据是否达到 30GB，都将占用 30GB 的物理硬盘存储空间。推荐将固定类型虚拟硬盘用于生产环境的服务器。

- **动态扩展**：VHD 文件的大小与写入其中的数据的大小相同，也就是给这个 VHD 文件设一个存储容量的上限，向 VHD 写入多少数据，VHD 就动态扩展到相应大小，直到达到 VHD 容量上限。例如创建一个动态类型的 VHD 文件，存储容量上限为 30GB，当向 VHD 写入 10GB 数据时，VHD 文件就有 10GB 大小。动态类型 VHD 文件较小、易于复制， 并且在装载后可将其容量扩展。推荐将动态类型虚拟硬盘用于开发和测试环境。

- **差分 VHD**：创建一个 VHD 文件，然后在里面写入数据，这里称之为父 VHD，然后再创建一个 VHD 文件，并且指向父 VHD，这里称之为子 VHD。挂载子 VHD 到本地计算机中，就会发现里面的数据和父 VHD 中的数据一模一样，格式化子 VHD，然后再挂载父 VHD 至本地计算机，会发现文件完好无损。因为父 VHD 为只读文件，因此所有被修改的数据信息都会被保存到子 VHD 中，而且子 VHD 文件的大小动态扩展，只保留和父 VHD 不相同的数据，因此子 VHD 必须是动态类型 VHD 文件，父 VHD 可以是固定、动态、差分文件类型中的任意一种，多个差分 VHD 可形成一个差分链。

  使用差分 VHD 之前，需注意如下几点内容：

  - 不能修改差分 VHD 的父 VHD。如果父 VHD 被修改或由其他 VHD 替换（即使具有相同的文件名），则父 VHD 和子 VHD 之间的块结构将不再匹配，并且差分 VHD 也将损坏。
  - 必须将父 VHD 和子 VHD 同时放在同一个分区的同一个目录中才能用于从本地计算机启动 VHD 文件。如果不从计算机启动 VHD 文件，则父 VHD 可以在不同的分区和目录中，甚至可以在远程共享服务器上。

在使用 DiskPart 命令行工具或磁盘管理器时，可以创建、附加和分离 VHD。这里再介绍一下在创建 VHD 过程中要遇到的这几个操作概念：

- **创建 VHD**：可以创建不同类型和大小的 VHD 文件。创建的 VHD 文件挂载至本地计算机之后， 需要先进行格式化才能使用，同时还可以在 VHD 中创建一个或多个分区，并且使用 FAT/FAT32 或 NTFS 等文件系统格式化这些分区，此过程和对物理硬盘的操作一样。

- **附加 VHD**：附加 VHD 就是把 VHD 文件挂载到本地计算机中，挂载后的 VHD 文件，将作为连接到计算机的本地硬盘显示在文件资源管理器及磁盘工具中。在 VHD 文件右键菜单中的“装载”选项作用和附加功能一样。如果附加 VHD 时，该 VHD 已被格式化，则操作系统会为此 VHD 分配盘符，此过程和计算机插入 U 盘或移动硬盘的过程一样。

  注意事项：

  - 必须具有管理员权限才能附加 VHD 文件。
  - 只能附加存储在 NTFS 分区上的 VHD 文件。VHD 文件可以存储在 FAT/FAT32、 exFAT、NTFS 等文件系统的分区中，如果要附加 VHD 文件，则 VHD 文件必须要存在于 NTFS 分区。
  - 不能附加已经使用 NTFS 压缩或使用 EFS 加密的 VHD 文件。如果文件系统支持压缩和加密，则可以压缩或加密 VHD 中的分区。
  - 不能将两个已附加的 VHD 文件配置为动态扩展 VHD。动态扩展 VHD 是一种已初始化用于动态存储的物理硬盘，它包含动态卷，例如简单卷、跨区卷、带区卷、镜像卷和 RAID-5 卷。
  - 不能附加存储在网络文件系统（NFS）或文件传输协议（FTP）服务器中的 VHD 文件，但是可以附加服务器消息块（SMB）共享上的 VHD 文件。
  - 无法使用远程 SMB 共享上的客户端高速缓存来附加 VHD。如果使用网络文件共享来存储要远程附加的 VHD 文件，则更改共享的高速缓存属性以禁用自动高速缓存。
  - 只能附加两层嵌套的 VHD。所谓嵌套就是在一个已被附加 VHD 文件中再附加一 个 VHD 文件。嵌套 VHD 最多只能有两层，也就是说可以在一个已经被附加的 VHD 文件中再附加一个 VHD 文件，但无法继续附加第三个 VHD 文件。
  - 重新启动计算机之后，操作系统不会自动附加重启前已被附加的 VHD 文件。

- **分离 VHD**：分离就是指断开操作系统和 VHD 文件的连接，相当于从计算机弹出 U 盘或移动硬盘 的操作。

#### 创建普通虚拟硬盘

- 使用磁盘管理器创建普通 VHD 操作步骤如下：

  1. 按下 Win+X 组合键，在出现的菜单中选择“磁盘管理”。

  2. 在磁盘管理器的“操作”菜单下选择“创建 VHD”选项，打开创建和附加虚拟磁盘程序

     ![](50abf9ec/23.jpg)

  3. 在创建和附加虚拟磁盘程序中，单击“浏览”选择 VHD 文件的存储目录并且命名 VHD 文件。VHD 大小根据使用情况合理设置即可，默认以 MB 为单位。上节已经介绍过 VHD 的两种格式，如果只是在 Windows 8 或 Windows 10 操作系统中使用 VHD， 则推荐采用 VHDX 文件格式，此时虚拟硬盘 VHD 类型操作系统默认使用动态扩展。 如果考虑到 VHD 的兼容性，要在 Windows 7 操作系统中使用此 VHD，则推荐使用 VHD 文件格式，VHD 类型默认推荐为固定大小。这里选择 VHD 为 VHDX 文件格式，VHD 类型为动态扩展，单击“确定”，开始创建 VHD。

  4. 创建完成 VHD 之后，磁盘管理器会自动附加此 VHD，但是该 VHD 没有被初始化， 也就是不能被逻辑磁盘管理器访问，所以也不会在文件资源管理器中显示此 VHD

     ![](50abf9ec/24.jpg)

  5. 在磁盘列表中选择已被附加的 VHD（也就是列表中的磁盘 2）并单击右键，在弹出的菜单中选择“初始化磁盘”选项，然后在初始化磁盘界面中勾选磁盘 2，如果有多个 VHD 可以同时进行初始化操作，磁盘分区格式选择默认即可，然后 单击“确定”即可完成 VHD 初始化。

  6. 初始化 VHD 完成之后，在磁盘管理器的磁盘列表中就会看到 VHD 的当前状态为联机，此时要对其设置文件系统并进行格式化操作，也就是创建分区，这样才能在文件资源管理器中使用 VHD。在 VHD 上单击右键并在出现的菜单中选择新建“简单卷” 选项，然后按提示完成操作即可。在 VHD 上创建分区完成之后，操作系统会自动打开创建的 VHD，到此正式完成 VHD 创建。

- 如果使用 DiskPart 命令行工具创建 VHD。以管理员身份运行命令提示符输入 diskpart 命令进入其工作环境，这里以创建大小为 3GB、使用 VHDX 文件格式、固定类型、文件名为 Win10 的 VHD 文件为例，执行如下命令：

  ```powershell
  create vdisk fi le=D:\win10.vhdx maximum=3000 type=fi xed
  # 创建 VHD 文件，VHD 容量为 3GB，使用固定类型。
  
  list vdisk
  # 显示虚拟磁盘列表。
  
  select vdisk fi le=D:\win10.vhdx
  # 选择创建的 VHD 文件。
  
  attach vdisk
  # 附加 VHD。
  
  create partition primary
  # 在 VHD 中创建主分区。
  
  assign letter=K
  # 为创建的分区分配盘符为 K。
  
  format quick label=vhd fs=ntfs
  # 设置分区使用 NTFS 文件系统、卷标为 vhd 并快速格式化分区。格式化完成之后操作系统会自动打开创建的分区。
  ```

#### 创建动态虚拟硬盘

动态虚拟硬盘的创建和普通虚拟硬盘的创建步骤一样。使用磁盘管理器创建 VHD 时， 虚拟磁盘类型选择动态扩展即可。

使用 DiskPart 命令行工具时，执行如下命令即可创建动态扩展类型的 VHD 文件：

```powershell
create vdisk fi le=D:\Win10.vhdx maximum=3000 type=expandable
```

#### 创建差分虚拟硬盘

创建差分 VHD，执行如下命令即可：

```powershell
create vdisk fi le=D:\chafen.vhdx parent=D:\Win10.vhdx
# Win10.vhdx 是已经创建的父 VHD 文件，chafen.vhdx 为新创建的子 VHD 文件
```

**Tip：创建差分 VHD 时，要确保父 VHD 文件已分离。**

使用差分 VHD 时，由于父 VHD 文件为只读，所以只要对子 VHD 文件备份，可以做到对父 VHD 的秒备份、秒恢复。新创建的子 VHD 只有 4M 大小，所以备份和还原都很方便。

### 安装操作系统到虚拟硬盘

使用 Windows 安装程序无法安装操作系统到 VHD 的分区，所以需要使用操作系统提供的命令行工具来手动安装操作系统到 VHD 的分区中。手动安装需要使用 DISM 命令行工具，此工具用来展开 Windows 安装文件到 VHD 分区。本节以安装 Windows 8 操作系统至 VHD 为例，安装操作步骤如下：

1. 创建一个不小于 30GB 大小的 VHD 文件。由于要在 VHD 中安装操作系统，所以 VHD 文件推荐采用固定类型，然后在 VHD 中使用所有空间创建一个使用 NTFS 文件系统的主分区并设置盘符为 K:。

2. 从 Windows 8 操作系统安装镜像文件或 DVD 安装光盘的 sources 目录中，提取 install.wim 文件至物理硬盘分区中的任意位置，这里提取到的位置为 D 盘根目录。

3. 以管理员身份运行命令提示符，执行如下命令展开 install.wim 中的文件至 VHD 分区。

   ```powershell
   dism /apply-image /imagefi le:d:\install.wim /index:1 /applydir:k:\
   ```

### 从虚拟硬盘启动计算机

复制操作系统安装文件至 VHD 分区，只是整个操作系统安装步骤之一，此后需要使用 BCDedit（启动配置数据存储编辑器）命令行工具创建 VHD 文件启动引导信息， 并将该 VHD 分区中的操作系统添加到物理硬盘上的 Windows 8 操作系统引导菜单， 最后从 VHD 启动其中的操作系统完成最后安装步骤。操作步骤如下：

1. 以管理员身份运行命令提示符，执行如下命令，复制本机操作系统中的现有引导项目，并生成新的标识符（guid），然后修改此引导项作为 VHD 引导项目。引号中间的文字为引导项名称，可以自行设置。

   ```powershell
   bcdedit /copy {default} /d “Windows 8 VHD”
   ```

   命令执行完毕之后会输出 guid，这里获得的 guid 为 {2cb94d76-0cfb-11e5-943cf0def1038eaf}。

2. 执行如下命令，对 VHD 引导项目设置 device 和 osdevice 选项。

   ```powershell
   bcdedit /set {2cb94d76-0cfb-11e5-943c-f0def1038eaf} device vhd=[D:]\Win10.
   vhdx
   bcdedit /set {2cb94d76-0cfb-11e5-943c-f0def1038eaf} osdevice vhd=[D:]\Win10.
   vhdx
   ```

   命令中 vhd 后面接 VHD 文件的存储路径，切记路径盘符要用方括号括起来。

3. 执行如下命令，将 VHD 的引导项目设置为默认引导项目。计算机重新启动时，会自动进入引导菜单并显示计算机上安装的所有 Windows 操作系统引导项目。

   ```powershell
   bcdedit /default {2cb94d76-0cfb-11e5-943c-f0def1038eaf}
   ```

   如果不想设置 VHD 为默认启动项目，则可以输入如下命令既可。

   ```powershell
   bcdedit /set {2cb94d76-0cfb-11e5-943c-f0def1038eaf} detecthal on
   ```

### 磁盘格式转换

#### 使用 PowerShell 命令

在 Cortana 中搜索“PowerShell”或在“开始”菜单的“Windows 系统”文件夹中选择 Windows PowerShell 选项即可打开 PowerShell，本节以转换名为 Win10.vhd 的文件为例。在 PowerShell 中执行如下命令进行磁盘格式转换。

```powershell
convert-VHD -path C:\disk.vhd –destinationPath C:\disk.vhdx
```

上述命令可将 VHD 格式文件转换为 VHDX 格式文件，执行如下命令可将 VHDX 格式文件转换为 VHD 格式文件。

```powershell
convert-VHD -path C:\disk.vhdx –destinationPath C:\disk.vhd
```

#### 使用 Hyper-V 管理器

在 Hyper-V 管理器右侧窗格中选择“编辑磁盘”打开编辑虚拟磁盘向导

### 删除虚拟硬盘

不需要使用 VHD 时，可以删除并释放其所占用的物理硬盘空间，对于只用来存储数据的 VHD，只要在磁盘管理器中使用“分离 VHD”或直接在 VHD 附加到的分区右键菜单中选择“弹出”，断开 VHD 与操作系统的连接，然后删除 VHD 文件即可。

但是，对于安装有操作系统并创建有启动信息的 VHD，仅仅删除 VHD 文件还不能完成将其从本地操作系统中删除，因为 BCD（启动配置数据）中还存储有安装至 VHD 中的操作系统启动信息，执行如下命令即可删除此类信息，启动菜单中也不会再出现此 VHD 的引导选项。

```powershell
bcdedit /delete {guid} /cleanup
```

{guid} 为安装至 VHD 中的操作系统标识符，可以使用 bcdedit /v 命令进行查看

![](50abf9ec/25.jpg)



## 回收休眠文件所占用空间

如果 Windows 分区空间不足，则完全可以关闭休眠功能并回收休眠文件所占空间。以管理员身份运行 PowerShell 并执行如下命令关闭系统休眠功能。

```powershell
powercfg -h off
```

命令执行完成后，操作系统没有任何提示，而且 Windows 分区空间也有所变大，此 时被休眠文件占用的硬盘空间也得到释放。

开启系统休眠功能只需在命令提示符中执行如下命令即可。

```powershell
powercfg -h on
```

如果仅仅是使用基于休眠的快速启动功能，则可以指定 hiberfi l.sys 文件大小，以管理员命令提示符执行如下命令。

```powershell
powercfg /hibernate /size X
```

其中 size 后面的 X 为一个介于 0 到 100 之间的数值，该值表示休眠文件的预设大小 为物理内存的百分比，建议设置 10%-15% 之间



## 制作操作系统安装镜像

本节即介绍如何在保留所有类型应用程序及操作系统设置的情况下制作 WIM 映像文件，使其用于操作系统安装或恢复。

### 系统准备（Sysprep）工具

对于已安装的 Windows 10 操作系统，其会自动生成有关该计算机的特定信息，例如计算机安全标识符（SID），所以要想将已安装的 Windows 10 操作系统移动至其他计算机，必须使用系统准备工具（Sysprep）删除此类特定信息，才能进行操作系统移植。

Sysprep 是用于准备 Windows 安装映像文件的工具，其可以删除已经安装的 Windows 10 操作系统中的 SID、还原点、事件日志等信息，使操作系统处于未初始化状态，该过程称为“一般化”。使用 ImageX、Dism 命令行工具可以将一般化后的操作系统制作为映像文件（WIM 文件）即可进行操作系统的移植安装。

以管理员身份运行命令提示符，并切换至 %WINDIR%\System32\Sysprep 目录，然后输入 sysprep 命令打开系统准备工具。其中系统清理操作分为进入系统全新体验（OOBE）以及进入系统审核模式两种，OOBE 就是进入桌面之前设置帐户等初始化选项的阶段，审核模式适用于计算机生产商定制操作系统，这里不做介绍。下图中的“通用”是指操作系统处理硬件抽象层（HAL）以及删除系统特定信息以便封装的操作系统能在其他计算机上安装使用。关机选项是指 Sysprep 一般化操作系统之后进行的操作，分别有关机、重新启动和退出。

![](50abf9ec/26.jpg)

此外，Sysprep 还可以使用命令完成一般化操作，以下为 Sysprep 命令选项：

sysprep [/oobe|/audit] [/generalize] [/reboot|/shutdown|/quit] [/quiet] [/ unattend:answerfi le]

**Sysprep 命令选项：**

|         选项          |                             描述                             |
| :-------------------: | :----------------------------------------------------------: |
|        /audit         | 重新启动计算机进入审核模式。在审核模式中可以将其他驱动程序或应用程序添加到Windows |
|      /generalize      | 此命令和上面介绍的“通用”选项功能相同，如果使用此选项，所有特定系统信息将从Windows安装中删除 |
|         /oobe         |                  重新启动计算机进入OOBE模式                  |
|        /reboot        |          Sysprep一般化操作系统之后，重新启动计算机           |
|       /shutdown       |            Sysprep一般化操作系统之后，关闭计算机             |
|        /quiet         |                       后台运行Sysprep                        |
|         /quit         |            Sysprep一般化操作系统之后，退出Sysprep            |
| /unattend:answerfi le | 按照应答文件设置，自动完成OOBE过程。answerfile为应答文件路径和文件名 |

这里以使用 OOBE 模式并勾选通用选项作为一般化设置，执行 Sysprep，此时应用程序开始执行，执行完成之后关闭计算机。

### 捕获系统文件并制作 WIM 文件

完成一般化之后，操作系统自动关机，此时重新启动计算机至 WinPE 环境，执行如下命令捕获 Windows 分区为 WIM 文件。

```powershell
dism /capture-image /imagefi le:f:\install.wim /capturedir:d:\ /name:”Windows 10”
```

其中 f:\install.wim 为捕获的 WIM 保存路径及名称，d: 为 Windows 分区盘符， Windows 10 为映像名称。等待命令执行完毕，重新启动计算机或复制 install.wim 至其他计算机。制作的 WIM 文件可用于 WIMBoot 方式安装。

**Tip：基于 WIM 文件特性，可是使用 dism /export-image 命令，可以把多个 WIM 文件打包为同一个 WIM 文件。**

制作成功 WIM 文件之后，可以使用 UltraISO 之类的应用程序打开原版 Windows 10 操作系统安装镜像文件，然后替换 sources 目录中的 install.wim 为自定义的 WIM 文件，文件名必须保持一致。此外，还可以使用微软提供的 cdimage 以及 oscdimg 命令行工具打包操作系统安装文件为镜像文件。



## 高级选项菜单

Windows 10 操作系统同样延续了 Windows 8 操作系统中的系统故障修复选项“高级 选项”菜单，其实这也就是 Windows Vista/7 操作系统中的 Windows RE（Windows 恢 复环境）的升级版，界面同样也完全 Modern 化。

![](50abf9ec/27.jpg)

- **系统还原**：使用创建的系统还原点，还原操作系统到早前的状态，而且还原之前程序会对用户的身份进行确认。

- **系统映像恢复**：使用创建的系统映像，恢复 Windows 分区的所有数据，包括注册表以及应用程序设置。

- **自动修复**：操作系统无法正常启动时，此项功能可以修复大部分的启动故障。

- **命令提示符**：选择此项即可进入命令提示符，对于一些技术达人来说在命令提示符修复计算机快速便捷。

- **启动设置**：启动设置菜单就是旧版 Windows 操作系统中的“Windows 启动菜单”，功能也大体一样。

- **回滚到以前的版本**：如果使用升级方式安装并保留恢复文件，可通过此选项回滚操作系统到以前的版本。

- **UEFI固件设置**：如果计算机使用UEFI固件，则选择此选项会进入UEFI设置界面。如果计算机使用 BIOS 固件，则无此选项。

当 Windows 10 操作系统无法启动，会尝试进行修复，修复完成之后显示“自动修复” 界面，选择其中的“高级选项”即可按照提示选择进入高级选项菜单修复启动故障。如果需要使用菜单中的启动功能，需要使用如下两种方法：

1. 在 Modern 设置中依次打开“更新和安全”-“恢复”，然后在右侧高级启动选项下单击“立即重启”。重新启动计算机之后会自动进入高级选项界面。

   ![](50abf9ec/28.jpg)

2. 微软为 Windows 10 操作系统中的 shutdown 命令行工具提供了一个新的参数 /o，使用此参数可进入高级选项菜单。以管理员身份运行命令提示符并执行如下命令。

   ```powershell
   shutdown /r /o /t 0
   ```
   
   重新启动计算机之后即可进入高级选项菜单。



## 安全模式

安全模式是指操作系统仅运行 Windows 所必需的基本文件和驱动程序的情况下启动计算机，使计算机运行在最小化模式，这样可以方便的检测与修复操作系统故障。当操作系统被安装了恶意程序或中毒之后，大部分的用户会选择进入安全模式来杀毒，或是安装的驱动程序导致计算机无法启动，需要到安全模式下将其删除。

以下有两种方法可以进入安全模式：

1. 打开高级选项菜单并选择“启动设置”选项，然后重启计算机之后即可进入“启动设置”菜单，其中可以选择进入安全模式。

   ![](50abf9ec/29.jpg)

   - **启用调试**：启动时通过串行电缆将调试信息发送到另一台计算机。必须将串行电缆连接到波特率设置为 115200 的 COM1 端口。如果正在或已经使用远程安装服务在该计算机上安装 Windows，则可看到与使用远程安装服务还原或恢复系统相关的附加选项。
   - **启用启动日志记录**：启动计算机，同时将由操作系统加载或没有加载的所有驱动程序和服务记录到启动日志文件，该启动日志文件称为 ntbtlog.txt，位于 %systemroot% 目录。使用安全模式、带网络连接的安全模式和带命令提示符的安全模式时，操作系统会将一个加载所有驱动程序和服务的列表添加到启动日志文件。启动日志对于确定操作系统启动故障原因很有帮助。
   - **启用低分辨率视频**：使用当前安装的显卡驱动程序以最低的分辨率启动计算机。当使用安全模式、带网络连接的安全模式或带命令提示符的安全模式启动时，总是使用基本的显卡驱动程序。
   - **启动安全模式**：只使用基本操作系统文件和驱动程序启动计算机，基本驱动程序主要包括鼠标（串行鼠标除外）、监视器、键盘、大容量存储器、基本视频以及默认系统服务。如果采用安全模式不能成功启动计算机，则可能需要使用 WinRE 来修复操作系统。
   - **启动带网络连接的安全模式**：只使用基本系统文件、驱动程序以及网络连接启动计算机。在安全模式下启动操作系统，包括访问 Internet 或网络上的其他计算机所需的网络驱动程序和服务。
   - **启动带命令提示符的安全模式**：只使用基本的系统文件和驱动程序启动计算机。登录操作系统之后，只出现命令提示符，所有操作都只能在命令提示符中进行。
   - **禁用驱动程序强制签名**：操作系统允许安装包含使用未经验证的签名驱动程序。
   - **禁用预先启动反恶意软件保护**：阻止计算机启动初期运行反恶意软件，从而允许安装可能包含恶意软件的驱动程序。
   - **禁用失败后自动重新启动**：仅当 Windows 10 操作系统启动进入循环状态（即 Windows 10 启动失败，重新启动后再次失败）时，才使用此选项。
   - **启动恢复环境**：重新启动进入 WinRE 恢复环境。

   **Tip：即使已禁用了本地管理员帐户，在使用安全模式时该管理员帐户仍然可用。**

2. 通过 bcdedit 还可以变相的恢复 F8 的功能。以管理员身份运行命令提示符或 PowerShell 并执行如下命令。

   ```powershell
   bcdedit /set {bootmgr} displaybootmenu yes
   ```

   重新启动计算机，操作系统会自动进入 Windows 启动管理器，按下 F8 键即可进入启动设置菜单。

   ![](50abf9ec/30.jpg)



## WIMBoot

WIMBoot 是一种支持从特定 Windows 映像格式文件（WIM 文件）读取并使用操作系统文件的技术，使用 WIMBoot 可以把操作系统文件存储于 WIM 这种压缩文件格式中，其有效的减少了硬盘空间占用率。

![](50abf9ec/31.jpg)

### 使用 WIMBoot 安装操作系统

制作可启动的 Windows 10 操作系统 WIM 文件的过程，通俗说就是安装 Windows 10 操作系统到 WIM 文件。

#### UEFI 与 GPT 启动方式

本节以将 WIM 文件存放至隐藏的恢复分区、Windows 分区为 C 盘为例，需要使用 Windows 10 操作系统安装 U 盘或光盘。

1. 使用 Windows 10 操作系统安装 U 盘或光盘启动计算机，进入 Windows 10 操作系统安装界面。

2. 在 Windows 10 操作系统的安装界面中，按下 Shift+F10 组合键打开命令提示符， 然后使用 DiskPart 命令行工具：

   ```powershell
   select disk 0
   # 选择要创建的分区结构的硬盘为硬盘1，如果有多块硬盘可以使用 list disk 命令查看。
   
   clean
   # 清除硬盘所以数据及分区结构，请谨慎操作。
   
   convert gpt
   # 转换分区表为 GPT 格式。
   
   create partition efi size=300
   # 创建大小为 300MB 的主分区，此分区即为 ESP 分区。
   
   format quick fs=fat32 label=”System”
   # 格式化 ESP 分区并使用 FAT32 文件系统，设置卷标为 System。
   
   create partition msr size=128
   # 创建大小为 128MB 的 MSR 分区。
   
   create partition primary size=30000
   # 创建大小为 30GB 的主分区，此分区即为 Windows 分区。
   
   format quick fs=ntfs label=”Windows”
   # 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Windows。
   
   assign letter=C
   # 设置 Windows 分区盘符为 C:。
   
   create partition primary size=8000
   # 创建大小为 8GB 的主分区，此分区即为恢复分区。
   
   format quick fs=ntfs label=”Recovery”
   # 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Recovery。
   
   assign letter=F
   # 设置恢复分区盘符为 F:，由于恢复分区具备隐藏数据，所以操作系统重启之后，盘符自动失效。
   
   set id=de94bba4-06d1-4d40-a16a-bfd50179d6ac
   # 设置恢复分区为隐藏分区。
   
   gpt attributes=0x8000000000000001
   # 设置恢复分区不能在磁盘管理器中被删除。
   
   exit
   # 退出 DiskPart 命令操作环境。
   ```

3. 分区创建完成之后，继续在命令提示符中执行如下命令，生成包含操作系统文件并能启动的 WIM 文件，这里假设将 Windows 10 操作系统安装镜像的 install.wim 文件复制存储与 D 盘（也可以直接使用原文件）。

   ```powershell
   dism /export-image /wimboot /sourceimagefi le:d:\install.wim /sourceindex:1 /
   destinationimagefi le:f:\wimboot.wim
   ```

4. 生成指针文件（PointerFile），Windows 分区为 C 盘，执行如下命令。

   ```powershell
   dism /apply-image /imagefi le:f:\wimboot.wim /applydir:c: /index:1 /wimboot
   ```

5. 生成引导启动菜单，执行如下命令。

   ```powershell
   bcdboot c:\windows
   ```

6. 重新启动计算机，此时 Windows 10 操作系统进行安装准备，等待其完成之后即可使用。

#### BIOS 与 MBR 启动方式

对于使用 BIOS 与 MBR 方式启动的计算机，WIMBoot 安装方式相同，这里以使用 Windows 10 操作系统安装镜像的 install.wim 文件、WIM 文件存储于隐藏的恢复分区、Windows 分区为 C 盘为例。

1. 使用 Windows 10 操作系统安装 U 盘或光盘启动计算机，进入 Windows 10 操作系统安装界面。

2. 在 Windows 10 操作系统的安装界面中，按下 Shift+F10 组合键打开命令提示符，然后使用 DiskPart 命令行工具创建分区结构。

   ```powershell
   select disk 0
   # 选择要创建的分区结构的硬盘为硬盘1，如果有多块硬盘可以使用 list disk 命令查看。
   
   clean
   # 清除硬盘所以数据及分区结构，请谨慎操作。
   
   create partition primary size=350
   # 创建大小为 350MB 的主分区，此分区即为系统分区。
   
   format quick fs=ntfs label=”System”
   # 格式化系统分区并使用 NTFS 文件系统，设置卷标为 System。
   
   active
   # 设置系统分区为“活动（active）”。
   
   create partition primary size=30000
   # 创建大小为 30GB 的主分区，此分区即为 Windows 分区。
   
   format quick fs=ntfs label=”Windows”
   # 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Windows。
   
   assign letter=C
   # 设置 Windows 分区盘符为 C:。
   
   create partition primary size=8000
   # 创建大小为 8GB 的主分区，此分区即为恢复分区。
   
   format quick fs=ntfs label=”Recovery”
   # 格式化 Windows 分区并使用 NTFS 文件系统，设置卷标为 Recovery。
   
   assign letter=F
   # 设置恢复分区盘符为 F:，由于恢复分区具备隐藏数据，所以操作系统重启之后，盘符自动失效。
   
   set id=27
   # 设置恢复分区为隐藏分区。
   
   exit
   # 退出 DiskPart 命令操作界面。
   ```

3. 分区创建完成之后，继续在命令提示符中执行如下命令，生成含有操作系统文件并能启动的 WIM 文件，这里假设将 Windows 10 操作系统安装镜像的 install.wim 文件复制存储与 D 盘（也可以直接使用原文件）。

   ```powershell
   dism /export-image /wimboot /sourceimagefi le:d:\insatll.wim /sourceindex:1 /
   destinationimagefi le:f:\wimboot.wim
   ```

4. 生成指针文件（PointerFile），Windows 分区为 C 盘，执行如下命令。

   ```powershell
   dism /apply-image /imagefi le:f:\wimboot.wim /applydir:c: /index:1 /wimboot
   ```

5. 生成引导启动菜单，执行如下命令。

   ```powershell
   bcdboot c:\windows
   ```

6. 重新启动计算机，此时 Windows 10 操作系统开始安装，计算机再次重启之后会自动进入 OOBE 阶段，后续安装步骤和普通安装相同，这里不再赘述。

### 检测是否使用 WIMBoot 启动

- 使用磁盘管理器：按下 Win+X 组合键，在出现的菜单中选择“磁盘管理”，打开磁盘管理界面。如果操作系统使用 WIMBoot 功能从 WIM 文件启动，则在 Windows 分区 上具有“Wim 引导”字样，如图所示。

  ![](50abf9ec/32.jpg)

- 使用命令行工具：以管理员身份运行命令提示符或 PowerShell，然后执行如下命令。

  ```powershell
  fsutil wim enumwims c:
  ```

  若显示枚举对象，则表示计算机以设置从 WIM 文件启动；若显示找不到指定文件，则表示计算机使用普通安装方式启动。

### 减少指针文件所占空间

存储于 Windows 分区的指针文件会随着用户的使用而逐渐变大，这对于 Windows 分区不是很大的计算机来说将是一种隐患。Windows 10 操作系统支持把指针文件的所有变动打包为新的差异备份 WIM 文件（custom.wim），并清除变动数据所占用的指针文件空间，也就是说可以把用户数据及应用程序继续打包为 WIM 文件，如要使用这些数据，则由操作系统从 WIM 文件读取。进入 WinPE 或在 Windows 10 操作系统安装界面并按下 Shift+F10 组合键，然后在命令提示符中执行如下命令。

```powershell
dism /capture-customimage /capturedir:c:
```

等待命令执行完毕，custom.wim 也创建完成，其存储位置和用于启动的 WIM 文件相同。

### 重置 WIMBoot 功能

重置 WIMBoot 是指使用可启动的 WIM 文件重新生成指针文件，相当于重新安装操作系统。重置 WIMBoot 不会保存任何操作系统设置或应用程序，所以请备份数据后再进行操作。

1. 启动计算机至 WinPE 或启动至 Windows 10 操作系统安装界面并按下 Shift+F10 组合键，然后在命令提示符中执行如下命令格式化 Windows 分区，这里以 C 盘为 Windows 分区为例。

   ```powershell
   format C: /Q /FS:NTFS /v:”Windows”
   ```

2. 重新生成指针文件（PointerFile），输入如下命令。

   ```powershell
   dism /apply-image /imagefi le:f:\install.wim /applydir:c: /index:1 /wimboot
   ```

   等待命令执行完毕，重新启动计算机之后，按照提示操作即可。

### 删除 WIMBoot 功能

如果要取消从 WIM 文件启动并使用常规方式安装系统，按照以下步骤操作。

1. 启动计算机至 WinPE 或启动至 Windows 10 操作系统安装界面并按下 Shift+F10 组合键，然后在命令提示符中执行如下命令格式化 Windows 分区，这里以 C 盘为 Windows 分区为例。

   ```powershell
   format C: /Q /FS:NTFS /v:”Windows”
   ```

2. 部署存储于 F 盘中的 install.wim 至 C 盘，执行如下命令。

   ```powershell
   dism /apply-image /imagefi le:f:\install.wim /applydir:c:\ /index:1
   ```

   等待命令执行完毕，重新启动计算机进入操作系统安装阶段。



## 启用 Administrator 帐户

1. 按下 Win+R 组合键，在打开“运行”对话框输入 lusrmgr.msc 并回车。

2. 在本地用户与组管理器中，依次定位至“用户”-“Administrator”并双击打开

   ![](50abf9ec/33.jpg)

3. 在 Administrator 帐户属性页中，去掉“帐户已禁用”前面的复选框的勾，然后单击“确定”，然后注销当前登录帐户，即可使用 Administrator 帐户登录操作系统。如果是第一次以 Administrator 帐户登录操作系统，操作系统会对 Administrator 帐户进行初始化操作。如要为 Administrator 帐户设置密码，在上图中选中 Administrator 帐户并单击右键在出现的菜单中选择“设置密码”即可。

   ![](50abf9ec/34.jpg)



## 使用 Net User 命令管理帐户

通过控制面板和 Modern 设置可对 Windows 帐户进行简单的管理，使用本地用户和组管理单元，可对帐户进行完全管理。但本地用户和组管理单元，只有在 Windows 10 专业版和企业版操作系统中才具备，而 Windows 10 家庭版操作系统没有此项功能。对于使用 Windows 10 家庭版操作系统的用户，需要启用 Administrator 帐户等操作时，可以使用 Net User 命令来操作。

Net User 命令适用于所有 Windows 10 操作系统版本的帐户启用、禁用以及修改密码等操作。例如启用或关闭 Administrator 帐户以及设置密码，只需以管理员身份运行命令提示符，执行如下命令即可。

```powershell
net user administrator /active:yes
# 启用 Administrator 帐户。
```

```powershell
net user administrator 1234567
# 为 Administrator 帐户设置密码。其中 1234567 为设置的密码。
```

```powershell
net user administrator /active:no
# 禁用 Administrator 帐户。
```



## 无需输入密码自动登录操作系统

有些用户可能觉得输入帐户密码过于麻烦，而且平时计算机被其他人使用的机会很小，则可在 Windows 10 操作系统中可设置自动登录操作系统，免除每次开机必须要输入密码的过程。具体操作步骤如下。

1. 按下 Win+R 组合键，在“运行”对话框中输入 netplwiz 并回车，打开用户帐户设置界面

   ![](50abf9ec/35.jpg)

2. 勾选图中的“要使用计算机，用户必须输入用户名和密码”选项，然后选择要自动登录的帐户，最后单击“确定”。

3. 在随后出现的自动登录对话框中，输入要自动登录帐户的密码并确认密码，然后单击“确定”。



## 使用命令修复 Windows 10 系统组件

### 使用 dism 修复系统组件

以管理员身份运行命令提示符或 PowerShell 并执行如下命令。

```powershell
dism /online /cleanup-image /restorehealth
```

命令执行之后，操作系统会自动连接至微软服务器，并对系统组件扫描，如有缺失或损坏操作系统会从服务器下载相关文件并进行修复。推荐使用此命令修复系统组件。

### 使用 sfc 修复系统组件

以管理员身份运行命令提示符或 PowerShell 并执行如下命令。

```powershell
sfc /scannow
```

命令执行之后，操作系统会对系统组件扫描，如有缺失或损坏会自动修复。

### Winsock LSP 劫持

Winsock LSP（Windows Socket 分层服务提供商）。所有使用 Windows Socket 进行网络通信的程序都要经过 Winsock LSP。基于上述原因，一些应用程序会将自身加入 Winsock 配置信息进行 LSP 劫持，所有与网络交换的信息都要通过这些应用程序，当卸载该应用程序之后就会导致无法上网。

修复 LSP 被劫持的问题，有两种方法：一种是使用第三方的工具进行修复，第二种是使用 Windows 10 操作系统自带的 netsh 命令进行修复。以管理员身份运行命令提示符或 PowerShell 并执行如下命令。

```powershell
netsh winsock reset catalog
```

命令执行完毕之后，重新启动计算机即可正常上网。



## 制作 WinPE 系统故障急救操作系统

Windows Preinstallation Environment（Windows 预安装环境）简称 Windows PE 或 WinPE，他是一个运行在内存中并具有 Windows 操作系统有限功能的精简版操作系统。

制作普通用户能使用的 WinPE，需要使用微软提供的 Windows 评估和部署工具包（Windows ADK）来完成。下载安装 Windows ADK 之后，在“开始”菜单查找或使用 Cortana 搜索“部署和映像工具”，然后以管理员身份运行。部署和映像工具是制作 WinPE 的主要工具，本节以制作安装于 U 盘和 ISO 文件的 WinPE 为例。

### 安装 WinPE 至 U 盘

在部署和映像工具中执行如下命令。

```powershell
copype amd64 e:\winpe_64
```

新建 winpe_64 目录并复制 64 位 WinPE 文件至此文件夹。如要制作 32 位 WinPE，把 amd64 修改为 x86 即可。

```powershell
makewinpemedia /ufd e:\winpe_64 i:
```

安装 64 位 WinPE 至 U 盘，i: 为 U 盘盘符。此命令会格式化 U 盘，请注意备份数据。

![](50abf9ec/36.jpg)

### 制作 WinPE 镜像文件

在部署和映像工具中输入如下命令。

```powershell
copype amd64 e:\winpe_64
```

新建 winpe_64 目录并复制 64 位 WinPE 文件至此文件夹。如要制作 32 位 WinPE，把 amd64 修改为 x86 即可。

```powershell
makewinpemedia /iso e:\winpe_64 e:\winpe_64.iso
# 制作 WinPE 镜像文件。
```

**Tip：使用 Windows ADK 制作的 WinPE 支持 UEFI 与 BIOS 固件启动。在 WinPE 环境下任何对 WinPE 系统做的修改或设置都将在重新启动计算机之后丢失。**

![](50abf9ec/37.jpg)

如果觉的 WinPE 中自带的命令行工具不能满足使用需求，可以向 WinPE 中添加绿色版第三方工具软件。在部署和映像工具中输入如下命令挂载 WinPE 核心文件 boot.wim。

```powershell
dism /mount-image /imagefi le:”e:\winpe_64\media\sources\boot.wim” /index:1 /mountdir:”e:\winpe_64\mount”
```

其中 e:\ winpe_64\mount 为 WIM 文件挂载目录。挂载完成之后打开该目录就发现其目录结构和 Windows 分区目录结构相同，复制第三方工具至 Program Files (x86) 或 Program Files，然后退出映像文件挂载目录并在部署和映像工具中输入如下命令保存修改的 WIM 文件。

```powershell
dism /unmount-image /mountdir:”e:\winpe_64\mount” /commit
```

WIM 保存成功之后，重新使用在部署和映像工具中使用 makewinpemedia 命令制作 WinPE 即可。

在某些情况下修改过的 WIM 文件不能保存，所示此时先在部署和映像工具中执行 dism/unmount-image /mountdir:”e:\winpe_64\mount”/discard 命令放弃对 WIM 文件的修改，卸载完成之后，输入 dism /cleanup-mountpoints 命令清除与已挂载 WIM 文件相关联的资源，命令执行完成之后，重新挂载 WIM 文件修改即可正常保存。







------

> Reference:
>
> 《精解 Windows10》(第二版) —— 李志鹏