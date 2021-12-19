import {toRgb} from '../src/utils/color';
test('toRgb', ()=>{
  // @ts-ignore
  expect(toRgb('#000000')).toEqual([0, 0, 0]);
});
