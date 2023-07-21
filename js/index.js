var siteName=document.getElementById('siteName');
var websiteurl=document.getElementById('websiteurl');
var btn=document.getElementById('btn');
var body_container=document.getElementById('body_container');
var anchor=document.getElementById('anchor');
var feedback=document.getElementById('feedback');
var siteList;

(function(){
if(JSON.parse(localStorage.getItem('test'))!==null)
{
 siteList=JSON.parse(localStorage.getItem('test')) ;
 display();
}
else
{
    siteList=[];
}
})();

btn.onclick=function(){
   if(checkSiteName())
   {  feedback.innerHTML='This Name Is Already Exist';

   }
    else{
        addSite();
    }
    
}
function checkSiteName(){
    var sName=siteName.value;
    
    for(var i=0;i<siteList.length;i++){
        if(sName.toLowerCase()==siteList[i].site_name.toLowerCase()){
            return true;
        }
    }   
    }
    
    
function addSite(){

  if(nameRegex()==true && urlRegex()==true)
{
    feedback.innerHTML=''
    var site={
        site_name:siteName.value,
        site_url:websiteurl.value
    };
    console.log(siteList);
    siteList.push(site);
    localStorage.setItem('test',JSON.stringify(siteList));
    clearForm();
    display();
}
else{
    notVaild();
}
    }
   



function display(){
    var box='';
    for(var i=0;i<siteList.length;i++){
        box+=`<tr>
        <td>${i+1}</td>
        <td>${siteList[i].site_name}</td>

        <td><a target="_blank"  href="${siteList[i].site_url}"  class="btn btn-success"> <i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><button onclick="deleteSite(${i});" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
   
    }

    body_container.innerHTML=box;
}

function clearForm(){
    siteName.value='';
    websiteurl.value='';
    siteName.classList.remove("is-valid");
    websiteurl.classList.remove("is-valid");
}

function deleteSite(index){
    siteList.splice(index,1);
    localStorage.setItem('test',JSON.stringify(siteList));
    display();
}
function nameRegex(){
    var regex=/^[a-zA-Z][_a-zA-Z0-9]{1,61}[a-zA-Z0-9]$|^[_]{1,2}$/;
    return regex.test(siteName.value);
}
function urlRegex(){
    var regex=/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/
    return regex.test(websiteurl.value)
}
function notVaild(){
if(!nameRegex()||(!urlRegex())){
    favDialog.showModal();
}
}
anchor.onclick=function(){
    favDialog.close();
}
var name_regex=/^[a-zA-Z][_a-zA-Z0-9]{1,61}[a-zA-Z0-9]$|^[_]{1,2}$/;
var url_regex=/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

siteName.addEventListener("input", function () {
    validData(siteName, name_regex);
  });
  
  websiteurl.addEventListener("input", function () {
    validData(websiteurl, url_regex);
  }); 
  
  function validData(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    }
  }
  