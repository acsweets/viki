---
title: flutter 中 sqlite 数据库初体验 如何查看手机中存的数据库
date: 2023-08-03
description: 导入 在 yaml文件中加入sqlite插件 开始 新建模型类 打开数据库 && 建表
---

# flutter 中 sqlite 数据库初体验 如何查看手机中存的数据库

> 导入 在 yaml文件中加入sqlite插件 开始 新建模型类 打开数据库 && 建表

## 概述

# 导入 

在 yaml文件中加入sqlite插件

```yaml
sqflite: ^2.2.8+2
```


# 开始

## 新建模型类

``` dart
//完整版
class CompleteLoveStory {
  final int id;
  final String content;

  const CompleteLoveStory({
    required this.id,
    required this.content,
  });
  Map<String, dynamic> toDbJson() => {
    "id": id,
    "content": content,
  };
}

//隐藏版
class CutoffLoveStory {
  final int id;

  final String startContent;
  final String endContent;

  const CutoffLoveStory({
    required this.id,
    required this.endContent,
    required this.startContent,
  });

  Map<String, dynamic> toDbJson() => {
        "id": id,
        "startContent": startContent,
        "endContent": endContent,
      };
}
```

## 打开数据库 && 建表



``` dart

import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart' as path;


  Future<Database> open() async {
    String databasesPath = await getDatabasesPath();
    String dbPath = path.join(databasesPath, DB_NAME);
    _db = await openDatabase(dbPath, version: 1, onCreate: _onCreate);
    return _db!;
  }

  //db.execute("");执行单条sql语句
  //db.batch()执行多条sql语句

  ///建表
  void _onCreate(Database db, int version) async {
    var batch = db.batch();
    _createTable(batch);
    await batch.commit();
    debugPrint("所有表建立完毕");
  }

  void _createTable(Batch batch) {
    batch.execute("""
CREATE TABLE $TABLE_CompleteLoveStory (
id VARCHAR(64) PRIMARY KEY,
content TEXT,
)""");

    batch.execute("""
CREATE TABLE $TABLE_CutoffLoveStory (
id VARCHAR(64) PRIMARY KEY,
startContent TEXT,
endContent TEXT,
)""");

  }
```
### 建表的数据类型
> 
> -   INTEGER - 包含整型值的列,通常用于主键。
> -   REAL - 包含浮点值或实数的列。
> -   TEXT - 包含字符串(字符序列)的列。
> -   BLOB - 包含二进制数据(图像、文件等)的列。
> -   NUMERIC - 包含精确值的数字,存储为字符串。
> -   BOOLEAN - 包含整数 0 (false) 或 1 (true) 的列。
> -   DATE - 包含 YYYY-MM-DD 格式日期值的列。
> -   DATETIME - 包含 YYYY-MM-DD HH:MM:SS 格式日期和时间值的列。
> -   TIMESTAMP - 包含 UNIX 纪元时间戳的列。
> -   VARCHAR(n) - 变长字符串,最多包含 n 个字符。
> -   CHAR(n) - 定长字符串,包含 n 个字符。
> -   CLOB - 存储大型文本值(超过4000字节)。
> -   PRIMARY KEY - 主键

## sql增&删&改&查

> 使用 
> 
> db.execute("");执行单条sql语句
> 
> db.batch()执行多条sql语句

### 
1. 增加

```sql
INSERT INTO students (name, age, grade) VALUES ('John', 18, 'A');
```
2. 查询:
 
```sql
SELECT * FROM students;
```
4. 删除:
 
```sql
DELETE FROM students WHERE id = 1;
```

5. 联表查询:
 
```sql
SELECT students.name, courses.course_name
FROM students
INNER JOIN courses ON students.id = courses.student_id;
```
## sql 关键字的使用

1. SELECT：用于从数据库中查询数据。
   ```sql
   SELECT column1, column2 FROM table_name;
   ```

2. FROM：用于指定要查询的表名。
   ```sql
   SELECT * FROM table_name;
   ```

3. WHERE：用于指定查询的条件。
   ```sql
   SELECT * FROM table_name WHERE condition;
   ```

4. INSERT INTO：用于向表中插入新数据。
   ```sql
   INSERT INTO table_name (column1, column2) VALUES (value1, value2);
   ```

5. UPDATE：用于更新表中的数据。
   ```sql
   UPDATE table_name SET column1 = value1 WHERE condition;
   ```

6. DELETE FROM：用于从表中删除数据。
   ```sql
   DELETE FROM table_name WHERE condition;
   ```

7. JOIN：用于将多个表连接起来进行联合查询。
   ```sql
   SELECT column1, column2 FROM table1 JOIN table2 ON table1.column = table2.column;
   ```

8. GROUP BY：用于对查询结果进行分组。
   ```sql
   SELECT column, COUNT(*) FROM table_name GROUP BY column;
   ```

9. ORDER BY：用于对查询结果进行排序。
   ```sql
   /*当使用ORDER BY子句进行排序时，可以使用ASC（升序，默认）或DESC（降序）来指定排序的方式。*/
   SELECT column1, column2 FROM table_name ORDER BY column1 ASC;
   ```

10. HAVING：用于在GROUP BY后对分组结果进行过滤。
    ```sql
    SELECT column, COUNT(*) FROM table_name GROUP BY column HAVING COUNT(*) > 3;
    ```

11. DISTINCT：用于返回查询结果中不重复的行。
    ```sql
    SELECT DISTINCT column FROM table_name;
    ```
12.  ADD：  主要用于向表中新增列或其他物件
```sql
/*` 新增檢查約束，*/
ALTER TABLE table_name
ADD CONSTRAINT chk_name
CHECK (condition); 
```

13.  ALTER - 修改数据库对象的结构,如修改表
```sql
/*`table_name`是你要新增列的表的名称，*/
/* column_name`是你想要添加的列的名称，`data_type`是新列的数据类型。*/
ALTER TABLE table_name
ADD COLUMN column_name data_type;

/*修改表名*/
ALTER TABLE tablename RENAME TO newtablename;
```

14. CREATE - 主要用于创建数据库对象,如表、视图、索引等
```sql
/*创建新表*/

CREATE TABLE table_name (
   column1 datatype, 
   column2 datatype,
   column3 datatype,
   ....
);

/*创建视图*/

CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;

/*创建索引*/
CREATE INDEX index_name
ON table_name (column_name);

/*创建数据库*/
CREATE DATABASE database_name;
```
15. ON -主要用于在JOIN子句中指定表之间的联结条件

```sql
/*表一 和 表二的column_name相等 ，ON关键字出现在JOIN关键字之后,用于指示联结的条件。*/
/*如果没有ON子句,会执行默认的交叉联结(cross join)。*/

SELECT * 
FROM table1 
JOIN table2 
ON table1.column_name = table2.column_name;


/*与WHERE构成的联结条件*/
ON table1.column1 = table2.column2
AND table2.column3 = 'value'

/*-多个联结条件*/
ON table1.column1 = table2.column1
AND table1.column2 = table2.column2

/*子查询*/ 

ON table1.column1 = (SELECT column_name FROM table2)
```
15. AND & OR  相当于逻辑"与"和“或”的关系
```sql

/*这将选择价格大于100 且 库存小于20的商品。*/
SELECT * FROM products 
WHERE price > 100 AND qty < 20;


/* 价格大于100 并且 qty小于20 或者状态为 new*/
SELECT * FROM products
WHERE price > 100 AND (qty < 20 OR status = 'new');
```
16.LIKE -用于在 WHERE 子句中执行模式匹配。
>   % - 匹配任意多个字符
>   
>   _ - 匹配单个字符

```sql
/* 这个语句会匹配所有以 John 开头的名字*/

   WHERE name LIKE 'John%'
   
 /* 这个语句会匹配所有包含 ohn 的名字。*/
   WHERE name LIKE '%ohn'
   
/* 匹配所有以任意单个字符开头,然后是 ohn 的名字。*/
   WHERE name LIKE '_ohn'
   ```

 
## sqlite的方法

1. 增
```dart

var db = await DatabaseHelper().openDb();

//使用sql语句进行插入

db.rawInsert(sql)

//传入表名和map类型的值进行插入
db.Insert(table_name,value)
```

2. 删

```dart
var db = await DatabaseHelper().openDb();

//使用sql语句进行删除
db.rawDelete(sql)

//传入表名和删除条件
db.delete(table_name,where)
```

3. 改
```dart
var db = await DatabaseHelper().openDb();

//使用sql语句进行更新

db.rawUpdate(sql)

//传入表名和map类型的值进行更新,where传入更新的限制条件
db.update(table_name,value，{where})
```

4.查
```dart
var db = await DatabaseHelper().openDb();

//使用sql语句进行查询

db.rawQuery(sql)

//传入表名 和查询条件  whereArgs占位符

db.query(table_name,{where，whereArgs
})
// 查列MEMBER_ID和ID 列 MEMBER_ID等于memberId 并且ID等于ID
 db.query(tableMember,
    where: '$MEMBER_ID = ? AND $ID = ?', whereArgs等于 memberId, ID])

```


### 工具数据库可视化


[# DB Browser for SQLite](https://sqlitebrowser.org)

可以查看数据库中表的内容

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28b26f557cac454eaf7b49cffe6c07b3~tplv-k3u1fbpfcp-watermark.image?)


可以执行sql语句操作数据库

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c4fd3caa5f47d999149f6e6620195a~tplv-k3u1fbpfcp-watermark.image?)

在查看中修改视图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16c2492ff50a4ae6b0904e4417185465~tplv-k3u1fbpfcp-watermark.image?)

### 工具adb（Android Debug Bridge ）


基础

 安装/卸载应用

>   adb install <apk路径> 安装APK
>   
>   adb uninstall <包名> 卸载应用

查看日志

>  adb logcat 查看应用日志,方便调试

  截屏

>   adb exec-out screencap -p > screen.png 截取当前屏幕并保存图片

  数据传输

>   adb pull <设备路径> <电脑路径> 从设备下载文件到电脑
>   
>   adb push <电脑路径> <设备路径> 从电脑上传文件到设备

  Shell命令

>  adb shell 进入设备的shell,可以在设备上执行命令

 模拟输入

>  adb shell input text <文本> 模拟输入
>  
>  adb shell input keyevent <事件代码> 模拟点击/手势

  查看设备信息

>  adb devices 列出连接的设备
>  
>   adb shell getprop 查看设备系统属性

 调试界面布局

>   adb shell dumpsys activity top 查看当前Activity信息
>   adb shell dumpsys window displays 模拟器屏幕分辨率

  性能调试

>   adb shell dumpsys gfxinfo GPU渲染信息
>   adb shell dumpsys meminfo 查看内存使用情况

 多设备调试

>  adb -s <设备序列号> <命令> 选择指定设备执行命令



## 将手机中数据库导出来进行调试

### 导出手机内db

`adb pull /data/data/your.app.package/databases/books.db`

### 向手机内db
`adb push books.db /data/data/your.app.package/databases/books.db`



---

*发布时间：2023-08-03*
