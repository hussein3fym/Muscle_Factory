const input = document.getElementById('text');

function Alert(){
    input.addEventListener('keyup',(e)=>{
        if(e.keyCode===13){
            Alert();
        }
    })
}