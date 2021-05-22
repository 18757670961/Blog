---
title: Tips for Vue
author: Desmond
catalog: true
abbrlink: d576d5cc
date: 2020-12-24 12:33:00
header-img: d576d5cc/head.png
tags: Vue
top:
---

## Tips for Vue

### 优雅更新props

更新 `prop` 在业务中是很常见的需求，但在子组件中不允许直接修改 `prop`，因为这种做法不符合单向数据流的原则，在开发模式下还会报出警告。因此大多数人会通过 `$emit` 触发自定义事件，在父组件中接收该事件的传值来更新 `prop`

child.vue:

```javascript
export defalut {
    props: {
        title: String  
    },
    methods: {
        changeTitle(){
            this.$emit('change-title', 'hello')
        }
    }
}
```

parent.vue:

```html
<child :title="title" @change-title="changeTitle"></child>
```

```javascript
export default {
    data(){
        return {
            title: 'title'
        }  
    },
    methods: {
        changeTitle(title){
            this.title = title
        }
    }
}
```

这种做法没有问题，我也常用这种手段来更新 `prop`。但如果你只是想单纯的更新 `prop`，没有其他的操作。那么 `sync` 修饰符能够让这一切都变得特别简单

parent.vue:

```html
<child :title.sync="title"></child>
```

```javascript
export defalut {
    props: {
        title: String  
    },
    methods: {
        changeTitle(){
            this.$emit('update:title', 'hello')
        }
    }
}
```

只需要在绑定属性上添加 `.sync`，在子组件内部就可以触发 `update:属性名` 来更新 `prop`。可以看到这种手段确实简洁且优雅，这让父组件的代码中减少一个“没必要的函数”

### 小型状态管理器

大型项目中的数据状态会比较复杂，一般都会使用 `vuex` 来管理。但在一些小型项目或状态简单的项目中，为了管理几个状态而引入一个库，显得有些笨重

在 2.6.0+ 版本中，新增的 `Vue.observable` 可以帮助我们解决这个尴尬的问题，它能让一个对象变成响应式数据：

```javascript
// store.js
import Vue from 'vue'

export const state = Vue.observable({ 
  count: 0 
})
```

使用：

```html
<div @click="setCount">{{ count }}</div>
```

```javascript
import {state} from '../store.js'

export default {
    computed: {
        count() {
            return state.count
        }
    },
    methods: {
        setCount() {
            state.count++
        }
    }
}
```

当然你也可以自定义 `mutation` 来复用更改状态的方法：

```javascript
import Vue from 'vue'

export const state = Vue.observable({ 
  count: 0 
})

export const mutations = {
  SET_COUNT(payload) {
    if (payload > 0) {
        state.count = payload
    } 
  }
}
```

使用：

```javascript
import {state, mutations} from '../store.js'

export default {
    computed: {
        count() {
            return state.count
        }
    },
    methods: {
        setCount() {
            mutations.SET_COUNT(100)
        }
    }
}
```

### 优雅注册插件

插件通常用来为 `Vue` 添加全局功能。像常用的 `vue-router`、`vuex` 在使用时都是通过 `Vue.use` 来注册的。`Vue.use` 内部会自动寻找 `install` 方法进行调用，接受的第一个参数是 `Vue` 构造函数

一般在使用组件库时，为了减小包体积，都是采用按需加载的方式。如果在入口文件内逐个引入组件会让 `main.js` 越来越庞大，基于模块化开发的思想，最好是单独封装到一个配置文件中。配合上 `Vue.use`，在入口文件使用能让人一目了然

vant.config.js：

```javascript
import {
  Toast,
  Button
} from 'vant'

const components = {
  Toast,
  Button
}

const componentsHandler = {
  install(Vue){
    Object.keys(components).forEach(key => Vue.use(components[key]))
  }
}

export default componentsHandler
```

main.js:

```javascript
import Vue from 'vue'
import vantCompoents from '@/config/vant.config'

Vue.config.productionTip = false

Vue.use(vantCompoents)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### components 和 Vue.component

components: 局部注册组件

```javascript
export default{
  components:{home}
}
```

Vue.component: 全局注册组件

```javascript
Vue.component('home',home)
```

### 自定义组件（父子组件）的双向数据绑定

父组件写法：

```html
<empty v-model="msg"></empty>
```

子组件写法：

```javascript
<div class="share-btn" @click="confirm">确定</div>

// model选项用来避免冲突
// prop属性用来指定props属性中的哪个值用来接收父组件v-model传递的值
// 例如这里用props中的show来接收父组件传递的v-model值
// event：为了方便理解，可以简单理解为父组件@input的别名，从而避免冲突
// event的值对应了你emit时要提交的事件名，你可以叫aa，也可以叫bb，但是要命名要有意义哦！！！
model: {            
    prop: 'show',            
    event: 'changed'        
},
props: {
    // 由于model选项中的prop属性指定了，所以show接收的是父组件v-model传递的值            
    show: {                
        type: Boolean,                
        default: false            
    }        
},        
methods: {            
    confirm () {                
        // 双向数据绑定父组件传递的值
        // 第一个参数，对应model选项的event的值，你可以叫aa，bbb，ccc，起名随你 
        this.$emit('changed', false)            
    }        
}
```

### Style Guide

#### Multi-word component names

**Component names should always be multi-word, except for root `App` components, and built-in components provided by Vue, such as `<transition>` or `<component>`.**

This [prevents conflicts](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name) with existing and future HTML elements, since all HTML elements are a single word.

#### Component data

**Component `data` must be a function.**

When using the `data` property on a component (i.e. anywhere except on `new Vue`), the value must be a function that returns an object.

When the value of `data` is an object, it’s shared across all instances of a component. Imagine, for example, a `TodoList` component with this data:

```javascript
data: {
  listTitle: '',
  todos: []
}
```

We might want to reuse this component, allowing users to maintain multiple lists (e.g. for shopping, wishlists, daily chores, etc). There’s a problem though. Since every instance of the component references the same data object, changing the title of one list will also change the title of every other list. The same is true for adding/editing/deleting a todo.

Instead, we want each component instance to only manage its own data. For that to happen, each instance must generate a unique data object. In JavaScript, this can be accomplished by returning the object in a function:

```javascript
data: function () {
  return {
    listTitle: '',
    todos: []
  }
}
```

or

```javascript
data() {
  return {
    listTitle: '',
    todos: []
  }
}
```

> It's OK to use an object directly in a root Vue instance, since only a single instance will ever exist.

#### Prop definitions

**Prop definitions should be as detailed as possible.**

In committed code, prop definitions should always be as detailed as possible, specifying at least type(s).

Detailed [prop definitions](https://vuejs.org/v2/guide/components.html#Prop-Validation) have two advantages:

- They document the API of the component, so that it’s easy to see how the component is meant to be used.
- In development, Vue will warn you if a component is ever provided incorrectly formatted props, helping you catch potential sources of error.

```javascript
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

#### Keyed `v-for`

**Always use `key` with `v-for`.**

`key` with `v-for` is *always* required on components, in order to maintain internal component state down the subtree. Even for elements though, it’s a good practice to maintain predictable behavior, such as [object constancy](https://bost.ocks.org/mike/constancy/) in animations.

```javascript
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

#### Avoid `v-if` with `v-for

**Never use `v-if` on the same element as `v-for`.**

There are two common cases where this can be tempting:

- To filter items in a list (e.g. `v-for="user in users" v-if="user.isActive"`). In these cases, replace `users` with a new computed property that returns your filtered list (e.g. `activeUsers`).

- To avoid rendering a list if it should be hidden (e.g. `v-for="user in users" v-if="shouldShowUsers"`). In these cases, move the `v-if` to a container element (e.g. `ul`, `ol`).

```javascript
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

#### Component style scoping

**For applications, styles in a top-level `App` component and in layout components may be global, but all other components should always be scoped.**

This is only relevant for [single-file components](https://vuejs.org/v2/guide/single-file-components.html). It does *not* require that the [`scoped` attribute](https://vue-loader.vuejs.org/en/features/scoped-css.html) be used. Scoping could be through [CSS modules](https://vue-loader.vuejs.org/en/features/css-modules.html), a class-based strategy such as [BEM](http://getbem.com/), or another library/convention.

**Component libraries, however, should prefer a class-based strategy instead of using the `scoped` attribute.**

This makes overriding internal styles easier, with human-readable class names that don’t have too high specificity, but are still very unlikely to result in a conflict.

```javascript
<template>
  <button class="button button-close">X</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```javascript
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- Using CSS modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```javascript
<template>
  <button class="c-Button c-Button--close">X</button>
</template>

<!-- Using the BEM convention -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

#### Private property names

**Use module scoping to keep private functions inaccessible from the outside. If that’s not possible, always use the `$_` prefix for custom private properties in a plugin, mixin, etc that should not be considered public API. Then to avoid conflicts with code by other authors, also include a named scope (e.g. `$_yourPluginName_`).**

Vue uses the `_` prefix to define its own private properties, so using the same prefix (e.g. `_update`) risks overwriting an instance property. Even if you check and Vue is not currently using a particular property name, there is no guarantee a conflict won’t arise in a later version.

As for the `$` prefix, its purpose within the Vue ecosystem is special instance properties that are exposed to the user, so using it for *private* properties would not be appropriate.

Instead, we recommend combining the two prefixes into `$_`, as a convention for user-defined private properties that guarantee no conflicts with Vue.

#### Single-file component filename casing

PascalCase works best with autocompletion in code editors, as it’s consistent with how we reference components in JS(X) and templates, wherever possible. However, mixed case filenames can sometimes create issues on case-insensitive file systems, which is why kebab-case is also perfectly acceptable.

e.g. MyComponent.vue, my-component.vue

#### Base component names

**Base components (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions should all begin with a specific prefix, such as `Base`, `App`, or `V`.**

These components lay the foundation for consistent styling and behavior in your application. They may **only** contain:

- HTML elements,
- other base components, and
- 3rd-party UI components.

But they’ll **never** contain global state (e.g. from a Vuex store).

Their names often include the name of an element they wrap (e.g. `BaseButton`, `BaseTable`), unless no element exists for their specific purpose (e.g. `BaseIcon`). If you build similar components for a more specific context, they will almost always consume these components (e.g. `BaseButton` may be used in `ButtonSubmit`).

#### Single-instance component names

**Components that should only ever have a single active instance should begin with the `The` prefix, to denote that there can be only one.**

This does not mean the component is only used in a single page, but it will only be used once *per page*. These components never accept any props, since they are specific to your app, not their context within your app. If you find the need to add props, it’s a good indication that this is actually a reusable component that is only used once per page *for now*.

e.g. TheHeading.vue, TheSidebar.vue

#### Component name casing in templates

**In most projects, component names should always be PascalCase in [single-file components](https://vuejs.org/v2/guide/single-file-components.html) and string templates - but kebab-case in DOM templates.**

PascalCase has a few advantages over kebab-case:

- Editors can autocomplete component names in templates, because PascalCase is also used in JavaScript.
- `<MyComponent>` is more visually distinct from a single-word HTML element than `<my-component>`, because there are two character differences (the two capitals), rather than just one (a hyphen).
- If you use any non-Vue custom elements in your templates, such as a web component, PascalCase ensures that your Vue components remain distinctly visible.

Unfortunately, due to HTML’s case insensitivity, DOM templates must still use kebab-case.

#### Component name casing in JS/JSX

**Component names in JS/[JSX](https://vuejs.org/v2/guide/render-function.html#JSX) should always be PascalCase, though they may be kebab-case inside strings for simpler applications that only use global component registration through `Vue.component`.**

In JavaScript, PascalCase is the convention for classes and prototype constructors - essentially, anything that can have distinct instances. Vue components also have instances, so it makes sense to also use PascalCase. As an added benefit, using PascalCase within JSX (and templates) allows readers of the code to more easily distinguish between components and HTML elements.

However, for applications that use **only** global component definitions via `Vue.component`, we recommend kebab-case instead. The reasons are:

- It’s rare that global components are ever referenced in JavaScript, so following a convention for JavaScript makes less sense.
- These applications always include many in-DOM templates, where [kebab-case **must** be used](https://vuejs.org/v2/style-guide/#Component-name-casing-in-templates-strongly-recommended).

```javascript
Vue.component('MyComponent', {
  // ...
})
```

```javascript
Vue.component('my-component', {
  // ...
})
```

```javascript
import MyComponent from './MyComponent.vue'
```

```javascript
export default {
  name: 'MyComponent',
  // ...
}
```

#### Prop name casing

**Prop names should always use camelCase during declaration, but kebab-case in templates and [JSX](https://vuejs.org/v2/guide/render-function.html#JSX).**

We’re simply following the conventions of each language. Within JavaScript, camelCase is more natural. Within HTML, kebab-case is.

```javascript
props: {
  greetingText: String
}
```

```html
<WelcomeMessage greeting-text="hi"/>
```

#### Simple computed properties

**Complex computed properties should be split into as many simpler properties as possible.**

Simpler, well-named computed properties are:

- **Easier to test**
  
  When each computed property contains only a very simple expression, with very few dependencies, it’s much easier to write tests confirming that it works correctly.

- **Easier to read**
  
  Simplifying computed properties forces you to give each value a descriptive name, even if it’s not reused. This makes it much easier for other developers (and future you) to focus on the code they care about and figure out what’s going on.

- **More adaptable to changing requirements**
  
  Any value that can be named might be useful to the view. For example, we might decide to display a message telling the user how much money they saved. We might also decide to calculate sales tax, but perhaps display it separately, rather than as part of the final price.
  
  Small, focused computed properties make fewer assumptions about how information will be used, so require less refactoring as requirements change.

```javascript
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```

#### Component/instance options order

1. **Side Effects** (triggers effects outside the component)
   
   - `el`

2. **Global Awareness** (requires knowledge beyond the component)
   
   - `name`
   - `parent`

3. **Component Type** (changes the type of the component)
   
   - `functional`

4. **Template Modifiers** (changes the way templates are compiled)
   
   - `delimiters`
   - `comments`

5. **Template Dependencies** (assets used in the template)
   
   - `components`
   - `directives`
   - `filters`

6. **Composition** (merges properties into the options)
   
   - `extends`
   - `mixins`

7. **Interface** (the interface to the component)
   
   - `inheritAttrs`
   - `model`
   - `props`/`propsData`

8. **Local State** (local reactive properties)
   
   - `data`
   - `computed`

9. **Events** (callbacks triggered by reactive events)
   
   - `watch`
   - Lifecycle Events (in the order they are called)
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeDestroy`
     - `destroyed`

10. **Non-Reactive Properties** (instance properties independent of the reactivity system)
    
    - `methods`

11. **Rendering** (the declarative description of the component output)
    
    - `template`/`render`
    - `renderError`

#### Element attribute order

1. **Definition** (provides the component options)
   
   - `is`

2. **List Rendering** (creates multiple variations of the same element)
   
   - `v-for`

3. **Conditionals** (whether the element is rendered/shown)
   
   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **Render Modifiers** (changes the way the element renders)
   
   - `v-pre`
   - `v-once`

5. **Global Awareness** (requires knowledge beyond the component)
   
   - `id`

6. **Unique Attributes** (attributes that require unique values)
   
   - `ref`
   - `key`

7. **Two-Way Binding** (combining binding and events)
   
   - `v-model`

8. **Other Attributes** (all unspecified bound & unbound attributes)

9. **Events** (component event listeners)
   
   - `v-on`

10. **Content** (overrides the content of the element)
    
    - `v-html`
    - `v-text`

#### `v-if`/`v-else-if`/`v-else` without `key`

**It’s usually best to use `key` with `v-if` + `v-else`, if they are the same element type (e.g. both `<div>` elements).**

By default, Vue updates the DOM as efficiently as possible. That means when switching between elements of the same type, it simply patches the existing element, rather than removing it and adding a new one in its place. This can have [unintended consequences](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-priority-d-rules-unintended-consequences) if these elements should not actually be considered the same.

```javascript
<div
  v-if="error"
  key="search-status"
>
  Error: {{ error }}
</div>
<div
  v-else
  key="search-results"
>
  {{ results }}
</div>
```

#### Element selectors with `scoped`

**Element selectors should be avoided with `scoped`.**

Prefer class selectors over element selectors in `scoped` styles, because large numbers of element selectors are slow.

#### Implicit parent-child communication

**Props and events should be preferred for parent-child component communication, instead of `this.$parent` or mutating props.**

An ideal Vue application is props down, events up. Sticking to this convention makes your components much easier to understand. However, there are edge cases where prop mutation or `this.$parent` can simplify two components that are already deeply coupled.

The problem is, there are also many *simple* cases where these patterns may offer convenience. Beware: do not be seduced into trading simplicity (being able to understand the flow of your state) for short-term convenience (writing less code).

#### Non-flux state management

**[Vuex](https://github.com/vuejs/vuex) should be preferred for global state management, instead of `this.$root` or a global event bus.**

Managing state on `this.$root` and/or using a [global event bus](https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced) can be convenient for very simple cases, but it is not appropriate for most applications.

Vuex is the [official flux-like implementation](https://vuejs.org/v2/guide/state-management.html#Official-Flux-Like-Implementation) for Vue, and offers not only a central place to manage state, but also tools for organizing, tracking, and debugging state changes. It integrates well in the Vue ecosystem (including full [Vue DevTools](https://vuejs.org/v2/guide/installation.html#Vue-Devtools) support).