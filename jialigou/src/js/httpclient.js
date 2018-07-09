require.config({
    paths: {
        'jquery': './jquery',
        'spinner': './spinner'
    }
})

define(['jquery', 'spinner'], function($, loading){
    var baseUrl = "http://10.3.136.215:666/src/";
    function filterUrl(_url){
        if(_url.startsWith('http')){
            return _url;
        }  
        return baseUrl + _url;
    }

    return {
        get: function(_url, _data){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: filterUrl(_url),
                    data: _data || {},
                    beforeSend: function(){
                        loading.show();
                    },
                    success: function(res){
                        loading.hide();
                        resolve(res)
                    },
                    error: function(error){
                        loading.hide();
                        reject(error);
                    }
                })
            })
        },
        //封装一个查取照片和存放位置的方法
    
        //动态提取并显示商品，自定义构造函数。
        //idx为数据库查找的种类，添加进去的位置
        showGoods: function(pos,sql){
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
            this.get('goods_list.php',
                {
                    sql: sql
                }).then(function(res){
                    if(res.length > 2){
                        var data = eval('(' + res + ')').data;
                            console.log(data)
                        data.map(function(item){
                            //对应位置
                            var aUrl = './goods_details.html?' + 'proid=' + encodeURI(item.proid);
                                //主页中的商品参数
                                //添加商品图片
                            var li = $('<li>').appendTo(pos);
                            if(item.isindex > 1 ){
                                item.imgstart = Number(item.imgstart) + 1;
                            }
                            getImg(item.imgstart,$('<a>').prop('href',aUrl).appendTo(li),item);
                            //添加商品名称
                            $('<a>').prop('href',aUrl).prop('class','proName').text(wordFilter(item.name)).attr('proid',item.proid).appendTo($('<p>').appendTo(li));
                            //添加商品价格
                            $('<p>').appendTo(li).prop('class','proPrice').text('￥' + item.price + '.00');
                            //添加购物车和收藏按钮
                            $('<div class="toCar">').append($('<button>').text("加入购物车")).append($('<button>').text("收藏")).appendTo(li);
                        })
                    }
                }).catch(function(res){
                    console.log(res);
                })
            },
        post: function(_url, _data){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: filterUrl(_url),
                    data: _data || {},
                    type: 'post',
                    beforeSend: function(){
                        loading.show();
                    },
                    success: function(res){
                        resolve(window.eval('(' + res + ')'));
                        loading.hide();
                    },
                    error: function(error){
                        reject(window.eval('(' + error + ')'));
                        loading.hide();
                    }
                })
            })
        },

        //查找src的位置
        imgSrc : function(idx,hasBtn){
            return $('<img>').prop('src','../../imgs/goodsImg/' + idx + '.jpg');
        },
        //生成若干个li并放进pos('.xxx')，li里面有a>img,p>pname,p>price,[buttn]
        createEle : function(pos,item,hasBtn){
            var culi = $('<li>').appendTo(pos);
            if(item.isindex >= 2){
                item.imgstart = Number(item.imgstart) + 1;
            }
            //添加图片
            var aUrl = './goods_details.html?' + 'proid=' + encodeURI(item.proid);

            var a = $('<a>').prop('href',aUrl).append(this.imgSrc(item.imgstart).attr('proid',item.proid));
            a.appendTo(culi);
            //添加名称
            $('<a>').prop('href',aUrl).text(item.name).attr('proid',item.proid).appendTo(($('<p>')).appendTo(culi));
            //添加价格
            $('<span>').text('￥' + item.price + '.00').appendTo(culi);
            //添加btn
            if(hasBtn){
                $('<button class="addCar">').appendTo($('<div>')).appendTo(culi).text("加入购物车");
            }
        },

    }
})