const knex = require('knex');
const logger = require('../../middlewares/logger');

module.exports = class Container {
  constructor(config, tableName) {
    this.tableName = tableName;
    this.knex = knex(config);
  }

  async getAll() {
    try {
      const records = await this.knex.from(this.tableName).select('*');
      // .select('id', 'title', 'price', 'thumbnail');
      return records;
    } catch (error) {
      // console.log(error);
      logger.error(error);
    }
  }

  async save(items) {
    try {
      await this.knex(this.tableName).insert(items);
      console.log('Items saved successfully.');
    } catch (error) {
      // console.log(error);
      logger.error(error);
    }
  }

  //   async getById(id) {
  //     try {
  //       const file = await this.getFile();
  //       const array = file.filter((product) => product.id === +id);
  //       if (array.length === 0) {
  //         return false;
  //       } else {
  //         return array[0];
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //
  //   async deleteById(id) {
  //     try {
  //       const file = await this.getFile();
  //       const filteredArray = file.filter((product) => product.id !== +id);
  //       if (filteredArray.length === file.length) {
  //         return { error: 'producto no encontrado' };
  //       } else {
  //         await fs.writeFile(
  //           `./${this.name}`,
  //           JSON.stringify(filteredArray, null, 2)
  //         );
  //         return;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //
  //   async deleteAll() {
  //     try {
  //       const empty = [];
  //       await fs.writeFile(`./${this.name}`, JSON.stringify(empty));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async disconnect() {
    this.knex.destroy();
  }
};
