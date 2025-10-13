---
title: 在flutter使用realm
date: 2023-08-09
description: 导入 在pubspec.yaml文件中 创建 在创建数据的对象时，可以用PrimaryKey标志主键。
---

# 在flutter使用realm

> 导入 在pubspec.yaml文件中 创建 在创建数据的对象时，可以用PrimaryKey标志主键。

## 概述

*
## 导入
在pubspec.yaml文件中

```
realm: ^1.2.0 #数据库
```

## 创建

``` dart
log_model.dart

@RealmModel()
class _Log {

  @PrimaryKey()
  late ObjectId id; 

  late String content; 
  late String lastTime; 
  late int count; 
  late bool isSuccess; 
}

```
在创建数据的对象时，可以用PrimaryKey标志主键。

可以使用两个命令生成数据库需要的代码

``dart run realm generate ``

`` flutter pub run realm generate``


运行这个命令可以在dart_tool中找到生成的文件

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc1dd48a98aa4e88924dadbe203abaf6~tplv-k3u1fbpfcp-watermark.image?)


新建一个文件夹 `log_model.g.dart`
把自动生成的代码复制过来
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04febb466aac49388bf94d3e518d3b37~tplv-k3u1fbpfcp-watermark.image?)

特别注意   `log_model.g.dart` 和 `log_model.dart` 需要 ``part of 'log_model.dart';`` 
和``part 'log_model.g.dart'``  把Log和_log 作为一个整体。

生成的这段代码跑的时候会报错
```
RealmObjectBase.registerFactory(Log._);
```
改成
```
RealmObjectBase.registerFactory(()=> Log._());
```

## 配置&&OPEN

操作数据库前需要先本地配置

###  本地打开

```dart

final config = Configuration.local([Log.schema]); 

final realm = Realm(config);

```


### Memory打开

```
final config = Configuration.inMemory([Log.schema]);
final realm = Realm(config);

```
### 使用Realm.writeCopy()
无法从 LocalConfiguration 或 InMemory 配置转换为 FlexibleSyncConfiguration。

数据从具有 InMemory 配置的域复制到具有 LocalConfiguration 的新域、
```dart
// Create in-memory realm and add data to it.
// Note that even though the realm is in-memory, it still has a file path.
// This is because in-memory realms still use memory-mapped files
// for their operations; they just don't persist data across launches.
final inMemoryRealm =
    Realm(Configuration.inMemory([Person.schema], path: 'inMemory.realm'));
inMemoryRealm.write(() {
  inMemoryRealm.addAll([Person("Tanya"), Person("Greg"), Person("Portia")]);
});

// Copy contents of `inMemoryRealm` to a new realm with `localConfig`.
// `localConfig` uses the default file path for local realms.
final localConfig = Configuration.local([Person.schema]);
inMemoryRealm.writeCopy(localConfig);
// Close the realm you just copied when you're done working with it.
inMemoryRealm.close();

// Open the local realm that the data from `inMemoryRealm`
// was just copied to with `localConfig`.
final localRealm = Realm(localConfig);

// Person object for "Tanya" is in `localRealm` because
// the data was copied over with `inMemoryRealm.writeCopy()`.
final tanya = localRealm.find<Person>("Tanya");

```

还可以在复制的领域的配置中包含一个新的加密密钥，或者从新的配置中删除该加密密钥

```dart
// Create unencrypted realm and add data to it.
final unencryptedRealm = Realm(Configuration.local([Person.schema]));
unencryptedRealm.write(() => unencryptedRealm.addAll([
      Person("Daphne"),
      Person("Harper"),
      Person("Ethan"),
      Person("Cameron")
    ]));

// Create encryption key and encrypted realm.
final key = List<int>.generate(64, (i) => Random().nextInt(256));
final encryptedConfig = Configuration.local([Person.schema],
    path: 'encrypted.realm', encryptionKey: key);
// Copy the data from `unencryptedRealm` to a new realm with
// the `encryptedConfig`. The data is encrypted as part of the copying.
unencryptedRealm.writeCopy(encryptedConfig);
// Close the realm you just copied when you're done working with it.
unencryptedRealm.close();

// Open the new encrypted realm with `encryptedConfig`.
final encryptedRealm = Realm(encryptedConfig);

// Person object for "Harper" is in `localRealm` because
// the data was copied over with `unencryptedRealm.writeCopy()`.
final harper = encryptedRealm.find<Person>('Harper');

```

`Configuration.local([Log.schema], isReadOnly: true);`
isReadOnly来设置 数据库是否只读

### 配置中的一些方法


``
InitialDataCallback
``
```
void dataCb(Realm realm) {
  realm.add(Log(ObjectId(), 'Honda'));
}

final config =
    Configuration.local([Log.schema], initialDataCallback: dataCb);
final realm = Realm(config);
Log honda = realm.all<Log>()[0];

```
回调的签名，仅在首次创建 'Realm' 时执行。在回调中传递的 'Realm' 实例已经打开了一个写入事务，因此您可以添加一些应用程序所需的初始数据。该函数不会针对现有 Realm 数据库执行，即使 'Realm' 中的所有对象都被删除了。

### 可以自定义“域”存储数据库文件的默认路径和给数据库文件的默认名称。
`Configuration.defaultRealmPath` ` Configuration.defaultRealmName `

```dart
Configuration.defaultRealmName = "myRealmName.realm";

final customDefaultRealmPath = path.join(
    (await Directory.systemTemp.createTemp()).path,
    Configuration.defaultRealmName);
Configuration.defaultRealmPath = customDefaultRealmPath;

// Configurations used in the application will use these values
final config = Configuration.local([Car.schema]);
// The path is your system's temp directory
// with the file named 'myRealmName.realm'
print(config.path);

```

 通过 `Configuration.defaultStoragePath;` 获得环境中存储文件的位置。

```dart
final storagePath = Configuration.defaultStoragePath;
// See value in your application
print(storagePath);
```

``
MigrationCallback
``
当 'Realm' 的架构更改时将执行的回调的签名

``
ClientResetCallback
``
当在同步的 'Realm 数据库' 中发生客户端重置错误时将触发的回调的签名。[clientResetError] 保存有用的数据，以便在尝试从客户端重置中手动恢复时使用

``
BeforeResetCallback
``
指示即将发生客户端重置的回调。[beforeResetRealm]在客户端重置发生之前持有冻结的“Realm”。[beforeResetRealm] 的生命周期与回调生命周期相关联，所以不要存储对 'Realm' 的引用或从中获取的对象以供在回调之外使用。

``
AfterResetCallback
``
[afterResetRealm] 在客户端重置发生后保存实时的 'Realm'。提供的 'Realm' 实例的生命周期与回调相关联，因此不要存储对 'Realm' 的引用或从中获取的对象以供在回调之外使用。

``
schemaObjects
``
[SchemaObject] 的集合，一旦打开“Realm”，它将用于构造 [RealmSchema]。

``
defaultStoragePath
``
用于存储领域文件的平台相关路径 
在 Flutter Android 和 iOS 上，这是应用程序的数据目录。
在 Flutter Windows 上，这是“C：\Users\username\AppData\Roaming\app_name”目录。
在 Flutter macOS 上，这是“UsersusernameLibraryContainersapp_nameDataLibraryApplication支持”目录。
在 Flutter Linux 上，这是“homeusername.localshareapp_name”目录。
在Dart独立Windows，macOS和Linux上，这是当前目录

``
fifoFilesFallbackPath
``

```
final config = Configuration.local([Car.schema],
    fifoFilesFallbackPath: "./fifo_folder");
final realm = Realm(config);
```
指定 FIFO 特殊文件回退位置。打开“Realm”会创建许多 FIFO 特殊文件，以便跨线程和进程协调对“Realm”的访问。如果realm文件存储在不允许创建 FIFO 特殊文件的位置（例如 FAT32 文件系统），则无法打开“realm”。在这种情况下，'Realm' 需要一个不同的位置来存储这些文件，而这个属性定义了这个位置。FIFO 特殊文件非常轻量级，主领域文件仍将存储在 [path] u 属性定义的位置。如果 [路径] 定义的目录允许 FIFO 特殊 f ，则忽略此属性

``
path
``
应存储“realm”的路径。如果省略，将使用平台的 [defaultPath]。

``
encryptionKey
``
```
// Generate encryption key
final key = List<int>.generate(64, (i) => Random().nextInt(256));

final encryptedConfig = Configuration.local([Log.schema],
    // Include the encryption key in the configuration
    encryptionKey: key);
final encryptedRealm = Realm(encryptedConfig);

```
用于加密整个“realm”的密钥。用于 AES-256 加密的完整 64 字节（512 位）密钥。设置后，必须在每次使用文件时指定。如果未启用空加密。

``
maxNumberOfActiveVersions
``
设置引发异常之前允许的最大活动版本数。设置此选项将导致 'Realm' 在太多版本的 'Realm' 数据同时处于活动状态时抛出异常。拥有太多版本会大大增加“Realm”的文件大小。

``
schemaVersion
``
用于打开“realm”的架构版本。如果省略，默认值为“0”。在初始化现有 Realm 数据库时，需要指定一个模式版本，而该模式包含与之前规范不同的对象。如果模式已更新而架构版本未更新，则会抛出 [RealmException]。

``
isReadOnly
``
指定是否应以只读方式打开“realm”。这允许从与应用程序捆绑在一起的锁定位置（例如资源）打开它。realm文件必须已存在于 [path] 处

``
disableFormatUpgrade
``
指定如果某个realm文件格式是使用旧版本的“Realm”库创建的，则是否应自动升级该文件格式。如果需要升级文件格式，将引发异常

``
shouldCompactCallback
``
在进程启动后首次打开“realm”时调用。

``
initialDataCallback
``
在创建数据库文件时第一次打开 'Realm' 时调用。

``
migrationCallback
``
当打开模式版本比用于创建文件的模式版本更新的 “Realm” 时调用

``
shouldDeleteIfMigrationNeeded
``
指定在磁盘上的架构与代码中的架构不匹配的情况下是否应删除realm文件。将其设置为“true”可能会导致数据丢失


## Realm 写&读


```dart

realm.write((){
  // 写入数据
});

//写入一个
realm.write(() {
  realm.add(Person(ObjectId(), 'Lando'));
});

//写入一堆
realm.write(() {
  realm.addAll([
    Person(ObjectId(), 'Figrin D\'an'),
    Person(ObjectId(), 'Greedo'),
    Person(ObjectId(), 'Toro')
  ]);
});
//更新对象
realm.write(() {
  spaceshipTeam.name = 'Galactic Republic Scout Team';
  spaceshipTeam.crew
      .addAll([Person(ObjectId(), 'Luke'), Person(ObjectId(), 'Leia')]);
});

///把person对象Anakin Skywalker更新为Darth Vader
final id = ObjectId();
// Add Anakin Skywalker to the realm with primary key `id`
final anakin = Person(
  id,
  "Anakin Skywalker",
);
realm.write(() {
  realm.add<Person>(anakin);
});

//设置 `update: true` 参数。这样做的效果是，如果数据库中已经存在具有相同主键的对象
//（即之前添加的 "Anakin Skywalker" 对象），则会更新该对象的属性为新的对象的属性
final darthVader = Person(id, 'Darth Vader');
realm.write(() {
  realm.add<Person>(darthVader, update: true);
});

//后台写入
// Add Leia to the realm using `writeAsync`
Person leia = Person(ObjectId(), "Leia");
realm.writeAsync(() {
  realm.add<Person>(leia);
});

//写入时删除一个
realm.write(() {
  realm.delete(obiWan);
});

//写入时删除多个
realm.write(() {
  realm.deleteMany([obiWan, quiGon]);
});

//写入时删除所有对象
realm.write(() {
  realm.deleteAll<Person>();
});

```


通过主键寻找


```
final luke = realm.find<Log>(lukePrimaryKey);
```

查询这个对象的集合

```dart
final logs = realm.all<Log>();
```


```dart
//BEGINSWITH 查询名字是L开头的
final lukeAndLeia = heroes.crew.query('name BEGINSWITH \$0', ['L']);
//查询名字是Millennium Falcon Crew的第一个
final team =realm.query<Team>('name == \$0', ['Millennium Falcon Crew']).first;
 //查询名字不等于Chewbacca的集合
final humanCrewMembers = team.crew.query('name != \$0', ['Chewbacca']);

// pattern 这个属性为chevron
final chevronRugs = realm.query<Rug>("pattern TEXT \$0", ["chevron"]);

// material属性不是sheep wool的
final notSheepWoolRugs = realm.query<Rug>("material TEXT \$0", [" -sheep wool"]);

//TRUEPREDICATE` 用作查询条件，意味着查询结果将包括所有满足条件的对象，因为该条件始终为真。实际上，它是一种简化查询的方式，可以用于获取数据库中的所有对象
//ASC 是 SQL 查询中的一个关键字，用于指定升序排序
//结果按照 `name` 字段进行升序排序。
final alphabetizedPeople = realm.query<Person>('TRUEPREDICATE SORT(name ASC)');

//表示查询满足姓名为 'Luke' 的对象，并限制结果数量为两个。`LIMIT(2)` 表示最多返回两个结果。
final limitedPeopleResults = realm.query<Person>('name == \$0 LIMIT(2)', ['Luke']);
```

## 数据发生变化时的监听回调


```dart
///使用 `changes.listen` 方法对 `characters` 进行变化监听。
//在监听回调函数中，可以通过 `changes` 对象访问到变化的详细信息。
//其中包括 `inserted`、`modified`、`deleted`、`newModified` 和 `moved` 属性
//它们分别表示插入、修改、删除、新修改和移动的对象在结果集中的索引。
//还可以通过 `results` 属性获取整个结果集的完整对象列表。
//indexes
final characters = realm.all<Character>();
final subscription = characters.changes.listen((changes) {
  changes.inserted; // indexes of inserted objects
  changes.modified; // indexes of modified objects
  changes.deleted; // indexes of deleted objects
  changes.newModified; // indexes of modified objects
  // after deletions and insertions are accounted for
  changes.moved; // indexes of moved objects
  changes.results; // the full List of objects
});

//监听RealmResults
final hobbits = fellowshipOfTheRing.members.query('species == "Hobbit"');
final hobbitsSubscription = hobbits.changes.listen((changes) {
changes.isDeleted;        |
 changes.object;
 changes.properties; 

 //对hobbits的变化进行监听 
 //`isDeleted` 属性，用于判断对象是否已被删除；
 //`object` 属性，表示正在监听的 RealmObject 对象，即 `frodo`；
 //`properties` 属性，表示发生变化的属性。

});
//监听一个对象
fellowshipOfTheRing.members.changes.listen((changes){
  changes.inserted; 
  changes.modified; 
  changes.deleted; 
  changes.newModified; 
  changes.moved; 
  changes.list;
  changes.isCleared;
 // `inserted` 属性，表示插入的 Realm 对象在 `members` 中的索引；
 // `modified` 属性，表示修改的 Realm 对象在 `members` 中的索引；
 // `deleted` 属性，表示删除的 Realm 对象在 `members` 中的索引；
 // `newModified` 属性，表示修改的 Realm 对象在删除和插入操作之后在 `members` 中的索引；
 // `moved` 属性，表示移动的 Realm 对象在 `members` 中的索引；
 // `list` 属性，表示发生变化的完整 RealmList 对象；
 // `isCleared` 属性，表示是否清空了 `members`，即在调用了 `fellowshipOfTheRing.members.clear()` 方法之后。}
//监听流的暂停
subscription.pause();
//监听流的继续
subscription.resume();
//监听流的取消
await subscription.cancel();


```

## 数据库版本更新
  ### 自动升级
  使用` schemaVersion` 属性

比如上个版本没有name的属性 （删除一个属性同理）
  使用`schemaVersion 1`的 reaml 具有一个 `Person` 对象类型，
  该对象类型具有 `firstName` 和 `lastName` 属性。 向 _ Person RealmModel 类添加 age 属性。后更改 `schemaVersion 2`即可
 ###  手动模式
 
删除一个对象

``` dart

 final configWithoutPerson = Configuration.local([Car.schema],
    schemaVersion: 2,
    migrationCallback: ((migration, oldSchemaVersion) {
  // 版本v1迁移到版本2
  migration.deleteType('Person'); //删除一个对象
}));
//删除了 person的 reaml数据库
final realmWithoutPerson = Realm(configWithoutPerson);


```

修改类里属性名字
  ``` dart
  final configWithRenamedAge =                                                   
 Configuration.local([Person.schema, Car.schema],                               
 schemaVersion: 2,                                                              
migrationCallback: ((migration, oldSchemaVersion) {      

// 版本v1迁移到版本2把person类里age的名字修改为yearsSinceBirth
 migration.renameProperty('Person', 'age', 'yearsSinceBirth');                  
 }));      
 
 final realmWithRenamedAge = Realm(configWithRenamedAge);
 
```
修改类里的属性

```dart

final configWithChanges = Configuration.local([Person.schema, Car.schema],
    schemaVersion: 2,
    migrationCallback: ((migration, oldSchemaVersion) {
    
  // 老的reaml 的查询
  final oldPeople = migration.oldRealm.all('Person');
  for (final oldPerson in oldPeople) {
    // 在更新的realm中查找 Person 实例
    final newPerson = migration.findInNewRealm<Person>(oldPerson);
    if (newPerson == null) {
    //人被删除了
      continue;
    }
    // Use dynamic API to get properties from old schema and use in the
    // new schema
    newPerson.fullName = oldPerson.dynamic.get<String>("firstName") +
        " " +
        oldPerson.dynamic.get<String>("lastName");
    // 将‘ id’从 ObjectId 转换为 String
    final oldId = oldPerson.dynamic.get<ObjectId>("id");
    newPerson.id = oldId.toString();
  }
}));
///传入改变的reaml
final realmWithChanges = Realm(configWithChanges);
```

## 数据库初始化数据

### 创建reaml 用来Bundling

```dart
print("Bundling realm");
final config = Configuration.local([Car.schema], path: 'bundle.realm');
final realm = Realm(config);

realm.write(() {
  realm.add(Car(ObjectId(), "Audi", model: 'A8'));
  realm.add(Car(ObjectId(), "Mercedes", model: 'G Wagon'));
});
print("Bundled realm location: " + realm.config.path);
realm.close();
```

```yaml
flutter:
  assets:
  - realm/bundle.realm
```


### 打开

``` dart
import 'package:flutter/services.dart';
import 'package:realm/realm.dart';
import 'dart:io';

Future<Realm> initBundledRealm(String assetKey) async {
  final config = Configuration.local([Car.schema]);
  final file = File(config.path);
  if (!await file.exists()) {
    final realmBytes = await rootBundle.load(assetKey);
    await file.writeAsBytes(
        realmBytes.buffer
            .asUint8List(realmBytes.offsetInBytes, realmBytes.lengthInBytes),
        mode: FileMode.write);
  }
  return Realm(config);
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  ///初始化数据库
  final realm = await initBundledRealm("assets/bundle.realm");
  runApp(const MyApp());
}
```

### 服务器同步

``` dart
print("Bundling synced realm");

// 必须使用经过身份验证的用户，
final app = App(AppConfiguration(APP_ID));
// Check if current user exists and log anonymous user if not.
final user = app.currentUser ?? await app.logIn(Credentials.anonymous());

final config = Configuration.flexibleSync(user, [Car.schema]);
final realm = Realm(config);

// 添加与要添加的数据匹配的订阅
//和应用程序的后端权限。
realm.subscriptions.update((mutableSubscriptions) {
  mutableSubscriptions.add(realm.all<Car>());
});
await realm.subscriptions.waitForSynchronization();

// Add data to realm
realm.write(() {
  realm.add(Car(ObjectId(), "Audi", model: 'A8'));
  realm.add(Car(ObjectId(), "Mercedes", model: 'G Wagon'));
});

// 与服务器同步更改
await realm.syncSession.waitForUpload();
await realm.syncSession.waitForDownload();

//为绑定的领域创建新配置。
//您必须指定一个独立于您的领域的路径
//正在复制，以便 Realm.writeCopy ()成功。
final bundledConfig = Configuration.flexibleSync(user, [Car.schema],
    path: 'sync_bundle.realm');
realm.writeCopy(bundledConfig);

print("Bundled realm location: " + bundledConfig.path);
realm.close();
```


---

*发布时间：2023-08-09*
