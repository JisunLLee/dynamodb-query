const Path = process.cwd();
const Query = require(Path + '/query.js');

data = Query.basic.updateTransact("UserId","NaYaNa", {
  ":EmailSubscribe": true,
  ":EmailSubStateChangeTime": Date.now()
});


scanFilterData = Query.basic.scanFilter('TableNAME!',{
  ":EmailSubscribe": true,
  ":EmailSubStateChangeTime": Date.now()
});

scanFilterData = Query.basic.scanFilterExpression('TableNAME!',{
  ":EmailSubscribe": true,
  ":EmailSubStateChangeTime": Date.now()
});

console.log(data);
console.log(scanFilterData);