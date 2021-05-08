import pageNavigation from './components/pageNavigation.js';
import editModal from './components/editModal.js';
import delModal from './components/delModal.js';

const apiPath = "skar5268";
const baseUrl = "https://vue-course-api.hexschool.io/api";

const token = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");

let productModal = null;
let delProductModal = null;

const app = Vue.createApp({
  data() {
    return {
      modalTitle: "",
      newProduct: {},
      products: [],
      pagination: {},
    }
  },

  mounted() {
    productModal = new bootstrap.Modal(this.$refs.productModal);
    delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
  },

  created() {
    if (token === '') window.location = '../index.html';
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
          console.log(err);
        })
    },

    logOut() {
      const url = 'https://dev-vue-course-api.hexschool.io/logout';

      axios.post(url)
        .then(res => {
          if (res.data.success) {
            document.cookie = 'user=; expires=; path=/';
            window.location = '../index.html';
          }
          else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    changeEnabled(arr) {

      this.newProduct = { ...this.products[arr] };

      const url = `${baseUrl}/${apiPath}/admin/product/${this.newProduct.id}`;

      this.newProduct.is_enabled = !this.newProduct.is_enabled;

      axios.put(url, { data: this.newProduct })
        .then(res => {
          if (!res.data.success) return;
          this.getData();
        })
        .catch(err => {
          console.log(err);
        })
    },

    openModal(isNew, arr) {
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
          this.newProduct = { ...this.products[arr] };
          delProductModal.show();
          break;

        default:
          break;
      }
    },
  },
})


app.mount('#app');