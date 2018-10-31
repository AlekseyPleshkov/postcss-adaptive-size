import postcss from 'postcss'
import test    from 'ava'
import plugin from './'

function run(t, input, output, opts = { }) {
  return postcss([ plugin(opts) ]).process(input)
    .then( result => {
      t.deepEqual(result.css, output)
      t.deepEqual(result.warnings().length, 0)
    })
}

test('Create adaptive element', t => {
  return run(t,
    'div { adaptive: 300px 200px; }',
    'div {width: 100%;max-width: 300px;height: auto;min-height: 200px; }', { })
})

test('Create viewport element', t => {
  return run(t,
    'div { viewport: 100px 1200px vw, 100px 768px vh; }',
    'div {width: 100px;width: 100px/1200px*100vw;height: 100px;height: 100px/768px*100vh; }', { })
})

test('Create viewport padding element', t => {
  return run(t,
    'div { viewport-padding: 100px 1200px vw, 100px 768px vh, 0px; }',
    'div {padding: 100px/1200px*100vw 100px/768px*100vh 0px; }', { })
})

test('Create viewport margin element', t => {
  return run(t,
    'div { viewport-margin: 100px 1200px vw, 100px 768px vh, 0px; }',
    'div {margin: 100px/1200px*100vw 100px/768px*100vh 0px; }', { })
})
