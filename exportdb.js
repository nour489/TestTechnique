const Models=require("./models/");
let keyss=Object.keys(Models)
const { exec } = require("child_process");


for (const key in keyss){
  exec("mongodump --db test --collection "+keyss[key].toLowerCase()+"s", (error, stdout, stderr) => {

  });
}
console.log("\n 💚 database exported in : 💚");
console.log('\n \x1b[36m%s\x1b[0m',__dirname+'\n');
return true
