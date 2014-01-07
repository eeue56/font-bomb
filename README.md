font-bomb
=========

_Serve Google Web Fonts Yourself_

A small tool designed to be used with Google WebFonts. Basically, I got a bit fed up of developing web apps on lousy connections and having my fonts not load because they were hosted on Google, so I wrote this tool to save anyone else the trouble.

---

Here's how it works.

```
npm install fontbomb -g
cd public/
fontbomb "http://fonts.googleapis.com/css?family=Seymour+One|Chango"
```

Fontbomb will then go away and collect all required Woff and CSS files and add them straight into your project*.

Then just reference the stylesheet created at `css/fonts.css` from your HTML file, and you'll be able to use all of those new fonts, but you'll be serving them yourself.

\* Fontbomb will create the folders if they aren't there. 

