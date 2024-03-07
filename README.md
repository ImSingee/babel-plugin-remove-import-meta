# babel-plugin-remove-import-meta

Remove import.meta for nodejs environments. This plugin replaces any occurrence of `import.meta.url`.

```js
console.log(import.meta.url);
```

With this

```js
console.log("");
```

## Installation

Install this package

```javascript
npm install --save-dev babel-plugin-remove-import-meta
```

And configure it

```json
{
  "plugins": [
    "babel-plugin-remove-import-meta"
  ]
}
```

## Credits

Based on [javiertury/babel-plugin-transform-import-meta](https://github.com/javiertury/babel-plugin-transform-import-meta)
