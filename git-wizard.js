document.getElementById('prev').addEventListener("click", PageDown);
  document.getElementById('prev').addEventListener("click", getContent);
  document.getElementById('next').addEventListener("click", PageUp);
  document.getElementById('next').addEventListener("click", getContent);


  window.addEventListener("load", getContent);
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("load", ajaxLoad);
  xhr.addEventListener("error", ajaxError);

  var currentpage = 0;

  function PageUp() {
      currentpage++;
      buttonCheck();
  }

  function PageDown() {
      currentpage--;
      buttonCheck();
  }

  function buttonCheck() {
      var prev = document.querySelector('#prev');
      var next = document.querySelector('#next');
      if (currentpage == 0) {
          prev.disabled = true;
      } else if (currentpage == 4) {
          next.disabled = true;
      } else {
          prev.disabled = false;
          next.disabled = false;
      }
  }

  function getContent() {
      xhr.open("GET", 'views/Stap' + currentpage + '.html');
      xhr.send();
  }


  function ajaxLoad(event) {
      if (this.status === 200) {
          document.querySelector('.steps').innerHTML = this.responseText;
          pageInput();
      } else {
          console.log("unsuccessful request");
      }
  }

  function ajaxError(event) {
      console.log('error');
  }

  function pageInput() {
      switch (currentpage) {
          case 0:
              console.log('0');
              break;
          case 1:
              document.querySelector('#folder').addEventListener("keyup", folderSearch);

              function folderSearch() {
                  var search = document.getElementById('folder').value;
                  if (search.indexOf(' ') > 0) {
                      search = '"' + search + '"';
                  }
                  document.querySelector('#zoekFolderCommando').innerHTML = 'cd ' + search;
              }
              document.querySelector('#cloneUrl').addEventListener("keyup", gitSearch);


              function gitSearch() {
                  var search = document.getElementById('cloneUrl').value;
                  if (search.indexOf(' ') > 0) {
                      search = '"' + search + '"';
                  }
                  document.querySelector('#cloneCommand').innerHTML = 'git clone ' + search;
              }

              document.querySelector('#zoekFolderCommando').addEventListener("click", copyStringToClipboard);
              document.querySelector('#cloneCommand').addEventListener("click", copyStringToClipboard);

              break;
          case 2:
              document.querySelector('#commitComment').addEventListener("keyup", addComment);

              function addComment() {
                  var search = document.getElementById('commitComment').value;
                  document.querySelector('#commitCommand').innerHTML = 'git commit -a -m "' + search + '"';
              }

              document.querySelector('#getStatus').addEventListener("click", copyStringToClipboard);
              document.querySelector('#getAdd').addEventListener("click", copyStringToClipboard);
              document.querySelector('#commitCommand').addEventListener("click", copyStringToClipboard);

              break;
          case 3:
              document.querySelector('#getPull').addEventListener("click", copyStringToClipboard);

              break;
          case 4:
              document.querySelector('#getPush').addEventListener("click", copyStringToClipboard);

              break;
          default:

      }
  }

  function copyStringToClipboard() {
      var copytje = this.innerHTML;

      function handler(event) {
          event.clipboardData.setData('text/plain', copytje);
          event.preventDefault();
          document.removeEventListener('copy', handler, true);
      }

      document.addEventListener('copy', handler, true);
      document.execCommand('copy');
  }
