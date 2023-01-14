'use strict';

/**
 * task controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task',() => ({
  async create(ctx) {
    const task = ctx
    task.request.body.data.user = ctx.state.user.id

    const response = await super.create(task);

    return response;
  },

  async find(ctx) {
    // some logic here

    let {data, meta} = await super.find(ctx);

    // some more logic

    // console.log('Data',data)

    let filteredData = data.filter((el) => {
      if (el.attributes.user.data) {
        if (el.attributes.user.data.id === ctx.state.user.id) {
          return true
        }
      }
    })

    // console.log('Filtered data',filteredData)
    data = filteredData

    return {data, meta};
  },

}));
