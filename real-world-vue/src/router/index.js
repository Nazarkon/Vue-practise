import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "@/views/EventCreate.vue";
import EventList from "@/views/EventList.vue";
import EventShow from "@/views/EventShow.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "event-list",
    component: EventList
  },
  {
    path: "/event",
    name: "event-show",
    component: EventShow
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  }
  // {
  //   path: "/about",
  //   redirect: {
  //     name: "about"
  //   }
  // }
];

const router = new VueRouter({
  routes
});
// eslint-disable-next-line
export default router;