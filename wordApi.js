const testWord = "hello";
var fillWord = "before"
const myList = []

//API Link: https://www.datamuse.com/api/#md
//API Format for n-length word: https://api.datamuse.com/words?sp=???&max=100


// const jsonString = fetch('https://api.datamuse.com/words?sp=???&max=100')
// .then(res => res.json())
// .then(data => console.log(data))

// const fetchData = fetch('https://api.datamuse.com/words?sp=test')
// .then(response => response.json())
// .then(data => console.log(JSON.stringify(data)))

//WORKING
// const fetchDataTwo = fetch('https://api.datamuse.com/words?sp=test')
// .then(response => response.json())
// .then(data => {fillWord = JSON.parse(JSON.stringify(data))[0].word})
// .then(() => myList.push(fillWord))


async function setSecretWord(){
    //let objTest;

    const resTest = await fetch('https://api.datamuse.com/words?sp=?????&max=100')

    let objTest = await resTest.json();

    console.log(JSON.stringify(objTest))
    console.log(JSON.parse(JSON.stringify(objTest))[Math.floor(Math.random() * 100)].word)
    document.getElementById('selectors').setAttribute("wordChoice", JSON.parse(JSON.stringify(objTest))[Math.floor(Math.random() * 100)].word);
}


setSecretWord();