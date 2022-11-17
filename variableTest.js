var globalOne = 3;

function testOne()
{
    globalOne += 2;
    alert("globalOne is :" + globalOne );
    globalOne += 1;
}
testTwo();

function testTwo()
{
    globalTwo = 20;
    alert("globalTwo is " + globalTwo);
    globalOne = 0;
    testOne();
}

alert("outside globalOne is: " + globalOne);
alert("outside globalTwo is:" + globalTwo);