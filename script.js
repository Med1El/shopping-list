// localStorage functionalities


// load list from local storage
function loadList() {
    let list;
    if( (list = localStorage.getItem('list')) === null) {
        localStorage.setItem('list', JSON.stringify([]));
        return JSON.stringify([]);
    }
    return JSON.parse(list);
}

function addToLocalStorage(item){
    const list = JSON.parse(localStorage.getItem('list'));
    list.push(item);
    localStorage.setItem('list', JSON.stringify(list));
}

function removeFromLocalStorage(item){
    const list = JSON.parse(localStorage.getItem('list'));
    list.splice(item, 1);
    localStorage.setItem('list', JSON.stringify(list));
}

function removeAllFromLocalStorage(){
    localStorage.setItem('list', JSON.stringify([]));
}




// other JS functionalities

// load lis from localStorage to ul

function loadLis() {
    const list = loadList();
    list.forEach(element => createLi(element));    
}

loadLis(); // load lis on startup

// add item to ul and localStorage after form submit

document.querySelector('form').addEventListener('submit', onSubmit);

function onSubmit(e) {

    e.preventDefault();
    const add = document.getElementById('add');
    createLi(add.value);
    addToLocalStorage(add.value);
    add.value = '';

}

function createLi(text) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(text));

    const i = document.createElement('i');
    i.className = 'fa-solid fa-x';
    li.appendChild(i);

    document.querySelector('main ul').appendChild(li);
}

// filter lis based on text entered

document.querySelector('.filter').addEventListener('keyup', onFilter);

function onFilter(e) {
    const lis = document.querySelectorAll('ul li');
    for(const li of lis) {
        if(!li.innerText.toUpperCase().includes(e.target.value.toUpperCase())) {
            li.style.display = 'none';
        } else {
            li.style.display = 'flex';
        }
    }
    
}

// delete li from ul and localStorage after X click

document.querySelector('main ul').addEventListener('click', onDelete);

function onDelete(e) {
    if(e.target.className.includes('fa-solid fa-x')) {
        e.target.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.innerText);
    }
}

//remove all items from ul and localStorage after click on clear

document.querySelector('.clear').addEventListener('click', onClear);

function onClear(e) {
    e.preventDefault();
    document.querySelector('main ul').innerHTML = '';
    removeAllFromLocalStorage();
}

//observe changes on ul, if it is empty : hide the filter and clear button

const ul = document.querySelector('main ul');
const filter = document.querySelector('.filter');
const clear = document.querySelector('.clear');

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        const lis = document.querySelectorAll('ul li');
        onChange(lis);
    });
});

observer.observe(ul, { childList: true, subtree: true });

function onChange(lis) {
    if(lis.length === 0) {
        filter.style.display = 'none';
        clear.style.display = 'none';
    } else {
        filter.style.display = 'block';
        clear.style.display = 'block';
    }
}

const lis = document.querySelectorAll('ul li');
onChange(lis); // on startup