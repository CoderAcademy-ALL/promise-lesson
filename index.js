const fs = require('fs');

// function pickRandomName(err, data) { 
//     if (err) {
//         console.log(err.message);
//     }
//     const names = data.split('\n').filter(name => name.length > 0)
//     const randomIndex = Math.floor(Math.random() * names.length);
//     const capitalisedName = names[randomIndex].charAt(0).toUpperCase() + names[randomIndex].slice(1); 
//     console.log(capitalisedName+ " it's your turn to answer");
// }
// fs.readFile('./melb-fasttrack.txt', 'utf8', pickRandomName); 

function getData(path) { 
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, data) => {
            if (error) { 
                reject(error);
            }
            resolve(data);
        })
    })
}

function convertToArray(str) {
    return new Promise ((resolve, reject) => {
        if(str.length === 0) {
            const err = new Error("Can't convert empty string")
            reject(err)
        }
        const arr = str.split('\n').filter(element => element.length > 0);
        resolve(arr);
    })    
}

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

function capitalise(str) {
       return str.split(" ")
        .map(name => name[0].toUpperCase() + name.substring(1))
        .join(" ");

}

function shuffle(array) { 
    const copy = [...array];
    for (let i = copy.length -1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i); 
        let temp = copy[i];
        copy[i] = copy[randomIndex];
        copy[randomIndex] = temp;
    }
    return copy
}

function chunk(array, size) {
    if (size > array.length) {
        throw new Error("Chunk is bigger than group")
    }
    return array.reduce((result, item, index) => {
        const chunk = Math.floor(index/size)
        if(!result[chunk]) {
            result[chunk] = [];
        }
        result[chunk].push(item)
        return result
    }, [])
}

// getData('./melb-gentech.txt')
//     .then(convertToArray)
//     .then(getRandomElement)
//     .then(capitalise)
//     .then(name => console.log(name + " it's your turn to answer"))
//     .catch(error => console.log(`caught error: ${error.message}`));


getData('./melb-fasttrack.txt')
    .then(convertToArray)
    .then(shuffle)
    .then(shuffledArray => chunk(shuffledArray,20))
    .then(chunkedArray => console.log(chunkedArray))
    .catch(error => console.log(`caught error: ${error.message}`));

