//厳密モード
'use strict';

//ハンバーガーメニュー動作実装
const ham_menu = document.getElementById('toggle_btn');
const navi_menu = document.getElementById('navi');
const navi_mask = document.getElementById('mask');

function toggleClass(){
  ham_menu.classList.toggle('show');
  navi_menu.classList.toggle('show');
  navi_mask.classList.toggle('show');
};

ham_menu.addEventListener('click', ()=>{
  toggleClass();
});

// #maskのエリアをクリックした時にメニューを閉じる
navi_mask.addEventListener('click',() => {
  toggleClass();
});

//ハンバーガーメニューのクリック遷移
const menuClick =document.querySelectorAll('#navi a[href^="#"]');
const headerHeight = document.getElementById('header').clientHeight;
console.log(menuClick);
for(let i = 0;i<menuClick.length;i++){
  menuClick[i].addEventListener('click', (e) => {
    e.preventDefault();
    toggleClass();
    const target =document.querySelector(menuClick[i].hash);
    const rect = document.querySelector(menuClick[i].hash).getBoundingClientRect().top;
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const top = rect + scroll - headerHeight;
    window.scrollTo({
      top,
      behavior: "smooth"
      });
  });
};

//カルーセル実装
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const ul = document.querySelector('.container ul');
const slides = ul.children;
const dots =[];
let currentIndex = 0;

//前後ボタンの状態を更新
function updateButtons(){
  prev.classList.remove('hidden');
  next.classList.remove('hidden');

  if(currentIndex === 0){
    prev.classList.add('hidden');
  }
  if(currentIndex === slides.length-1){
    next.classList.add('hidden');
  }
};

//スライドを移動
function moveSlides(){
  const slideWidth = slides[0].getBoundingClientRect().width;
  ul.style.transform =`translateX(${-1 * slideWidth *currentIndex}px)`;
}

//スライド下のドットを設置
function setupDots(){
  for(let i = 0;i < slides.length;i++){
    const button = document.createElement('button');
    button.addEventListener('click',() => {
      currentIndex = i;
      updateDots();
      updateButtons();
      moveSlides();
    });

    dots.push(button);
    document.querySelector('.dot').appendChild(button);
  }
  dots[0].classList.add('current');
};

function updateDots(){
  dots.forEach(dot => {
    dot.classList.remove('current');
  });
  dots[currentIndex].classList.add('current');
};

updateButtons();
setupDots();

next.addEventListener('click',() =>{
  currentIndex++;
  updateButtons();
  updateDots();
  moveSlides();
});

prev.addEventListener('click',() =>{
  currentIndex--;
  updateButtons();
  updateDots();
  moveSlides();
});

//Windowのサイズが変わると画像がずれるのを修正
window.addEventListener('resize',() => {
  moveSlides();
});

//スクロールにより画像フェードイン
let fadeinTarget = document.querySelectorAll('.fadein');
window.addEventListener('scroll',() => {
  for(let i =0;i<fadeinTarget.length;i++){
    const rect =fadeinTarget[i].getBoundingClientRect().top;
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const offset = rect + scroll;
    const windowHeight =window.innerHeight;
    if(scroll > offset - windowHeight +200){
      fadeinTarget[i].classList.add('scrollin');
    }
  }
});
