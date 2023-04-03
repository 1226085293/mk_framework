---
id: mk.storage
title: storage class
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[mk](./mk.md) &gt; [storage](./mk.storage.md)

## storage class

存储器

**Signature:**

```typescript
declare class mk_storage<CT extends Object> 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(init\_)](./mk.storage._constructor_.md) |  | Constructs a new instance of the <code>mk_storage</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [key](./mk.storage.key.md) |  | { \[k in keyof CT\]: k; } | 存储数据键 |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [clear()](./mk.storage.clear.md) |  | 清空当前存储器数据 |
|  [clear()](./mk.storage.clear.md) | <code>static</code> | 清空所有存储器数据 |
|  [del(key\_)](./mk.storage.del.md) |  | 删除数据 |
|  [get(key\_)](./mk.storage.get.md) |  | 获取数据 |
|  [set(key\_, data\_)](./mk.storage.set.md) |  | 设置存储数据 |