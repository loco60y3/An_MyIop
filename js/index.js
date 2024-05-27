const { Query, User } = AV;
AV.init({
    appId: "4qphEbdYVV88T6rJx7v5xyHV-gzGzoHsz",
    appKey: "zIzXzLavNZo5xuAyUSaKqUyM",
    serverURL: "https://4qphebdy.lc-cn-n1-shared.com"
});

const textTEST = document.getElementById("text");
const commentList = document.getElementById("comment");

let testDomeQuery = new AV.Query('TestDome'); // 修正变量名为testDomeQuery

// 查询操作
testDomeQuery.find().then((rows) => {
    for (var i = 0; i < rows.length; i++) {
        let { attributes } = rows[i];
        let li = document.createElement('li');
        li.textContent = attributes.Text;
        if (commentList.firstChild) {
            commentList.insertBefore(li, commentList.firstChild);
        } else {
            commentList.appendChild(li);
        }
    }
}).catch(error => {
    console.error('查询失败：', error);
});

function setHigh() {
    const TestDome = AV.Object.extend("TestDome");
    let newComms = new TestDome();
    if (textTEST.value.length > 0) {
        newComms.set("Text", textTEST.value);
        newComms.save().then((comm) => {
            console.log("保存成功", comm);
            let li = document.createElement('li');
            li.textContent = textTEST.value;
            commentList.insertBefore(li, commentList.firstChild);
        }, (error) => {
            console.log(error);
        });
    }
}
// 错误处理也是好的做法  
testDomeQuery.find().catch(error => {
    console.error('查询失败：', error);
});