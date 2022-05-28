---
layout: Post
title: Web Fonts
author: Desmond
date: 2021-01-02 16:49:45
useHeaderImage: true
headerImage: https://i.loli.net/2021/01/02/FY2H1BOCeWvcqDl.jpg
headerMask: rgba(45, 55, 71, .5)
permalinkPattern: /post/:year/:month/:day/:slug/
tags: [CSS]
---

### 8 BEST TIPS TO USE VARIABLE FONTS ON YOUR SITE

#### CHECK BROWSER SUPPORT WITH FEATURE QUERIES

Not every browser supports variable fonts. If you have a look at the [Can I Use docs](https://caniuse.com/#search=variable%20fonts), you can see that Internet Explorer and older versions of Edge, Firefox, Safari, and Chrome don’t (or just partially) support the feature.

However, this shouldn’t stop you from using variable fonts in modern browsers, as they come with several awesome features. Instead, check if the user’s browser supports variable fonts with a [feature query](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports). As you can configure variable fonts via the [_font-variation-settings_](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings) property, this is what you have to check within the _@supports_ rule.

With the following CSS rule, you can add fallback rules for browsers that don’t support variable fonts. For instance, you can use the _font-weight: bold_ rule instead of defining a specific value with _font-variation-settings_.

```css
@supports not (font-variation-settings: inherit) {
  // Fallback rules for browsers that don't support variable fonts.
  font-weight: bold;
}
```

#### LOAD VARIABLE FONTS WITH THE @FONT-FACE RULE

You can add variable fonts to your site with the [_@font-face_](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) rule, just as if they were static fonts. As variable fonts contain all font variations, you need to add only one single file to your site. For example, to use a variable font with a [_WOFF2_](https://www.w3.org/TR/WOFF2/) extension, you need to add the following rule to the top of your CSS file:

```css
@font-face {
  font-family: 'Your Variable Font';
  src: url('yourfont.woff2') format('woff2-variations');
}
```

Note that the URL path to the font file needs to be properly specified within the _url()_ function.

#### USE THE VARIATION AXES TO CHANGE THE LOOK OF THE FONT

Font variations such as _weight_ or _slant_ are defined by each variable font individually. They come in two types: **registered** and **custom** font variations. Creators of variable fonts can decide which variations they want to add to their font.

##### REGISTERED VARIATION AXES

Registered variation axes are [standardized by W3C](https://www.w3.org/TR/css-fonts-4). They define the following font variations:

1. **weight** (axis tag: _wght,_ CSS property: _font-weight_),
2. **width** (axis tag: _wdth,_ CSS property: _font-stretch_),
3. **optical size** (axis tag: _opsz,_ CSS property: _font-optical-sizing_),
4. **slant** (axis tag: _slnt,_ CSS property: _font-style: italic_),
5. **italic** (axis tag: _ital,_ CSS property: _font-style: oblique_ ).

In your CSS, you can define the values of registered font variations in two different ways:

1. using their CSS property,
2. using their axis tag within the _font-variation-settings_ property.

For example, the [IBM Plex](https://www.axis-praxis.org/specimens/ibmplex) variable font allows you to use two font variations: _weight_ and _width._ As both are registered variations, you can set their values in two different ways:

```css
div {
  /* with their CSS properties */
  font-weight: 637;
  font-stretch: 100;

  /* with the font-variation-settings property */
  font-variation-settings: 'wght' 637, 'wdth' 100;
}
```

Both rules above have the same results. However, W3C recommends using the first option whenever it’s possible, as the _font-variation-settings_ property is a low-level property. You should only use it when high-level properties (such as _font-weight_ or _font-stretch_) are not available or supported by the browser.

##### CUSTOM VARIATION AXES

Besides the five registered variation axes, variable font creators can also define custom variation axes. Unlike registered font variations, they don’t have corresponding CSS properties. You can only access custom font variations via the _font-variation-settings_ property. Custom variation axes also have four-letter axis tags, similar to registered variation axes.

For example, the [Dunbar](https://www.axis-praxis.org/specimens/dunbar) variable font has one registered and one custom axis: _weight_ (_wght_) and _x-height_ (_xhgt_). You can set the values of font variations in one of the following ways:

```css
div {
  /* 
     * by using the corresponding CSS property for the registered axis
     * and font-variation-settings for the custom axis
     */
  font-weight: 160;
  font-variation-settings: 'xhgt' 500;

  /* 
     * by using font-variation-settings for both axes 
     */
  font-variation-settings: 'wght' 160, 'xhgt' 500;
}
```

If you don’t define specific values for the available font variation axes, the variable font will use the default value of each variation axis.

#### CHOOSE A VARIABLE FONT WITH THE FEATURES YOU NEED

Variable fonts are still relatively new, but there are already many implementations you can choose from. You can follow two strategies to find the best variable font for your site:

1. Browse variable fonts on the net and pick the one that best matches your design.
2. Decide which features you need and look for a variable font accordingly. For example, if you want to dynamically change the slant of a typeface, choose a variable font that comes with the _slant_ font variation.

Here are some places where you can look for variable fonts on the web:

- [Axis Praxis](https://www.axis-praxis.org/) – the go-to place to find variable fonts; both examples above in the article (IBM Plex and Dunbar) are from this site.
- [V-Fonts](https://v-fonts.com/) – a simple site where you can test and download variable fonts.
- [GitHub](https://github.com/search?utf8=%E2%9C%93&q=variable+fonts&type=) – many notable companies such as [Monotype](https://github.com/Monotype/Monotype_prototype_variable_fonts) and [Type Network](https://github.com/TypeNetwork) publish their variable fonts on GitHub.

#### USE NAMED INSTANCES

Named font instances might be quite useful, as they can give a good starting point to your design. You can also pick a named instance, then adjust font variations according to your needs.

Note that currently, you can’t target named instances directly with CSS. However, you can usually find the belonging values in the documentation of the variable font. Or, if you have downloaded the font from a site like Axis Praxis you can also copy-paste the values from the live demo.

For example, here are the font variation values belonging to the Medium Condensed instance of the Graduate variable font:

```css
div {
  font-family: 'GRADUATE';
  font-variation-settings: 'XOPQ' 200, 'XTRA' 400, 'OPSZ' 16, 'GRAD' 0,
    'YTRA' 750, 'CNTR' 100, 'YOPQ' 100, 'SERF' 0, 'YTAS' 0, 'YTLC' 650, 'YTDE' 0,
    'SELE' 0;
}
```
