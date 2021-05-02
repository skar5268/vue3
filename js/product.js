import pageNumRender from '../js/components/pagination.js';

const apiPath = "skar5268";
const baseUrl = "https://vue-course-api.hexschool.io/api";

let productModal = null;
let delProductModal = null;

const app = Vue.createApp({
  data() {
    return {
      currentPage: 1,
      newData: [],
      pageTotal: 0,
      text: '',
      imgUrl: 'https://images.unsplash.com/photo-1605784401368-5af1d9d6c4dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      modalTitle: "",
      newProduct: {
        id: 0,
        title: "",
        category: "",
        image: "",
        is_enabled: false,
        origin_price: 0,
        price: 0,
        num: 0,
        unit: "",
      },
      products: []
    }
  },

  mounted() {
    productModal = new bootstrap.Modal(this.$refs.productModal);
    delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
  },

  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (token === '') {
      window.location = 'index.html';
    }

    axios.defaults.headers.common.Authorization = token;

    const url = `${baseUrl}/${apiPath}/products`;
    axios.get(url).then(res => {
      this.products = res.data.products;
      // console.log(this.products)

      const pageNum = this.products.length;

      const pageDataNum = 2;

      this.pageTotal = Math.ceil(pageNum / pageDataNum)

      const minData = (this.currentPage * pageDataNum) - pageDataNum + 1
      const maxData = (this.currentPage * pageDataNum)

      this.products.forEach((item, arr) => {
        const num = arr + 1;
        if (num >= minData && num <= maxData) {
          this.newData.push(item)
        }

      })
      // console.log(this.currentPage)
    });
  },

  components: {
    pageNumRender
  },

  methods: {
    changeEnabled(key) {
      this.products[key].is_enabled = !this.products[key].is_enabled;
    },

    openModal(isNew, key) {
      switch (isNew) {
        case 'new':
          this.modalTitle = "新增商品";
          this.newProduct = {};
          productModal.show()
          break;

        case 'edit':
          this.modalTitle = "編輯商品"
          this.products.forEach((item, arr) => {
            if (item.id == key) {
              this.newProduct = this.products[arr];
              this.newProduct.id = this.products[arr].id;
            }
          })
          productModal.show();
          break;

        case 'delete':
          this.products.forEach((item, arr) => {
            if (item.id == key) this.newProduct = this.products[arr];
          })
          delProductModal.show();
          break;

        default:
          break;
      }
    },
    updateProduct(update, id) {
      switch (update) {
        case 'add':
          console.log(123)
          this.newProduct.id = new Date();

          const data = {
            data: this.newProduct
          }

          const url = `${baseUrl}/${apiPath}/admin/product`
          axios.post(url, data)
            .then((res) => {
              if ( !res.data.success ) return;
              // console.log(res)

              this.products.unshift(this.newProduct)
              const pageNum = this.products.length;

              const pageDataNum = 2;

              this.pageTotal = Math.ceil(pageNum / pageDataNum)

              const minData = (this.currentPage * pageDataNum) - pageDataNum + 1
              const maxData = (this.currentPage * pageDataNum)

              this.newData = []
              this.products.forEach((item, arr) => {
                const num = arr + 1;
                if (num >= minData && num <= maxData) this.newData.push(item)
              })
            })
            .catch((err) => {
              console.log(err)
            })
          break;

        case 'edit':
          this.products.forEach((item, arr) => {
            if (item.id == id) {
              this.newProduct = this.products[arr];
              const url = `${baseUrl}/${apiPath}/admin/product/${this.newProduct.id}`;

              axios.put(url, { data: this.newProduct })
                .then((res) => {
                  if (!res.data.success) return;
                  console.log(res)
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          })
          break;

        default:
          break;
      }
    },
    delProduct(id) {

      const url = `${baseUrl}/${apiPath}/admin/product/${this.newProduct.id}`;
      axios.delete(url)
        .then((res) => {
          if (!res.data.success) return;
          // console.log(res)

          this.products.forEach((item, arr) => {
            if (item.id == id) this.products.splice(arr, 1);
          })

          const pageNum = this.products.length;

          const pageDataNum = 2;

          this.pageTotal = Math.ceil(pageNum / pageDataNum)

          const minData = (this.currentPage * pageDataNum) - pageDataNum + 1
          const maxData = (this.currentPage * pageDataNum)

          this.newData = []
          this.products.forEach((item, arr) => {
            const num = arr + 1;
            if (num >= minData && num <= maxData) this.newData.push(item)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },

    pagination(key) {

      const pageDataNum = 2;

      if (key == -1) this.currentPage += 1
      else if (key == -2) this.currentPage -= 1
      else this.currentPage = key + 1;

      const minData = (this.currentPage * pageDataNum) - pageDataNum + 1
      const maxData = (this.currentPage * pageDataNum)

      this.newData = []

      this.products.forEach((item, arr) => {
        const num = arr + 1;
        if (num >= minData && num <= maxData) this.newData.push(item);
      })
      // console.log(this.newData)
    },

  },

})

// app.component('pagination', {

//   // template: `<img :src="url" class="img-thumbnail" alt><br>
//   // <input type="text" v-model="url"> {{ url }}`
// })

// app.component('edit-product', {
//   methods: {
//     // // 2. 定義內層的 $emit 觸發方法
//     click() {
//       this.$emit('edit')
//       // 將內層的事件往外傳
//     },
//   },
//   template: `<button class="btn btn-primary mb-2 mb-md-0" @click.prevent="click">編輯</button>
// `
// });



// app.component('edit-product', {
//   methods: {
//     // // 2. 定義內層的 $emit 觸發方法
//     click() {
//       this.$emit('edit')
//       // 將內層的事件往外傳
//     },
//   },
//   template: `<button class="btn btn-primary mb-2 mb-md-0" @click.prevent="click">編輯</button>
// `
// });


// <a class="page-link" href="#" @click.prevent="click" > {{ item }}</a>
// <button class="btn btn-primary mb-2 mb-md-0" @click.prevent="openModal('edit', item.id)">編輯</button>
app.mount('#app');