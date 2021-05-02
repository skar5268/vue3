export default {

    props: ['pageTotal', 'functionpage', 'currentPage'],

    template: `
    <template v-if="currentPage > 1">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="functionpage(-2)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  </template>

  <template v-for="(item, key) in pageTotal" :key="key">
    <template v-if="currentPage == item">
      <li class="page-item active" aria-current="page"><a class="page-link" href="#"
          @click.prevent="functionpage(key)">{{ item }}</a></li>
    </template>
    <template v-else>
      <li class="page-item"><a class="page-link" href="#" @click.prevent="functionpage(key)">{{ item }}</a></li>
      <!-- <li class="page-item"><a class="page-link" href="#" @click.prevent="pagination">2</a></li>
    <li class="page-item"><a class="page-link" href="#" @click.prevent="pagination">3</a></li> -->
    </template>
  </template>

  <template v-if="currentPage+1 == pageTotal">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="functionpage(-1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </template>
    `
    
}