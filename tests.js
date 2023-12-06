function myFunction(a) {
  return a[a + 3];
}

console.log();

//Write a function that takes a string (a) as argument. Remove the first 3 characters of a?
var str = "012123";
var strFirstThree = str.substring(3);

console.log(str); //shows '012123'
console.log(strFirstThree); // shows '012'

//Source: https://stackoverflow.com/questions/39886730

function strContains(a, b) {
  return !a.indexOf(b) ? `${a}${b}` : `${b}${a}`;
}

console.log(strContains(" think, therefore I am", "I"));

//Write a function that takes two strings (a and b) as arguments. Return the number of times a occurs in b.?
function pere(word, n) {
  console.log(word.repeat(n));
}

//Source: https://stackoverflow.com/questions/74474002

console.log(
  pere("m", "how many times does the character occur in this sentence?")
);

function splitting(a) {
  const str = a.toString();
  let arr;
  return;
}
console.log("splitting(10)", splitting(10));
