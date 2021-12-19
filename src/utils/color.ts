import {warn} from './warn';

/**
 * @param colorString - color ex:#000000 its length must be 7
 * @return - [0,0,0]
 */
export const toRgb = (colorString:string):number[] =>{
  if (colorString[0]!=='#'||colorString.length!==7) {
    warn('color is not valid. example:#000000', 3);
  } else {
    const t = colorString.split('#');
    const rgb= [];
    for (let i =0; i<3; i++) {
      rgb.push(parseInt(t[1][i]+t[1][i+1], 16));
    }
    return rgb;
  }
};
