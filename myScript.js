function calculate(){
    pName = document.querySelectorAll('.name');
    for(let i = 0; i < 8; ++i){
        console.log(pName[i].value);
    }
    pTotal = document.querySelectorAll('.total');
    for(let i = 0; i < 8; ++i){
        console.log(pTotal[i].value);
    }
    pWorth = document.querySelectorAll('.worth');
    for(let i = 0; i < 8; ++i){
        console.log(pWorth[i].value);
    }
    
}