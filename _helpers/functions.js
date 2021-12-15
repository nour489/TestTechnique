
let helper={};


helper.cloneObject=function (obj){
  let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in obj) {
  clone[key] = obj[key];
}
return clone;
}








module.exports = helper;
