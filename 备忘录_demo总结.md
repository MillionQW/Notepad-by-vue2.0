这个Demo来自github的 @lin-xin ![Vuex 模块化实现待办事项的状态管理](https://github.com/lin-xin/blog/issues/5)。

利用vue + vuex + webpack实现的一个备忘录。支持
	1）添加事件
	2）将事件标记为已完成
	3）取消事件，取消后可复原
	4）事件可编辑
	5）可按字检索事件
	6）分组显示事件
页面是响应式的。现在梳理一下制作demo遇到的问题和总结。

##HTML、CSS部分
</br>
- 对html body同时设置`width: 100%; height: 100%`，这样后面的container容器设置`width: 100%`才能铺满整个屏幕，如果只设置html不设置body的height为100%，根据CSS规范，如果元素的包含块没有明确定义height，那么这个元素的height无论设置什么百分比，都会被变成`auto`，所以要同时给html和body设置width,height为100%。
- 汉堡标签用span来做，:before和:after做成上下两条，事件绑定在span的包含块上，否则三条线的中间不能触发事件。伪类生成的白条还要通过top,bottom等移动，否则会发生重叠。
- 下拉框的朝向箭头，不要用“ > ”这种符号做，这个符号形成的角太小。方法是用`<span>`标签，设成块后它的`border-right`和`border-bottom`做，再通过`transform:rotate(45deg)`调整角度，生成的角很好看，下拉框的收起，列出用`transition`过渡，不过就有`transform`和`transition`的兼容性问题。
- 做一个搜索框旁边的下拉框：</br>
![](http://ww1.sinaimg.cn/large/69838a3dgy1fhm2n55i4sj202p019741.jpg)</br>
![](http://ww1.sinaimg.cn/large/69838a3dgy1fhm2o7h6qjj2037048dfm.jpg)
</br>
代码结构：</br>
![](http://ww1.sinaimg.cn/large/69838a3dgy1fhm2te015nj20d906dq2y.jpg)
</br>
select_value用来显示从下面的option里选出来的值，函数绑定在select_option上。一开始.select_body的`height`为0，点击.select_value的时候给.select_body一个类，重新给select_body一个height，再设置transition就可以实现过渡。
- absolute居中法：设置包含块`position:absolute`，`left`和`right`同时为0，然后里面的div再设置`margin: auto 0`，适合包含块的position是absolute的情况。
- 编辑框和按钮在同一水平线的做法：</br>
![](http://ww1.sinaimg.cn/large/69838a3dgy1fhm3471wlwj20s601t0si.jpg)
</br>
编辑框的宽度100%，然后给包含块的`padding-right`设置得足够大，按钮用`position:absolute`放在右padding上。
- 搜索框字体颜色推荐#999，看起来淡淡的。
- 侧边工具栏背景高度延伸到底部的方法：设置`position:absolute`后不但设置`top`和`left`，`bottom`也要设置为0，通过偏移，高度会直接伸到页面底部。
##JS和Vue部分
</br>
梳理一下功能：
- 这个备忘录使用了vuex进行状态管理，需要进行状态管理的就是备忘录里的数据，所以我们的增删改查数据都要经过store读取，修改数据。
- 添加数据：把内容和data中的content绑定点击添加事件后，通过一个方法把content写进一个对象中，对象里默认有type和Id属性，再把对象分发给Actions，Actions触发Mutations（Mutations的名字还要通过一个mutaitions_types.js保存常量，用常量定义方法，据说是方便协作，但是还不知道有什么用），然后通过Mutations修改state中的一个events数组，把最新添加的对象unshift()到数组的第一位。
- 添加到“已完成”：“未完成”，“已完成”，“已取消”是根据对象的type属性，决定的，所以用Mutations修改state中的events，所以用来`v-for`的数据还要经过getters处理一下数据，再在组件中通过computed获取筛选过的数据再循环出来数据。
- 编辑数据：表单的组件的data里要有一个info对象存一下对象，把要修改的数据先放在info的content属性里，编辑框跟info.content绑定再修改，改后info对象传给state的events。
- 表单和事项的切换：作者没有用路由，两个表的切换是通过`transform: translateX()`把表移到看不见，再通过data中表示“show”的属性的true和false，控制表的移入移出。