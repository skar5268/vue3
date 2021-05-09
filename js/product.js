import pageNavigation from './components/pageNavigation.js';
import editModal from './components/editModal.js';
import delModal from './components/delModal.js';

const apiPath = "skar5268";
const baseUrl = "https://vue-course-api.hexschool.io/api";

const token = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");

let productModal = null;
let delProductModal = null;
let errorAlertModal = null;
let successAlertModal = null;
let signOutModal = null;

const app = Vue.createApp({
  data() {
    return {
      modalTitle: "",
      alertMessage: "",
      newProduct: {},
      products: [],
      pagination: {},
    }
  },

  mounted() {
    productModal = new bootstrap.Modal(this.$refs.productModal);
    delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
    errorAlertModal = new bootstrap.Modal(this.$refs.errorAlertModal);
    successAlertModal = new bootstrap.Modal(this.$refs.successAlertModal, {
      backdrop: 'static',
      keyboard: false
    });
    signOutModal = new bootstrap.Modal(this.$refs.signOutModal, {
      backdrop: 'static',
      keyboard: false
    });
  },

  created() {
    if (token === '') window.location = "../index.html";
    axios.defaults.headers.common.Authorization = token;
    this.getData();
  },

  components: {
    pageNavigation, editModal, delModal
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

    logOut() {
      const url = 'https://dev-vue-course-api.hexschool.io/logout';

      axios.post(url)
        .then(res => {
          if (res.data.success) {
            document.cookie = 'user=; expires=; path=/';
            this.alertMessage = "成功登出"
            signOutModal.show();
          }
          else {
            this.openModal('error', 0, res.data.message);
          }
        })
        .catch(err => {
          this.openModal('error', 0, err.message);
        })
    },

    changeEnabled(arr) {

      this.newProduct = { ...this.products[arr] };

      const url = `${baseUrl}/${apiPath}/admin/product/${this.newProduct.id}`;

      this.newProduct.is_enabled = !this.newProduct.is_enabled;

      axios.put(url, { data: this.newProduct })
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

    openModal(isNew, arr, message) {
      this.alertMessage = message;
      switch (isNew) {
        case 'new':
          this.modalTitle = "新增商品";
          this.newProduct = {};
          productModal.show();
          break;

        case 'edit':
          this.modalTitle = "編輯商品"
          this.newProduct = { ...this.products[arr] };
          productModal.show();
          break;

        case 'delete':
          this.modalTitle = "刪除商品"
          this.newProduct = { ...this.products[arr] };
          delProductModal.show();
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
  },
})

app.mount('#app');