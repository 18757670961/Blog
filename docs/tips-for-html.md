---
title: Tips for HTML
author: Desmond
catalog: true
abbrlink: 7ddcfa23
date: 2021-01-02 17:00:29
header-img: https://i.loli.net/2021/01/02/YTqvtRCJsUr84QH.jpg
tags: HTML
top:
---

## Tips for HTML

### HTML API RESOURCES

The following resources will help you brush up on your HTML skills and provide you with tips on designing your own API and an overview of how to use existing APIs so that you can learn by example and get inspired to create your own HTML API.

[HTML APIs: What They Are And How To Design A Good One](https://www.smashingmagazine.com/2017/02/designing-html-apis/): This article published on Smashing Magazine gives a basic explanation of what HTML APIs are and essential guidelines to follow when designing your own API.

[The Web API Checklist — 43 Things To Think About When Designing, Testing, and Releasing your API](https://mathieu.fenniak.net/the-api-checklist/): While not strictly related to HTML5 API, this article written by Mathieu Fenniak contains a list of things that are easily missed when you set out to create your own API. His website also has other useful articles related to API design such as [API versioning](https://mathieu.fenniak.net/aint-nobody-got-time-for-that-api-versioning/) and how not to design [fragile APIs](https://mathieu.fenniak.net/stop-designing-fragile-web-apis/).

[APIUX](http://apiux.com/):  whole blog dedicated the API user experience written by a team of people who “share the vision that APIs should be useful, easy to use and efficient”. You’ll find a plethora of articles on API user experience, in-depth look at popular APIs as well as expert interviews.

[A vocabulary and associated APIs for HTML and XHTML](https://www.w3.org/TR/html5/webappapis.html): The W3C standard for HTML APIs covers every term under the sun that you need to know when it comes to API as well as on overview of APIs that are associated with HTML and XHTML.

[Introduction to HTML5 Advanced APIs](https://www.amazon.com/Introduction-HTML5-Advanced-APIs-Kevin/dp/0996979727) by Kevin M. Ruse: The book promises to beef up your HTML skills by introducing JavaScript implementation of the latest HTML APIs. Readers of the book should have previous knowledge of HTML and be familiar with JavaScript.

[Sergey’s HTML5 & CSS3 Quick Reference: HTML5, CSS3 and APIs](https://www.amazon.com/Sergeys-HTML5-CSS3-Quick-Reference/dp/0983386722) by Sergey Mavrody: If you need a reference guide, Sergey’s book summarizes the official HTML5 and CSS3 specification and covers the fundamental concepts which include HTML5 APIs as well.

[The developer’s guide to the HTML5 APIs](http://www.creativebloq.com/html5/developer-s-guide-html5-apis-1122923): In this article, Rich Clark from HTML5 Doctors discusses the purpose and development of existing HTML5 APIs and provides a list of resources to learn more about each one

[10 HTML5 APIs Worth Looking Into](https://www.sitepoint.com/10-html5-apis-worth-looking/): SitePoint’s article shows practical examples of using HTML5 APIs along with demos and a brief explanation of how the API works.

[5 HTML5 APIs You Didn’t Know Existed:](https://davidwalsh.name/html5-apis) David Walsh exposes some of the smaller APIs that are useful none the less, includes short code snippets with the APIs in use and encourages readers to explore them.

[HTML5 Geo-Location API And Google Maps API](https://developers.google.com/maps/documentation/javascript/examples/map-geolocation): This tutorial walks you through using the HTML5 Geolocation API in conjunction with Google Maps API to create a simple web app that request your location and then draws the best route to get there.

[Use the HTML5 File API to Work with Files Locally in the Browser](https://scotch.io/tutorials/use-the-html5-file-api-to-work-with-files-locally-in-the-browser): In this tutorial, you’ll see a practical example of using the HTML5 File API to load an image to the browser, make simple edits to it, and then upload it once you’re done.

### FORM VALIDATION

#### ADDING VALIDATION

```html
The final form looks like this

<form name="signup-form">
    <label for="firstname">Firstname:</label>
    <input id="firstname" name="firstname" type="text" title="Please enter your firstname" placeholder="Jonny" autofocus required />

    <label for="surname">Surname:</label>
    <input id="surname" name="surname" type="text" title="Please enter your surname" placeholder="Schnittger" required />

    <label for="email">Email:</label>
    <input id="email" name="email" type="email" title="Please enter your email address" placeholder="jonny@schnittger.me" required />

    <label for="website">Website:</label>
    <input id="website" name="website" type="url" title="Please enter the url to your website (optional)" placeholder="http://schnittger.me" />

    <label for="password">Password:</label>
    <input id="password" name="password" type="password" title="Please enter a password, it must contain at least 1 lowercase and 1 uppercase character and be at least 6 characters in length" pattern="^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$" placeholder="******" required />

    <input type="submit" value="Signup!" />

</form>
```

To help prevent this, the first attribute we’ll be using is the [required](http://www.w3.org/TR/html5/forms.html#the-required-attribute) attribute. Adding this to a input box will prevent the form from submitting until a value has been provided.

The next attribute we’ll be adding is the [autofocus](http://www.w3.org/TR/html5/forms.html#attr-fe-autofocus) attribute. This attribute automatically assigns focus to the form on page load. This is a simple enhancement, but one that makes life so much easier.

Next up is the [placeholder](http://www.w3.org/TR/html5/forms.html#the-placeholder-attribute) attribute. This places a sample value or hint in the input box. Depending on the browser, clicking or typing in the input will automatically hide it, but it will re-appear if the input is emptied again

HTML5 also introduced a few new input types, the first one we’ll be using is the [email type](http://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)). This performs basic validation on the value to ensure it meets standard email format rules.

Another input type that was added was the [url type](http://www.w3.org/TR/html5/forms.html#url-state-(type=url)), as with the email type it makes sure that a valid url including http:// or https:// strings are included.

The final attribute we’ll be looking at is the [pattern](http://www.w3.org/TR/html5/forms.html#the-pattern-attribute) attribute. The pattern attribute allows you to specify a [regular expression](http://en.wikipedia.org/wiki/Regular_expression) that will be used to validate the input value. This gives you the option of doing some pretty powerful client-side validation. In this example, we’re going to make sure the password field has at least 1 lowercase, 1 uppercase value and is at least 6 characters long.

One attribute that has been tweaked in Chrome and Opera is the title attribute. In Chrome/Opera the title attribute will be appended to the validation error message. This means you can slightly customize the message for your users.

#### CUSTOMIZING VALIDATION STYLES

CSS3 introduced several new [pseudo selectors](http://www.w3.org/TR/2012/WD-selectors4-20120823/#validity-pseudos) to help style forms based on their validation state. We’ll be looking at the following four

- :invalid
- :valid
- :required
- :optional

Using these selectors you can provide clear, visual guides to what exactly is incorrectly filled out in a form. Here I am styling invalid inputs with a red background and valid ones with a green background. I’m also providing a more complex selector to display and asterisk image in required inputs while maintaining the colored background. Finally I’m styling optional fields in a blue.

```css
input:not([type=submit]):invalid {
    background-color: #ffdddd;
}

input:not([type=submit]):valid {
    background-color: #ddffdd;
}

input:not([type=submit]):invalid:required {
    background: #ffdddd url('http://www.developerdrive.com/wp-content/uploads/2013/08/asterisk1.png') no-repeat right top; 
}

input:not([type=submit]):valid:required {
    background: #ddffdd url('http://www.developerdrive.com/wp-content/uploads/2013/08/asterisk1.png') no-repeat right top; 
}

input:not([type=submit]):optional {
    background-color: #add1ef;
}
```
