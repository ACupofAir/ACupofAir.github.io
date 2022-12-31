// (() => {
//     "use strict";

//     if (!document.queryCommandSupported("copy")) {
//         return;
//     }

//     function flashCopyMessage(el, msg) {
//         el.textContent = msg;
//         setTimeout(() => {
//             el.textContent = "Copy";
//         }, 1000);
//     }

//     function selectText(node) {
//         let selection = window.getSelection();
//         let range = document.createRange();
//         if (node.childElementCount === 2) {
//             // Skip the title.
//             range.selectNodeContents(node.children[1]);
//             console.log(node.children[1]);
//         } else {
//             range.selectNodeContents(node);
//             console.log(range);
//         }
//         selection.removeAllRanges();
//         selection.addRange(range);
//         return selection;
//     }

//     function addCopyButton(containerEl) {
//         let copyBtn = document.createElement("button");
//         copyBtn.className = "highlight-copy-btn";
//         copyBtn.textContent = "Copy";

//         let codeEl = containerEl.firstElementChild;
//         console.log(codeEl);
//         copyBtn.addEventListener("click", () => {
//             try {
//                 let selection = selectText(codeEl);
//                 document.execCommand("copy");
//                 selection.removeAllRanges();

//                 flashCopyMessage(copyBtn, "Copied!");
//             } catch (e) {
//                 console && console.log(e);
//                 flashCopyMessage(copyBtn, "Failed :'(");
//             }
//         });

//         containerEl.appendChild(copyBtn);
//     }

//     // Add copy button to code blocks
//     let highlightBlocks = document.getElementsByClassName("highlight");
//     Array.prototype.forEach.call(highlightBlocks, addCopyButton);
// })();
function createCopyButton(highlightDiv) {
  const button = document.createElement("button");
  button.className = "highlight-copy-btn";
  button.type = "button";
  button.innerText = "Copy";
  button.addEventListener("click", () => copyCodeToClipboard(button, highlightDiv));
  addCopyButtonToDom(button, highlightDiv);
}

async function copyCodeToClipboard(button, highlightDiv) {
  const codeToCopy = highlightDiv.querySelector(":last-child > pre > code").innerText;
  try {
    result = await navigator.permissions.query({ name: "clipboard-write" });
    if (result.state == "granted" || result.state == "prompt") {
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      copyCodeBlockExecCommand(codeToCopy, highlightDiv);
    }
  } catch (_) {
    copyCodeBlockExecCommand(codeToCopy, highlightDiv);
  }
  finally {
    codeWasCopied(button);
  }
}

function copyCodeBlockExecCommand(codeToCopy, highlightDiv) {
  const textArea = document.createElement("textArea");
  textArea.contentEditable = 'true'
  textArea.readOnly = 'false'
  textArea.className = "copyable-text-area";
  textArea.value = codeToCopy;
  highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
  const range = document.createRange()
  range.selectNodeContents(textArea)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
  textArea.setSelectionRange(0, 999999)
  document.execCommand("copy");
  highlightDiv.removeChild(textArea);
}

function codeWasCopied(button) {
  button.blur();
  button.innerText = "Copied!";
  setTimeout(function() {
    button.innerText = "Copy";
  }, 2000);
}

function addCopyButtonToDom(button, highlightDiv) {
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
  const wrapper = document.createElement("div");
  wrapper.className = "highlight-wrapper";
  highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
  wrapper.appendChild(highlightDiv);
}

document.querySelectorAll(".highlight")
  .forEach(highlightDiv => createCopyButton(highlightDiv));
