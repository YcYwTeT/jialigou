require.config({
    paths : {
        'jquery' : './jquery',
        'http' : './httpclient',
        'common' : './common',
    }
})
require(['jquery','http','common'],function($,http,common){
    //显示登陆用户
    common.hasLogin();

    //轮播图
    var lis = $('li','#index_banner');
    var bannerIndex = 0;
    //设置下标
    
    for(var i = 0; i < lis.length; i++){
        $('<span>').attr('data-idxid',i).text(i+1).appendTo($('.subBox'))
    }
    if(timer){
        clearInterval(timer);
    }
    //下标标签
    var spans = $('span','.subBox')
    function show(index){
        for(var i = 0; i < lis.length; i++){
            lis.eq(i).css({opacity:0,zIndex:0});
            spans.eq(i).removeClass('sub_active')
        }
        lis.eq(index).css({opacity:1,zIndex:1});
        spans.eq(index).addClass('sub_active')
    }
    function startShow(){
        show(bannerIndex);
        bannerIndex++;
        if(bannerIndex >= lis.length){
            bannerIndex = 0;
        }
    }

    //over时停止播放
    $('#index_banner').mouseover(function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        clearInterval(timer);
        if($(target).is('span')){
            bannerIndex = $(target).attr('data-idxid');
            startShow();
        }
    })
    //out时继续播放
    $('#index_banner').mouseout(function(){
        timer = setInterval(startShow,2000);
    })
    startShow();
    var timer = setInterval(startShow,2000);


    //封装一个查取照片和存放位置的方法
    function getImg(idx,pos,item){
        var imgUrl = '../../imgs/goodsImg/' + idx + '.jpg';
        $('<img>').prop('src',imgUrl).appendTo(pos).attr('proid',item.proid);
    }
    //处理文字
    function wordFilter(str){
        if(str.startsWith('（')){
            return str.slice(str.indexOf('）') + 1)
        }
        return str;
    }
    //动态提取并显示商品，自定义构造函数。
    //idx为数据库查找的种类，添加进去的位置
    function Showgoods(idx,pos){
        http.post('index_show.php',
            {
                idx:idx
            }).then(function(res){
                var data = res.data;
                data.map(function(item){
                    //对应位置
                    var aUrl = '/src/goods_details.html?' + 'proid=' + encodeURI(item.proid);
                    if(item.isindex == 3){
                        getImg(item.imgstart,$('<a>').prop('href',aUrl).appendTo($('.large_show',pos)),item)
                    }else if(item.isindex == 2){
                        getImg(item.imgstart,$('<a>').prop('href',aUrl).appendTo($('.middle_show',pos)),item)
                    }else if(item.isindex == 1){
                        //主页中的商品参数
                        //添加商品图片
                        var li = $('<li>').appendTo($('.small_show',pos));
                        getImg(item.imgstart,$('<a>').prop('href',aUrl).appendTo(li),item);
                        //添加商品名称
                        $('<a>').prop('href',aUrl).prop('class','proName').text(wordFilter(item.name)).attr('proid',item.proid).appendTo($('<p>').appendTo(li));
                        //添加商品价格
                        ($('<p>').appendTo(li)).prop('class','proPrice').text(item.price);
                    }
                })
            }).catch(function(res){
                console.log(res);
            })
    }
    new Showgoods('服装箱包','#index_cloths');
    new Showgoods('个护美妆','#index_cosmetics');
    new Showgoods('食品生鲜','#index_food_health');
    new Showgoods('家电数码','#index_household');


    //时间补零
    function addZero(num){
        if(num<10){
            return '0' + num;
        }
        return num;
    }
    //热门
    function hotnewShow(str,num,pos){
        //处理数据
        http.get('index_hot.php',{
            opt : str,
            value : num
        }).then(function(res){
            res = window.eval('(' + res + ')');
            var data = res.data;
            var startTime = Date.parse(new Date());
            data.map(function(item,idx){
                if(item.isindex == 2){
                    var aUrl = '/src/goods_details.html?' + 'proid=' + encodeURI(item.proid);
                    getImg(item.imgstart,$('<a>').prop('href',aUrl).appendTo($('.index_hot_fixed',pos)),item)
                }if(item.isindex == 1){
                    var aUrl = '/src/goods_details.html?' + 'proid=' + encodeURI(item.proid);
                    var li = $('<li>').appendTo($('.index_hot_show',pos));
                    if(item.hot == 2){
                        li.prop('class','hot_yes_item')
                    }
                    if(item.hot == 1 || item.hot == 2){
                        //每半个钟直播一次
                        var interval =  30 * 60 * 1000;
                        var endTime = startTime + interval;
                        startTimeShow = String(addZero(new Date(startTime).getHours())) + ':' + String(addZero(new Date(startTime).getMinutes()));
                        endTimeShow = String(addZero(new Date(endTime).getHours())) + ':' + String(addZero(new Date(endTime).getMinutes()));
                        var str = '[' + startTimeShow + '~' + endTimeShow + ']';
                        $('<span>').text(str).appendTo(li);
                        startTime = endTime;
                        //加入直播标签
                        if(item.hot == 1){
                            $('<span>').appendTo(li).text('直播');
                        }
                    }
                    if(idx == 0){
                        //将当前时间输入到banner的直播时间
                        $('.books_times').text(str);

                    }
                    getImg(item.imgstart,$('<a>').prop('href',aUrl).appendTo(li),item);
                    //添加商品名称
                    $('<a>').prop('href',aUrl).attr('proid',item.proid).text(wordFilter(item.name)).appendTo($('<p>').prop('class','proName').appendTo(li));
                    //添加商品价格
                    ($('<p>').appendTo(li)).prop('class','proPrice').text(item.price);
                }
            })
        }).catch(function(res){
            console.log(res);
        })
    }

    // .prop('href','http://10.3.136.34:666/src/goods_details.html')

    //插入今日直播和昨日直播的数据
    $('.index_hot_title','#index_hot').click(function(event){
        var li = $('.hot_yes_item','#index_hot');
        console.log(li)
        var cuLeft = 0;
        for(var i = 0; i < li.length; i++){
            li.eq(i).css({left: cuLeft + 'px'})
            cuLeft += 245;
        }
        if($(event.target).prop('class') == 'todayPlay'){
            li.css('z-index',-1);
        }
        if($(event.target).prop('class') == 'yesPlay'){
            li.css('z-index',1);
        }
        event.preventDefault();
    })
    hotnewShow('hot',1,'#index_hot');
    hotnewShow('hot',2,'#index_hot');
    hotnewShow('new',1,'#index_hot_sell');
    hotnewShow('hot',-1,'.books')

    //存入最近浏览的十个商品
    // var recentArr = common.Cookie.get('recentArr');
    // console.log(recentArr)
    var recentArr = [];
    $(document).click(function(event){
        recentCookie = common.Cookie.get('recentArr');
        recentArr = recentCookie ? recentCookie.split(',') : [];
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
    var shoppingCar = common.Cookie.get('allBuy') ? JSON.parse(common.Cookie.get('allBuy')) : [];
    var totalQtyShow = 0;
    shoppingCar.map(function(item){
        totalQtyShow = totalQtyShow + Number(item.goodQty)
    })
    $('.goodQty').text(totalQtyShow)


    //点击商品分类输出相应的类，例如点击衣服/鞋子/家电数码等
    //主页中的nav
    common.locationTo('#index_nav');
    //热销
    common.locationTo('#index_hot');
    //各标题栏
    common.locationTo('.good_title');
    // //各类下的ul
    common.locationTo('.good_main')
})
