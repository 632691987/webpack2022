import count from './js/count';
import sum from './js/sum';

// import it, in purpose of using webpack
import './css/index.css';
import './css/font.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index2.scss';
import './stylus/index.styl';

// var result = count(5,4); //==> this is error, config by eslint
console.log(count(2, 1));
console.log(sum(2, 1));
console.log('finish');