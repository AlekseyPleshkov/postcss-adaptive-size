# postcss-adaptive-size

PostCSS plugin for create adaptive elements

## Install

```
npm install postcss-adaptive-size --save
```

## Example

### Input

```css
.el {
  adaptive: 300px 200px;
}
```

### Output

```css
.el {
  width: 100%;
  max-width: 300px;
  height: auto;
  min-height: 200px;
}
```
