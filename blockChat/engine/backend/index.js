var addressFieldModified=false;
var textFieldModified=false;


function changeStyle1()
{
    if(addressFieldModified==false)
    {
        document.getElementById("addressField").value = "";
        document.getElementById("addressField").style.color = "black";
        document.getElementById("addressField").style.fontStyle = "normal";
        addressFieldModified=true;
    }
}
function changeStyle2()
{
    if(textFieldModified==false)
    {
        document.getElementById("textField").value = "";
        document.getElementById("textField").style.color = "black";
        document.getElementById("textField").style.fontStyle = "normal";
        textFieldModified=true;
    }
}