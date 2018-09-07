let j;
var input, filter, ul, li, subLi, a, i;
window.onload = function(){
    // Declare variables
    input = document.getElementById('myInput');
    ul = document.getElementById("myUL");
    li = ul.getElementsByClassName('liMain');
}

function search() {
    filter = input.value.toUpperCase();
    // Loop through all list items, and hide those who don't match the search query
    let textToSearch;
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("mainHeadofList")[0];
        textToSearch = a.innerText;
        subLi = li[i].getElementsByTagName('li');
        for(j=0; j<subLi.length; j++){
            textToSearch+=" "+subLi[j].getElementsByTagName("a")[0].innerText;
        }
        if (textToSearch.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
