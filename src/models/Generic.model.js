import transaction from "../databases/mongo/connexion.js";

class Generic {
  /**
   *
   * @param {Object} fields
   * @param {mongoose.Model} model
   * @returns
   */
  static create(fields, model) {
    return transaction(async (connection) => {
      return await model
        .create(fields)
        .then(async (u) => {
          console.log(u, 'Le user')
          return await u.save();
        })
        .catch((err) => {
          throw "Duplicate or wrong existing data";
        });
    });
  }

  /**
   *
   * @param {String|Array} id
   * @param {mongoose.Model} model
   */
  static delete(ids, model) {
    if (ids instanceof String) {
      ids = [ids];
    }

    return transaction(async (connection) => {
      return model.deleteOne({ _id: { $in: ids } }).catch((err) => {
        throw "The requested ids cannot be find or can't be deleted";
      });
    });
  }

  /**
   *
   * @param {Object} critera
   * @param {Object} values
   * @param {mongoose.Model} model
   */
  static modify(critera, values, model) {
    return transaction(async (connection) => {
      return model.updateOne(critera, values);
    });
  }

  static findOneBy(critera, model) {
    return transaction(async (connection) => {
      return model.findOne(critera);
    });
  }

  /**
   *
   * @param {Object} critera
   * @param {mongoose.Model} model
   * @returns
   */
  static read(critera, viewFields, model) {
    return transaction( (connection) => {
      return model.find(critera, viewFields).exec();
    });
  }
}

export default Generic;
