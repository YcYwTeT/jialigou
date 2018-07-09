require.config({
    paths : {
        'jquery' : './jquery',
        'http' : './httpclient',
        'common' : './common',
    }
})
require(['jquery','http','common'],function($,http,common){
    //判断是否登陆
    common.hasLogin();

    // 判断是否点开左侧栏
    $('li','.good_sort').click(function(){
        var cuLi = $(this).parents('li');
        if(!cuLi.find('.good_detail').hasClass('good_detail_active')){
            $('.good_detail').removeClass('good_detail_active');
            cuLi.find('.good_detail').addClass('good_detail_active');
        }else if($(this).parent().hasClass('good_sort')){
            cuLi.find('.good_detail').removeClass('good_detail_active');
        }
    })

    //点击'全部'显示所有
    $('.all_btn').click(function(){
        //当只有‘全部’按钮时，不触发事件
        if($('.goods_classify').children().length > 1){
            location.href = '/src/goods_list.html' + '?sort=' + encodeURI($('.list_sortAll').eq(1).text()); 
        }
    })

    //显示列表图片
    //处理热销和热卖
    var sort = decodeURI(location.search).slice(1).split('=');
    if(sort[1] == 'hot'){
        //生成页码
        var subSql = "select * from products where hot > 0;"
    }else if(sort[1] == 'new'){
        var subSql = "select * from products where new > 0;"
    }else{
        var subSql = "select * from products where sortAll = '" + sort[1] + "' || sortFir = '" + sort[1] + "';"
    }


    //为标题添加分类
    $('.list_sortFir').text(sort[1]);
    

    //寻找子分类下的总分类，例如：标题中显示首页->服装箱包->女装，寻找服装箱包
    var _allsort = $('a',$('li','.good_detail'));
    for(var i = 0; i < _allsort.length; i++){
        if($(_allsort).eq(i).text() == $('.list_sortFir').text() || !$('.list_sortAll').eq(1).text() == ''){
            var goods_classify = $('a',$(_allsort).eq(i).parents('.good_detail'));
            goods_classify.each(function(){
                $('<a>').text($(this).text()).appendTo('.goods_classify');
            })

            //左侧栏相应的栏打开，其他关闭
            _allsort.eq(i).parents('.good_detail').addClass('good_detail_active');

            //寻找女装的上一级，服装箱包
            $('.list_sortAll').eq(1).text(($(_allsort).eq(i).parents('.good_detail').siblings('li').children().text()));
            break;
        }
        //当点击衣服是，隐藏标题栏的其中一个分类
        if(i == _allsort.length -1){
            $('.list_sortAll').css('display','none');
            break;
        }
    }
 

    //选择子分类时，背景色改变  
    var goods_sort = $('.goods_classify').children();
    for(var item of goods_sort){
        if($(item).text() == sort[1]){
            $(item).css({'background' : '#e91456','color' : '#fff'})
        }
        //当只有‘全部’按钮时
        if(goods_sort.length <= 1){
            var cuSpan = $('.good_sort').find('span');
            for(var i = 0; i < cuSpan.length; i++){
                if(cuSpan.eq(i).text() == $('.list_sortFir').text()){
                    cuSpan.eq(i).parent().next().addClass('good_detail_active');
                }
            }
            $(item).css({'background' : '#e91456','color' : '#fff'});
        }
    }


    //下标切换
    $('<a>').prop('class','sortAll').appendTo('.list_title')
    http.get('goods_list.php',
        {
            sql: subSql
        }).then(function(res){
            if(res.length > 2){
                var data = eval('(' + res + ')').data;
                var page = $('<div class="page">').appendTo('.list_right');
                ($('<span class="all_qty">').append($('<span>').text(data.length + '条记录')).append($('<span class="_cuPage">')).append($('<span>').text('/' +  Math.ceil(data.length/12) + '页'))).appendTo(page)
                $('<span class="firstPage">').text('首页').appendTo(page);
                $('<span class="prevPage">').text('上一页').appendTo(page);
                for(var i = 1; i <= Math.ceil(data.length/12); i++){
                    page.append($('<span>').text(i).prop('class','cuPage'))       
                }
                $('<span class="nextPage">').text('下一页').appendTo(page);
                $('<span class="lastPage">').text('末页').appendTo(page);
                var cuPage = 1;
                var priceflag = true;
                function showPage(_page){
                    $('.list_main').empty();
                    console.log(priceflag)
                    //true -> 500 -> 68   false -> 68 -> 500
                    if(priceflag){
                        //500 -> 68
                        var sortLimit = 'DESC';
                    }else{
                        //68 -> 500
                        var sortLimit = '';
                    }
                    if(sort[1] == 'hot'){
                        //生成页码
                        var sql = "select * from products where hot > 0 "+ "order by price " + sortLimit + " limit " + (_page - 1)*10 + ",12;"
                        console.log(sql)
                    }else if(sort[1] == 'new'){
                        var sql = "select * from products where new > 0 " + "order by price " + sortLimit + " limit " + (_page - 1)*10 + ",12;"
                    }else{
                        var sql = "select * from products where sortAll = '" + sort[1] + "' || sortFir = '" + sort[1] + "' order by price " + sortLimit + " limit " + (_page - 1)*10 + ",12;"
                    }
                    http.showGoods('.list_main',sql);
                    $('.cuPage').css({color:'#444'});
                    $('.cuPage').eq(_page - 1).css({color:'#e91456'});
                    console.log(data)
                    if(data.length == 0){
                        $('._cuPage').text(0)
                    }else{
                        $('._cuPage').text(_page)
                    }
                }

                showPage(cuPage)
                //排序
                $('.priceSort').click(function(){
                    if(!priceflag){
                        $('.priceSort').text('按价钱').append($('<span>').text('↓'))
                        // showPage(cuPage);
                    }else{
                        $('.priceSort').text('按价钱').append($('<span>').text('↑'))
                    }
                    //按排序回到第一页
                    priceflag = !priceflag;
                    showPage(1);
                })
                $('.page').click(function(event){
                    var target = $(event.target);
                    if(target.hasClass('cuPage')){
                        showPage($(target).text(),cuPage)
                        cuPage = target.text();
                    }
                    //上一页
                    if(target.hasClass('prevPage')){
                        if(cuPage && cuPage > 1){
                            cuPage--;
                            showPage(cuPage)
                        }
                    }
                    //下一页
                    if(target.hasClass('nextPage')){
                        if(cuPage && cuPage < Math.ceil(data.length/12)){
                            cuPage++;
                            showPage(cuPage);
                        }
                    }
                    //首页
                    if(target.hasClass('firstPage')){
                        if(cuPage && cuPage > 1){
                            cuPage = 1;
                            showPage(cuPage);
                        }
                    }
                    //末页
                    if(target.hasClass('lastPage')){
                        if(cuPage && cuPage < Math.ceil(data.length/12)){
                            cuPage = Math.ceil(data.length/12);
                            showPage(cuPage);
                        }
                    }
                })
            }
        }).catch(function(res){
            console.log(res);
        })

    var shoppingCar = common.Cookie.get('allBuy') ? JSON.parse(common.Cookie.get('allBuy')) : [];
    var totalQtyShow = 0;
    shoppingCar.map(function(item){
        totalQtyShow = totalQtyShow + Number(item.goodQty)
    })
    $('.goodQty').text(totalQtyShow);
    
    common.locationTo($('#list_main'));
})