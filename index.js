const  button  = document.getElementById("b1")
const texter=document.getElementById("text1")
const list=document.getElementById("u1")
const deletebtn=document.getElementById("b2")
const savebtn=document.getElementById("b3")
let myleads=[]
let t=""
const downloadButton = document.getElementById("b4");



downloadButton.addEventListener("click", function () {
    // Create an array of anchor tags with the web addresses
    const anchorTags = myleads.map(address => `<a href="${address}" target="_blank">${address}</a>`);
  
    // Convert the array to a single string with each anchor tag on a new line
    const data = anchorTags.join("\n");
  
    // Create a Blob from the data
    const blob = new Blob([data], { type: "text/html" });
  
    // Generate a unique filename for the download
    const filename = "web_addresses.html";
  
    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  });

  

const leadsfromlocalstorage=JSON.parse(localStorage.getItem("myleads"))

if(leadsfromlocalstorage)
{
    myleads=leadsfromlocalstorage
    print()
}

savebtn.addEventListener("click",function(){
    chrome.tabs.query({active: true,currentWindow:true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        print()  
    })
     

})
deletebtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myleads=[]
    print()
})

button.addEventListener("click",function(){
    myleads.push(texter.value)
    localStorage.setItem("myleads",JSON.stringify(myleads))
    print()
    texter.value=" " //clears the inut field
})


function print()
{
    let listitems=""
    for(let i=0;i<myleads.length;i++)
    {
        //listitems+="<li> <a target='_blank' href='"+myleads[i]+"'>"+myleads[i]+"</a></li>"
        listitems+=`
        <li> 
        <a 
        target='_blank' href='${myleads[i]}'> 
        ${myleads[i]}
        </a>
        </li>
        `
    }
    list.innerHTML=listitems
    
}








