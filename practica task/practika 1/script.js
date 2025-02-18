document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".menu-link");
    const contentDiv = document.getElementById("dynamic-content");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Отменяем стандартный переход по ссылке
            const url = this.getAttribute("href"); // Получаем URL из атрибута href

            fetch(url) // Загружаем HTML-файл
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Ошибка загрузки страницы");
                    }
                    return response.text();
                })
                .then(data => {
                    contentDiv.innerHTML = data; // Вставляем полученный контент в блок
                })
                .catch(error => {
                    console.error("Ошибка:", error);
                    contentDiv.innerHTML = "<p style='color: red;'>Не удалось загрузить содержимое.</p>";
                });
        });
    });
});
