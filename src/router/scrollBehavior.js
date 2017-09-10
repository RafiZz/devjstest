export default (to, from, savedPosition) => {
  let position = {};
  if (savedPosition) {
    position = savedPosition;
  } else {
    if (to.hash) {
      position.selector = to.hash;
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 };
      }
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
    }
  }
  return position;
};
