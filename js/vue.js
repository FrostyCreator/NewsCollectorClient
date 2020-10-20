var vue_data = new Vue({
    el: '#newsTable',
    created() {
        this.getData()
    },
    data: {
        news: []
    },
    methods: {
        getData : function () {
            var xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:8080/getNews', false);

            xhr.send();

            if (xhr.status != 200) {
                // обработать ошибку
                console.log('ошибка запросв')
                console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
            } else {
                // вывести результат
                this.news = JSON.parse(xhr.response)
                console.log( xhr.responseText ); // responseText -- текст ответа.
            }
        }
    }
});