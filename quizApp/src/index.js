


async function fetchQuestions(){
    try{
        //get the questions from json file
        const response = await fetch("../questions/questions.json");
        if(!response.ok){
            throw new error("HTTP error !status: {reposnse.error}")
        }
        const data = await response.json(); // 
        console.log(data);
    }catch(error){
        console.log("error fetching data: ", error);
        console.log(error,error,error)
    }
}
