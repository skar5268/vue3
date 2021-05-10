export default {
    template: '#productDetailModal',
    props: ['newProduct', 'qty', 'modalTitle'],
    data() {
        return {
            modal: null,
            qty: 1,
        }
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal);
    },
    methods: {
        addCartModal(item) {
            this.$emit('add', item, this.qty);
            this.hideModal()
        },
        openModal() {
            this.qty = 1;
            this.modal.show();
        },
        hideModal() {
            this.modal.hide();
        },
    }
}