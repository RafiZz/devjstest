export default url => ({
  getItems: {
    method: 'get',
    url: `/${url}`
  },
  getItem: id => ({
    method: 'get',
    url: `/${url}/${id}`
  }),
  createItem: data => ({
    method: 'post',
    url: `/${url}`,
    data
  }),
  editItem: (id, data) => ({
    method: 'put',
    url: `/${url}/${id}`,
    data
  }),
  deleteItem: id => ({
    method: 'delete',
    url: `/${url}/${id}`
  })
});
