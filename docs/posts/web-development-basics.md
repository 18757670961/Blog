---
layout: Post
title: Web Development Basics
author: Desmond
date: 2020-09-26 23:57:25
useHeaderImage: true
headerImage: https://6772-grp2020-4glv8fo5cd87cf9a-1302562267.tcb.qcloud.la/head-images/web.jpg?sign=3029bac300ff6146cd724b249ef0f93f&t=1653754281
headerMask: rgba(45, 55, 71, .5)
permalinkPattern: /post/:year/:month/:day/:slug/
tags: [Web]
---

# Online Tutorials & References

## HTML & CSS

- [CSS-Tricks](https://css-tricks.com/)
- [cssreference](https://cssreference.io/)
- [Learn to Code HTML & CSS](https://learn.shayhowe.com/)
- [Interneting is Hard](https://www.internetingishard.com/)

## JavaScript

- [现代 JavaScript 教程](https://zh.javascript.info/)
- [JavaScript Garden](https://bonsaiden.github.io/JavaScript-Garden/)
- [Robust Client-Side JavaScript](https://molily.de/robust-javascript/)

## Wiki

- [SurviveJS](https://survivejs.com/)

- [MDN web docs](https://developer.mozilla.org/)

- [Kirupa](https://www.kirupa.com/)

- [Smashing Magazine](https://www.smashingmagazine.com/)

## Web Design

- [Resilient Web Design](https://resilientwebdesign.com/)

---

# Fundaments

## World Wide Web

**Hypertext**: text with embedded links to text

**Hypermedia**: a document contains nontextual information

**Internet**: a collection of computers and other devices connected by equipment that allows them to communicate with each other

**Web**: a collection of software and protocols that has been installed on most, if not all, of the computers on the Internet.

## Web Servers

2 things that can be specified by **URL**:

- the address of a data file stored on the server that is to be sent to the client
- a program stored on the server

2 separate **roots** of a web server:

- _document root_: stores the web documents to which the server has direct access and normally serves to clients
- _server root_: stores the server and its support software

**Tip**: server maps requested URLs to the document root, whose location is not known to clients

**virtual document trees**: the secondary areas from which documents can be served; part of the collection could be stored on a secondary disk

**proxy servers**: servers that can serve documents that are in the document root of other machines on the web

## Uniform Resource Locators

**URL**: a form of URI, provide a path to, or location of, a resource

### Formats

general format: **scheme** (protocol): **object-address**

another format: _file://path-to-document_ ("file" indicates the documents resides on the machine running the browser)

**Tips**:

- If a server has been configured to use some other port number, it is necessary to attach that port number to the host name in the URL (e.g. :800)
- **embedded spaces** **; , &** cannot appear in a URL (if San Jose is a domain name, it must be typed as San%20Jose, 20 is the hexadecimal ASCII code for a space)

### Paths

**complete path**: a path that includes all directories along the way

**partial paths**: relative to some base path that is specified in the configuration files of the server

e.g.

- *http://www.gumboco.com/departments/* (the ending slash means the specified document is a directory)
- *http://www.gumboco.com/* (the server will search for _index.html_ at the top level of the directory)

## Multipurpose Internet Mail Extensions

**MIMEs**: specifies the forms of documents received from a server (attached to the beginning of the document by server, servers determine the type of a document by using the file name extension as the key into a table of types)

**form**: type/subtype (e.g. text/html, text/plain)

## Hypertext Transfer Protocol

2 **phases**: request & response

2 **parts**: header & body

### Request Phase

- HTTP method Domain part of the URL HTTP version
- Header fields
- Blank line
- Message body

#### First line

**format**: method domain version (e.g. _GET /storefront.html HTTP/1.1_)

**request methods**:

| Method | Description                                             |
| ------ | ------------------------------------------------------- |
| GET    | Returns the contents of a specified document            |
| HEAD   | Returns the header information for a specified document |
| POST   | Executes a specified document, using the enclosed data  |
| PUT    | Replaces a specified document with the enclosed data    |
| DELETE | Deletes a specified document                            |

#### Header fields

- **General**: for general information, such as the date

- **Request**: included in request headers

  e.g.

  - _Accept: text/plain_ (specifies a preference pf the browser for the MIME type of the requested document)
  - _Host: host name_
  - _If-Modified-Since: date_ (specified that the requested file should be sent only if it has been modified since the given date)

- **Response**: for response headers

- **Entity**: used in both request and response headers

### Response Phase

- Status line (e.g. _HTTP/1.1 200 OK_)

  First digits of HTTP status codes:

  | First Digit | Category      |
  | ----------- | ------------- |
  | 1           | Informational |
  | 2           | Success       |
  | 3           | Redirection   |
  | 4           | Client error  |
  | 5           | Server error  |

- Response header fields

- Blank line

- Response body (.html)

**A complete response header**

```http
HTTP/1.1 200 OK
Date: Sat, 25 July 2009 22:15:11 GMT
Server: Apache/2.2.3 (CentOS)
Last-modified: Tues, 18 May 2004 16:38:38 GMT
ETag: "1b48098-16c-3dab592dc9f80"
Accept-ranges: bytes
Content-length: 364
Connection: close
Content-type: text/html, charset=UTF-8
```
