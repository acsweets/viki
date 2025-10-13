# 如何使用 nRF Connect 模拟蓝牙设备，进行基础的蓝牙调试

> 发布时间：2025年10月10日  
> 标签：蓝牙开发 | 调试工具 | nRF Connect

## 📱 工具介绍

nRF Connect 是 Nordic Semiconductor 开发的强大蓝牙调试工具，支持 BLE（低功耗蓝牙）设备的扫描、连接、服务发现和数据交互。

## 🛠 环境准备

### 安装 nRF Connect

**Android/iOS:**
- 在应用商店搜索 "nRF Connect for Mobile"
- 下载并安装官方应用

**桌面版:**
- 访问 [Nordic 官网](https://www.nordicsemi.com/Products/Development-tools/nrf-connect-for-desktop)
- 下载 nRF Connect for Desktop

## 🔍 基础功能使用

### 1. 扫描蓝牙设备

```
1. 打开 nRF Connect 应用
2. 点击 "SCAN" 按钮开始扫描
3. 查看附近的 BLE 设备列表
4. 观察设备的 RSSI 信号强度
```

### 2. 连接设备

```
1. 在扫描列表中找到目标设备
2. 点击 "CONNECT" 按钮
3. 等待连接建立
4. 查看连接状态和参数
```

### 3. 服务发现

连接成功后，nRF Connect 会自动发现设备的服务和特征值：

- **Services**: 设备提供的功能模块
- **Characteristics**: 具体的数据读写接口
- **Descriptors**: 特征值的描述信息

## 🧪 模拟蓝牙设备 智能蓝牙灯光设备模拟

## 案例目标
创建一个完整的智能蓝牙灯光设备模拟器，支持：
- 🔆 灯光开关控制
- 🌟 亮度调节（0-100%）
- 📱 状态读取
- 🔔 状态变化通知

## 第一步：配置 GATT 服务器

### 1.1 进入 GATT 配置界面
1. **打开 nRF Connect**
2. **点击左上角菜单** ☰
3. **选择 "Configure GATT server"**
4. **创建新配置**

### 1.2 创建新的 GATT 配置
界面"New GATT configuration"对话框：

1. **在弹出的对话框中输入配置名称**
   - 输入框显示："Configuration name"
   - **建议输入**：`Smart Light Configuration`
   - **点击 "OK" 确认**

2. **进入配置编辑界面**
   - 可以看到现有的预置服务（Heart Rate、Test Service等）
   - 准备添加自定义的智能灯光服务

### 1.3 添加智能灯光服务
1. **点击页面底部的 "ADD SERVICE" 按钮**
2. **选择 "Custom Service"**
3. **配置服务信息**：
   - **服务名称**: `Smart Light Service`
   - **服务UUID**: `0000FFF0-0000-1000-8000-00805F9B34FB`
   - **服务类型**: PRIMARY SERVICE

## 第二步：添加特征值

### 2.1 灯光开关特征值（读写）
"Add Characteristic"界面，按以下步骤配置：

#### 配置步骤：
1. **在 Name 输入框中输入**：`Light Switch`

2. **在 UUID 输入框中输入**：`0000FFF1-0000-1000-8000-00805F9B34FB`

3. **点击 Properties 下拉箭头，勾选以下选项**：
   - ☑️ **Read** - 允许读取开关状态
   - ☑️ **Write** - 允许写入开关控制
   - ☑️ **Write without response** - 快速响应

4. **点击 Permissions 下拉箭头，勾选以下选项**：
   - ☑️ **Read**
   - ☑️ **Write**

5. **Initial value 设置**：
   - 默认选中 **Empty value**（可保持不变）
   - 或者可以设置初始值为 `0`（表示关闭状态）

6. **点击 "OK" 保存特征值**

#### 数据说明：
```
0 = 灯光关闭
1 = 灯光开启
```

### 2.2 亮度控制特征值（读写）
**再次点击 "Add Characteristic" 按钮，在弹出的对话框中配置：**

#### 配置步骤：
1. **Name**: `Brightness Control`
2. **UUID**: `0000FFF2-0000-1000-8000-00805F9B34FB`
3. **Properties 勾选**：
   - ☑️ **Read**
   - ☑️ **Write**
4. **Permissions 勾选**：
   - ☑️ **Read**
   - ☑️ **Write**
5. **Initial value**: 可设置为 `50`（表示50%亮度）
6. **点击 "OK" 保存**

#### 数据说明：
```
取值范围: 0-100
0 = 最暗（实际为关闭）
100 = 最亮
```

### 2.3 状态通知特征值（只读+通知）
**第三次点击 "Add Characteristic" 按钮，配置：**

#### 配置步骤：
1. **Name**: `Light Status Notification`
2. **UUID**: `0000FFF3-0000-1000-8000-00805F9B34FB`
3. **Properties 勾选**：
   - ☑️ **Read**
   - ☑️ **Notify**
4. **Permissions 勾选**：
   - ☑️ **Read**
5. **Initial value**: 可设置为 `OFF,50`
6. **点击 "OK" 保存**

#### 数据说明：
```
格式: "开关状态,亮度值"
示例: "ON,75" = 开启，亮度75%
示例: "OFF,30" = 关闭，亮度30%
```

### 2.4 设备信息特征值（只读）
**第四次点击 "Add Characteristic" 按钮，配置：**

#### 配置步骤：
1. **Name**: `Device Info`
2. **UUID**: `0000FFF4-0000-1000-8000-00805F9B34FB`
3. **Properties 勾选**：
   - ☑️ **Read** 仅勾选这一个
4. **Permissions 勾选**：
   - ☑️ **Read**
5. **Initial value**: `Smart Light v1.0,Nordic Simulator`
6. **点击 "OK" 保存**

#### 数据说明：
```
格式: "设备型号,制造商"
固定信息，不可修改
```

## 特征值配置界面详解

"Add Characteristic"对话框包含以下关键元素：

### 📝 **输入字段**
- **Name** - 特征值名称输入框
- **UUID** - 特征值唯一标识符输入框

### ⚙️ **Properties（属性）选项**
- ☐ **Read** - 允许客户端读取数据
- ☐ **Write without response** - 允许写入且无需确认
- ☐ **Write** - 允许写入且需要确认
- ☐ **Notify** - 允许主动发送通知
- ☐ **Indicate** - 允许发送指示（需确认的通知）

### 🔒 **Permissions（权限）选项**
- ☐ **Read** - 读取权限
- ☐ **Write** - 写入权限

### 📊 **Initial value（初始值）**
- ◉ **Empty value** - 空值（默认选中）
- 可以设置具体的初始数据

### 🔄 **操作按钮**
- **CANCEL** - 取消创建
- **OK** - 确认创建特征值

## 第三步：验证配置并启动 GATT 服务器

### 3.1 验证配置完整性

✅ **服务配置**：
- **服务名称**: Smart Light Configuration
- **服务UUID**: 0xFFF0
- **服务类型**: PRIMARY SERVICE

✅ **特征值1 - 灯光开关**：
- **名称**: Light Switch
- **UUID**: 0xFFF1
- **属性**: READ, WRITE, WRITE NO RESPONSE ✓
- **功能**: 控制灯光开关

✅ **特征值2 - 亮度控制**：
- **名称**: Brightness Control
- **UUID**: 0xFFF2
- **属性**: READ, WRITE ✓
- **初始值**: 50 ✓
- **功能**: 调节亮度 0-100%

✅ **特征值3 - 状态通知**：
- **名称**: Light Status Notification
- **UUID**: 0xFFF3
- **属性**: NOTIFY, READ ✓
- **初始值**: OFF,50 ✓
- **描述符**: Client Characteristic Configuration (0x2902) ✓
- **功能**: 实时状态通知

✅ **特征值4 - 设备信息**：
- **名称**: Device Info
- **UUID**: 0xFFF4
- **属性**: READ ✓
- **初始值**: Smart Light v1.0,Nordic Simulator ✓
- **功能**: 设备信息查询

### 3.2 启动 GATT 服务器
1. **保存配置**（如果有保存按钮）
2. **返回主界面**（点击左上角返回箭头）
3. **在GATT服务器列表中找到 "Smart Light Configuration"**
4. **启动/激活此配置**（通常有开关或启动按钮）

## 第四步：配置广播器

### 4.1 保存并启用 GATT 配置
1. **完成所有特征值配置后**
2. **保存 GATT 配置**（通常有保存按钮）
3. **启用/激活配置**（确保配置处于活动状态）

### 4.2 创建设备广播
1. **切换到 ADVERTISER 标签页**
2. **点击右下角 "+" 按钮**
3. **配置广播包**:

**基本设置：**
- **Display name**: `Smart Light Device`

**广播数据配置：**
- **点击 "ADD RECORD"**
- **选择 "Complete Local Name"**
- **输入**: `Smart Light Device`

**再次添加记录：**
- **点击 "ADD RECORD"**
- **选择 "Service UUID"**
- **输入**: `0000FFF0-0000-1000-8000-00805F9B34FB`

**选项设置：**
- ☑️ **Connectable** - 必须勾选
- ☑️ **Scannable** - 建议勾选
- ☐ **其他选项** - 保持默认

4. **点击 "OK" 创建广播包**

### 4.2 启动广播
1. **在 ADVERTISER 页面找到创建的设备**
2. **点击右侧开关启动广播**
3. **在弹出的持续时间对话框中**:
   - 选择 ◉ **Until manually turned off**
   - 选择 ◉ **No maximum**
   - 点击 **OK**

## 第五步：测试设备功能

### 5.1 发现和连接测试
**使用另一台设备或nRF Connect：**

1. **切换到 SCANNER 标签**
2. **点击 "SCAN" 开始扫描**
3. **找到 "Smart Light Device"**
4. **点击 "CONNECT" 连接设备**

### 5.2 功能测试

#### 测试1：读取设备信息
1. **找到 Device Info 特征值**
2. **点击 📖 READ 按钮**
3. **应该显示**: `Smart Light v1.0,Nordic Simulator`

#### 测试2：读取当前状态
1. **找到 Light Status Notification 特征值**
2. **点击 📖 READ 按钮**
3. **应该显示**: `OFF,50`

#### 测试3：开启灯光
1. **找到 Light Switch 特征值**
2. **点击 ✏️ WRITE 按钮**
3. **输入数据**: `1` (UINT8格式)
4. **点击 SEND 发送**
5. **检查状态通知是否变为**: `ON,50`

#### 测试4：调节亮度
1. **找到 Brightness Control 特征值**
2. **点击 ✏️ WRITE 按钮**
3. **输入数据**: `80` (设置亮度为80%)
4. **点击 SEND 发送**
5. **检查状态通知是否变为**: `ON,80`

#### 测试5：订阅通知
1. **找到 Light Status Notification 特征值**
2. **点击 🔔 NOTIFY 按钮启用通知**
3. **修改开关或亮度时应自动收到通知**

## 第六步：高级功能配置

### 6.1 自动通知设置
**在 GATT 服务器中配置：**
- 当 Light Switch 或 Brightness Control 被写入时
- 自动更新 Light Status Notification 的值
- 自动向已订阅的客户端发送通知

### 6.2 数据验证规则
**亮度控制验证：**
```
if (输入值 < 0) 输入值 = 0
if (输入值 > 100) 输入值 = 100
```

**开关控制验证：**
```
if (输入值 != 0 && 输入值 != 1) 返回错误
```

### 6.3 联动逻辑
**智能联动规则：**
- 当开关设置为 0 (关闭) 时，状态显示为 "OFF,当前亮度值"
- 当开关设置为 1 (开启) 时，状态显示为 "ON,当前亮度值"
- 当亮度设置为 0 时，自动关闭开关

## 实际应用场景

### 场景1：手机APP控制
```
用户操作: 打开灯光APP
APP行为: 连接到 Smart Light Device
APP读取: 当前状态 "OFF,50"
用户点击: 开灯按钮
APP写入: Light Switch = 1
设备响应: 发送通知 "ON,50"
APP更新: 界面显示灯光已开启，亮度50%
```

### 场景2：亮度调节
```
用户操作: 拖动亮度滑条到75%
APP写入: Brightness Control = 75
设备响应: 发送通知 "ON,75"
APP更新: 界面显示亮度75%
```

### 场景3：状态监控
```
其他设备: 订阅状态通知
任何变化: 自动接收状态更新
实时监控: 灯光的所有状态变化
```


## APP控制源码地址

- 配套控制蓝牙灯光模拟 [源码](https://github.com/acsweets/bel_test)

