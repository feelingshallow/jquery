window.addEventListener('load',function () {
    let content=document.querySelectorAll('.content li')
    let messagebox=document.querySelector('.message')
    let prev=0;
    let type='all';
    localStorage.clear();

    //    创建数组 用来添加项目
    let todolist=[
         { id: 1, content:'交作业',ctime:'2019/6/4',status:false},
         { id: 2, content:'交了作业',ctime:'2019/6/10',status:true},
         { id: 3, content:'bu交作业',ctime:'2019/6/10',status:true},
         { id: 4, content:'bu交作业',ctime:'2019/6/4',status:false},
    ]
    // local storage
          let str=localStorage.getItem('todolist')
        console.log(str);
    if (!str){
              saveData();
            str = localStorage.getItem("todolist");
          }
       todolist=JSON.parse(str);


    //遍历选择按钮 添加类
         content.forEach(function (ele,index) {
             ele.onclick=function () {
                 content[prev].classList.remove('hot');
                 this.classList.add('hot');
                 prev=index;
                type=this.getAttribute('type');
                 saveData();
                 render(filterdata(type))
             }

         });
    content[0].onclick()   //先调用一下

    //  封装一个函数用来对type渲染的数组进行选择
     function filterdata(type){
         let arr=[];
         switch (type) {
             case 'all':
                 arr=todolist;
                 break;
             case 'done':
                 arr=todolist.filter(ele=> ele.status);
                 break;
             case "doing":
                 arr=todolist.filter(ele=> !ele.status);
                 break;
         }
             return arr
     }


    // 创建函数用于向数组写入新东西
    function add() {
        let id =''
        if (todolist.length) {
            id = todolist[todolist.length - 1].id + 1;
        }else if (!todolist.length){
            id = 0;
        }
        let content=text1.value;
        let ctime=Array.of(new Date().toLocaleDateString());
        let status=false;
        return{id,content,ctime,status}
    }
     //给列表添加内容（即向数组写入内容）
    let forms= document.forms[0]
    let text1=forms.elements[0]
    let but=forms.elements[1]
    but.onclick=function (e) {
        e.preventDefault()
        let obj=add();
        todolist.push(obj)
        forms.reset();
        saveData();
        render(filterdata(type))
    };

    //     用来存储本地信息
    function saveData() {
        localStorage.setItem("todolist",JSON.stringify(todolist));
    }

     // 创建一个函数用来渲染内容效果
         function render(arr) {

        let html=''
        arr.forEach(function (elem) {
            if (elem.status){
                html+=`
             <li id="${elem.id}"><input type="checkbox" checked>${elem.content} <del>X</del> <time>${elem.ctime}</time>  </li>
            `;
            } else {
                html+=`
             <li id="${elem.id}"><input type="checkbox" >${elem.content}  <del>X</del> <time>${elem.ctime}</time></li>
            `
            }

        })
             messagebox.innerHTML=html
    }

     //  列表的内容 点击事件
      messagebox.onclick=function (e) {

        let  target=e.target;
         let parent=target.parentNode;
          let id=parent.id;
          if (target.nodeName==='INPUT'){
          let arr=todolist.filter(ele=>ele.id==id)[0];
              if(!arr.status) {
                  arr.status = true;
              }
              else if(arr.status){
                  arr.status =false;
              }
              saveData();
          } else if (target.nodeName==='DEL') {
           todolist=todolist.filter(ele=>ele.id !=id);
              saveData();
          }
          render(filterdata(type));
      }




});
