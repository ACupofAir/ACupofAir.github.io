---
title: "Python函数装饰器的使用"
date: 2023-02-28T14:19:07+08:00
tags: [python, 🪶]
categories: ["PythonNotes"]
image: "cover.png"
toc: true
description: An article to tell you how to use the decorator in python
---

{{<notice note>}}

- 装饰器介绍：一个用于修改其他函数功能的函数
- 装饰函数功能：入参为函数，返回这个函数的修改版本
- 值得参考的文档：[🔗python3-cookbook](https://python3-cookbook.readthedocs.io/zh_CN/latest/chapters/p09_meta_programming.html)

{{</notice>}}

## 装饰器不带参数：

> 例子中的功能：在函数运行前打印一句话

### 装饰器

- note one:
  - `*arg`: allow all the **tuple** input for func
  - `**kwarg`: allow all the **dict** input for func
- note two:
  - `return func()` or `xx = func()`: run the `func`
  - `return func` or `xx = func`: just return the func address, not run it

```python
from functools import wraps
def decorator(func):
      @wraps(func)
      def wrapper(*arg, **kwarg):
          print("decorator: run func now")
          return func(*arg, **kwarg)
      return wrapper
```

### 装饰函数的方法

1. `@decorator`语法糖

{{<notice error>}}
如果不导入`wraps`, 将会丢失原来函数名称，则输出为`func_name: wrapper`
{{</notice>}}

```python
@decorator
def org_func():
  print("org_func: hello world")

org_func()
print("func name:", org_func.__name__)
# output:
# decorator: run func now
# org_func: hello world
# func_name: org_func
```

2. 本质上, 等价于以下代码

   可以看出`@decorator`在不带参数的情况下会把被装饰的函数当作第一个参数传入装饰器

```python
org_func = decorator(org_func)
org_func()
```

### 解除装饰器:`.wrapped__()`方法

```python
org_func.__wrapped__()
# output
# org_func: hello world
```

## 装饰函数带参数

### 带参数的装饰器

> 装饰器功能: 用来修改 dataloader 中的`__len__`函数，让其返回我们设定的`sample_size`

```python
from functools import wraps, partial


def change_len(func=None, sample_size=5):
    if not func:
        return partial(change_len, sample_size=sample_size)

    @wraps(func)
    def wrapper(*arg, **kwarg):
        return sample_size

    return wrapper
```

### 装饰函数

1. 语法糖

```python
@change_len(sample_size=7)
def print_len(dataset):
    return len(dataset)

print(print_len([1, 2, 3]))
```

2. 等价于

```python
print_len = change_len(sample_size=7)(print_len)
```

- 可以看出被包装函数没有被传入`change_len`函数，所以需要利用`functools.partial`方法来返回一个为完全初始化的自身，除了被包装函数，别的部分都已经确定下来
