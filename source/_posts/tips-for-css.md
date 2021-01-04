---
title: Tips for CSS
author: Desmond
catalog: true
abbrlink: 8aecf2fe
date: 2020-12-24 20:25:33
header-img: https://i.loli.net/2021/01/01/xrICTKDv2HSyeQu.jpg
tags: CSS
top:
---

## Tips for CSS

### Beware of Margin Collapse

Unlike most other properties, vertical margins collapse when they meet. What this means is that when the bottom margin of one element touches the top margin of another, only the bigger of the two survives. Here is a simple example (only happen in block elements):

```css
.square {
    width: 80px;
    height: 80px;
}

.red {
    background-color: #F44336;
    margin-bottom: 40px;
}

.blue {
    background-color: #2196F3;
    margin-top: 30px;
}
```

Instead of 70px between the red and blue square we have only 40px, the margin of the blue square isn't taken into consideration at all. There are [ways](https://stackoverflow.com/questions/19718634/how-to-disable-margin-collapsing) to battle this behavior, but it's better to just work with it and use margins only going in one direction, preferably `margin-bottom`.

### Do a CSS Reset

Although the situation has greatly improved over the years, there is still plenty of variation in the way different browsers behave. The best way to resolve this issue is to apply a CSS reset that sets universal default values for all elements, allowing you to start working on a clean style sheet that will yield the same result everywhere.

There are libraries like [normalize.css,](https://necolas.github.io/normalize.css/) [minireset](http://jgthms.com/minireset.css/), and [ress](https://github.com/filipelinhares/ress) that do this very well, correcting all imaginable browser inconsistencies. If you don't want to use a library, you can do a very basic CSS reset yourself with these styles:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

This may seem a bit harsh, but nullifying margins and paddings actually makes laying out elements much easier as there are no default spaces between them to take into account. The `box-sizing: border-box;` property is another good default, which we will talk about more in our next tip.

### Border-box for All

Most beginners don't know about the `box-sizing` property but it's actually quite important. The best way to understand what it does is to look at it's two possible values:

- `content-box` (default) - When we set a width/hight to an element, that's just the size for it's content. All paddings and borders are on top of that. E.g. a `<div>` has a width of 100 and padding of 10, our element will take up 120 pixels (100 + 2*10).
- `border-box` - The padding and border are included in the width/height. A `<div>` with `width: 100px;` and `box-sizing: border-box;` will be 100 pixels wide no matter what paddings or borders are added.

Setting border-box to all elements makes it so much easier to style everything, since you don't have to do math all the time.

### Images as Background

When adding images to your design, especially if it's going to be responsive, use a `<div>` tag with the `background` CSS property instead of `<img>` elements.

This may seem like more work for nothing, but it actually makes it much easier to style images properly, keeping their original size and aspect-ratio, thanks to `background-size`, `background-position`, and other properties.

```html
<section>
    <p>Img element</p>
    <img src="https://tutorialzine.com/media/2016/08/bicycle.jpg" alt="bicycle">
</section>

<section>
    <p>Div with background image</p>
    <div></div>
</section>
```

```css
img {
    width: 300px;
    height: 200px;
}

div {
    width: 300px;
    height: 200px;
    background: url('https://tutorialzine.com/media/2016/08/bicycle.jpg');
    background-position: center center;
    background-size: cover;
}

section{
    float: left;
    margin: 15px;
}
```

### Write Better Comments

CSS might not be a programming language but it's code still needs to be documented. Some simple comments are all it takes to organize a style sheet and make it more accessible to your colleagues or your future self.

For larger sections of the CSS such as major components or media-queries, use a stylized comment and leave a couple of new lines after:

```css
/*---------------
    #Header
---------------*/
header { }

header nav { }

/*---------------
    #Slideshow
---------------*/
.slideshow { }
```

Details in the design or less important components can be marked with a single-line comment.

```css
/*   Footer Buttons   */
.footer button { }

.footer button:hover { }
```

Also, remember that CSS doesn't have single line `**//**` comments, so when commenting something out you still need to use the `/ /` syntax.

```css
/*  Do  */
p {
    padding: 15px;
    /*border: 1px solid #222;*/
}

/*  Don't  */
p {
    padding: 15px;
    // border: 1px solid #222;  
}
```

### Everyone Loves kebab-case

Class names and ids should be written with a hyphen (-) when they contain more then one word. CSS is case-insensitive so camelCase is not an option. A long time ago, underscores used to not be supported (they are now) which made dashes the default convention.

```css
/*  Do     */
.footer-column-left { }

/*  Don't  */
.footerColumnLeft { }

.footer_column_left { }
```

When it comes to naming, you may also consider [BEM](https://en.bem.info/), which follows a set of principles that add consistency and provide a component-based approach to development. You can read more about it in this excellent [CSS-Tricks article](https://css-tricks.com/bem-101/).

### Don't Repeat Yourself

The values for most CSS properties are inherited from the element one level up in the DOM tree, hence the name *Cascading* Style Sheets. Let's take the `font` property for example - it is almost always inherited from the parent, you don't have to set it again separately for each and every element on the page.

Simply add the font styles that will be most prevalent in your design to the `<html>` or `<body>` element and let them trickle down. Here are some good defaults:

```css
html {
    font: normal 16px/1.4 sans-serif;
}
```

Later on you can always change the styles for any given element. What we are saying is just to avoid repetition and use inheritance as much as possible.

### Keep Selector Specificity Low

Not all CSS selectors are created equal. When novice developers write CSS they usually expect that selectors will always overwrite everything above them. However, this isn't always the case, as we've illustrated in the following example:

```css
a{
    color: #fff;
    padding: 15px;
}

a#blue-btn {
    background-color: blue;
}

a.active {
    background-color: red;
}
```

We want to be able to add the `.active` class to any button and make it red. This won't work here because our button has it's `background-color` set with an ID selector, which has a [higher selector specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). The rule goes like this:

ID (`#id`) > Class (`.class`) > Type (e.g. `header`)

Specifity also stacks so `a#button.active` ranks higher than `a#button`. Using selectors with high specificity will cause you to constantly trump old selectors with even higher ones and eventually result in `!important`. 

**Seriously, don't use `!important`.** What is a quick fix now may end up causing lots of rewrites in the future. Instead, find why your CSS selector isn't working and change it.

The only time when it's acceptable to `!important` CSS rules is when you want to override inline styles from the HTML, which in itself is another bad practice to be avoided.

**CSS选择器优先级**

1. !important -> 最高
2. 内联style -> 1000
3. id -> 100
4. class -> 10
5. tag -> 1
6. 继承样式

### Em, Rem, and Pixel

There is a lot of debate whether people should use *em*, *rem*, or *px* values for setting the size of elements and text. Truth is, all three options are viable and have their pros and cons.

All developers and projects are different, so there can't be any strict rules on when to use which. Here are, however, some tips and general good practices for each unit:

- em - The value of 1 em is relative to the `font-size` of the direct parent. Often used in media-queries, *em* is great for responsiveness, but it can get really confusing tracing back the exchange rate of ems to pixels for each element (1.25em of 1.4em of 16px = ?).
- rem - Relative to the font-size of the `<html>` element, *rem* makes it really easy to scale all headings and paragraphs on the page. Leaving the `<html>` with it's default fontsize and setting everything else with *rem* is a great approach accessibility-wise.
- px - Pixels give you the most precision but don't offer any scaling when used in responsive designs. They are reliable, easy to understand, and present a good visual connection between value and actual result (15px is close, maybe just a pixel or two more).

Bottom line is, don't be afraid to experiment, try them all and see what you like best. Sometimes *em* and *rem* can save you a lot of work, especially when building responsive pages.

### Autoprefixers For Better Compatibility

Writing browser-specific prefixes is one of the most annoying things in CSS. They aren't consistent, you never know exactly which ones you need, and if you do the actual process of placing them in your style sheet is a boring nightmare.

Thankfully, there are tools that automatically do that for you and will even let you decide which browsers you need supported:

- Online tools: [Autoprefixer](https://autoprefixer.github.io/)
- Text editor plugins: [Sublime Text](https://github.com/sindresorhus/sublime-autoprefixer), [Atom](https://atom.io/packages/autoprefixer)
- Libraries: [Autoprefixer](https://github.com/postcss/autoprefixer) (PostCSS)

### Validate

Validating CSS might not be as important as validating HTML or JavaScript code, but running your code through a CSS Linter can still be very helpful. It will tell you if you've made any mistakes, warn you about bad practices, and give you general tips for improving the code.

Just like minfiers and autoprefixers, there are plenty of free validators available:

- Online tools: [W3 Validator](https://jigsaw.w3.org/css-validator/), [CSS Lint](http://csslint.net/)
- Text editor plugins: [Sublime Text](https://packagecontrol.io/packages/W3CValidators), [Atom](https://atom.io/packages/csslint)
- Libraries: [stylelint](http://stylelint.io/) (Node.js, PostCSS), [css-validator](https://www.npmjs.com/package/css-validator) (Node.js)

### Building Parallax Websites

The usual way that these websites are built is by using a JavaScript library. Some of the popular choices are [Scrollr](https://github.com/Prinzhorn/skrollr), [scrollMagic](http://scrollmagic.io/), [Parallax.js](https://pixelcog.github.io/parallax.js/), [scrollReveal.js](http://scrollrevealjs.org/) and others. We are going to use [Scrollr](https://github.com/Prinzhorn/skrollr) today as it is the most popular and works on mobile devices.

To use Scrollr, you only need to download it's source and create a link to it in your HTML. After that's done, calling `skrollr.init();` will enable Scrollr for all elements on the page.

Once you have the Scrollr library in your page, you add data attributes to the elements you wish to animate while the page is scrolled. Here's the most basic example, which animates a div from blue to red:

```css
<div data-bottom-top="background-color: rgb(255,0,0);" 
data-center-center="background-color: rgb(0,0,255);">
</div>
```

We have a simple div with a pair of attributes. The first attribute will tell Scrollr when the animation starts and the second one when it should end. As you can see, the animation itself is done via CSS properties (note that you need to specify the colors as rgb). The library smoothly transitions from one to the other.

### Hiding Overflowing Text

[Demo](https://demo.tutorialzine.com/2014/02/technique-hiding-overflowing-text/)

By setting a `max-width` value, `overflow:hidden` and an `:after` pseudo element, we can achieve the effect that you can see in the demo. Here is what each of these will help us with:

- The element will increase its width freely, until it hits the value set by `max-width.`
- At that point, all excess text will be hidden thanks to the `overflow:hidden` property.
- To prevent the text from breaking to a new line, we use `white-space:nowrap.`
- To create a smooth transition between the text and the background color of the element, we will use an `:after` pseudo element. This element will have a `linear-gradient` that goes from transparent to the color of the background. This element is positioned to the right of the container, and becomes visible only when the element expands.

I find this technique better looking than the plain `text-overflow:ellipsis` as more of the text is actually shown, and it blends nicely with the design of the page. However it comes at the cost that it takes more lines of CSS, and you have to manually set the maximum width. In some cases, the extra effort is worth it when the goal is a cleaner design.

**index.html**

```html
<input type="text" value="This text will expand" />
<h2><span id="elem" class="overflow-300"></span> and this will shift to the side.</h2>
```

The text input is only needed in order to give the visitor the ability to change the content easily, otherwise they would have to use their browser's developer tools. The element which has the overflow technique applied, is the **#elem** span. I have given it a class called overflow-300, which we will use to implement the technique in our CSS.

**assets/css/styles.css**

```css
h2 span{
    font-weight:bold;
    display:inline-block;
    vertical-align: top;
}
```

A thing to keep in mind, is that we can not set a `width` or `max-width` on an element which is set to `display:inline` (the default display of span elements). This necessitates that we give it a display of `inline-block`. And here is the technique itself:

```css
.overflow-300{
    overflow:hidden;
    max-width:300px;
    position:relative;
    white-space: nowrap;
}

.overflow-300:after{
    content:'';
    position: absolute;

    left:300px;
    margin-left: -40px;
    width: 40px;
    height:100%;
    top:0;
    background:linear-gradient(to right, rgba(240, 244, 245, 0), rgba(240, 244, 245, 1));
}
```

**一行文本超出**

```css
text {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
```

**多行文本超出**

```css
text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
```

### IOS 手机容器滚动条滑动不流畅

```css
text {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
```

### 修改滚动条样式

```css
div::-webkit-scrollbar {
    display: none;
}
```

- `div::-webkit-scrollbar` 滚动条整体部分
- `div::-webkit-scrollbar-thumb` 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条
- `div::-webkit-scrollbar-track` 滚动条的轨道
- `div::-webkit-scrollbar-button` 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置
- `div::-webkit-scrollbar-track-piece` 内层轨道，滚动条中间部分
- `div::-webkit-scrollbar-corner` 边角，即两个滚动条的交汇处
- `div::-webkit-resizer` 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件注意此方案有兼容性问题，一般需要隐藏滚动条时我都是用一个色块通过定位盖上去，或者将子级元素调大，父级元素使用 `overflow-hidden` 截掉滚动条部分。暴力且直接。

### 隐藏页面元素

- `display-none`: 元素不存在，从 `dom` 中删除
- `opacity-0`: 元素透明度将为 0，但元素仍然存在，绑定的事件仍旧有效仍可触发执行。
- `visibility-hidden`：元素隐藏，但元素仍旧存在，页面中无法触发该元素的事件。

### BFC

块状格式化上下文（block formatting context）简称 `BFC`：是页面上的一个隔离的独立容器,容器里面的子元素不会影响到外面的元素。

**如何触发BFC？**

1. 根元素（`html`）: 最大的BFC
2. `position` 设置为 `fixed` 或者 `absolute`
3. display 设置为 `inline-block` 、`table-block` 、 `table-caption`
4. `overflow` 的值不为 `visible`
5. `float` 的值不为 `none`
6. MDN 格式化上下文

**BFC的定位方案**

1. 内部的box会在 **垂直方向上** 一个接一个的摆放
2. 属于同一个BFC中的两个相邻元素的 **垂直方向上 margin** 会重叠
3. BFC中每个元素的左边margin会与包含块的左边border相接触
4. 计算BFC的高度时，浮动元素也会参与计算

### 元素居中 (水平且垂直)

1. 固定宽高居中: 
   
   通过绝对定位 + 负margin
   
   ```css
       #main{
           position: relative;
           // ... 略
       }
       #center{
           position: absolute;
           width: 100px;
           height: 100px;
           left: 50%;
           top: 50%;
           margin: -50px;
       }
   ```
   
   通过绝对定位 + `margin: auto;`
   
   ```css
       #main{
           position: relative;
           // ... 略
       }
       #center{
           width: 100px;
           height: 100px;
           left: 0;
           right: 0;
           top: 0;
           bottom: 0;
           margin: auto;
           position: absolute;
       }
   ```

2. 不定宽高
   
   transform 居中
   
   ```css
       #main{
           position: relative;
           // ... 略
       }
       #center{
           position: absolute;
           left: 50%;
           top: 50%;
           transform: translate(-50%, -50%);
       }
   ```
   
   flex 居中（一）
   
   ```css
       #main{
           display: flex; 
           justify-content: center; 
           align-items: center;
       }
   ```
   
   flex 居中（二）
   
   ```css
       #main{
           display: flex;
           // ... 略
       }
       #center{
           margin: auto;
       }
   ```

### THE WILL-CHANGE PROPERTY

[will-change - CSS Reference](https://cssreference.io/property/will-change/)

This new property allows you to notify the user’s browser what changes to an element you will be making so that the browser can better optimize itself before you actually transform the element. This makes the flicker disappear and page more responsive to a user’s movements and actions

This will also allow the browser to act in a more informed way driving resources when they are needed, creating layers for 3D transforms before you need them, and making your animations much smoother on the client-side.

### FEATURE DETECTION WITH CSS @SUPPORTS

The great thing about CSS is that it has pretty good degradation, which means that if something is not supported it won’t break your page, it will simply be ignored.

The idea behind @supports is to take this a step further. It allows you to write fallback code that will only be read if the preferred properties are not supported in a particular browser.

When creating a new @supports rule, you can see that the code is pretty similar to what you would see in a media query; even the operators are the same. It should look something like this:

```css
@supports(property: value) {
    /* Styles if condition is met */
}

@supports(-webkit-text-stroke: 1px black) {
h1 {
         -webkit-text-stroke: 1px black;
    }
}
```

One of the operators used by the @supports rule is the *not* operator. This checks if a browser does not support a particular feature and the fallback code is placed inside the brackets. Using the text-stroke example you might use this to add a text shadow to create a similar look:

```css
@supports not (-webkit-text-stroke: 1px black) {
    h1 {
         text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
}
```

The *or* operator allows you to test more than one condition at a time, and will return true if any of them are met. This comes in very useful for properties that use different vendor prefixes for different browsers.

```css
@supports(transition: width 500ms) or (-webkit-transition: width 500ms) {
    div {
         transition: width 500ms;
         transition: width 500ms;
    }
}
```

The final operator used by @supports is *and*, which tests more than one condition at a time returning true only if all of them are met. The syntax is similar to or:

```css
@supports(border-radius: 5px) and (box-shadow: 1px 1px 3px #000) {
    div {
         border-radius: 5px;
         box-shadow: 1px 1px 3px #000;
    }
}
```

### HOW TO CREATE A COLLAPSING HEADER EFFECT WITH PURE CSS

#### CREATE THE HTML

```ht
 <div class="container"> 
        <header>
            <nav>
                <ul class="menu">
                    <li class="logo"><a href="#">Dev & Design</a></li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
        <div class="banner">
            <div>
                <h2 class="banner-title">Don't Miss Out On Our Next Webinar</h2>
                <p class="banner-desc">Sign Up Now and Choose an Ebook for Free</p>
            </div>
            <button class="btn-signup" type="button" onclick="location.href='#'">
                   Go to Webinars »
            </button>
        </div>
        <article class="article">
            <p>...</p>
        </article>
    </div>
```

#### ADD BASIC STYLES WITH CSS

```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    color: #222;
}
a {
    text-decoration: none;
}
ul {
    list-style-type: none;
}
```

#### POSITION THE TOP MENU BAR

```css
header {
    height: 70px;
    background: #222;
    position: fixed;
    width: 100%;
    z-index: 99;
}
```

The *z-index: 99;* rule allows the top menu bar to stay on top of all elements, even when the collapsing header completely collapses and the rest of the content reaches the top of the page.

#### STYLE THE MENU

```css
nav {
    height: inherit;
}
.menu {
    display: flex;
    height: inherit;
    align-items: center;
    padding: 0 20px;
}
.menu li {
    padding: 0 10px;
}
.menu a {
    color: white;
}
.logo {
    flex: 1;
    font-size: 22px;
}
```

The *.nav* and *.menu* items inherit the width of the *<header>* element (100%) so that they can also span across the entire screen. Besides, *.menu* also makes use of [flexbox](https://www.developerdrive.com/2019/01/responsive-image-gallery-flexbox/), so the menu items can line up horizontally in a row while the *[align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)* property centers them vertically.

When *flex-grow* set to 1, it means that the given element gets all the extra space in the flex container. As a result, the logo is pushed to the left of the container while the menu items stay on the right.

#### POSITION THE COLLAPSING HEADER

The collapsing header also has fixed position just like the top menu bar. However, it doesn’t get a *z-index* value so that it can “collapse” when the user scrolls down the page and the rest of the content gradually covers the banner.

```css
.banner {
    /* for positioning */
    width: 100%;
    height: 300px;
    position: fixed;
    top: 70px;
    background: linear-gradient(45deg, #98cbff, #98ffcb);

    /* for content alignment */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
```

#### STYLE THE COLLAPSING HEADER

```css
.banner-title {
    font-size: 32px;
    margin-bottom: 10px;
    text-align: center;
}
.banner-desc {
    font-size: 22px;
    text-align: center;
}
.btn-signup {
    color: white;
    background-color: #0056ab;
    border: 0;
    padding: 15px 25px;
    font-size: 16px;
    cursor: pointer;
}
```

#### STYLE THE REST OF THE CONTENT

To make the header collapse on scroll, you need to do four things:

1. Most importantly, you need to set a background for the rest of the content so that it can flow on top of the collapsible header. Remember that this effect works similar to parallax effects; the different backgrounds need to cover each other.
   - In the demo, we have used a plain white background. You always need to set a background on the flowing content to make this effect work (otherwise the collapsing header won’t collapse).
2. Position the content *relative* to the two fixed elements. The *top: 370px;* rule below is the sum of the *height* of *<header>* (70px) and *.banner* (300px).
3. Set the *width* to *100%* so that the content will cover the entire header.
4. Set the *height* to *100%*, too, so that the background will cover the entire height of the page (this is important on mobile or in case of longer pages).

```css
.article {
    width: 100%;
    position: relative;
    top: 370px; 
    background: white;
    height: 100%; 
    padding: 30px 10%;
}
.article p {
    margin-bottom: 20px;
}
```

**live demo:** [collapsing header effect](https://www.annalytic.com/demos/collapsing-header/)

### 6 JS EFFECTS THAT CAN BE ACHIEVED WITH PURE CSS

#### PARALLAX

Parallax isn’t nearly as prolifically used as it was some months back, but it’s still popular. And nearly every implementation I’ve seen was done with JavaScript. Web designers of the world, this ought not so to be! Mostly because Keith Clark came up with a [CSS version](https://keithclark.co.uk/articles/pure-css-parallax-websites/) as far back as 2014, and further refined his technique [in 2015](https://keithclark.co.uk/articles/practical-css-parallax/).

For an alternative implementation and more ideas, look no further than this example by [Joshua Bemenderfer](https://alligator.io/css/pure-css-parallax/).

#### SLIDESHOWS

That’s right! Slideshows and carousels can be implemented in pure CSS. We’re so used to using jQuery for this sort of thing that even now, it’s a little hard to fathom. But it’s doable. I’d like to thank the guys at Speckyboy for compiling [this list of carousel options](https://speckyboy.com/open-source-carousel-sliders-css/).

Here are a couple of quick examples from the list:

[Responsive Slideshow / Carousel with only HTML5 & CSS3](https://codepen.io/trungk18/pen/EydyoL)

[Testimonial Slider Pure CSS](https://codepen.io/maheshambure21/pen/qZZrxy)

#### DROP-DOWNS

Ah, drop-downs. Actually, this is probably the UI element that got a JS-free implementation before anything else. I remember when just about every design blog was full of ideas for how to get drop-down menus with this new-fangled CSS thing that was just catching on. It’s safe to say that these techniques are pretty well-supported by now.

Here’s a quick and easy [example on Codepen](https://codepen.io/andornagy/pen/xhiJH) by Andor Nagy.

#### MODAL WINDOWS AND IMAGE GALLERIES

Want to have hidden content, and then show that content on a click? Turns out CSS can do that, too, all by itself. You can, of course, create simple modal windows, but you can also create full on image galleries.

For modal windows, we have a post [on our own site](http://www.developerdrive.com/2017/08/10-pure-css-modal-window-snippets/). There are ten examples there, so that should be plenty of variety. One of the best image gallery examples I’ve found so far is by a GitHub user known only as mas-5. Here’s a link to the [main repo](https://github.com/ma-5/ma5-cssgallery), and here’s a quick [demo](http://galeriacss.ma5.pl/).

#### BUTTON AND HOVER EFFECTS

Okay, this was probably the thing that CSS developers started on right after dropdown menus. Thus, enterprising CSS3 experts have had years to come up with a variety of interesting effects to apply to buttons, menus, and pretty much anything that uses the *:hover* interaction on a website. The semi-recently upgraded animation capabilities of HTML5 and canvas, plus the semi-recent surge of support for SVG, have given designers a lot to work with.

For examples, Free Frontend has compiled a list of [17 CSS Hover Effects](http://freefrontend.com/css-hover-effects/) for you to play with. As for buttons specifically, you could check out this [button pack by Christophe Guerrin](https://codepen.io/graphitruc/pen/XJNdGm). Lastly, I’d like to highlight this [ripple effect by Pau Giner](https://codepen.io/pauginer/pen/PjbLEL). It’s simple, but cool.

#### RANDOM TYPEWRITER EFFECT

I didn’t really have a category for this, so just… [here](https://css-tricks.com/snippets/css/typewriter-effect/). Look. It’s that typewriter effect people keep using JS for. You don’t have… I’m sure you get the point by now in the article. It’s by Geoff Graham writing for CSS-Tricks.
