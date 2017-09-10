export default url => ({
  getAll: {
    method: 'get',
    url: `/${url}`
  },
  get: id => ({
    method: 'get',
    url: `/${url}/${id}`
  }),
  create: data => ({
    method: 'post',
    url: `/${url}`,
    data
  }),
  update: (id, data) => ({
    method: 'put',
    url: `/${url}/${id}`,
    data
  }),
  delete: id => ({
    method: 'delete',
    url: `/${url}/${id}`
  })
});

// @TODO:
// Nested ApiCases generator function

// const reg = new RegExp(/(\/){2,}/g);

// const joinURLs = URLs => {
//   const joinedURLs = ['/', ...URLs].join('/');
//   return joinedURLs.replace(reg, '/');
// };

// export default (...URLs) => ({
//   getItems: url => ({
//     method: 'get',
//     url: joinURLs([...URLs, url])
//   }),
//   getItem: id => ({
//     method: 'get',
//     url: joinURLs([...URLs, id])
//   }),
//   createItem: data => ({
//     method: 'post',
//     url: joinURLs(URLs),
//     data
//   }),
//   editItem: (id, data) => ({
//     method: 'put',
//     url: joinURLs([...URLs, id]),
//     data
//   }),
//   deleteItem: id => ({
//     method: 'delete',
//     url: joinURLs([...URLs, id])
//   })
// });
