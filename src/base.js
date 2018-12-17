var root_url = 'http://localhost';

function connecation(){

    ws = new WebSocket("ws://192.168.1.145:98");
    // 服务端主动推送消息时会触发这里的onmessage
    ws.onmessage = function(e){
        // json数据转换成js对象
        console.log("服务器返回数据：");
        //console.log(e);
        var data = eval("("+e.data+")");
        console.log(data);
        var type = data.type || '';
        switch(type){
            // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
            case 'init':
                // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
                bind_client({client_id: data.client_id})
                break;
            //消息发送操作
            case 'say':
                console.log('say_to_uid:' + e.data);
                break;
            case 'say_to_group':
                break;
            default :

        }
    };
}

function is_login(callback_function){
    json_post(root_url+'/wap/user/islogin', '', callback_function , false);
}

function bind_client(data){
    json_post(root_url+'/wap/index/bind', data, function(){}, true);
}

function json_post(url, data, callback_function, async){

    $.ajax({
        url: url,
        type: "POST",
        processData: true,
        async: async,
        data: data,
        dataType: 'json',
        success: callback_function
    });

}

function json_get(url, data, callback_function, async){

    $.ajax({
        url: url,
        type: "GET",
        processData: true,
        async: async,
        data: data,
        dataType: 'json',
        success: callback_function
    });

}


