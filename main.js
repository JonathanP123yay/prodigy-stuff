(()=>{

// Fix alert sandboxing
let iframe=document.createElement("iframe");
document.body.appendChild(iframe);
window.alert=iframe.contentWindow.alert.bind(window);
iframe.remove();

// Styles
let style=document.createElement("style");
style.innerHTML=`
.panel{
  width:380px;
  background:#111;
  border-radius:12px;
  position:fixed;
  top:80px;
  left:50%;
  transform:translateX(-50%);
  font-family:Nunito,system-ui,sans-serif;
  color:white;
  z-index:999999;
  box-shadow:0 12px 30px rgba(0,0,0,.5);
}
.header{
  height:40px;
  background:#181818;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 12px;
  font-weight:bold;
  cursor:move;
  border-radius:12px 12px 0 0;
}
.close{
  color:red;
  font-size:18px;
  cursor:pointer;
}
.body{
  padding:12px;
  text-align:center;
}
.btn{
  border:none;
  background:#222;
  padding:10px;
  margin:6px;
  width:85%;
  color:white;
  font-size:15px;
  border-radius:8px;
  cursor:pointer;
  transition:.15s;
}
.btn:hover{
  background:#333;
}
`;
document.head.appendChild(style);

// UI Container
let panel=document.createElement("div");
panel.className="panel";

// Header
let header=document.createElement("div");
header.className="header";
header.innerHTML=`<span>Control Panel</span>`;
panel.appendChild(header);

// Close button
let close=document.createElement("span");
close.className="close";
close.innerText="❌";
close.onclick=()=>panel.remove();
header.appendChild(close);

// Body
let body=document.createElement("div");
body.className="body";
panel.appendChild(body);

// Button generator
function addButton(text){
  let btn=document.createElement("button");
  btn.className="btn";
  btn.innerText=text;
  btn.onclick=()=>alert(text+" clicked");
  body.appendChild(btn);
}

// Create 10 buttons
for(let i=1;i<=10;i++){
  addButton("Button "+i);
}

// Dragging logic
let drag=false,ox=0,oy=0;
header.onmousedown=e=>{
  drag=true;
  ox=e.clientX-panel.offsetLeft;
  oy=e.clientY-panel.offsetTop;
};
document.onmousemove=e=>{
  if(!drag)return;
  panel.style.left=e.clientX-ox+"px";
  panel.style.top=e.clientY-oy+"px";
};
document.onmouseup=()=>drag=false;

// Add UI to page
document.body.appendChild(panel);

})();
