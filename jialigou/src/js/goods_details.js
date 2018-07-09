require.config({
    paths : {
        'jquery' : './jquery',
        'http' : './httpclient',
        'common' : './common',
    }
})
require(['jquery','http','common'],function($,http,common){
    common.hasLogin();

    //查找对应id的商品
    var params = location.search.slice(1);
    params = params.split('=');
    var data_promise = http.get('goods_details.php',{
    option: params[0],
    value: params[1]
    })
    //获取对应的商品信息
    //查找文件中对应的图片并新建img元素
    function imgSrc(idx){
        return $('<img>').prop('src','../../imgs/goodsImg/' + idx + '.jpg');
    }
    //封装一个把img放进a便签，a便签放进li，li放进某个元素的方法
    function createEle(pos,item){
        var culi = $('<li>').appendTo(pos);
        if(item.isindex >= 2){
            item.imgstart = Number(item.imgstart) + 1;
        }
        //添加图片
        // var aUrl = '#';
        var aUrl = './goods_details.html?' + 'proid=' + encodeURI(item.proid);

        var a = $('<a>').prop('href',aUrl).append(imgSrc(item.imgstart).attr('proid',item.proid));
        a.appendTo(culi);
        //添加名称
        $('<a>').prop('href',aUrl).text(item.name).attr('proid',item.proid).appendTo(($('<p>')).appendTo(culi));
        //添加价格
        $('<span>').text('￥' + item.price + '.00').appendTo(culi);
    }


    data_promise.then(function(res){
        var res = window.eval('(' + res + ')');
        if(res.status){
            var data = res.data[0];
            //建立商品标题
            $('.detail_sortAll').text(data.sortAll);
            $('.detail_sortFir').text(data.sortFir);
            $('.good_name').text(data.name);

            //插入商品大图片
            //处理主页中的图片，主页中的某些商品有的只是展示，而在商品详情中没有该展示的图片
            if(data.isindex >= 2){
                data.imgstart = Number(data.imgstart) + 1;
            }
            //放进大小图片
            //***********
            var zoomid = 0;
            for(var i = data.imgstart; i <= data.imgend; i++){
                $('.detail_bigImgs').append(imgSrc(i));
                $('.detail_subImgs').append(imgSrc(i)); 
            }
            var bigImgs = $('img','.detail_bigImgs')
            bigImgs.eq(0).prop('id','zoom')
            if($("#zoom")){
                $("#zoom").ezPlus();
            }
            $('.detail_subImgs').mouseover(function(event){
                if($(event.target).is('img')){
                    var imgidx = $(event.target).index();
                    for(var i = 0; i < bigImgs.length; i++){
                        bigImgs.eq(i).css('z-index',-1).prop('id','');

                    }
                    bigImgs.eq(imgidx - 1).css('z-index',1).prop('id','zoom');
                    $("#zoom").ezPlus();
                }
            })
            $('.weChat_share').click(function(){
                $('.weChat_share_img').toggleClass('weChat_share_change');
            })
            $('.close_weChat').click(function(){
                $('.weChat_share_img').removeClass('weChat_share_change');
            })
            $('.detail_name').text(data.name);
            $('.detail_supply').text('(供货号:' + data.supply + ')');
            $('.detail_price').text(data.price + '.00');
            $('.detail_integral').text(data.integral + '*2');
            $('.detail_size').text(data.name);

            //商品卖完展示
            if(data.status == -1){
                $('.detail_size').parent().remove();
                $('.qty_btn').parent().parent().remove();
                $('.putCar').parent().remove();
                $('<div class="sellOut">').appendTo('.detail_main_message').text('本商品已卖完！')
            }
            //商品下架展示
            if(data.status == 0){
                $('.detail_size').parent().remove();
                $('.qty_btn').parent().parent().remove();
                $('.detail_price').parent().parent().remove();
                $('.putCar').parent().remove();
                $('<div class="underCarriage">').appendTo('.detail_main_message').text('本商品已下架！')
            }

            //处理数量按钮和数量添加
            var cuQty = $('.detail_qty').val();
            if(cuQty == 1){
                $('.qty_reduce').addClass('qty_btn_active');
            }

            function changeQty(event){
                cuQty = $('.detail_qty').val();
                $(this).addClass('qty_btn_active');
                if($(this).hasClass('qty_add')){
                    if(cuQty < 10){
                        cuQty = Number(cuQty) + 1;
                    }
                }
                if($(this).hasClass('qty_reduce')){
                    if(cuQty > 1){
                        cuQty = cuQty - 1;
                    }
                }
                $('.detail_qty').val(cuQty);
                
                event.preventDefault();
            }
            function changeQtyBack(){
                if(cuQty < 10 && cuQty > 1){
                    $('.qty_reduce').removeClass('qty_btn_active');
                    $('.qty_add').removeClass('qty_btn_active');
                }
            }

            //input数值改变
            $('.detail_qty').change(function(){
                cuQty = $('.detail_qty').val();
                if(cuQty <= 1){
                    $('.detail_qty').val(1);
                    $('.qty_reduce').addClass('qty_btn_active');
                    $('.qty_add').removeClass('qty_btn_active');
                    console.log(1)
                }else if(cuQty >= 10){
                    $('.detail_qty').val(10);
                    $('.qty_add').addClass('qty_btn_active');
                    $('.qty_reduce').removeClass('qty_btn_active');
                }else{
                    $('.qty_add').removeClass('qty_btn_active');
                    $('.qty_reduce').removeClass('qty_btn_active');
                }
            })


            $('.qty_add').mousedown(changeQty);
            $('.qty_reduce').mousedown(changeQty);
            $('.qty_add').mouseup(changeQtyBack);
            $('.qty_reduce').mouseup(changeQtyBack);

            //随机抽取5个该类的商品作为最佳搭配
            http.get('goods_details.php',{
                option:'sortAll',
                value:data.sortAll,
                limit:'AND proid != ' + data.proid + ' ORDER BY  RAND() LIMIT 5;'
            }).then(function(res){
                console.log(res)
                var bestData = eval('(' + res + ')');
                if(bestData.status){
                    bestData = bestData.data;
                    bestData.map(function(item){
                        //直接调用封装的函数，创建img，a，li
                        createEle('.best_info',item)
                    })
                }
            }).catch(function(res){
                console.log(res)
            })

            // common.Cookie.remove('allBuy')
            // 详情页购物车效果

            var totalQtyShow = 0;
            var shoppingCar = common.Cookie.get('allBuy') ? JSON.parse(common.Cookie.get('allBuy')) : [];
            console.log(typeof(shoppingCar))
             shoppingCar.map(function(item){
                totalQtyShow = totalQtyShow + Number(item.goodQty)
            })
            $('.goodQty').text(totalQtyShow);

            $('.goodQty').text(totalQtyShow)
            $('.putCar').click(function(){
                var goodQty = $('.detail_qty').val();
                if(shoppingCar.length > 0){
                    for(var i = 0; i < shoppingCar.length ; i++){
                        if(data.proid == shoppingCar[i].proid){
                            shoppingCar[i].goodQty = Number(shoppingCar[i].goodQty) + Number(goodQty);
                            break;
                        }
                        if(i == shoppingCar.length - 1){
                            shoppingCar.unshift({
                                proid : data.proid,
                                goodQty : Number(goodQty)
                            })
                            break;
                        }
                    }
                }else{
                    shoppingCar.push({
                        proid : data.proid,
                        goodQty : Number(goodQty)
                    })
                }
                //设置cookie
                common.Cookie.set('allBuy',JSON.stringify(shoppingCar));
                totalQtyShow = totalQtyShow + Number(goodQty)
                $(function(){
                    $('.goodQty').text(totalQtyShow).shake(2,4,100,$('.goodQty').position().left);
                })
                console.log(common.Cookie.get('allBuy'))
            })
        }
    })
     // common.Cookie.remove('allBuy');       
    //展示最近浏览的十个商品
    //如果最近没有浏览或浏览数少于10，则随机添加至十件商品，数据库现有46件商品
    var recentArr = common.Cookie.get('recentArr') ? common.Cookie.get('recentArr').split(',') : [];
    var culength = recentArr.length;
    // console.log(culength)
    for(var i = 0; i < 10-culength; i++){
        var randomNum = common.randomNumber(1,46);
        console.log(randomNum)
        if(recentArr.indexOf(randomNum) == -1){
            recentArr.push(randomNum);
        }else{
            i--;
        }
    }
    common.Cookie.set('recentArr',recentArr);

    $(document).click(function(event){
        recentCookie = common.Cookie.get('recentArr');
        recentArr = recentCookie.split(',');
        var cuTarget = $(event.target);
        // cuTarget.parent().prop('href','javascript:')
        // cuTarget.prop('href','javascript:')
        if(cuTarget.attr('proid')){
            cuProid = cuTarget.attr('proid');
            if(recentArr.indexOf(cuProid) == -1){
                recentArr.unshift(cuProid);
            }else{
                console.log(recentArr.indexOf(cuProid))
                recentArr.unshift(cuProid);
                recentArr.splice(recentArr.lastIndexOf(cuProid),1)
            }
            if(recentArr.length > 10){
                recentArr.pop()
            }
        }
        common.Cookie.set('recentArr',recentArr);
    })

    // common.Cookie.remove('recentArr')

    var recentRes = '';
    recentArr.map(function(item){
        recentRes += ' || ' + 'proid=' + item
    })
     http.get('goods_details.php',{
        option: 'proid',
        value: recentArr[0],
        limit: recentRes
    }).then(function(res){
        var recentData = eval('(' + res + ')').data;
        recentArr.map(function(item){
            recentData.map(function(recentItem){
                if(item == recentItem.proid){
                    createEle('.recent_browse',recentItem);
                }
            })
        })
    })
    
    //商品介绍部分
    $('.good_about_nav').mousedown(function(event){
        var target = $(event.target);
        var lis = $('.good_about_nav').children('li');
        var showlis = $('.goods_about_every').children('li');
        console.log(showlis)
        if(target.is('li') || target.is('span')){
            if(target.is('li')){
                var index = target.index();
            }else{
                var index = target.parent().index();
            }
            lis.each(function(idx){
                this.children[0].style.backgroundPosition = '0 -130px';
                showlis[idx].style.display = 'none';
            })
            console.log(lis[index].children[0])
            lis[index].children[0].style.backgroundPosition = '0 -100px';
            showlis[index].style.display = 'block';
        }
    }) 
    //点击商品分类输出相应的类，例如点击衣服/鞋子/家电数码等
    common.locationTo('#detail_main');
    //服装箱包>配饰>...
    common.locationTo('#index_nav');
})