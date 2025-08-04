export const crudRepository = (model) => {
  return {
    create: async (data) => {
      const newDoc = await model.create(data);
      return newDoc;
    },
    getAll: async () => {
      const allDoc = await model.find();
      return allDoc;
    },
    getById: async (id) => {
      const doc = await model.findById(id);
      return doc;
    },
    delete: async (id) => {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    update: async (id, data) => {
      const updatedDoc = await model.findByIdAndUpdate(id, data, { new: true });
      return updatedDoc;
    },
    deleteMany:async(modelsIds)=>{
      const response=await model.deleteMany({
        _id:{
          $in:modelsIds
        }
      })
      return response
    }
  };
};
