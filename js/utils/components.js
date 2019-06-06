//
const headerComponent = `
<div class="headerH">
        <div class="header headLogoBlue bgWhite">
            <div class=" w1200">
                <div class="headLogo">
                    <label>
                        <img src="./images/logo_blue.png" /> 诊断云
                    </label>
                </div>
                <div class="headNav">
                    <ul>
                        <li>
                            <a href="./index.html">首页</a>
                        </li>
                        <li>
                            <a href="./knowmore.html">了解诊断</a>
                        </li>
                        <li>
                            <a href="./modallib.html">诊断模型库</a>
                        </li>
                        <li class="navOn">
                            <a href="./list.html">诊断服务</a>
                        </li>
                        <li>
                            <a href="./map.html">诊断服务地图</a>
                        </li>
                        <li>
                            <a href="./about.html">关于我们</a>
                        </li>
                    </ul>
                </div>
                <div class="headUser yesSessionid showBox">
                    <div class="headUser_name">
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                        <span></span>
                    </div>
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                </div>
                <div class="headUser hide noSessionid">
                    <a href="./login.html" class="alogin">登录</a>
                </div>
                <div class="signOut">
                    <i class="fa fa-caret-up" aria-hidden="true"></i>
                    <ul>

                        <li>
                            <a href="./mine.html">我的诊断</a>
                        </li>
                        <li>
                            <a id="comment">我要点评</a>
                        </li>
                        <li>
                            <a id="feedback">意见反馈</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="outLogin">退出</a>
                        </li>
                    </ul>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>`;

const footerComponent = `
<div class="footer">
        <p>版权所有 @ 2000-2018 中软国际制造云 All Rights Reserved</p>
        <p>京ICP 备15012914号-12 京公网安备11010802022625</p>
    </div>
`

$(headerComponent).insertBefore($("body").children().first());
$(footerComponent).insertAfter($("body").children().last());
