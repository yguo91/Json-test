"use strick"

const urlParamas = new URLSearchParams(window.location.search);
const searchValue = urlParamas.get("key");

document.getElementById("statment").innerHTML = searchValue;