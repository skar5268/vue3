export default {
  template: `<div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-header modal-danger">
        <h5 class="modal-title">刪除商品</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>是否要刪除 {{ newProduct.title }} 商品</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
          @click.prevent="delProduct()">確認刪除</button>
      </div>
    </div>
  </div>
</div>`,

  props: ['newProduct', 'modalTitle', 'products'],

  methods: {
    delProduct() {
      const apiPath = "skar5268";
      const baseUrl = "https://vue-course-api.hexschool.io/api";
      const url = `${baseUrl}/${apiPath}/admin/product/${this.newProduct.id}`;
      axios.delete(url)
        .then(res => {
          if (!res.data.success) return;
          this.$emit('update');
        })
        .catch(err => {
          console.log(err);
        })
    },
  }
}