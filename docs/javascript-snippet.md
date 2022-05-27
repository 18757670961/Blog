---
title: Javascript Snippets
author: Desmond
date: 2021-08-22 22:26:00
tags: JavaScript
catalog: true
---

# Javascript Snippets

## 数组乱序

```js
function randomSort(arr) {
  let result = []

  while (arr.length > 0) {
    let randomIndex = Math.floor(Math.random() * arr.length)
    result.push(arr[randomIndex])
    arr.splice(randomIndex, 1)
  }

  return result
}

function randomSort(arr) {
  let index, randomIndex, len = arr.length

  for (index = 0; index < len; index++) {
    randomIndex = Math.floor(Math.random() * (len - index)) + index;

    [(arr[index]), (arr[randomIndex])] = [(arr[randomIndex]), (arr[index])]
  }

  return arr
}

randomSort([1, 3, 4, 6, 7, 8, 2, 3, 0])

[1, 2, 3].sort(() => Math.random() - 0.5)

```

## 寄生式组合继承

```js
function Person(name) {
  this.name = name
}

Person.prototype.sayName = function () {
  console.log('My name is' + this.name + '.');
}

function Student(name, grade) {
  Person.call(this, name)
  this.grade = grade
}

Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student

Student.prototype.sayMyGrade = function () {
  console.log('My grade is' + this.grade + '.');
}
```

## 防抖与节流

```js
/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce(func, wait = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function (...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

function throttle(fn, delay) {
  let preTime = Date.now()

  return function () {
    let context = this, // 保留调用时的this上下文
      args = arguments, // 保留调用时传入的参数
      nowTime = Date.now()

    if (nowTime - preTime >= delay) {
      preTime = Date.now()
      fn.apply(context, args)
    }
  }
}
```

## 对象拷贝

```js
// 会忽略 undefined
// 会忽略 symbol
// 不能序列化函数正则对象等特殊对象
// 不能处理指向相同引用的情况，相同的引用会被重复拷贝
JSON.parse(JSON.stringify())

// 浅拷贝
Object.assign({}, obj)

function shallowCopy(object) {
  if (!object || typeof object !== 'object') return object

  let newObject = Array.isArray(object) ? [] : {}

  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      newObject[key] = object[key];
    }
  }

  return newObject
}

function deepCopy(obj) {
  // Hash表 记录所有的对象引用关系
  let map = new WeakMap();

  function dp(obj) {
    let result = null;
    let keys = null,
      key = null,
      temp = null,
      existObj = null;

    existObj = map.get(obj);
    // 如果这个对象已被记录则直接返回
    if (existObj) {
      return existObj;
    }
    result = {};
    // 记录当前对象
    map.set(obj, result);
    keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      temp = obj[key];
      // 如果字段的值也是一个对象则递归复制
      if (temp && typeof temp === 'object') {
        result[key] = dp(temp);
      } else {
        // 否则直接赋值给新对象
        result[key] = temp;
      }
    }
    return result;
  }
  return dp(obj);
}
```

## call, apply, bind 实现

```js
/**
 * 用原生JavaScript实现call
 */
Function.prototype.myCall = function (thisArg, ...arr) {

  //1.判断参数合法性/////////////////////////
  if (thisArg === null || thisArg === undefined) {
    //指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    thisArg = window;
  } else {
    thisArg = Object(thisArg); //创建一个可包含数字/字符串/布尔值的对象，
    //thisArg 会指向一个包含该原始值的对象。
  }

  //2.搞定this的指向/////////////////////////
  const specialMethod = Symbol("anything"); //创建一个不重复的常量
  //如果调用myCall的函数名是func，也即以func.myCall()形式调用；
  //根据上篇文章介绍，则myCall函数体内的this指向func
  thisArg[specialMethod] = this; //给thisArg对象建一个临时属性来储存this（也即func函数）
  //进一步地，根据上篇文章介绍，func作为thisArg对象的一个方法被调用，那么func中的this便
  //指向thisArg对象。由此，巧妙地完成将this隐式地指向到thisArg！
  let result = thisArg[specialMethod](...arr);

  //3.收尾
  delete thisArg[specialMethod]; //删除临时方法
  return result; //返回临时方法的执行结果
};

/**
 * 用原生JavaScript实现apply
 */
Function.prototype.myApply = function (thisArg) {
  if (thisArg === null || thisArg === undefined) {
    thisArg = window;
  } else {
    thisArg = Object(thisArg);
  }

  //判断是否为【类数组对象】
  function isArrayLike(o) {
    if (
      o && // o不是null、undefined等
      typeof o === "object" && // o是对象
      isFinite(o.length) && // o.length是有限数值
      o.length >= 0 && // o.length为非负值
      o.length === Math.floor(o.length) && // o.length是整数
      o.length < 4294967296
    )
      // o.length < 2^32
      return true;
    else return false;
  }

  const specialMethod = Symbol("anything");
  thisArg[specialMethod] = this;

  let args = arguments[1]; // 获取参数数组
  let result;

  // 处理传进来的第二个参数
  if (args) {
    // 是否传递第二个参数
    if (!Array.isArray(args) && !isArrayLike(args)) {
      throw new TypeError(
        "第二个参数既不为数组，也不为类数组对象。抛出错误"
      );
    } else {
      args = Array.from(args); // 转为数组
      result = thisArg[specialMethod](...args); // 执行函数并展开数组，传递函数参数
    }
  } else {
    result = thisArg[specialMethod]();
  }

  delete thisArg[specialMethod];
  return result; // 返回函数执行结果
};

/**
 * 用原生JavaScript实现bind
 */
Function.prototype.myBind = function (objThis, ...params) {
  const thisFn = this; //存储调用函数，以及上方的params(函数参数)
  //对返回的函数 secondParams 二次传参
  let funcForBind = function (...secondParams) {
    //检查this是否是funcForBind的实例？也就是检查funcForBind是否通过new调用
    const isNew = this instanceof funcForBind;

    //new调用就绑定到this上,否则就绑定到传入的objThis上
    const thisArg = isNew ? this : Object(objThis);

    //用call执行调用函数，绑定this的指向，并传递参数。返回执行结果
    return thisFn.call(thisArg, ...params, ...secondParams);
  };

  //复制调用函数的prototype给funcForBind
  funcForBind.prototype = Object.create(thisFn.prototype);
  return funcForBind; //返回拷贝的函数
};
```

## 柯里化

```js
function curry(fn, args) {
  let length = fn.length

  args = args || []

  return function () {
    let subArgs = args.slice(0)

    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i])
    }

    if (subArgs.length >= length) {
      return fn.apply(this, subArgs)
    } else {
      return curry.call(this, fn, subArgs)
    }
  }
}

function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}
```

## 变量类型判断

```js
function getType(value) {
  if (value === null) {
    return value + ''
  }

  if (typeof value === 'object') {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(' ')[1].split('')

    type.pop()

    return type.join('').toLowerCase()
  } else {
    return typeof value
  }
}
```

## 判断空对象

```js
function checkNullObj(obj) {
  return Object.keys(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0
}
```

## 局部作用域捕获循环中的变量

```js
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000)
  })(i)
}

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000)
}
```

## 数组最值

```js
Math.max.apply(null, [1, 2, 3])

var arr = [6, 4, 1, 8, 2, 11, 23];

function max(prev, next) {
  return Math.max(prev, next);
}
console.log(arr.reduce(max));

arr.sort(function (a, b) {
  return a - b;
});
console.log(arr[arr.length - 1])

console.log(Math.max(...arr))

/**
 * 高性能数组拼接
 */

let array1 = [1, 2, 3]
let array2 = [4, 5, 6]
array1.push.apply(array1, array2)
```

## 动规版斐波那契

```js
function fibonacci(n) {
  let n1 = 1,
    n2 = 1,
    sum = 1

  for (let i = 3; i <= n; i++) {
    sum = n1 + n2
    n1 = n2
    n2 = sum
  }

  return sum
}
```

## 数组去重

```js
function dedupe(array) {
  return Array.from(new Set(array))
}

let arr = [1, 2, 3, 4]
let unique = [...new Set(arr)]

function unique(array) {
  return array.concat().sort().filter(function (item, index, array) {
    return !index || item !== array[index - 1]
  })
}
```

## 大数相加

```js
function bigNumberSum(a, b) {
  // 123456789
  // 000009876

  // padding
  let cur = 0;
  while (cur < a.length || cur < b.length) {
    if (!a[cur]) {
      a = "0" + a;
    } else if (!b[cur]) {
      b = "0" + b;
    }
    cur++;
  }

  let carried = 0;
  const res = [];

  for (let i = a.length - 1; i > -1; i--) {
    const sum = carried + +a[i] + +b[i];
    if (sum > 9) {
      carried = 1;
    } else {
      carried = 0;
    }
    res[i] = sum % 10;
  }
  if (carried === 1) {
    res.unshift(1);
  }

  return res.join("");
}
```

## 数组扁平化

```js
function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

function flattenDepth(list, n) {
  if (list.length === 0) return [];
  if (n === 0) return list;
  const head = list[0];
  if (head instanceof Array) {
    list[0] = flattenDepth(head, n - 1);
  } else {
    list[0] = [list[0]];
  }
  return list[0].concat(flattenDepth(list.slice(1), n));
}

/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
function flatten(input, shallow, strict, output) {

  // 递归使用的时候会用到output
  output = output || [];
  var idx = output.length;

  for (var i = 0, len = input.length; i < len; i++) {

    var value = input[i];
    // 如果是数组，就进行处理
    if (Array.isArray(value)) {
      // 如果是只扁平一层，遍历该数组，依此填入 output
      if (shallow) {
        var j = 0,
          len = value.length;
        while (j < len) output[idx++] = value[j++];
      }
      // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
      else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    }
    // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
    else if (!strict) {
      output[idx++] = value;
    }
  }

  return output;

}

// 迭代实现
const flatten = function (arr) {function flattenDeep(arr) {
  const result = [] 
  // 将数组元素拷贝至栈，直接赋值会改变原数组
  const stack = [...arr]
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop() 
    if (Array.isArray(val)) {
      // 如果是数组再次入栈，并且展开了一层
      stack.push(...val) 
    } else {
      // 如果不是数组，就用头插法插入到结果数组中
      result.unshift(val)
    }
  }
  return result
}
```

## 周期有限次执行函数

```js
function repeat(func, times, ms, immediate) {
  let count = 0;
  const ctx = null;

  function inner(...args) {
    count++;
    if (count === 1 && immediate) {
      inner.call(ctx, ...args);
      func.call(ctx, ...args);
      return;
    }
    if (count > times) {
      return;
    }
    return setTimeout(() => {
      inner.call(ctx, ...args);
      func.call(ctx, ...args);
    }, ms);
  }
  return inner;
}

const repeatFunc = repeat(console.log, 4, 3000, true);
repeatFunc("hellworld"); //先立即打印一个hellworld，然后每三秒打印三个hellworld
```

## 浮点数比较 & 自定义迭代器

```js
console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);

let o = {
  [Symbol.iterator]: () => ({
    _value: 0,
    next() {
      if (this._value == 10)
        return {
          done: true
        }
      else return {
        value: this._value++,
        done: false
      };
    }
  })
}
for (let e of o)
  console.log(e);
```

## vue模板引擎实现

```ts
/**
 *  将HTML编译成AST对象
 *  该代码片段基于Vue2.x版本
 */
export function parse(
  template: string,
  options: CompilerOptions
): ASTElement | void {
  // 返回AST对象
  // 篇幅原因，一些前置定义省略
  // 此处开始解析HTML模板
  parseHTML(template, {
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start(tag, attrs, unary) {
      // 一些前置检查和设置、兼容处理此处省略
      // 此处定义了初始化的元素AST对象
      const element: ASTElement = {
        type: 1,
        tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: [],
      };
      // 检查元素标签是否合法（不是保留命名）
      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== "production" &&
          warn(
            "Templates should only be responsible for mapping the state to the " +
            "UI. Avoid placing tags with side-effects in your templates, such as " +
            `<${tag}>` +
            ", as they will not be parsed."
          );
      }
      // 执行一些前置的元素预处理
      for (let i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }
      // 是否原生元素
      if (inVPre) {
        // 处理元素的一些属性
        processRawAttrs(element);
      } else {
        // 处理指令，此处包括v-for/v-if/v-once/key等等
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element); // 删除结构属性
        // 确定这是否是一个简单的元素
        element.plain = !element.key && !attrs.length;
        // 处理ref/slot/component等属性
        processRef(element);
        processSlot(element);
        processComponent(element);
        for (let i = 0; i < transforms.length; i++) {
          transforms[i](element, options);
        }
        processAttrs(element);
      }
      // 后面还有一些父子节点等处理，此处省略
    },
    // 其他省略
  });
  return root;
}

// 假设这是一个生成 DOM 的过程，包括 innerHTML 和事件监听
function generateDOM(astObject) {
  const {
    dom,
    binding = []
  } = astObject;
  // 生成DOM，这里假装当前节点是baseDom
  baseDom.innerHTML = getDOMString(dom);
  // 对于数据绑定的，来进行监听更新吧
  baseDom.addEventListener("data:change", (name, value) => {
    // 寻找匹配的数据绑定
    const obj = binding.find((x) => x.valueName == name);
    // 若找到值绑定的对应节点，则更新其值。
    if (obj) {
      baseDom.find(`[data-node-index="${obj.nodeIndex}"]`).innerHTML = value;
    }
  });
}

// 获取DOM字符串，这里简单拼成字符串
function getDOMString(domObj) {
  // 无效对象返回''
  if (!domObj) return "";
  const {
    type,
    children = [],
    nodeIndex,
    ele,
    value
  } = domObj;
  if (type == "dom") {
    // 若有子对象，递归返回生成的字符串拼接
    const childString = "";
    children.forEach((x) => {
      childString += getDOMString(x);
    });
    // dom对象，拼接生成对象字符串
    return `<${ele} data-node-index="${nodeIndex}">${childString}</${ele}>`;
  } else if (type == "text") {
    // 若为textNode，返回text的值
    return value;
  }
}
```

## vue双向绑定实现

```js
function observe(obj, vm) {
  Object.keys(obj).forEach(function (key) {
    defineReactive(vm, key, obj[key]);
  })
}

function defineReactive(obj, key, val) {
  var dep = new Dep();

  Object.defineProperty(obj, key, {
    get: function () {
      // 添加订阅者 watcher 到主题对象 Dep
      if (Dep.target) dep.addSub(Dep.target);
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      val = newVal;
      // 作为发布者发出通知
      dep.notify();
    }
  });
}

function nodeToFragment(node, vm) {
  var flag = document.createDocumentFragment();
  var child;
  // 许多同学反应看不懂这一段，这里有必要解释一下
  // 首先，所有表达式必然会返回一个值，赋值表达式亦不例外
  // 理解了上面这一点，就能理解 while (child = node.firstChild) 这种用法
  // 其次，appendChild 方法有个隐蔽的地方，就是调用以后 child 会从原来 DOM 中移除
  // 所以，第二次循环时，node.firstChild 已经不再是之前的第一个子元素了
  while (child = node.firstChild) {
    compile(child, vm);
    flag.appendChild(child); // 将子节点劫持到文档片段中
  }

  return flag
}

function compile(node, vm) {
  var reg = /\{\{(.*)\}\}/;
  // 节点类型为元素
  if (node.nodeType === 1) {
    var attr = node.attributes;
    // 解析属性
    for (var i = 0; i < attr.length; i++) {
      if (attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue; // 获取 v-model 绑定的属性名
        node.addEventListener('input', function (e) {
          // 给相应的 data 属性赋值，进而触发该属性的 set 方法
          vm[name] = e.target.value;
        });
        node.value = vm[name]; // 将 data 的值赋给该 node
        node.removeAttribute('v-model');
      }
    };

    new Watcher(vm, node, name, 'input');
  }
  // 节点类型为 text
  if (node.nodeType === 3) {
    if (reg.test(node.nodeValue)) {
      var name = RegExp.$1; // 获取匹配到的字符串
      name = name.trim();

      new Watcher(vm, node, name, 'text');
    }
  }
}

function Watcher(vm, node, name, nodeType) {
  Dep.target = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.nodeType = nodeType;
  this.update();
  Dep.target = null;
}

Watcher.prototype = {
  update: function () {
    this.get();
    if (this.nodeType == 'text') {
      this.node.nodeValue = this.value;
    }
    if (this.nodeType == 'input') {
      this.node.value = this.value;
    }
  },
  // 获取 data 中的属性值
  get: function () {
    this.value = this.vm[this.name]; // 触发相应属性的 get
  }
}

function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
}

function Vue(options) {
  this.data = options.data;
  var data = this.data;

  observe(data, this);

  var id = options.el;
  var dom = nodeToFragment(document.getElementById(id), this);

  // 编译完成后，将 dom 返回到 app 中
  document.getElementById(id).appendChild(dom);
}
```

## compose & point-free

```js
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
};
```

## 判断对象相等

```js
var toString = Object.prototype.toString;

function isFunction(obj) {
  return toString.call(obj) === '[object Function]'
}

function eq(a, b, aStack, bStack) {

  // === 结果为 true 的区别出 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b;

  // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
  if (a == null || b == null) return false;

  // 判断 NaN
  if (a !== a) return b !== b;

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;

  // 更复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b, aStack, bStack);
};

function deepEq(a, b, aStack, bStack) {

  // a 和 b 的内部属性 [[class]] 相同时 返回 true
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b;
    case '[object Number]':
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }

  var areArrays = className === '[object Array]';
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a != 'object' || typeof b != 'object') return false;

    var aCtor = a.constructor,
      bCtor = b.constructor;
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (aCtor == bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }


  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;

  // 检查是否有循环引用的部分
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }

  aStack.push(a);
  bStack.push(b);

  // 数组判断
  if (areArrays) {

    length = a.length;
    if (length !== b.length) return false;

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  }
  // 对象判断
  else {

    var keys = Object.keys(a),
      key;
    length = keys.length;

    if (Object.keys(b).length !== length) return false;
    while (length--) {

      key = keys[length];
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }

  aStack.pop();
  bStack.pop();
  return true;

}
```

## lazy function

```js
var foo = function () {
  var t = new Date();
  foo = function () {
    return t;
  };
  return foo();
};
```

## new实现

```js
//  new 操作符
// （1）首先创建了一个新的空对象
// （2）设置原型，将对象的原型设置为函数的 prototype 对象。
// （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
// 实现:
function objectFactory() {
  let newObject = null,
    constructor = Array.prototype.shift.call(arguments),
    result = null;
  // 参数判断
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag =
    result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
```

## 函数重载

```js
(() => { //IIFE+箭头函数，把要写的代码包起来，避免影响外界，这是个好习惯

  // 当函数成为对象的一个属性的时候，可以称之为该对象的方法。

  /**
   * @param {object}  一个对象，以便接下来给这个对象添加重载的函数(方法)
   * @param {name}    object被重载的函数(方法)名
   * @param {fn}      被添加进object参与重载的函数逻辑
   */
  function overload(object, name, fn) {
    var oldMethod = object[name]; //存放旧函数，本办法灵魂所在，将多个fn串联起来
    object[name] = function () {
      // fn.length为fn定义时的参数个数,arguments.length为重载方法被调用时的参数个数
      if (fn.length === arguments.length) { //若参数个数匹配上
        return fn.apply(this, arguments); //就调用指定的函数fn
      } else if (typeof oldMethod === "function") { //若参数个数不匹配
        return oldMethod.apply(this, arguments); //就调旧函数
        //注意：当多次调用overload()时，旧函数中
        //又有旧函数,层层嵌套,递归地执行if..else
        //判断,直到找到参数个数匹配的fn
      }
    };
  }

  // 不传参数时
  function fn0() {
    return "no param";
  }
  // 传1个参数
  function fn1(param1) {
    return "1 param:" + param1;
  }
  // 传两个参数时，返回param1和param2都匹配的name
  function fn2(param1, param2) {
    return "2 param:" + [param1, param2];
  }

  let obj = {}; //定义一个对象，以便接下来给它的方法进行重载

  overload(obj, "fn", fn0); //给obj添加第1个重载的函数
  overload(obj, "fn", fn1); //给obj添加第2个重载的函数
  overload(obj, "fn", fn2); //给obj添加第3个重载的函数

  console.log(obj.fn()); //>> no param
  console.log(obj.fn(1)); //>> 1 param:1
  console.log(obj.fn(1, 2)); //>> 2 param:1,2
})();
```

## 将一个数组类型转换成一个对象 && reduce应用

```js
const arr = [{
    username: 'makai',
    displayname: '馆长',
    email: 'guanzhang@coffe1891.com'
  },
  {
    username: 'xiaoer',
    displayname: '小二',
    email: 'xiaoer@coffe1891.com'
  },
  {
    username: 'zhanggui',
    displayname: '掌柜',
    email: null
  },
];

function callback(acc, person) {
  //下面这句用到了扩展运算符...acc，表示把acc对象的属性“肢解”开，和新的属性一起
  //以一个新的对象返回
  return {
    ...acc,
    [person.username]: person
  };
}
const obj = arr.reduce(callback, {}); //这里的初始值为{}
console.log(obj);

/**
 * 展开一个超大的array
 */

const arr = [
  "Algar,Bardle,Mr. Barker,Barton",
  "Baynes,Bradstreet,Sam Brown",
  "Monsieur Dubugue,Birdy Edwards,Forbes,Forrester",
  "Gregory,Tobias Gregson,Hill",
  "Stanley Hopkins,Athelney Jones"
];

function callback(acc, line) {
  return acc.concat(line.split(/,/g));
}
const arr1 = arr.reduce(callback, []);
console.log(arr1);

/**
 * 完成对数组的两次计算，但只遍历一次
 */

const arr = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];

function callback(acc, reading) {
  return {
    minReading: Math.min(acc.minReading, reading),
    maxReading: Math.max(acc.maxReading, reading),
  };
}
const initMinMax = {
  minReading: Number.MAX_VALUE,
  maxReading: Number.MIN_VALUE
};
const result = arr.reduce(callback, initMinMax);
console.log(result);
//>> {minReading: 0.2, maxReading: 5.5}

/**
 * 在一次调用动作里，同时实现mapping和filter 的功能
 */

function notEmptyEmail(x) {
  return (x.email !== null) && (x.email !== undefined);
}

function getLastSeen(x) {
  return x.lastSeen;
}

function greater(a, b) {
  return (a > b) ? a : b;
}

const peopleWithEmail = peopleArr.filter(notEmptyEmail);
const lastSeenDates = peopleWithEmail.map(getLastSeen);
const mostRecent = lastSeenDates.reduce(greater, '');

console.log(mostRecent);
//>> 2019-05-13T11:07:22+00:00

/**
 * 运行异步方法队列
 */

function fetchMessages(username) {
  return fetch(`https://example.com/api/messages/${username}`)
    .then(response => response.json());
}

function getUsername(person) {
  return person.username;
}

async function chainedFetchMessages(p, username) {
  // 在这个函数体内, p 是一个promise对象，等待它执行完毕,
  // 然后运行 fetchMessages().
  const obj = await p;
  const data = await fetchMessages(username);
  return {
    ...obj,
    [username]: data
  };
}

const msgObj = peopleArr
  .map(getUsername)
  .reduce(chainedFetchMessages, Promise.resolve({}))
  .then(console.log);
//>> {glestrade: [ … ], mholmes: [ … ], iadler: [ … ]}
```

## 发布订阅模式

```js
let eventEmitter = {
  // 缓存列表
  list: {},
  // 订阅
  on(event, fn) {
    let _this = this;
    // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
    // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
    (_this.list[event] || (_this.list[event] = [])).push(fn);
    return _this;
  },
  // 监听一次
  once(event, fn) {
    // 先绑定，调用后删除
    let _this = this;

    function on() {
      _this.off(event, on);
      fn.apply(_this, arguments);
    }
    on.fn = fn;
    _this.on(event, on);
    return _this;
  },
  // 取消订阅
  off(event, fn) {
    let _this = this;
    let fns = _this.list[event];
    // 如果缓存列表中没有相应的 fn，返回false
    if (!fns) return false;
    if (!fn) {
      // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
      fns && (fns.length = 0);
    } else {
      // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
      let cb;
      for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
        cb = fns[i];
        if (cb === fn || cb.fn === fn) {
          fns.splice(i, 1);
          break
        }
      }
    }
    return _this;
  },
  // 发布
  emit() {
    let _this = this;
    // 第一个参数是对应的 event 值，直接用数组的 shift 方法取出
    let event = [].shift.call(arguments),
      fns = _this.list[event];
    // 如果缓存列表里没有 fn 就返回 false
    if (!fns || fns.length === 0) {
      return false;
    }
    // 遍历 event 值对应的缓存列表，依次执行 fn
    fns.forEach(fn => {
      fn.apply(_this, arguments);
    });
    return _this;
  }
};

function user1(content) {
  console.log('用户1订阅了:', content);
}

function user2(content) {
  console.log('用户2订阅了:', content);
}

function user3(content) {
  console.log('用户3订阅了:', content);
}

function user4(content) {
  console.log('用户4订阅了:', content);
}

// 订阅
eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

// 取消user2方法的订阅
eventEmitter.off('article1', user2);

eventEmitter.once('article2', user4)

// 发布
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');

// eventEmitter.on('article1', user3).emit('article1', 'test111');

/*>>
  用户1订阅了: Javascript 发布-订阅模式
  用户3订阅了: Javascript 发布-订阅模式
  用户1订阅了: Javascript 发布-订阅模式
  用户3订阅了: Javascript 发布-订阅模式
  用户4订阅了: Javascript 观察者模式
*/
```

## promise实现

```js
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  // 保存初始化状态
  var self = this;
  // 初始化状态
  this.state = PENDING;
  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null;
  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = [];
  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = [];

  // 状态转变为 resolved 方法
  function resolve(value) {
    // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变，
      if (self.state === PENDING) {
        // 修改状态
        self.state = RESOLVED;
        // 设置传入的值
        self.value = value;
        // 执行回调函数
        self.resolvedCallbacks.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }

  // 状态转变为 rejected 方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED;
        // 设置传入的值
        self.value = value;
        // 执行回调函数
        self.rejectedCallbacks.forEach(callback => {
          callback(value);
        });
      }
    }, 0);
  }
  // 将两个方法传入函数执行
  try {
    fn(resolve, reject);
  } catch (e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved =
    typeof onResolved === "function" ?
    onResolved :
    function (value) {
      return value;
    };
  onRejected =
    typeof onRejected === "function" ?
    onRejected :
    function (error) {
      throw error;
    };
  // 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }
  // 如果状态已经凝固，则直接执行对应状态的函数
  if (this.state === RESOLVED) {
    onResolved(this.value);
  }
  if (this.state === REJECTED) {
    onRejected(this.value);
  }
};
```

## 插入大量节点

```js
(() => {
  const ndContainer = document.getElementById('js-list');
  if (!ndContainer) {
    return;
  }

  const total = 30000;
  const batchSize = 4; // 每批插入的节点次数，越大越卡
  const batchCount = total / batchSize; // 需要批量处理多少次
  let batchDone = 0; // 已经完成的批处理个数

  function appendItems() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < batchSize; i++) {
      const ndItem = document.createElement('li');
      ndItem.innerText = (batchDone * batchSize) + i + 1;
      fragment.appendChild(ndItem);
    }

    // 每次批处理只修改 1 次 DOM
    ndContainer.appendChild(fragment);

    batchDone += 1;
    doBatchAppend();
  }

  function doBatchAppend() {
    if (batchDone < batchCount) {
      window.requestAnimationFrame(appendItems);
    }
  }

  // kickoff
  doBatchAppend();

  ndContainer.addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName === 'LI') {
      alert(target.innerHTML);
    }
  });
})();
```

## 拆分 CPU 过载任务

```js
let i = 0;

let start = Date.now();

function count() {

  // 将调度（scheduling）移动到开头
  if (i < 1e9 - 1e6) {
    setTimeout(count); // 安排（schedule）新的调用
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();


/**
 * 进度指示
 */

let i = 0;

function count() {

  // 做繁重的任务的一部分 (*)
  do {
    i++;
    progress.innerHTML = i;
  } while (i % 1e3 != 0);

  if (i < 1e7) {
    setTimeout(count);
  }

}

count();
```

## instanceof实现

```js
// instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
// 实现：
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
    prototype = right.prototype; // 获取构造函数的 prototype 对象
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```

## promise封装

```js
function promisify(f) {
  return function (...args) { // 返回一个包装函数（wrapper-function） (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // 我们对 f 的自定义的回调 (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 将我们的自定义的回调附加到 f 参数（arguments）的末尾

      f.call(this, ...args); // 调用原始的函数
    });
  };
}
```

## promise.all实现

```js
function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let pending = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(result => {
        results[i] = result;
        pending--;
        if (pending == 0) resolve(results);
      }).catch(reject);
    }
    if (promises.length == 0) resolve(results);
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)]).then(array => {
  console.log("We should not get here");
}).catch(error => {
  if (error != "X") {
    console.log("Unexpected failure:", error);
  }
});
```

## jsonp实现

```js
function jsonp(url, jsonpCallback, success) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function (data) {
    success && success(data)
  }
  document.body.appendChild(script)
}
jsonp('http://xxx', 'callback', function (value) {
  console.log(value)
})

```

## 获取url参数

```js
function getUrlParam(sUrl, sKey) {
  // 判断url是否合法
  try {
    new URL(sUrl)
  } catch(err) {
    return null
  }

  var paramArr = sUrl.split('?')[1].split('#')[0].split('&'); // 取出每个参数的键值对放入数组
  const obj = {};
  paramArr.forEach(element => {
    const [key, value] = element.split('='); // 取出数组中每一项的键与值
    if (obj[key] === void 0) { // 表示第一次遍历这个元素，直接添加到对象上面
      obj[key] = value
    } else {
      obj[key] = [].concat(obj[key], value); // 表示不是第一次遍历说明这个键已有，通过数组存起来。
    }
  });
  return sKey === void 0 ? obj : obj[sKey] || '' // 如果该方法为一个参数，则返回对象。
  //如果为两个参数，sKey存在，则返回值或数组，否则返回空字符。
}
```

## 根据包名，在指定空间中创建对象

```js
// 输入描述：
// namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
// 输出描述：
// {a: {test: 1, b: {c: {d: {}}}}}

function namespace(oNamespace, sPackage) {
  var arr = sPackage.split('.');
  var res = oNamespace; // 保留对原始对象的引用

  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] in oNamespace) { // 空间名在对象中
      if (typeof oNamespace[arr[i]] !== "object") { // 为原始值	
        oNamespace[arr[i]] = {}; // 将此属性设为空对象			
      }
    } else { // 空间名不在对象中，建立此空间名属性，赋值为空
      oNamespace[arr[i]] = {};
    }

    oNamespace = oNamespace[arr[i]]; // 将指针指向下一个空间名属性。
  }

  return res;

}
```

## 颜色字符串转换

```js
// 将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
// 1. rgb 中每个 , 后面的空格数量不固定
// 2. 十六进制表达式使用六位小写字母
// 3. 如果输入不符合 rgb 格式，返回原始输入

function rgb2hex(rgb) {
  const rgb = rgb.match(/\d+/g);
  const hex = (n) => {
    return ("0" + Number(n).toString(16)).slice(-2);
  }
  return rgb.reduce((acc, cur) => acc + hex, '#').toUpperCase()
}
```

## 精确加法

```js
// 对于运算类操作，如 +-*/，就不能使用 toPrecision 了。正确的做法是把小数转成整数后再运算
function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
```

## 模板字符串

```js
// 实现一个 render(template, context) 方法，将 template 中的占位符用 context 填充。
// 不需要有控制流成分（如 循环、条件 等等），只要有变量替换功能即可；
// 级联的变量也可以展开；
// 被转义的的分隔符 { 和 } 不应该被渲染，分隔符与变量之间允许有空白字符。
// var obj = {name:"二月",age:"15"};
// var str = "{{name}}很厉害，才{{age}}岁";
// 输出：二月很厉害，才15岁。

function render(template, context) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => context[key.trim()]);
}
```

## add函数

```js
// add(1) => 1
// add(1, 2) => 3
// add(1)(2)(3) => 6
// add(1)(2, 3) => 6
// add(1, 2)(3) => 6
// add(1, 2, 3) => 6

function add() {
  let args = [].slice.call(arguments)
  let fn = function() {
    let fn_args = [].slice.call(arguments)
    return add.apply(null, args.concat(fn_args))
  }
  fn.toString = function() {
    return args.reduce((a, b) => a + b)
  }
  return fn
}
```

## list转换树形结构

```js
// list = [{id: 1, name: '部门A', parentId: 0}, ...]
// parentId为0代表一级部门
// parentId为多少就挂载在该id的属性children数组下

function convert(list, topId = 0) {
  const result = []
  let map = {}

  list.forEach(item => {
    const {id, parentId} = item

    if (parentId === topId) {
      result.push(item)
    } else {
      map[parentId] = map[parentId] || []
      map[parentId].push(item)
    }

    item.children = item.children || map[id] || (map[id] = [])
  })

  map = null
  return result
}
```

## 对象扁平化

```js
let input = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

let output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

function flattenObj(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}${key}`
      if (typeof obj[key] === 'object') {
        flattenObj(obj[key], keyName + '.', result)
      } else {
        result[keyName] = obj[key]
      }
    }
  }
  return result
}
```

## 上题反过来

```js
function constructObj(input) {
  const keys = Object.keys(input)
  const resObj = {}
  for (const key of keys) {
    const keySet = key.split('.')
    keySet.reduce((pre, next, index, array) => {
      if (index === array.length - 1) {
        pre[next] = input[key]
        return
      }
      pre[next] = pre[next] || {}
      return pre[next]
    }, resObj)
  }
  return resObj
}
```

## normalize

```js
// 将输入字符串转化为特定的结构化数据
// 字符串仅由小写字母和[]组成，且字符串不会包含多余的空格
// 'a, b, c' => {value: 'abc'}
// '[abc[bcd[def]]]' => {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}

function normalize(str) {
  let result = {}
  str.split(/[\[\]]/g).filter(Boolean).reduce((obj, item, index, arr) => {
    obj.value = item
    if (index !== arr.length - 1) {
      return (obj.children = {})
    }
  }, result)
  return result
}
```

## 并发执行async函数

```js
async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}

// 方法一
(async () => {
  const handleListPromise = handleList()
  const handleAnotherListPromise = handleAnotherList()
  await handleListPromise
  await handleAnotherListPromise
})()

// 方法二
(async () => {
  Promise.all([handleList(), handleAnotherList()]).then()
})()
```

## async错误捕获

```js
// to.js
export default function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}

import to from './to.js';

async function asyncTask() {
     let err, user, savedTask;

     [err, user] = await to(UserModel.findById(1));
     if(!user) throw new CustomerError('No user found');

     [err, savedTask] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
     if(err) throw new CustomError('Error occurred while saving task');

    if(user.notificationsEnabled) {
       const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
       if (err) console.error('Just log the error and continue flow');
    }
}
```

## 红绿灯问题

```js
// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？

function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}

var light = function(timmer, cb){
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            cb();
            resolve();
        }, timmer);
    });
};

var step = function() {
    Promise.resolve().then(function(){
        return light(3000, red);
    }).then(function(){
        return light(2000, green);
    }).then(function(){
        return light(1000, yellow);
    }).then(function(){
        step();
    });
}

step();
```

## autobind装饰器

```js
class Person {
  @autobind
  getPerson() {
  	return this;
  }
}

let person = new Person();
let { getPerson } = person;

getPerson() === person;
// true

const { defineProperty, getPrototypeOf} = Object;

function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else {
    return function __autobind__() {
      return fn.apply(context, arguments);
    };
  }
}

function createDefaultSetter(key) {
  return function set(newValue) {
    Object.defineProperty(this, key, {
      configurable: true,
      writable: true,
      enumerable: true,
      value: newValue
    });

    return newValue;
  };
}

function autobind(target, key, { value: fn, configurable, enumerable }) {
  if (typeof fn !== 'function') {
    throw new SyntaxError(`@autobind can only be used on functions, not: ${fn}`);
  }

  const { constructor } = target;

  return {
    configurable,
    enumerable,

    get() {

      /**
       * 使用这种方式相当于替换了这个函数，所以当比如
       * Class.prototype.hasOwnProperty(key) 的时候，为了正确返回
       * 所以这里做了 this 的判断
       */
      if (this === target) {
        return fn;
      }

      const boundFn = bind(fn, this);

      defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: boundFn
      });

      return boundFn;
    },
    set: createDefaultSetter(key)
  };
}
```

## mixin装饰器

```js
const SingerMixin = {
  sing(sound) {
    alert(sound);
  }
};

const FlyMixin = {
  // All types of property descriptors are supported
  get speed() {},
  fly() {},
  land() {}
};

@mixin(SingerMixin, FlyMixin)
class Bird {
  singMatingCall() {
    this.sing('tweet tweet');
  }
}

var bird = new Bird();
bird.singMatingCall();
// alerts "tweet tweet"

function mixin(...mixins) {
  return target => {
    if (!mixins.length) {
      throw new SyntaxError(`@mixin() class ${target.name} requires at least one mixin as an argument`);
    }

    for (let i = 0, l = mixins.length; i < l; i++) {
      const descs = Object.getOwnPropertyDescriptors(mixins[i]);
      const keys = Object.getOwnPropertyNames(descs);

      for (let j = 0, k = keys.length; j < k; j++) {
        const key = keys[j];

        if (!target.prototype.hasOwnProperty(key)) {
          Object.defineProperty(target.prototype, key, descs[key]);
        }
      }
    }
  };
}
```

## Storage单例 (静态方法版)

```js
// 定义Storage
class Storage {
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!Storage.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            Storage.instance = new Storage()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return Storage.instance
    }
    getItem (key) {
        return localStorage.getItem(key)
    }
    setItem (key, value) {
        return localStorage.setItem(key, value)
    }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name', '李雷')
// 李雷
storage1.getItem('name')
// 也是李雷
storage2.getItem('name')

// 返回true
storage1 === storage2
```

## Storage单例 (闭包版)

```js
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function StorageBase () {}
StorageBase.prototype.getItem = function (key){
    return localStorage.getItem(key)
}
StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value)
}

// 以闭包的形式创建一个引用自由变量的构造函数
const Storage = (function(){
    let instance = null
    return function(){
        // 判断自由变量是否为null
        if(!instance) {
            // 如果为null则new出唯一实例
            instance = new StorageBase()
        }
        return instance
    }
})()

// 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果 
const storage1 = new Storage()
const storage2 = new Storage()

storage1.setItem('name', '李雷')
// 李雷
storage1.getItem('name')
// 也是李雷
storage2.getItem('name')

// 返回true
storage1 === storage2
```

## LRU算法实现

```js
// ./LRU.ts
export class LRUCache {
  capacity: number; // 容量
  cache: Map<number, number | null>; // 缓存
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key: number): number {
    if (this.cache.has(key)) {
      let temp = this.cache.get(key) as number;
      //访问到的 key 若在缓存中，将其提前
      this.cache.delete(key);
      this.cache.set(key, temp);
      return temp;
    }
    return -1;
  }
  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      //存在则删除，if 结束再提前
    } else if (this.cache.size >= this.capacity) {
      // 超过缓存长度,淘汰最近没使用的
      this.cache.delete(this.cache.keys().next().value);
      console.log(`refresh: key:${key} , value:${value}`)
    }
    this.cache.set(key, value);
  }
  toString(){
    console.log('capacity',this.capacity)
    console.table(this.cache)
  }
}

// ./index.ts
import {LRUCache} from './lru'
const list = new LRUCache(4)
list.put(2,2)   // 入 2，剩余容量3
list.put(3,3)   // 入 3，剩余容量2
list.put(4,4)   // 入 4，剩余容量1
list.put(5,5)   // 入 5，已满    从头至尾         2-3-4-5
list.put(4,4)   // 入4，已存在 ——> 置队尾         2-3-5-4
list.put(1,1)   // 入1，不存在 ——> 删除队首 插入1  3-5-4-1
list.get(3)     // 获取3，刷新3——> 置队尾         5-4-1-3
list.toString()
```