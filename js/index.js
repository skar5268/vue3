// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';


const app = Vue.createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        }
    },
    created() {
        let token = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (token !== '') window.location = './html/product.html';
    },
    methods: {
        login() {
            const api = 'https://dev-vue-course-api.hexschool.io/admin/signin';

            axios.post(api, this.user)
                .then((res) => {
                    if (res.data.success) {
                        const { token, expired } = res.data;
                        document.cookie = ` user=${token}; expires=${new Date(expired)};`;
                        window.location = './html/product.html'
                    }
                    else {
                        console.log(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },

})

app.mount('#app');