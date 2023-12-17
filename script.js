const num0 =document.querySelector('#zero');
const add =document.querySelector('#add');
const multi =document.querySelector('#multi');
const divide =document.querySelector('#divide');
const sub =document.querySelector('#sub');
const equal = document.querySelector("#equal");
const point =document.querySelector('#point');
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const ioArea = document.querySelector("#ioArea");
const operationArea =document.querySelector("#operationArea");
let previousVar = '';
let currentVar = '';
let operator ='';
let previousOperation ='';

//regular expression for numbers
let regex = /^[0-9]$/i;
//check for keydown to add it to the screen currentArea
window.addEventListener("keydown" , (e)=>{
    if (regex.test(e.key))
    {
        checkForZero();
        currentVar += e.key;
        ioArea.textContent  = currentVar;
    }else if (e.key === 'Backspace')
    {
        currentVar = currentVar.replace(/.$/, "");
        ioArea.textContent =currentVar;
    }
    //check if the pressed key is a point
    else if(/([.])/.test(e.key))
    {
        if(!(/([.])/.test(ioArea.textContent)))
        {
            currentVar += '.';
            ioArea.textContent = currentVar;
        }
    }
    else if (/([/*+-])/.test(e.key))
    {
        if (currentVar !== "")
        {
            previousVar = checkForPreviousOperation();
            currentVar ='';
            if (e.key === '+' || e.key === '-') 
            {
                operator = `${e.key}`;
            } 
            else if (e.key === '/')
            {
                operator = String.fromCharCode(247);
            }  
            else if (e.key === '*')
            {
                operator = String.fromCharCode(215);
            } 
            previousOperation =`${parseFloat(previousVar)} ${operator}`;
            operationArea.textContent =previousOperation;
        }
    }
    else if (e.key === "Enter" || e.key === '=')
    {
        e.preventDefault();
        if (previousVar !== '' && operator !== '' && currentVar !== '')
        {
            showResult();
        }
    }

})
clearBtn.addEventListener("click",()=>{
    ioArea.textContent = 0;
    operationArea.textContent ='';
    previousVar = '';
    currentVar = '';
    operator = '';
    previousOperation ='';
    ioArea.focus();
})
// check if the pressed key is backspace
deleteBtn.addEventListener("click",()=>{
    currentVar = currentVar.replace(/.$/,'');
    ioArea.textContent =currentVar;
})
// add eventlistner for each button of a number
for (let i = 1 ; i <= 9; i++)
{
    document.querySelector(`#num${i}`).addEventListener("click",()=>{
        checkForZero();
        currentVar += `${i}`;
        ioArea.textContent  = currentVar;
    })
}

num0.addEventListener("click",()=>{
    if (!(ioArea.textContent === '0'))
    {
        ioArea.textContent += 0;
    }
    
})

point.addEventListener("click",()=>{
    if(!(/([.])/.test(ioArea.textContent)))
    {
        currentVar += '.';
        ioArea.textContent = currentVar;
    }
})
equal.addEventListener('click',()=>{
    if (previousVar !== '' && operator !== '' && currentVar !== '')
    {
        showResult();
    }
})
divide.addEventListener("click",()=>{
    if (currentVar !== "")
    {
        previousVar = checkForPreviousOperation();
        currentVar ='';
        operator = String.fromCharCode(247);
        previousOperation =`${parseFloat(previousVar)} ${operator}`;
        operationArea.textContent =previousOperation;
    }
})
multi.addEventListener("click",()=>{
    if (currentVar !== "")
    {
        previousVar = checkForPreviousOperation();
        currentVar ='';
        operator = String.fromCharCode(215);
        previousOperation =`${parseFloat(previousVar)} ${operator}`;
        operationArea.textContent =previousOperation;
    }
})
add.addEventListener("click",()=>{
    if (currentVar !== "")
    {
        previousVar = checkForPreviousOperation();
        currentVar ='';
        operator = '+';
        previousOperation =`${parseFloat(previousVar)} ${operator}`;
        operationArea.textContent =previousOperation;
    }
})
sub.addEventListener("click",()=>{
    if (currentVar !== "")
    {
        previousVar = checkForPreviousOperation();
        currentVar ='';
        operator = '-';
        previousOperation =`${parseFloat(previousVar)} ${operator}`;
        operationArea.textContent =previousOperation;
    }
})
//check if the only number in the ioArea is zero
function checkForZero ()
{
    if (ioArea.textContent === '0')
    {
        ioArea.textContent = '';
    }
}
function addition(a,b)
{
    return a + b;
}
function substract(a,b)
{
    return a - b;
}
function division(a,b)
{
    return a / b;
}
function multiply(a,b)
{
    return a * b;
}
function operate(operator,a,b)
{
    if (operator === '+')
    {
        return addition(a,b);
    }
    else if (operator === '-')
    {
        return substract(a,b);
    }
    else if (operator === String.fromCharCode(215))
    {
        return multiply(a,b);
    }
    else if (operator === String.fromCharCode(247))
    {
        return division(a,b);
    }
}
function checkForPreviousOperation()
{
    if ((/([÷×+-])/).test(previousOperation))
    {
        return operate(operator,parseFloat(previousVar),parseFloat(currentVar));
    }
    else{
        return currentVar;
    }
}

function showResult()
{
    previousOperation += ` ${parseFloat(currentVar)} =`
    operationArea.textContent =previousOperation;
    currentVar = operate(operator,parseFloat(previousVar),parseFloat(currentVar));
    ioArea.textContent = currentVar;
    previousVar ='';
    previousOperation = '';
}
