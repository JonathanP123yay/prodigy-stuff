document.addEventListener("DOMContentLoaded",()=>{
  const btn=document.getElementById("convertBtn");
  const output=document.getElementById("output");

  btn.onclick=async()=>{
    output.value="Loading main.js...";
    try{
      let res=await fetch("./main.js");
      let code=await res.text();

      // Remove comments
      code=code.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm,"");

      // Compress whitespace
      code=code.replace(/\s+/g," ").trim();

      // Convert to bookmarklet one-liner
      let oneLine="javascript:(()=>{"+code+"})()";

      output.value=oneLine;
    }catch{
      output.value="Failed to load main.js";
    }
  };
});
