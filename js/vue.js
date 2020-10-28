var vue_data = new Vue({
    el: '#news',
    created() {
        this.getData();
    },
    data: {
        urls: {
            getAllNews: 'http://localhost:8080/getNews',
            updateData: 'http://localhost:8080/update',
            deleteNews: 'http://localhost:8080/delete/'
        },
        news: [],
        sites: [],
        dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    },
    methods: {
        // Получить новости из бд
        getData: function () {
            axios.get(this.urls.getAllNews).then((response) => {
                this.news = response.data;
                this.news.sort(function(a, b){
                    return new Date(b.date) - new Date(a.date);
                });
                this.sites = [...new Set(response.data.map(n => n.site))]
            })
        },

        // Обновить новости в бд
        updateData: function () {
            document.getElementById('btnUpdate').hidden = true;
            document.getElementById('progressBar').hidden = false;
            axios.get(this.urls.updateData).then(() => {
                this.getData();
                window.location.reload();
            });
        },

        // Фильтрация новостей по сайту
        changeSiteNews: function (s = '') {
            let el = document.getElementById('dropdownMenu');

            axios.get(this.urls.getAllNews).then((response) => {
                if (s !== '') {
                    this.news = response.data.filter(n => n.site === s);
                    el.textContent = s.replace('https://', '')
                } else {
                    this.news = response.data;
                    el.textContent = 'Выберите сайт'
                }
                this.sites = [...new Set(response.data.map(n => n.site))];
            })
        },

        // Удалить новость
        deleteNews: function (id) {
            axios.delete(this.urls.deleteNews + id)
                .then(response => {
                    if (response.status === 200) {
                        this.news = this.news.filter(n => n.id != id);
                    }
                })
                .catch(error => console.log("Ошибка при удалении новости с id " + id))
        },

        getDate: function (date) {

            return date.toLocaleDateString('ru-RU', this.dateOptions);
        }
    }
});