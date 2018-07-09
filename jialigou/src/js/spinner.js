require.config({
    paths: {
        'jquery': 'jquery'
    }
})

define(['jquery'], function($){
    return {
        show: function(){
            if($('#dk-mask')[0]){
                $('#dk-mask').show()
            } else {
                var _html = '<div id="dk-mask"><div class="dk-spinner-mask"></div><div class="dk-spinner dk-spinner-three-bounce"><div class="dk-bounce1"></div><div class="dk-bounce2"></div><div class="dk-bounce3"></div></div></div>';
                $(_html).appendTo('body');
            }
        },
        hide: function(){
            $('#dk-mask').hide()
        }
    }
})