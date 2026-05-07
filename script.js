let currentRole = "user";
let messageCounter = 0;


function openSupportChat() {
  const chat = document.getElementById("supportChat");

  chat.style.display = "block";

  alert("Вітаємо у мінічаті техпідтримки!");

  let startDialog = confirm("Бажаєте почати діалог з техпідтримкою?");

  if (startDialog) {
    addChatMessage("Адмін", "Добрий день! Чим можу допомогти?");
    updateServiceStatus("Мінічат техпідтримки відкрито. Користувач може написати повідомлення.");
  } else {
    addChatMessage("Система", "Чат відкрито. Ви можете написати повідомлення пізніше.");
    updateServiceStatus("Мінічат відкрито, але користувач поки не почав діалог.");
  }
}


function setChatRole(role) {
  currentRole = role;

  const roleText = document.getElementById("currentRole");

  if (role === "user") {
    roleText.textContent = "Поточна роль: користувач";
  } else {
    roleText.textContent = "Поточна роль: адмін";
  }
}


function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Повідомлення не може бути порожнім.");
    return;
  }

  let sender;

  if (currentRole === "user") {
    sender = "Користувач";
  } else {
    sender = "Адмін";
  }

  addChatMessage(sender, text);

  input.value = "";

  messageCounter++;

  for (let i = 0; i < 1; i++) {
    console.log("Надіслано повідомлення №" + messageCounter);
  }

  if (messageCounter >= 5) {
    updateServiceStatus("У чаті вже є кілька повідомлень. Діалог з техпідтримкою активний.");
  } else {
    updateServiceStatus("Повідомлення успішно додано до мінічату техпідтримки.");
  }
}


function addChatMessage(sender, text) {
  const chatMessages = document.getElementById("chatMessages");

  const message = document.createElement("p");
  message.textContent = sender + ": " + text;

  if (sender === "Користувач") {
    message.className = "user-message";
  } else if (sender === "Адмін") {
    message.className = "admin-message";
  } else {
    message.className = "system-message";
  }

  chatMessages.append(message);
}


function showDeveloperInfo(surname, name, position = "автор сайту") {
  const block = document.getElementById("authorBlock");

  block.innerHTML =
    "<h3>Автор сайту</h3>" +
    "<p><b>" + surname + " " + name + "</b><br>" +
    "Посада: " + position + "<br>" +
    "Сайт присвячений побутовій техніці для дому, догляду за приладами та правилам безпеки.</p>";
}


function compareStrings(str1, str2) {
  if (str1.length > str2.length) {
    alert("Довша назва приладу: " + str1);
  } else if (str2.length > str1.length) {
    alert("Довша назва приладу: " + str2);
  } else {
    alert("Назви приладів однакові за довжиною.");
  }
}


function changeBackgroundFor30Seconds() {
  const oldBackground = document.body.style.background;

  document.body.style.background = "#FFF4CC";

  alert("Увімкнено режим комфортного перегляду важливої інформації.");

  setTimeout(function () {
    document.body.style.background = oldBackground;
    alert("Стандартний режим перегляду відновлено.");
  }, 30000);
}


function redirectToKitchen() {
  const answer = confirm("Перейти до сторінки кухонної техніки?");

  if (answer) {
    location.href = "kitchen.html";
  }
}


function updateServiceStatus(text) {
  const serviceStatus = document.getElementById("serviceStatus");

  serviceStatus.innerHTML =
    "<h3>Стан сервісу</h3>" +
    "<p>" + text + "</p>";
}


function refreshNavigationInfo() {
  const navigationBlock = document.getElementById("navigationBlock");
  const menuLinks = document.querySelectorAll(".menu a");
  const menuBlock = document.querySelector(".menu");

  let note = "Розділи сайту допомагають швидко перейти до потрібної категорії.";

  if (menuBlock) {
    const menuOuter = menuBlock.outerHTML;

    if (menuOuter.length > 0) {
      note = "Навігаційний блок активний: можна швидко перейти до кухонної техніки, техніки для прибирання та розділу безпеки.";
    }
  }

  let content = "<h3>Навігація</h3><p><b>Доступні розділи:</b><br>";

  menuLinks.forEach(function(link, index) {
    content += (index + 1) + ". " + link.textContent + "<br>";
  });

  content += "<br>" + note + "</p>";

  navigationBlock.innerHTML = content;
}


function refreshPageTexts() {
  const importantText = document.getElementById("important");

  importantText.textContent =
    "Увага: перед використанням побутової техніки перевіряйте стан кабелю, вилки, розетки та чистоту приладу.";

  const introParagraph = document.getElementById("introText");

  if (introParagraph) {
    const firstTextNode = introParagraph.firstChild;

    if (firstTextNode) {
      firstTextNode.nodeValue = "Сучасна домашня техніка ";
    }
  }

  const highlightElement = document.querySelector(".highlight");

  if (highlightElement && highlightElement.firstChild) {
    highlightElement.firstChild.data = "техніка для безпечного дому";
  }

  const comparisonBlock = document.getElementById("comparisonBlock");

  comparisonBlock.innerHTML =
    "<h3>Корисна примітка</h3>" +
    "<p>Регулярне очищення фільтрів, контейнерів і поверхонь підвищує ефективність роботи техніки та зменшує ризик поломок.</p>";
}


function createCareCard() {
  refreshPageTexts();
  refreshNavigationInfo();

  const workspace = document.getElementById("domWorkspace");

  if (!document.getElementById("carePlanCard")) {
    const carePlanCard = document.createElement("div");
    carePlanCard.id = "carePlanCard";
    carePlanCard.className = "workspace-card";

    const title = document.createElement("h3");
    const titleText = document.createTextNode("Персональний план догляду за технікою");
    title.append(titleText);

    const paragraph = document.createElement("p");
    const paragraphText = document.createTextNode(
      "Складіть простий графік догляду: щодня очищуйте поверхні, щотижня перевіряйте фільтри, а щомісяця оглядайте кабелі живлення та з’єднання."
    );
    paragraph.append(paragraphText);

    const badge = document.createElement("span");
    badge.className = "note-badge";
    badge.append("Створено сервісом догляду");

    carePlanCard.append(title, paragraph, badge);
    workspace.append(carePlanCard);
  }

  updateServiceStatus("Створено нову інформаційну картку з планом догляду за побутовою технікою.");
}


function insertDailyAdvice() {
  refreshPageTexts();
  refreshNavigationInfo();

  const workspace = document.getElementById("domWorkspace");

  if (!document.getElementById("dailyAdviceCard")) {
    const dailyAdviceCard = document.createElement("div");
    dailyAdviceCard.id = "dailyAdviceCard";
    dailyAdviceCard.className = "workspace-card";

    const title = document.createElement("h3");
    title.append("Порада дня");

    const paragraph = document.createElement("p");
    paragraph.append("Після використання приладу не відкладайте очищення: це допомагає зберегти продуктивність і продовжує строк служби техніки.");

    workspace.prepend(dailyAdviceCard);
    dailyAdviceCard.append(title, paragraph);
  }

  if (!document.getElementById("afterContactsAdvice")) {
    const contacts = document.getElementById("contacts");

    const note = document.createElement("p");
    note.id = "afterContactsAdvice";
    note.append("Нагадування: перед першим використанням нового приладу ознайомтеся з інструкцією виробника.");

    contacts.after(note);
  }

  updateServiceStatus("Додано пораду дня та корисне нагадування після контактної інформації.");
}


function replaceMainBenefit() {
  refreshPageTexts();
  refreshNavigationInfo();

  const firstListItem = document.querySelector("#advantagesList li");

  if (firstListItem && !document.getElementById("updatedBenefit")) {
    const newItem = document.createElement("li");
    newItem.id = "updatedBenefit";
    newItem.append("Безпечне використання та правильний догляд за технікою щодня");

    firstListItem.replaceWith(newItem);
  }

  updateServiceStatus("Основну перевагу сайту оновлено: акцент перенесено на безпеку та щоденний догляд.");
}


function removeRecommendationCard() {
  refreshPageTexts();
  refreshNavigationInfo();

  const firstCard = document.querySelector(".care-card");

  if (firstCard) {
    firstCard.remove();
    updateServiceStatus("Одну картку рекомендацій прибрано з добірки.");
  } else {
    updateServiceStatus("Усі картки рекомендацій уже прибрано.");
  }
}


function removeCurrentCard(button) {
  const card = button.closest(".care-card");

  if (card) {
    card.remove();
    updateServiceStatus("Картку прибрано з добірки рекомендацій користувача.");
  }
}





function activateConsultantTitle(element) {
  element.classList.add("consultant-title-active");
  updateServiceStatus("Консультант з вибору побутової техніки активний.");
}



const personalAdviceButton = document.getElementById("personalAdviceButton");

if (personalAdviceButton) {
  personalAdviceButton.onclick = function () {
    alert("Порада: перед покупкою порівняйте потужність, гарантію, клас енергоефективності та відгуки покупців.");
    updateServiceStatus("Користувач отримав персональну пораду щодо вибору побутової техніки.");
  };
}



function showQualityAdvice() {
  updateServiceStatus("Критерії якості: надійний виробник, гарантія, економне споживання, безпечний корпус і зручне керування.");
}


function markQualityButton() {
  const qualityCheckButton = document.getElementById("qualityCheckButton");

  if (qualityCheckButton) {
    qualityCheckButton.classList.add("checked-button");
  }
}


const qualityCheckButton = document.getElementById("qualityCheckButton");

if (qualityCheckButton) {
  qualityCheckButton.addEventListener("click", showQualityAdvice);
  qualityCheckButton.addEventListener("click", markQualityButton);
}



const hoverCheckObject = {
  handleEvent: function(event) {
    event.currentTarget.classList.add("hover-checked");

    updateServiceStatus(
      "Система перевірила блок: " +
      event.currentTarget.querySelector("h3").textContent
    );

    console.log("Елемент, на якому спрацював обробник:", event.currentTarget);
  }
};


const selectedApplianceBlock = document.getElementById("selectedApplianceBlock");

if (selectedApplianceBlock) {
  selectedApplianceBlock.addEventListener("mouseover", hoverCheckObject);
}



function removeHoverCheckObject() {
  if (selectedApplianceBlock) {
    selectedApplianceBlock.removeEventListener("mouseover", hoverCheckObject);
    selectedApplianceBlock.classList.remove("hover-checked");
    updateServiceStatus("Перевірку наведення для блоку обраного приладу вимкнено.");
  }
}



const applianceCatalog = document.getElementById("applianceCatalog");

if (applianceCatalog) {
  applianceCatalog.onclick = function(event) {
    if (event.target.tagName === "LI") {
      const items = applianceCatalog.querySelectorAll("li");

      items.forEach(function(item) {
        item.classList.remove("catalog-selected");
      });

      event.target.classList.add("catalog-selected");

      const applianceName = event.target.dataset.name;
      const applianceInfo = event.target.dataset.info;

      document.getElementById("selectedApplianceInfo").innerHTML =
        "<b>" + applianceName + "</b><br>" + applianceInfo;

      updateServiceStatus("Користувач обрав прилад: " + applianceName + ".");
    }
  };
}



const consultantActions = {
  showEconomyAdvice: function() {
    updateServiceStatus("Економія: обирайте техніку з класом енергоефективності A або вище та не залишайте прилади у режимі очікування.");
  },

  showSafetyAdvice: function() {
    updateServiceStatus("Безпека: не використовуйте пошкоджені кабелі, не перевантажуйте розетки та вимикайте техніку після роботи.");
  },

  showCareAdvice: function() {
    updateServiceStatus("Догляд: регулярно очищуйте фільтри, поверхні, контейнери та перевіряйте стан шнура живлення.");
  },

  turnOffHoverCheck: function() {
    removeHoverCheckObject();
  }
};


const consultantMenu = document.getElementById("consultantMenu");

if (consultantMenu) {
  consultantMenu.addEventListener("click", function(event) {
    const action = event.target.dataset.action;

    if (action && consultantActions[action]) {
      consultantActions[action]();
    }
  });
}



document.addEventListener("click", function(event) {
  const behavior = event.target.dataset.behavior;

  if (!behavior) {
    return;
  }

  if (behavior === "highlight-important") {
    event.target.classList.toggle("important-buyer-tip");
    updateServiceStatus("Головну пораду перед покупкою виділено.");
  }

  if (behavior === "show-care-plan") {
    const carePlanText = document.getElementById("carePlanText");

    if (carePlanText) {
      carePlanText.classList.toggle("care-plan-visible");
      updateServiceStatus("Короткий план догляду за технікою відкрито або приховано.");
    }
  }

  if (behavior === "go-kitchen") {
    location.href = "kitchen.html";
  }
});

// =====================================================
// Конструктор комплекту побутової техніки
// Використано: mouseover, mouseout, event.target,
// event.relatedTarget, mousedown, mousemove, mouseup
// =====================================================

const applianceShelf = document.getElementById("applianceShelf");
const kitDropArea = document.getElementById("kitDropArea");
const kitHint = document.getElementById("kitHint");

if (applianceShelf && kitDropArea && kitHint) {

  applianceShelf.addEventListener("mouseover", function(event) {
    const device = event.target.closest(".kit-device");

    if (!device || !applianceShelf.contains(device)) {
      return;
    }

    if (device.contains(event.relatedTarget)) {
      return;
    }

    device.classList.add("kit-device-hover");

    kitHint.textContent =
      device.dataset.name + ": " + device.dataset.info;
  });


  applianceShelf.addEventListener("mouseout", function(event) {
    const device = event.target.closest(".kit-device");

    if (!device || !applianceShelf.contains(device)) {
      return;
    }

    if (device.contains(event.relatedTarget)) {
      return;
    }

    device.classList.remove("kit-device-hover");

    kitHint.textContent =
      "Підказка: перетягніть потрібну техніку у свій домашній комплект.";
  });


  applianceShelf.addEventListener("mousedown", function(event) {
    const originalDevice = event.target.closest(".kit-device");

    if (!originalDevice || !applianceShelf.contains(originalDevice)) {
      return;
    }

    event.preventDefault();

    const deviceCopy = originalDevice.cloneNode(true);

    deviceCopy.classList.add("kit-device-dragging");

    document.body.append(deviceCopy);

    deviceCopy.style.position = "absolute";
    deviceCopy.style.zIndex = "1000";
    deviceCopy.style.width = originalDevice.offsetWidth + "px";

    const shiftX = event.clientX - originalDevice.getBoundingClientRect().left;
    const shiftY = event.clientY - originalDevice.getBoundingClientRect().top;

    moveDevice(event.pageX, event.pageY);

    function moveDevice(pageX, pageY) {
      deviceCopy.style.left = pageX - shiftX + "px";
      deviceCopy.style.top = pageY - shiftY + "px";
    }

    function checkDropZone(event) {
      const zone = kitDropArea.getBoundingClientRect();

      return (
        event.clientX > zone.left &&
        event.clientX < zone.right &&
        event.clientY > zone.top &&
        event.clientY < zone.bottom
      );
    }

    function onMouseMove(event) {
      moveDevice(event.pageX, event.pageY);

      if (checkDropZone(event)) {
        kitDropArea.classList.add("kit-drop-area-ready");
        kitHint.textContent = "Відпустіть прилад, щоб додати його до комплекту.";
      } else {
        kitDropArea.classList.remove("kit-drop-area-ready");
        kitHint.textContent = "Перетягніть прилад у зелену зону комплекту.";
      }
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", function onMouseUp(event) {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      if (checkDropZone(event)) {
        const addedDevice = originalDevice.cloneNode(true);

        addedDevice.classList.remove("kit-device-hover");
        addedDevice.classList.remove("kit-device-dragging");

        if (kitDropArea.textContent.trim() === "Перетягніть сюди потрібний прилад") {
          kitDropArea.innerHTML = "";
        }

        kitDropArea.append(addedDevice);

        kitHint.textContent =
          originalDevice.dataset.name + " додано до вашого комплекту побутової техніки.";
      } else {
        kitHint.textContent =
          "Прилад не додано. Перетягніть його точно у зону комплекту.";
      }

      deviceCopy.remove();

      kitDropArea.classList.remove("kit-drop-area-ready");
    });
  });
}