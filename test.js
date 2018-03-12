import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
  return postcss([ plugin(opts) ]).process(input)
    .then( result => {
      t.deepEqual(result.css, output);
      t.deepEqual(result.warnings().length, 0);
    });
}

test('Add style for create adaptive element', t => {
  return run(t, 'div { adaptive: 300px 200px; }', 'div { width: 100%; max-width: 300px; height: auto; min-height: 200px; }', { });
});
