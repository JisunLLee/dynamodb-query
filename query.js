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
    query(_item){
      //한개의 아이템만 리턴될 때
      return {TableName : "TableName",
        Key : _item   // {key : value}
      }
    },
    query_itmes(_item1, _item2){
      //한개 이상의 아이템이 리턴 될
      return {TableName : "TableName",
        KeyConditionExpression: "BracketId = :BracketId",
        ExpressionAttributeValues: _item2 // ":key" : "value"
      }
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
    scanFilter(tableName, _value){
      let FilterExpression = '';
      const filterData = Object.keys(_value);
      for (let i = 0; i < filterData.length; i++) {
        FilterExpression = `${FilterExpression} ${filterData[i].replace(":","")} = ${filterData[i]}`;
        if (i !== filterData.length-1)       FilterExpression = `${FilterExpression} and `;
      }
      return{
        TableName: tableName,
        FilterExpression: FilterExpression,
        ExpressionAttributeValues:_value
      }
    }
  }


};