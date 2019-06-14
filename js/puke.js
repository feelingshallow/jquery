$(function () {
  let puke=[];
    let colorArr=['s','h','d','c'];
     let flag={};
     for (let i=0;i<52;i++){
         let index=Math.floor(Math.random()*colorArr.length);
         let color=colorArr[index];
         let number=Math.round(Math.random()*12+1);

       while (flag[color+'_'+number]) {
           index=Math.floor(Math.random()*colorArr.length);
            color=colorArr[index];
            number=Math.round(Math.random()*12+1);
     }
        puke.push({color, number});
         flag[color+'_'+number]=true;
     }
//    发牌
    let index=-1;
   for (let i=0;i<7;i++){
       for (let j=0;j<i;j++){
           index++;
           let obj=puke[index];
           let lefts=400-i*50+100*j;
           let tops=50*i;
           $('<div>').addClass('puke').html('')
               .data('number',obj.number)
               .appendTo('.box').css({backgroundImage:`url('./imgs/${obj.number}${obj.color}.jpg')`})
               .delay(index*100)
               .attr('id',i+'_'+j)
               .animate({left:lefts,top:tops,opacity:'1'} )
       }
   }
     //剩余牌放底部
     for (;index<52;index++) {
         let obj=puke[index];
         $('<div>').addClass('puke').html('')
             .attr('id',-2+'_'-2)
             .addClass('left')
             .data('number',obj.number)
             .appendTo('.box').css({backgroundImage:`url('./imgs/${obj.number}${obj.color}.jpg')`})
             .delay(index*10)
             .animate({left:0,top:480,opacity: '1'})
     }

      //选牌
    let frist =null;
      $('.box').on('click','.puke',function () {
        let  _this=$(this);
          let [i,j]=_this.attr('id').split('_');
         let id1=i*1+1+'_'+j;  let id2=i*1+1+'_'+(j*1+1)

        if ($('#'+id1).length||$("#"+id2).length){
            return
        }
          if ($(this).hasClass('active')){
              $(this).removeClass('active').animate({top:'+=20px'})
          }else {
          $(this).addClass('active').animate({top:'-=20px'})

          }
          console.log(_this.data('number'));
          //    判定
          if (!frist){
              frist=_this
          } else {
              let number1=frist.data('number'),number2=$(this).data('number')
             if (number1+number2===14){
             $('.active').animate({right:0,top:0,opacity:0},function () {
                 $(this).remove()
             })
             }else {
            $('.active').animate({top:'+=20'},function () {
                     $(this).removeClass('active')
                 })
             }
              frist=null;
          }
          
      })
  let n=0;
      $('#1').on('click',function () {

          $('.left:last').css({zIndex:n++}).animate({left:650,bottom:100},function () {
              $(this).removeClass('left').addClass('right')
          })
          $('.left:eq(0)').css({zIndex:n++}).animate({left:520,bottom:100},function () {
              $(this).removeClass('left').addClass('right')
          })

      });
      $('#2').on('click',function () {
          $('.right:first').css({zIndex:n++}).animate({left:0,bottom:0},function () {
              $(this).removeClass('right').addClass('left')
          })
      })

})