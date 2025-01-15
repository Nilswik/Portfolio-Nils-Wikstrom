
window.addEventListener('beforeunload',function (event){
    this.window.location.href = '/'
})

document.querySelector("#YesButton").addEventListener("click",RedirectUser)
function RedirectUser(){
    window.location.replace("index.html")
}

async function fetchQuestions(){
    try{
        //get the questions from json file
        const response = await fetch("../questions/questions.json");
        if(!response.ok){
            throw new Error(`HTTP error !status: ${response.status}`) 
        }
        const data = await response.json(); // 
        console.log(data);
    }catch(error){
        console.log("error fetching data: ", error);
        console.log(error)
    }
}
fetchQuestions()

function addQuestions(){

}