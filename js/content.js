(function () {
    "use strict";

    var $node = $('#pro-operation')
    var $buttton = $('<a id="qiang_button">开始抢</a>')
    $buttton.attr('style', `
            display: block;
            float:left;
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: deepskyblue;
            color: #fff;`)
    $buttton.bind('click', function () {
        if ($node.children('.product-button02').text() == '立即登录') {
            alert('请先登录')
            return
        } else if ($node.children('.product-button02').text() != '即将开售' && $node.children('.product-button02').text() != '立即下单') {
            alert('当前页面不支持抢购，无法开始')
            return
        }
        if ($(this).hasClass('running')) {
            $(this).text('开始抢')
            clearInterval(this.t2)
            $msg_panel.text('')
        } else {
            $(this).text('停止抢')
            this.t2 = setInterval(function () {
                fn_qiang()
            }, 1e1)
        }
        $(this).toggleClass('running')
    })
    var $msg_panel = $('<span id="qiang_msg" style="display: block;float:left;margin-left: 5px;line-height:30px;color: deeppink;"/>')

    console.log('★★★华为抢手机脚本已经加载★★★')
    var $div = $('<div style="clearfix:both;"/>')
    $div.append($buttton) // 添加自动抢按钮
    $div.append($msg_panel) // 添加消息面板
    $node.after($div)

    var fn_qiang = function () {
        if (fn_qiang.times == undefined) {
            fn_qiang.times = 0
            fn_qiang.do_times = 0
        }
        if (fn_qiang.times > 6) {
            fn_qiang.times = 0
        }
        if ($node.children('.product-button02').text() != '立即下单') {
            $msg_panel.text('正在自动抢手机' + '.'.repeat(fn_qiang.times))
        } else {
            if (fn_qiang.do_times >= 6) {
                $buttton.click()
                $msg_panel.text('触发了' + fn_qiang.do_times + '次抢手机动作，如果抢到一定要分我一半')
                fn_qiang.do_times = 0
                return
            }
            fn_do_qiang()
            fn_qiang.do_times++
        }
        fn_qiang.times++
    }

    var fn_do_qiang = function () {
        let temp = document.createElement('script');
        temp.setAttribute('type', 'text/javascript');
        temp.textContent = "rush.business.clickBtnRushBuy2(this)"
        temp.onload = function () {
            this.parentNode.removeChild(this);
        };
        document.head.appendChild(temp);
    }

    var fn_keep_online = function () {
        setInterval(function () {
            $.get('https://www.vmall.com/member/accountInfo.json')
        }, 60e4)
    }()

})()