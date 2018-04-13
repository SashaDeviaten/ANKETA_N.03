'use strict';

let container = document.querySelector('div.container');

//строим div-ы с картинками
let players = ['Messi', 'Buffon', 'Ronaldo', 'Pogba', 'Ramos', 'Chiellini', 'Dani Alves', 'Nedved', 'Zidan', 'Marcelo', 'Pele'];
players.forEach((elem) => {
    let div = document.createElement('div');
    div.className = 'player';
    let img = document.createElement('img');
    img.src = "images/player.jpg";
    img.className = 'playerImg';
    div.appendChild(img);
    let nameP = document.createElement('p');
    nameP.innerHTML = elem;
    nameP.className = 'playerName';
    div.appendChild(nameP);
    container.appendChild(div)
});

let imgs = [...container.querySelectorAll('div.player')];
console.log(imgs);
imgs.reverse().forEach((elem) => {
    elem.style.top = elem.offsetTop + 'px';
    elem.style.left = elem.offsetLeft + 'px';
    elem.style.position = 'absolute';
    elem.addEventListener('mousedown', startMove);
});


function startMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    let img = EO.currentTarget;
    img.style.cursor = 'move';

    document.body.appendChild(img);

    let imgX = EO.clientX - parseInt(img.style.left);
    let imgY = EO.clientY - parseInt(img.style.top);

    document.body.addEventListener('mousemove', elemMove);

    function elemMove(ev) {
        img.style.left = ev.clientX - imgX + 'px';
        img.style.top = ev.clientY - imgY + 'px';
    }

    document.body.addEventListener('mouseup', () => {
            document.body.removeEventListener('mousemove', elemMove);
            img.style.cursor = 'pointer';
        }
    )
}
