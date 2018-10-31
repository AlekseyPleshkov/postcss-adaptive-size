# postcss-adaptive-size

PostCSS plugin for create adaptive (viewport) sizes

## Install

```
yarn add postcss-adaptive-size --save
```

## Example

### Input

```css
.el {
  adaptive: 300px 200px;
}

.el2 {
  viewport: 100px 1200px vw, 100px 768px vh;
}

.el3 {
  viewport-padding: 100px 1200px vw, 100px 768px vh, 0px;
}

.el4 {
  viewport-margin: 100px 1200px vw, 100px 768px vh, 0px;
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

.el2 {
  width: 100px;
  width: 100px/1200px*100vw;
  height: 100px;
  height: 100px/768px*100vh;
}

.el3 {
  padding: 100px/1200px*100vw 100px/768px*100vh 0px;
}

.el4 {
  margin: 100px/1200px*100vw 100px/768px*100vh 0px;
}
```
