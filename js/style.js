
document.addEventListener("DOMContentLoaded", function() {  // ожидаем загрузки DOM
//-----------Localstorage
  var dataCat= {
    name: "Виталя Гора",
    marita: "холост",
    phone: "+7 (440) 554-32-12",
    email: "vitalya@gora.ru"
  };
  storage();
  function storage(){
    if(localStorage.getItem('name') !== null){
      dataCat.name = localStorage.getItem('name');
    };
    if(localStorage.getItem('marita') !== null){
      dataCat.marita = localStorage.getItem('marita');
    };
    if(localStorage.getItem('phone') !== null){
      dataCat.phone = localStorage.getItem('phone');
    };
    if(localStorage.getItem('nemail') !== null){
      dataCat.email = localStorage.getItem('email');
    };
    document.querySelector('.infoContName').textContent = dataCat.name;
    document.querySelector('.maritalStat').textContent = dataCat.marita;
    document.querySelector('.phoneStat').textContent = dataCat.phone;
    document.querySelector('.emailLink').textContent = dataCat.email;
    document.querySelector('.container').style.opacity ='1';
  };


//-----------Табы + скролл---------------------------
  document.querySelector('.tabsUl').addEventListener('click', tabs);
  var doc = document;
  function tabs(event){
    var dataTabsLi = event.target.getAttribute('data-tabs');
    if(dataTabsLi == null){return};
    var bodyTabsLi = doc.querySelectorAll('.tabsLi');
    var bodyContent = doc.querySelectorAll('.content');
    doc.querySelector('.scroll').classList.add('disable');
    for(var i = 0; i< bodyTabsLi.length; i++){
      if(dataTabsLi == [i]){
        bodyTabsLi[i].classList.add('active');
        bodyContent[i].classList.remove('disable');
        doc.querySelector('.scroll').classList.remove('disable');
      }else{
        bodyTabsLi[i].classList.remove('active');
        bodyContent[i].classList.add('disable');
      };
    };
    runScroll();
  };
  // скролл
  function runScroll(){
    $(".scroll").niceScroll({
      cursorcolor:"#0f7bb1",
      cursorwidth: "5px",
      cursoropacitymin: "1",
      background: "#ededed",
      cursorminheight: "71",
    });
  };

//------Добавление или удаление увлечений  ----------------------------------
  $(".addHobby").magnificPopup({}); // popup jq
  var clearId;
  document.querySelector('#popupForm').addEventListener('submit', function(event){
    event.preventDefault();
    var doc = document;
    clearTimeout(clearId);
    var newHobby = doc.querySelector('.popupText').value.trim();
    function clear(){
      doc.querySelector('.answerMes').classList.remove('errorMes');
      doc.querySelector('.answerMes').textContent ='';
      doc.querySelector('.answerMes').style.display = 'none';
    }
    if(newHobby.length > 30 || newHobby.length < 2){
      doc.querySelector('.answerMes').classList.add('errorMes');
      doc.querySelector('.answerMes').textContent ='Введено недопустимое значение.';
      doc.querySelector('.answerMes').style.display = 'block';
      clearId = setTimeout(function(){
        clear();
      },4000);
      return
    };
    var newElem = doc.createElement("li");
    var newHobby = doc.createTextNode(newHobby);
    newElem.appendChild(newHobby);
    newElem.className = "hobbyListItem";
    var locElem = doc.querySelector('.hobbyList');
    locElem.insertBefore(newElem, locElem.children[0]);
    doc.querySelector('.popupText').value = '';
    doc.querySelector('.answerMes').classList.add('goodMes');
    doc.querySelector('.answerMes').textContent ='Добавлено!';
    doc.querySelector('.answerMes').style.display = 'block';
    clearId = setTimeout(function(){
      clear();
    },4000);
  });

  document.querySelector('.hobbyList').addEventListener('click', function(event){
    var dataItem = event.target.classList.contains('hobbyListItem');
    if(dataItem){
      event.target.parentNode.removeChild(event.target);
    }else{return};
  });

//-----режим редактирования
  document.querySelector('.infoContName').addEventListener('click', function(event){
    var doc = document;
    var locData = doc.querySelector('.infoContName');
    var locForm = doc.querySelector('.editName');
    locForm.value = dataCat.name;
    locData.style.color = '#ffffff';
    locForm.style.zIndex = '10';
    locForm.focus();
    document.querySelector('.editName').addEventListener('focusout', function(event){
    var nameValue = locForm.value.trim();
    if(nameValue.length < 3 || nameValue.length > 30  ){
      locForm.style.zIndex = '-1';
      locData.style.color = '#000000';
      errorTab();
      return
    };
    dataCat.name = nameValue;
    locData.textContent = dataCat.name;
    locForm.style.zIndex = '-1';
    locData.style.color = '#000000';
    localStorage.setItem('name', dataCat.name);
    });
  });

  document.querySelector('.maritalStat').addEventListener('click', function(event){
    var doc = document;
    var locData = doc.querySelector('.maritalStat');
    var locForm = doc.querySelector('.editMarita');
    locForm.value = dataCat.marita;
    locData.style.color = '#ffffff';
    locForm.style.zIndex = '10';
    locForm.focus();
    document.querySelector('.editMarita').addEventListener('focusout', function(event){
    var maritaValue = locForm.value.trim();
    if(maritaValue.length < 3 || maritaValue.length > 15){
      locForm.style.zIndex = '-1';;
      locData.style.color = '#000000';
      errorTab();
      return
    };
    dataCat.marita = maritaValue;
    locData.textContent = dataCat.marita;
    locForm.style.zIndex = '-1';
    locData.style.color = '#000000';
    localStorage.setItem('marita', dataCat.marita);
    });
  });

  document.querySelector('.phoneStat').addEventListener('click', function(event){
    var doc = document;
    var locData = doc.querySelector('.phoneStat');
    var locForm = doc.querySelector('.editPhone');
    var regex = /^\+[7]{1}\ \([\d]{3}\)\ [\d]{3}-[\d]{2}-[\d]{2}$/;
    var regex_2 = /^[0-9]{11}$/;
    locForm.value = dataCat.phone;
    locData.style.color = '#ffffff';
    locForm.style.zIndex = '10';
    locForm.focus();
    document.querySelector('.editPhone').addEventListener('focusout', function(event){
    var phoneValue = locForm.value.trim();
    if(regex_2.test(phoneValue)){
      phoneValue = '+7'+' ('+phoneValue[1]+phoneValue[2]+phoneValue[3]+') '+phoneValue[4]+phoneValue[5]+phoneValue[6]+'-'+phoneValue[7]+phoneValue[8]+'-'+phoneValue[9]+phoneValue[10];
     }else if(regex.test(phoneValue) == false){
      locForm.style.zIndex = '-1';
      locData.style.color = '#000000';
      errorTab();
      return
    };
    dataCat.phone = phoneValue;
    locData.textContent = dataCat.phone;
    locForm.style.zIndex = '-1';
    locData.style.color = '#000000';
    localStorage.setItem('phone', dataCat.phone);
    });
  });

  document.querySelector('.emailStat').addEventListener('click', function(event){
    var doc = document;
    var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var locData = doc.querySelector('.emailLink');
    var locForm = doc.querySelector('.editEmail');
    locForm.value = dataCat.email;
    locData.style.color = '#ffffff';
    locData.style.border = '#ffffff';
    locForm.style.zIndex = '10';
    locForm.focus();
    document.querySelector('.editEmail').addEventListener('focusout', function(event){
    var emailValue = locForm.value.trim();
    if(regex.test(emailValue) == false){
      locForm.style.zIndex = '-1';
      locData.style.color = '#0e7db2';
      locData.style.border = '#0e7db2';
      errorTab();
      return
    };
    dataCat.email = emailValue;
    locData.textContent = dataCat.email;
    locForm.style.zIndex = '-1';
    locData.style.color = '#0e7db2';
    locData.style.border = '#0e7db2';
    localStorage.setItem('email', dataCat.email);
    });
  });

  function errorTab(){
    var newSpanErr = doc.createElement("span");
    var newMes = doc.createTextNode('-Ошибка ввода-');
    newSpanErr.appendChild(newMes );
    newSpanErr.className = "errorValue";
    var newLocErr = document.querySelector('.tab_0');
    newLocErr.insertBefore(newSpanErr, newLocErr.children[0]);
    setTimeout(function(){
      newLocErr = document.querySelector('.errorValue');
      newLocErr.parentNode.removeChild(newLocErr);
    },700);
  }
});
