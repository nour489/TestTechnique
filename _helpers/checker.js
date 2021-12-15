let checker={};



/**

* checkParam function :
 - returns false when the paramater is valid
 - returns a string error when the paramater is not valid
* The function paramaters are :
  - required : Boolean
  - param : The value of the paramater
  - type : The type of the paramater
 **/

checker.checkParam=function(required, param, type) {
  if ((required && !param)  ) return param + " is required";
  if ((type) && (typeof param != type)) return param + " should be a " + type;
  return false;
}

module.exports = checker;
