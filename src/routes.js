import PageContent from './PageContent.vue'
import Orders from './Orders.vue'
import Modify from './Modify.vue'
import Dashboard from './Dashboard.vue'

export default [
    { path: '/', component: PageContent },
    { path: '/orders', component: Orders, name: "Orders" },
    { path: '/modify', component: Modify, name: "Modify", props: true },
    { path: '/dashboard', component: Dashboard}
  ]