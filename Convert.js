async function convertMain() {
  try {
    const res = await fetch("./main.js");
    let code = await res.text();

    // Remove comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, "");
    code = code.replace(/\/\/.*$/gm, "");

    // Compress whitespace
    code = code.replace(/\s+/g, " ").trim();

    // Wrap as bookmarklet
    const bookmarklet = "javascript:(()=>{" + code + "})()";

    // Output to page
    const box = document.getElementById("output");
    box.value = bookmarklet;

    console.log("Bookmarklet generated!");
  } catch (err) {
    alert("Failed to load main.js");
    console.error(err);
  }
}
