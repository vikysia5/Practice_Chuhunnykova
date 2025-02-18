const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);

//функція зміни теми
(function() {
    const themeButton = document.getElementById('theme-btn');
    const themeImg = document.getElementById('theme-img');
    const themes = [
      { name: 'rain', img: 'images/rainy-icon.png' },
      { name: 'sunset', img: 'images/sunny-icon.png' },
      { name: 'night', img: 'images/night-icon.png' }
    ];
    let currentThemeIndex = 0;
    themeButton.addEventListener('click', function() {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      document.body.classList.remove('theme-rain', 'theme-night', 'theme-sunset');
      document.body.classList.add(`theme-${themes[currentThemeIndex].name}`);
      themeImg.src = themes[currentThemeIndex].img;
      console.log("Зміна теми на:", themes[currentThemeIndex].name);
    });
  })();

let savedTheme = localStorage.getItem('savedTheme');

//функція туду
function addToDo(event) {
    event.preventDefault();
  
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    // создаєм список
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
            alert("Напишіть щось!");
        } 
    else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        //зберігаєм
        savelocal(toDoInput.value);

        //перевирка кнопкі btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        //видаляєм кнопку btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        //додаєм до списку
        toDoList.appendChild(toDoDiv);

        //очищаєм ввод
        toDoInput.value = '';
    }

}   

//функція видалення
function deletecheck(event){
    const item = event.target;

    // delete
    if(item.classList[0] === 'delete-btn')
    {
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }

    //галочка
    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }
}


//зберігаєм в локалі:
function savelocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);

        //создаєм список
        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        //додаті до списка
        toDoList.appendChild(toDoDiv);
    });
}


function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//музика
document.addEventListener('DOMContentLoaded', function() {
(function() {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play');
    const playImg = document.getElementById('play-img');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const trackElements = document.querySelectorAll('.track');
    
    let currentTrackIndex = 0;
    const tracks = Array.from(trackElements).map(el => el.getAttribute('data-src'));

    function updateActiveTrack() {
      trackElements.forEach((el, index) => {
        el.classList.toggle('active', index === currentTrackIndex);
      });
    }

    function loadTrack(index) {
      currentTrackIndex = index;
      audioPlayer.src = tracks[currentTrackIndex];
      updateActiveTrack();
      audioPlayer.play();
      //змина кнопок
      playImg.src = "images/pause.png";
    }

    trackElements.forEach((trackEl, index) => {
      trackEl.addEventListener('click', function() {
        loadTrack(index);
      });
    });

    playBtn.addEventListener('click', function() {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    });

//обновляєм кнопку стоп
audioPlayer.addEventListener('play', function() {
  playImg.src = "images/pause.png";
});

//обновляєм кнопку пуск
audioPlayer.addEventListener('pause', function() {
  playImg.src = "images/play.png";
});

    prevBtn.addEventListener('click', function() {
      currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
      loadTrack(currentTrackIndex);
    });

    nextBtn.addEventListener('click', function() {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      loadTrack(currentTrackIndex);
    });

    audioPlayer.addEventListener('ended', function() {
      nextBtn.click();
    });
  })();
});

//датачас
var dt = new Date();
function getDate()
{
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if(seconds < 10)
    {
        seconds = '0' + seconds;
    }
    if(minutes < 10)
    {
        minutes = '0' + minutes;
    }
    if(hours < 10)
    {
        hours = '0' + hours;
    }
    if(day < 10)
    {
        day = '0' + day;
    }
    if(month < 10)
    {
        month = '0' + month;
    }
    document.getElementById('datetime').innerHTML = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}
setInterval(getDate, 0);