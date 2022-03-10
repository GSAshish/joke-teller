
const button=document.getElementById('button')
const audioElement=document.getElementById('audio')
let joke='';


// Disable/Enable Button
function toggleButton(){
    button.disabled=!button.disabled;
}

// passing Joke to voice RSS
function tellMe(joke){
    console.log(joke)
    VoiceRSS.speech({
        key: '7d03fde67c4a4e79af662e7af780d3fb',
        hl: 'en-us',
        src: `${joke}`,
        f: '16khz_8bit_mono',
        c: 'mp3',
        r: '0',
        ssml:false,
    })
}

// google developer page fetch promises mix with async
// Get Jokes from joke API
async function getjokes(){
    const apiUrl='https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try{
        const response=await fetch(apiUrl)
        const data=await response.json();
        if(data.setup){
            joke=`${data.setup} ... ${data.delivery}`;
        }
        else{
            joke=data.joke;
        }
        // Text-to-speech
        tellMe(joke)
        // disablling Button
        toggleButton();
    }catch(error){
        //Catch  error
        console.log('whoops',error);
    }
}

button.addEventListener('click',getjokes)
// enabling button
audioElement.addEventListener('ended',toggleButton)