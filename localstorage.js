function first() {
    localStorage.setItem('myItem', "something you want to store");
}

function second() {
    myValue = null;
    if (localStorage.getItem('myItem')) {
        myValue = localStorage.getItem('myItem');
    }
}


