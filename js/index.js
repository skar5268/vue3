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
    methods: {
        login() {
            const api = 'https://dev-vue-course-api.hexschool.io/admin/signin';

            axios.post(api, this.user)
                .then((res) => {
                    if (res.data.success) {
                        // console.log(res.data.message);
                        const { token, expired } = res.data;

                        document.cookie = ` user = ${token}; 
                        expires = ${new Date(expired)};
                        path = / `;

                        window.location = '../vue3/html/product.html'
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