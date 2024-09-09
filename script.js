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

function addToLocalStorage(item, index){
    const list = JSON.parse(localStorage.getItem('list'));
    if(index !== null){
        list.splice(index, 0, item);
    } else {
        list.push(item);
    }
    localStorage.setItem('list', JSON.stringify(list));
}

function getIndexOfItem(item){
    const list = JSON.parse(localStorage.getItem('list'));
    return list.indexOf(item);
}

function removeFromLocalStorage(item){
    const list = JSON.parse(localStorage.getItem('list'));
    const index = list.indexOf(item);
    list.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(list));
    return index;
}

function removeAllFromLocalStorage(){
    localStorage.setItem('list', JSON.stringify([]));
}




// other JS functionalities

// load lis from localStorage to ul

function loadLis() {
    document.querySelector('main ul').innerHTML = '';
    const list = loadList();
    list.forEach(element => createLi(element));    
}

loadLis(); // load lis on startup

// add item to ul and localStorage after form submit

let editMode = false;

document.querySelector('form').addEventListener('submit', onSubmit);

function onSubmit(e) {

    e.preventDefault();
    const add = document.getElementById('add');
    if( getIndexOfItem(add.value) !== -1 && getIndexOfItem(add.value) !== getIndexOfItem(oldVal)) {
            alert('Item Already Exists, Please Enter Something Unique');
            return;
    }

    let index = null;

    if(editMode) {
        const liToRemove = document.querySelector('.edit-mode');
        index = removeFromLocalStorage(liToRemove.innerText);
        liToRemove.remove();
        document.getElementById('submit').value = '+ Add Item';
    }
    
    createLi(add.value);
    addToLocalStorage(add.value, index);
    add.value = '';

    if(editMode) {
        loadLis();
        editMode = false;
    }

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

let oldVal;

document.querySelector('main ul').addEventListener('click', onClick);

function onClick(e) {
    if(e.target.className.includes('fa-solid fa-x')) {
        e.target.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.innerText);
    } else if (e.target.tagName === 'LI') {

        editMode = true;

        document.querySelectorAll('main ul li').forEach(e => e.classList.remove('edit-mode'));

        e.target.classList.add('edit-mode');
        document.getElementById('add').value = e.target.innerText;
        document.getElementById('submit').value = '✎ Update Item';
        oldVal = e.target.innerText;
    }
}

//remove all items from ul and localStorage after click on clear

document.querySelector('.clear').addEventListener('click', onClear);

function onClear(e) {
    e.preventDefault();
    if(confirm('Are You Sure You Want To Remove All Items')) {
        document.querySelector('main ul').innerHTML = '';
        removeAllFromLocalStorage();
    }
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