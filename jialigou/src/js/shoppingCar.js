require.config({
    paths : {
        'jquery' : './jquery',
        'http' : './httpclient',
        'common' : './common',
    }
})
require(['jquery','http','common'],function($,http,common){
    common.hasLogin();
    var allBuy = common.Cookie.get('allBuy')
    if(!allBuy){
        allBuy = new Array();
        common.Cookie.set('allBuy',JSON.stringify(allBuy))
    }
    //封装创造table
    function createTd(index,item,cuTr,cuTd){
        if(item.isindex >= 2){
            item.imgstart = Number(item.imgstart) + 1;
        }
        var aUrl = './goods_details.html?' + 'proid=' + encodeURI(item.proid);
        //添加图片
        switch(index){
            case 0:
                $('<span class="good_choose">').appendTo(cuTd).addClass('good_choose_active');
                var a = $('<a>').prop('href',aUrl).append(http.imgSrc(item.imgstart).attr('proid',item.proid)).appendTo(cuTd);
                break;
            case 1:
                // 添加名称
                cuTd.append($('<a>').prop('href',aUrl).text(item.name).attr('proid',item.proid).appendTo(($('<p>'))));
                //添加货号
                cuTd.append($('<p>').text('货号 ：' + item.supply));
                //添加颜色
                cuTd.append($('<p>').text('颜色/尺码 ：'));
                cuTd.append($('<p>').text(item.name));
                break;
            case 2:
                //添加价格
                $('<span>').text('￥' + item.price + '.00').appendTo(cuTd);
                break;
            case 3:
                //添加数量
                var allGoods = JSON.parse(common.Cookie.get('allBuy'));
                console.log(allGoods)
                allGoods.map(function(arrItem){
                    if(Number(arrItem.proid) == Number(item.proid)){
                        cuQty = arrItem.goodQty;
                    }
                })
                console.log(cuQty)
                $(cuTd).append($('<span>').append($('<button class="reduce_btn">').attr('proid',item.proid).text('-')).append(($('<input type="text" class="buyQty" value=1>')).val(cuQty)).append($('<button class="add_btn">').attr('proid',item.proid).text('+')));
               break;
            case 4:
                //嘉丽价
                $(cuTd).text('￥' + parseInt(item.price * 0.8) + '.00')
                break;
            case 5:                
                $(cuTd).append($('<span>').append($('<button class="addLike">').text('加入收藏夹')).append($('<button class="delGoods">').text('删除')))
                break;
        }
        var chooseQty = $('.good_choose');
        var choose_qty = $('.good_choose_active').length;
        if(choose_qty == $('tr','.goods_buy').length){
            $('#all_btn')[0].checked = true;
        }else{
            $('#all_btn')[0].checked = false;
        }  
    }
    var allGoods = JSON.parse(common.Cookie.get('allBuy'));
    //定义商品价格,积分,件数并计算运费假设每件商品运费6元，总计
    var goodsCash = totalIntegral = totalCarriage = totalCash = 0;
    if(allGoods.length > 0){
        var sqlRes = 'select * from products where proid = ' + allGoods[0].proid;
        allGoods.map(function(item,idx){
            if(idx == 0){
                return;
            }
            sqlRes += ' || ' + 'proid=' + item.proid
        })
        http.get('shoppingCar.php',{
            sql: sqlRes
        }).then(function(res){
            outres = res;
            res = eval('(' + res + ')');
            if(res.status){
                data = res.data;
                var tdQty = $('tr','.all_goods')[0].children.length;
                for(var item of allGoods){
                    proid = item.proid
                    data.map(function(item){
                        //对应原来的顺序输出
                        if(proid == item.proid){
                            var cuTr = $('<tr>').appendTo('.all_goods');
                            for(var i = 0; i < tdQty; i++){
                                var cuTd = $('<td>').appendTo(cuTr)
                                createTd(i,item,cuTr,cuTd);
                            }
                        }
                    })
                }
            }
            $('.good_choose').addClass('good_choose_active')
            $('#all_btn').prop('checked',true);
            calTotal()
        })
    }
    //猜我喜欢
    var allGoodArr = [];
    if(allGoods.length > 0){
        for(var item of allGoods){
            allGoodArr.push(Number(item.proid))
        }
    }
    var randomRes = 'select * from products where ';
    var randomArr = [];
    for(var i = 0; i < 5; i++){
        var curandomNumber = common.randomNumber(1,45)
        if(randomArr.indexOf(curandomNumber) == -1 && allGoodArr.indexOf(curandomNumber) == -1){
            randomArr.push(curandomNumber);
        }else{
            i--;
        }
    }
    for(var i = 0; i < randomArr.length; i++){
        randomRes = randomRes + 'proid=' + randomArr[i] + ' || ';
    }
    randomRes = randomRes.slice(0,-3) + ';'
    http.get('shoppingCar.php',{
        sql: randomRes
    }).then(function(res){
        var bestData = eval('(' + res + ')');
        if(bestData.status){
            bestData = bestData.data;
            bestData.map(function(item){
                //直接调用封装的函数，创建img，a，li，true为有btn
                http.createEle('.guessGoods',item,true);
            })
        }
        $('.addCar').click(function(event){
            var target = $(event.target);
            var proid = target.parent().find('img').attr('proid');
            //改变cookie
            //添加进购物车
            var allGoods = common.Cookie.get('allBuy')
            allGoods = JSON.parse(allGoods);
            common.addShoppingCar(proid,1);
            http.get('shoppingCar.php',{
                sql: 'select * from products where proid = ' + proid
            }).then(function(res){
                var res = eval('(' + res + ')');
                if(res.status){
                    console.log(common.Cookie.get('allBuy'))
                    var data = res.data;
                    console.log(data)
                    var allTr = $('tr','tbody');
                    if(!allTr.length){
                        allTr.length = 1;
                    }
                    for(var i = 0; i < allTr.length; i++){
                        var cuSameTr = allTr.eq(i).find('img');
                        var cuProid = cuSameTr.attr('proid');
                        if(proid == cuProid){
                            console.log('same')
                            var cuSameQty = Number(cuSameTr.parents('tr').find('.buyQty').val());
                            console.log(cuSameQty)
                            cuSameTr.parents('tr').find('.buyQty').val(cuSameQty + 1)
                            break;
                        }
                        if(i == allTr.length - 1){
                            console.log('diff')
                            var cuTr = $('<tr>').prependTo('tbody');
                            for(var i = 0; i < 6 ; i++){
                                var cuTd = $('<td>').appendTo(cuTr);
                                createTd(i,data[0],cuTr,cuTd)
                            }
                            break;
                        }
                    }
                    calTotal();
                }
            })
        })
    }).catch(function(res){
        console.log(res)
    })

    function calTotal(){
        //定义商品价格，运费（6块/件），积分，总价
        var goodsCash = totalCarriage = totalIntegral = totalCash = 0;
        var chooseArr = [];
        var choose_qty = $('.good_choose_active').length;
        var allBuy = common.Cookie.get('allBuy') ? JSON.parse(common.Cookie.get('allBuy')) : [];
        if(choose_qty > 0){
            for(var item of $('.good_choose_active')){
                var proid = $(item).parents('tr').find('.reduce_btn').attr('proid');
                allBuy.map(function(goods){
                    if(goods.proid == proid){
                        chooseArr.push({
                            proid: proid,
                            goodQty: goods.goodQty
                        });
                    }
                })
                
            }
        }
        if(chooseArr.length > 0){
            var sqlRes = 'select * from products where proid = ' + chooseArr[0].proid;
            chooseArr.map(function(item,idx){
                if(idx == 0){
                    return;
                }
                sqlRes += ' || ' + 'proid=' + item.proid
            })
            http.get('shoppingCar.php',{
                sql: sqlRes
            }).then(function(res){
                res = eval('(' + res + ')');
                if(res.status){
                    data = res.data;
                    for(var item of chooseArr){
                        totalCarriage += Number(item.goodQty) * 6;
                        data.map(function(good){
                            if(good.proid == item.proid){
                                goodsCash += (Number(item.goodQty) * Number(good.price));
                                totalIntegral += (Number(item.goodQty) * Number(good.integral));
                            }
                        })
                    }
                    totalCash = goodsCash + totalCarriage;
                    $('.goods_cash').text(goodsCash);
                    $('.goods_carriage').text(totalCarriage);
                    $('.good_integrate').text(totalIntegral);
                    $('.goods_total').text(totalCash);
                }
            })
        }else{
            $('.goods_cash').text(0);
            $('.goods_carriage').text(0);
            $('.good_integrate').text(0);
            $('.goods_total').text(0);
        }
    }
    calTotal();

    $('table').click(function(event){
        var goods = common.Cookie.get('allBuy') ? JSON.parse(common.Cookie.get('allBuy')) : [];
        var target = $(event.target);
        //输入数量
        $('.buyQty').change(function(){
            changeCookie($(this).next().attr('proid'),$(this).val());
        })

        //存进cookie
        function changeCookie(cuId,value){
            for(var item of goods){
                if(cuId == item.proid){
                    item.goodQty = value;
                }
            }
            common.Cookie.set('allBuy',JSON.stringify(goods));
            calTotal();
        }

        //删除tbody表格中某个tr，并更新cookie
        function deleteTr(value,ele){
            goods.splice(value,1);
            $('.goods_buy').children().eq(ele).remove();
            common.Cookie.set('allBuy',JSON.stringify(goods));
            calTotal();
        }

        if(target.hasClass('good_choose')){
            //定义选择的数量
            target[0].classList.toggle('good_choose_active');
            
            calTotal();
        }
        if(target.prop('id') == 'all_btn'){
            if(target.prop('checked')){
                $('.good_choose').addClass('good_choose_active');
            }else{
                $('.good_choose').removeClass('good_choose_active');
            }
            calTotal();
        }
   
        if(target.hasClass('reduce_btn')){
            var cuQty = target.next().val();
            if(cuQty > 1){
                target.next().val(cuQty - 1);
            }
            changeCookie(target.attr('proid'),target.next().val());
            console.log(common.Cookie.get('allBuy'))
        }


        if(target.hasClass('add_btn')){
            var cuQty = Number(target.prev().val());
            target.prev().val(cuQty + 1);
            console.log(cuQty);
            changeCookie(target.attr('proid'),target.prev().val());
            console.log(common.Cookie.get('allBuy'));
        }

        if(target.hasClass('delGoods')){
            var cuId = target.parents('tr').children().eq(3).children().children().eq(0).attr('proid');
            for(var value of goods){
                if(cuId == value.proid){
                    deleteTr(goods.indexOf(value),target.parents('tr').index())
                }
            }
            
        }

        if(target.hasClass('clearChoose')){
            var choose = $('.good_choose');
            for(var item of choose){
                if($(item).hasClass('good_choose_active')){
                    var trIndex = $(item).parents('tr').index();
                    goods.splice(trIndex,1);
                    $('.goods_buy').children().eq(trIndex).remove();
                    common.Cookie.set('allBuy',JSON.stringify(goods));
                }
            }
            $('#all_btn').prop('checked',false);
            calTotal();
        }

        if(target.hasClass('clearCar')){
            $('.goods_buy').empty();
            allBuy = new Array();
            common.Cookie.set('allBuy',JSON.stringify(allBuy))
            calTotal();
        }
    })
    
    //输入数量
})