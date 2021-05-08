export default {
  template: `<div class="modal-dialog modal-lg  modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary py-2">
          <h5 class="modal-title fw-bold text-light">{{ modalTitle }}</h5>
          <button type="button" class="btn text-light"  data-bs-dismiss="modal" aria-label="Close">
           <span class="material-icons-round lh-base">close</span>
          </button>
        </div>
        <div class="modal-body py-4">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="mb-4">
                  <label for="newImgUrl" class="form-label d-block">輸入圖片網址</label>
                  <input type="text" class="form-control" id="newImgUrl" placeholder="圖片網址" :value="newProduct.image"
                    v-model.lazy.trim="newProduct.image">
                </div>
                <img :src="newProduct.image" :alt="newProduct.title" class="img-fluid rounded mb-4"
                  :title="newProduct.title">
              </div>
              <div class="col-12 col-md-8">
                <div class="row mb-2">
                  <div class="col-12  mb-2">
                    <label for="newTitle" class="form-label d-block">商品名稱</label>
                    <input type="text" class="form-control" id="newTitle" placeholder="商品名稱"
                      v-model.lazy.trim="newProduct.title" :value="newProduct.title">
                  </div>
                  <div class="col-12 col-md-4  mb-2">
                    <label for="newCategory" class="form-label d-block">分類</label>
                    <input type="text" class="form-control" id="newCategory" placeholder="商品類別"
                      v-model.lazy.trim="newProduct.category" :value="newProduct.category">
                  </div>
                  <div class="col-12 col-md-4  mb-2">
                    <label for="newNum" class="form-label d-block">數量</label>
                    <input type="number" class="form-control" id="newNum" placeholder="10"
                      v-model.number.lazy.trim="newProduct.num" :value="newProduct.num">
                  </div>
                  <div class="col-12 col-md-4  mb-2">
                    <label for="newUnit" class="form-label d-block">單位</label>
                    <input type="text" class="form-control" id="newUnit" placeholder="台"
                      v-model.lazy.trim="newProduct.unit" :value="newProduct.unit">
                  </div>
                  <div class="col-12 col-md-6  mb-2">
                    <label for="newOrigin_price" class="form-label d-block">原價</label>
                    <input type="number" class="form-control" id="newOrigin_price" placeholder="20000"
                      v-model.number.lazy.trim="newProduct.origin_price" :value="newProduct.origin_price">
                  </div>
                  <div class="col-12 col-md-6  mb-3">
                    <label for="newPrice" class="form-label d-block">售價</label>
                    <input type="number" class="form-control" id="newPrice" placeholder="20000"
                      v-model.number.lazy.trim="newProduct.price" :value="newProduct.price">
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="is_enabledCheck"
                        v-model.lazy.trim="newProduct.is_enabled" :value="newProduct.is_enabled">
                      <label class="form-check-label  d-block" for="is_enabledCheck">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn border-primary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
            @click.prevent="updateProduct(modalTitle=='新增商品'? 'add':'edit', newProduct.id)">確認</button>
        </div>
      </div>
    </div>`,

  props: ['newProduct', 'modalTitle', 'products'],

  methods: {
    updateProduct(update) {
      const apiPath = "skar5268";
      const baseUrl = "https://vue-course-api.hexschool.io/api";
      let url = `${baseUrl}/${apiPath}/admin/product`;
      let data = {};
      switch (update) {
        case 'add':
          this.newProduct.id = Date.now();
          data = { data: this.newProduct };
          axios.post(url, data)
            .then(res => {
              if (!res.data.success) return;
              this.$emit('update', 'success', 0, res.data.message);
            })
            .catch(err => {
              this.$emit('getError', 'error', 0, err.message);
            })

          break;

        case 'edit':
          url = `${baseUrl}/${apiPath}/admin/product/${this.newProduct.id}`;
          data = { data: this.newProduct };

          axios.put(url, { data: this.newProduct })
            .then(res => {
              if (!res.data.success) return;
              this.$emit('update', 'success', 0, res.data.message);
            })
            .catch(err => {
              this.$emit('getError', 'error', 0, err.message);
            })

          break;

        default:
          break;
      }
    }
  }
}