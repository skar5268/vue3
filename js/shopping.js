import pageNavigation from './components/pageNavigation.js';
import delModal from './components/delModal.js';
import productDetailModal from './components/productDetailModal.js'
import './validation.js';

let delProductModal = null;
let errorAlertModal = null;
let successAlertModal = null;

const apiPath = "pingu";
const baseUrl = "https://vue-course-api.hexschool.io/api";

const app = Vue.createApp({
    data() {
        return {
            alertMessage: "",
            modalTitle: "",
            newProduct: {},
            newProductTitle: "",
            products: [],
            pagination: {},
            cartData: [],
            finalTotal: 0,
            coupon: "",
            payement: "",
            data: {
                user: {
                    name: "",
                    email: "",
                    tel: "",
                    address: "",
                    payement: ""
                },
                message: ""
            }
        }
    },

    mounted() {
        delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
        errorAlertModal = new bootstrap.Modal(this.$refs.errorAlertModal);
        successAlertModal = new bootstrap.Modal(this.$refs.successAlertModal, {
            backdrop: 'static',
            keyboard: false
        });
    },

    created() {
        this.getData();
        this.getCartData();
    },

    components: {
        pageNavigation,
        delModal,
        productDetailModal,
        VForm: VeeValidate.Form,
        VField: VeeValidate.Field,
        ErrorMessage: VeeValidate.ErrorMessage,
    },

    methods: {
        getData(num = 1) {
            const url = `${baseUrl}/${apiPath}/products?page=${num}`;
            axios.get(url)
                .then(res => {
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch(err => {
                    this.openModal('error', 0, err.message);
                })
        },

        getCartData() {
            const url = `${baseUrl}/${apiPath}/cart`;
            axios.get(url)
                .then(res => {
                    this.cartData = res.data.data.carts;
                    this.finalTotal = res.data.data.final_total
                })
                .catch(err => {
                    this.openModal('error', 0, err.message);
                })
        },

        addCart(item, num = 1) {
            const url = `${baseUrl}/${apiPath}/cart`;
            let product_id = item.id;
            let qty = num;

            const data = {
                data: {
                    product_id, qty
                }
            }

            axios.post(url, data)
                .then(res => {
                    if (!res.data.success) {
                        this.openModal('error', 0, res.data.message);
                        return;
                    }
                    this.openModal('success', 0, res.data.message);
                })
                .catch(err => {
                    this.openModal('error', 0, err.message);
                })
        },

        openModal(modal, item, message) {
            this.alertMessage = message;
            switch (modal) {
                case 'del':
                    this.modalTitle = "移除購物車";
                    this.newProduct = { ...item };
                    this.newProductTitle = this.newProduct.product.title;
                    delProductModal.show();
                    break;

                case 'detail':
                    this.newProduct = { ...item };
                    this.modalTitle = this.newProduct.title;
                    this.$refs.productDetailModal.openModal();
                    break;

                case 'error':
                    errorAlertModal.show();
                    break;

                case 'success':
                    successAlertModal.show();
                    break;

                default:
                    break;
            }
        },

        useCoupon() {
            const url = `${baseUrl}/${apiPath}/coupon`;
            const data = {
                data: {
                    code: this.coupon
                }
            }
            axios.post(url, data)
                .then(res => {
                    console.log(res)
                    if (!res.data.success) {
                        this.openModal('error', 0, res.data.message);
                        return;
                    }
                    this.openModal('success', 0, res.data.message);
                    this.finalTotal = res.data.data.final_total;

                })
                .catch(err => {
                    this.openModal('error', 0, err.message);
                    console.log(err)
                })
        },

        sendOrder() {
            const url = `${baseUrl}/${apiPath}/order`;
            axios.post(url, `{${this.data}}`)
                .then(res => {
                    console.log(res)
                    if (!res.data.success) {
                        this.openModal('error', 0, res.data.message);
                        return;
                    }
                    this.openModal('success', 0, res.data.message);

                })
                .catch(err => {
                    this.openModal('error', 0, err.message);
                    console.log(err)
                })
            console.log(this.data.user)
        },

        isPhone(value) {
            if (value == "") return '收件人電話 為必填'
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '收件人電話 需為正確的電話號碼'
        },
    }
})

app.mount('#app');