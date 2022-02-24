//厳密モード
'use strict';

//ハンバーガーメニュー動作実装
const ham_menu = document.getElementById('toggle_btn');
const navi_menu = document.getElementById('navi');
const navi_mask = document.getElementById('mask');

ham_menu.addEventListener('click', ()=>{
  ham_menu.classList.toggle('show');
  navi_menu.classList.toggle('show');
  navi_mask.classList.toggle('show');
});

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
}

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
}

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


