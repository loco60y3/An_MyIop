const {Query,User} = AV;
AV.init({
    appId: "4qphEbdYVV88T6rJx7v5xyHV-gzGzoHsz",
    appKey: "zIzXzLavNZo5xuAyUSaKqUyM",
    serverURL: "https://4qphebdy.lc-cn-n1-shared.com"
  });
console.log(Query);
let textTEST = document.getElementById("text")
console.log(textTEST);
let queryAll = new AV.Query('TestDome');	// Data为Class名
queryAll.find().then((rows) => {
    console.log(rows);
  // rows是所有对象的数组
  let {attributes} = rows[0]
  textTEST.value = attributes.Text
  console.log(textTEST);
console.log(attributes);
});



