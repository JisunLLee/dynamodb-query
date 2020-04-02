const Path = process.cwd();

const Database = {
  user 				: `user`,
  userDetail 				: `userDetail`,
  userLog		 : `public-userLog`
};

module.exports = {
  basic : {
    TransactItems(_items) {
      let TransactItems = [];
      _items.forEach(function (item) {
        TransactItems.push(item);
      });
      return {TransactItems: TransactItems};
    },

    put(_item){
      return{
        TableName: Database.userLog,
        Item: _item,
        ReturnValues: "ALL_OLD"
      }
    },
    updateTransact(keyName, key, value_){
      let updateExpression = 'set';
      const updateData = Object.keys(value_);
      for (let i = 0; i < updateData.length; i++) {
        updateExpression = `${updateExpression} ${updateData[i].replace(":","")} = ${updateData[i]}`;
        if (i !== updateData.length-1)       updateExpression = `${updateExpression},`;
      }

      let query = {
        TableName: Database.userDetail,
        Key: {},
        UpdateExpression: updateExpression,
        ExpressionAttributeValues : value_,
        ReturnValues: 'ALL_NEW'
      };
      query.Key[keyName] = key;
      return query
    },

  }


};