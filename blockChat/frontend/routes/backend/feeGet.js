code="";
for(i=0;i<10;i++)
{
    code=code+Math.floor(Math.random()*Math.floor(9));
}
document.getElementById("codeText").innerHTML=code;