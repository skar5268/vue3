export default {
  template: `<div class="modal-dialog modal-md  modal-dialog-centered">
  <div class="modal-content border-0">
    <div class="modal-header bg-danger py-2">
      <h5 class="modal-title fw-bold text-light">{{ modalTitle }}</h5>
      <button type="button" class="btn text-light" data-bs-dismiss="modal" aria-label="Close">
        <span class="material-icons-round lh-base">close</span>
      </button>
    </div>
    <div class="modal-body py-4">
      <p>確定要刪除 <span class="fw-bold text-danger"> {{ title }} </span> 商品嗎？</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn border-primary" data-bs-dismiss="modal">取消</button>
      <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
        @click.prevent="delProduct">確認刪除</button>
    </div>
  </div>
</div>
</div>`,

  props: ['newProduct', 'modalTitle', 'products', 'title'],

  methods: {
    delProduct() {
      const apiPath = "skar5268";
      const baseUrl = "https://vue-course-api.hexschool.io/api";
      let url;

      if (location.href == "http://127.0.0.1:5500/html/shopping.html") {
        url = `${baseUrl}/${apiPath}/cart/${this.newProduct.id}`;
      } else {
        url = `${baseUrl}/${apiPath}/admin/product/${this.newProduct.id}`;
      }
      axios.delete(url)
        .then(res => {
          if (!res.data.success) {
            this.$emit('getError', 'error', 0, res.data.message);
            return;
          }
          this.$emit('update', 'success', 0, res.data.message);
          // console.log(res)
        })
        .catch(err => {
          this.$emit('getError', 'error', 0, err.message);
          // console.log(err)
        })
    },
  }
}