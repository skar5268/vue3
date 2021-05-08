export default {

  props: ['totalPage', 'functionpage', 'currentPage'],

  template: `<nav aria-label="page-navigation">
  <ul class="pagination  justify-content-center">
    <li class="page-item" :class="{disabled: currentPage-1 == 0}">
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(currentPage-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <template v-for="(item, key) in totalPage" :key="key">
      <li class="page-item" aria-current="page" :class="{active: currentPage==item}">
        <a class="page-link" href="#" @click.prevent="updatePage">{{ item }}</a>
      </li>
    </template>
    <li class="page-item" :class="{disabled: currentPage == totalPage}">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(currentPage+1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,

  methods: {
    updatePage(num) {
      this.$emit('update', num);
    }
  }
}