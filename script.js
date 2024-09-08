document.querySelector('form').addEventListener('submit', onSubmit);

function onSubmit(e) {

    e.preventDefault();
    const li = document.createElement('li');
    const add = document.getElementById('add');
    li.appendChild(document.createTextNode(add.value));

    const i = document.createElement('i');
    i.className = 'fa-solid fa-x';
    li.appendChild(i);

    document.querySelector('main ul').appendChild(li);
    add.value = '';

}

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


document.querySelector('main ul').addEventListener('click', onDelete);

function onDelete(e) {
    if(e.target.className.includes('fa-solid fa-x'))
        e.target.parentElement.remove();
}

document.querySelector('.clear').addEventListener('click', onClear);

function onClear(e) {
    e.preventDefault();
    document.querySelector('main ul').innerHTML = '';
}

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
onChange(lis);