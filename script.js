// Selectors

const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');

// Event Listeners

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
    
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
      console.log("Смена темы на:", themes[currentThemeIndex].name);
    });
  })();

 
  let savedTheme = localStorage.getItem('savedTheme');

// Functions;
function addToDo(event) {
    // Prevents form from submitting / Prevents form from relaoding;
    event.preventDefault();

    // toDo DIV;
  
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    // Create LI
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
            alert("Напишіть щось!");
        } 
    else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Adding to local storage;
        savelocal(toDoInput.value);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);

        // CLearing the input;
        toDoInput.value = '';
    }

}   


function deletecheck(event){

    // console.log(event.target);
    const item = event.target;

    // delete
    if(item.classList[0] === 'delete-btn')
    {
        // item.parentElement.remove();
        // animation
        item.parentElement.classList.add("fall");

        //removing local todos;
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }

    // check
    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }


}


// Saving to local storage:
function savelocal(todo){
    //Check: if item/s are there;
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
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        // toDo DIV;
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);

        // Create LI
        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);
    });
}


function removeLocalTodos(todo){
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    // console.log(todoIndex);
    todos.splice(todoIndex, 1);
    // console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}


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
      // При запуске воспроизведения меняем иконку play на pause
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

// Обновляем иконку, когда начинается воспроизведение
audioPlayer.addEventListener('play', function() {
  playImg.src = "images/pause.png";
});

// Обновляем иконку, когда аудио ставится на паузу
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