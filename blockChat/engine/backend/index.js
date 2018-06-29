var addressFieldModified=false;
var textFieldModified=false;


function changeStyle1()
{
    if(addressFieldModified==false)
    {
        document.getElementById("addressField").value = "";
        document.getElementById("addressField").style.color = "white";
        document.getElementById("addressField").style.fontStyle = "normal";
        addressFieldModified=true;
    }
}
function changeStyle2()
{
    if(textFieldModified==false)
    {
        document.getElementById("textField").value = "";
        document.getElementById("textField").style.color = "white";
        document.getElementById("textField").style.fontStyle = "normal";
        textFieldModified=true;
    }
}
function getCode()
{
    console.log("hola");
    document.getElementById("form").submit();
}