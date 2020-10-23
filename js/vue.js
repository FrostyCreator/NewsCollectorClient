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
        sites: []
    },
    methods: {
        // Получить новости из бд
        getData: function () {
            axios.get(this.urls.getAllNews).then((response) => {
                this.news = response.data;
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
            el = document.getElementById('dropdownMenu');

            axios.get(this.urls.getAllNews).then((response) => {
                if (s != '') {
                    this.news = response.data.filter(n => n.site == s);
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
            this.news = this.news.filter(n => n.id != id);
            axios.post(this.urls.deleteNews + id);
        }

    }
});