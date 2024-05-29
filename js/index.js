const { Query, User } = AV;
AV.init({
    appId: "4qphEbdYVV88T6rJx7v5xyHV-gzGzoHsz",
    appKey: "zIzXzLavNZo5xuAyUSaKqUyM",
    serverURL: "https://4qphebdy.lc-cn-n1-shared.com"
});

const textTEST = document.getElementById("text");
const commentList = document.getElementById("comment");

let testDomeQuery = new AV.Query('TestDome'); 

// 查询操作
testDomeQuery.find().then((rows) => {
	console.log(rows)
    for (var i = 0; i < rows.length; i++) {
        let { attributes } = rows[i];
        let li = document.createElement('li');
		li.classList.add("commlist")
        // li.textContent = attributes.Text;
        // console.log(li);
        li.innerHTML += `${attributes.Text} 	---   <a class="del" id="${rows[i].id}">删除</a>`

        if (commentList.firstChild) {
            commentList.insertBefore(li, commentList.firstChild);
        } else {
            commentList.appendChild(li);
        }
    }
	
	//添加删除操作
	delrow()
	
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
            // textTEST.value = ``;
            let li = document.createElement('li');
            // li.textContent = textTEST.value;
			li.innerHTML += `${textTEST.value} 	---   <a class="del" id="${comm.id}">删除</a>`
			
            // li.innerHtml =`${textTEST.value}`
            commentList.insertBefore(li, commentList.firstChild);
			delrow()
        }, (error) => {
            console.log(error);
        });
    }
}

function delrow(){
	let dels = document.querySelectorAll(".del")
	dels.forEach((i)=>{
		i.addEventListener("click",function(){
			console.log("删除id为",i.id)
			const TestDome = AV.Object.createWithoutData("TestDome", i.id);
			
			TestDome.destroy().then((i)=>{
				console.log("删除成功",i)
			// 	console.log(this.parenNode)
			this.parentNode.remove();
			});
		})
	})
}

function refto(){
    location.reload()
}
// 错误处理也是好的做法  
testDomeQuery.find().catch(error => {
    console.error('查询失败：', error);
});
