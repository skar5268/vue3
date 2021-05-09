import './validation.js';

let errorAlertModal = null;
let successAlertModal = null;

const app = Vue.createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            rememberEmailCheck: false,
        }
    },
    mounted() {
        errorAlertModal = new bootstrap.Modal(this.$refs.errorAlertModal);
        successAlertModal = new bootstrap.Modal(this.$refs.successAlertModal, {
            backdrop: 'static',
            keyboard: false
        });
    },
    created() {
        this.user.username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    },
    components: {
        VForm: VeeValidate.Form,
        VField: VeeValidate.Field,
    },
    methods: {
        login() {
            const api = 'https://dev-vue-course-api.hexschool.io/admin/signin';
            axios.post(api, this.user)
                .then((res) => {
                    if (res.data.success) {
                        document.cookie = this.rememberEmailCheck ? `username=${this.user.username};` : "username=;";
                        const { token, expired } = res.data;
                        document.cookie = ` user=${token}; expires=${new Date(expired)};`;
                        successAlertModal.show();
                    }
                    else {
                        errorAlertModal.show();
                        // console.log(res.data)
                    }
                })
                .catch((err) => {
                    errorAlertModal.show();
                    // console.log(err)
                })
        },
    },

})

app.mount('#app');