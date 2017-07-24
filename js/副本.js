$(function() {

	var detailData = {};
	//获取品牌墙接口
	function getPinPai(like) {
		var params = {
			exhibitionId: 1,
			'like': like
		}
		$.ajax({
			url: sendUrl + "/exhibitors/queryExhibitorsByExhibitionIdAndPage",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				if(data.success) {
					$('.swiper-wrapper').html('')
					$.each(data.list, function(index, content) {
						$('.swiper-wrapper').append('<div class="swiper-slide" exhibitorsId=' + content.exhibitorsId + '>' +
							'<dl class="banner_dl">' +
							'<dt>' +
							'<img src="' + sendImgUrl + content.logo + '"/>' +
							'</dt>' +
							'<dd>' +
							'<span>' + '中国' + '</span>' +
							'<span>China</span>' +
							'</dd>' +
							'</dl>' +
							'<div class="border_color"></div>' +
							'<p class="p1">Pizza hut</p>' +
							'<p class="p2">' + content.exhibitorsName + '</p>' +
							'</div>')
					});
					//初始化轮播图
					swiper.destroy(false, false);
					swiper = new Swiper('.swiper-container', {
						loop: true,
						slideToClickedSlide: true,
						loopAdditionalSlides: 0,
						loopedSlides: data.list.length,
						pagination: '.swiper-pagination',
						effect: 'coverflow',
						grabCursor: true,
						centeredSlides: true,
						slidesPerView: 'auto',
						autoplay: 2000,
						autoplayDisableOnInteraction: false,
						observer: true, //修改swiper自己或子元素时，自动初始化swiper
						observeParents: true, //修改swiper的父元素时，自动初始化swiper
						coverflow: {
							rotate: 25,
							stretch: 100,
							depth: 150,
							modifier: 1,
							slideShadows: true
						},
						onDestroy: function(swiper) {},
						onClick: function(swiper, event) {
							//鼠标点击停止播放
							swiper.stopAutoplay()
							$('.detail').fadeIn()
							console.log(swiper.activeIndex)
							params = {
								exhibitorsId: $('.swiper-slide').eq(swiper.activeIndex).attr('exhibitorsId')
							}
							//调取详情接口
							$.ajax({
								url: sendUrl + "/exhibitors/queryExhibitorsDetailedByExhibitorsId",
								data: params,
								type: "POST",
								async: false,
								cache: false,
								dataType: "json",
								success: function(data) {
									console.log(data)
									if(data.success) {
										detailData = data.list[0];
										$('.detail_main .left img').attr('src', sendImgUrl + data.list[0].logo);
										$('.detail .p1').html(data.list[0].exhibitorsName)
										$('.detail_main .right .top .p3').html('&nbsp;&nbsp;&nbsp;&nbsp;' + data.list[0].chineseSynopsis)
										$('.detail_main .right .center').html('')
										$('.detail_main .right .center').append('<li>' +
											'<span>电话 The phone</span>' +
											'<span>' + data.list[0].phone + '</span>' +
											'</li>' +
											'<li>' +
											'<span>传真 fax</span>' +
											'<span>' + data.list[0].fax + '</span>' +
											'</li>' +
											'<li>' +
											'<span>邮箱 Email</span>' +
											'<span>' + data.list[0].email + '</span>' +
											'</li>' +
											'<li>' +
											'<span>网站 Web site</span>' +
											'<span>' + data.list[0].internetSite + '</span>' +
											'</li>');
										$('.detail_main .right .bottom dt img').attr('src', 'http://open.weixin.qq.com/qr/code/?username=' + data.list[0].exhibitorsWeixin)

									} else {

									}
								},
								error: function() {
									console.log('error')
								}
							});

						},

					});

				} else {

				}
			},
			error: function() {
				console.log('error')
			}
		});
	}
	//获取餐饮指南接口
	function getCanYin(like) {
		var params = {
			exhibitionId: 1,
			'like': like
		}
		$.ajax({
			url: sendUrl + "/restaurant/queryRestaurantByLike",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				if(data.success) {
					$('.swiper-wrapper').html('')
					$.each(data.list, function(index, content) {
						$('.swiper-wrapper').append('<div class="swiper-slide" restaurantId=' + content.restaurantId + '>' +
							'<dl class="banner_dl">' +
							'<dt>' +
							'<img src="' + sendImgUrl + content.restaurantLogo + '"/>' +
							'</dt>' +
							'<dd>' +
							'<span>' + '中国' + '</span>' +
							'<span>China</span>' +
							'</dd>' +
							'</dl>' +
							'<div class="border_color"></div>' +
							'<p class="p1">Pizza hut</p>' +
							'<p class="p2">' + content.restaurantName + '</p>' +
							'</div>')
					});
					//初始化轮播图
					swiper.destroy(false, false);
					swiper = new Swiper('.swiper-container', {
						loop: true,
						slideToClickedSlide: true,
						loopAdditionalSlides: 0,
						loopedSlides: data.list.length,
						pagination: '.swiper-pagination',
						effect: 'coverflow',
						grabCursor: true,
						centeredSlides: true,
						slidesPerView: 'auto',
						autoplay: 2000,
						autoplayDisableOnInteraction: false,
						observer: true, //修改swiper自己或子元素时，自动初始化swiper
						observeParents: true, //修改swiper的父元素时，自动初始化swiper
						coverflow: {
							rotate: 25,
							stretch: 100,
							depth: 150,
							modifier: 1,
							slideShadows: true
						},
						onDestroy: function(swiper) {},
						onClick: function(swiper, event) {
							//鼠标点击停止播放
							swiper.stopAutoplay()
							$('.detail').fadeIn()
							console.log(swiper.activeIndex)
							var restaurantId = $('.swiper-slide').eq(swiper.activeIndex).attr('restaurantId')
							$.each(data.list, function(index, content) {
								if(restaurantId == content.restaurantId) {
									detailData = content
								}
							});
							if(detailData.restaurantType == '1') {
								detailData.style = '中餐'
							} else {
								detailData.style = '西餐'
							}
							$('.detail_main .left img').attr('src', sendImgUrl + detailData.restaurantLogo);
							$('.detail .p1').html(detailData.restaurantName)
							$('.detail_main .right .top .p3').html('&nbsp;&nbsp;&nbsp;&nbsp;' + detailData.introduction)
							$('.detail_main .right .center').html('')
							$('.detail_main .right .center').append('<li>' +
								'<span>电话 The phone</span>' +
								'<span>' + detailData.phone + '</span>' +
								'</li>' +
								'<li>' +
								'<span>地址 address</span>' +
								'<span>' + detailData.address + '</span>' +
								'</li>' +
								'<li>' +
								'<span>公众号 weixin</span>' +
								'<span>' + detailData.weixin + '</span>' +
								'</li>' +
								'<li>' +
								'<span>类型 style</span>' +
								'<span>' + detailData.style + '</span>' +
								'</li>');
							$('.detail_main .right .bottom dt img').attr('src', 'http://open.weixin.qq.com/qr/code/?username=' + detailData.weixin)

						},

					});

				} else {

				}
			},
			error: function() {
				console.log('error')
			}
		});
	}

	//地图搜索
	function getMap(like) {
		var params = {
			exhibitionId: 1,
			'like': like
		}
		$.ajax({
			url: sendUrl + "/lujingjilu/queryExhibitorAndRestaurantViewByExhibitionIdAndLike",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				$('#search .list').html('')
				$.each(data.list[0].exhibitorsList, function(index, content) {
					$('#search .list').append('<li exhibitorsId="'+content.exhibitorsId+'" type="'+content.type+'">' + content.exhibitorsName + '</li>')
				});
				$.each(data.list[0].restaurantList, function(index, content) {
					$('#search .list').append('<li exhibitorsId="'+content.restaurantId+'" type="'+content.type+'">' + content.restaurantName + '</li>')
				});
			}
		})
	}

	var swiper = new Swiper('.swiper-container', {

	});

	//我的路线点击
	var p1Flag = ''
	$('#way .way_p1').click(function() {
		if(p1Flag) {
			$('#way_list').fadeToggle();
		}
	})
	//我的路线拖动
	$('#way .way_p1').mousedown(function(event) {
		p1Flag = true;
		var isMove = true;
		var abs_x = event.pageX - $('#way').offset().left;
		var abs_y = event.pageY - $('#way').offset().top;
		$(document).mousemove(function(event) {
			var x = event.pageX - abs_x;
			var y = event.pageY - abs_y;
			if(x < 35) {
				x = 35
			}
			if((x + 110) > $(window).width()) {
				x = $(window).width() - 110
			}
			if(y < 30) {
				y = 30
			}
			if(y + $('#way_list').height() + 130 > $(window).height()) {
				y = $(window).height() - $('#way_list').height() - 130
			}
			if(isMove) {
				var obj = $('#way');
				obj.css({
					'left': x,
					'top': y
				});
			}
			p1Flag = false;
		}).mouseup(
			function() {
				isMove = false;
			}
		);
	});

	//详情关闭按钮
	$('.btn_detail').click(function() {
		swiper.startAutoplay()
		$('.detail').fadeOut()
	})
	var pinPaiFlag, eatFlag, mapFlag = true,
		lineFlag, serviceFlag;
	//底部dl点击事件
	$.each($('#bom_nav .nav dl'), function(index, content) {
		$(this).click(function(event) {
			var params = {
			'exhibitionId': 1
		}
		$.ajax({
			url: sendUrl + "/lujingjilu/queryServiceByExhibitionId",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				if(data.success){
					$.each(data.list, function(index1,content1) {
						setRgb(content1.modelName,{'r':1,'g':1,'b':1})
						removeSprite(content1.modelName)
					});
				}
				
			}
		})
		$('#min-detail').fadeOut()
			swiper.removeAllSlides();
			//隐藏详情
			$('.detail').fadeOut();
			//隐藏二维码
			$('#wxcode').fadeOut();
			$('#banner').fadeOut();
			$(this).addClass('active').siblings().removeClass('active');
			if(serviceFlag) {
				$('#service_list').fadeOut()
				$('#search').fadeOut()
			}
			console.log(index)
			//品牌
			if(index == 0) {
				$('#search_ipt').val('')
				pinPaiFlag = true;
				eatFlag = false;
				mapFlag = false;
				lineFlag = false;
				serviceFlag = false;
				$('#box-3d').fadeOut()
				$('#banner').fadeIn();
				getPinPai('');
			}
			//餐饮
			if(index == 1) {
				$('#search_ipt').val('')
				pinPaiFlag = false;
				eatFlag = true;
				mapFlag = false;
				lineFlag = false;
				serviceFlag = false;
				$('#box-3d').fadeOut()
				$('#banner').fadeIn();
				getCanYin('');
			}
			//地图
			if(index == 2) {
				pinPaiFlag = false;
				eatFlag = false;
				mapFlag = true;
				lineFlag = false;
				serviceFlag = false;
				$('#box-3d').fadeIn()
				removeSprite('box461')
				if(line){
					scene.remove(line)
				}
			}
			//路线
			if(index == 3) {
				pinPaiFlag = false;
				eatFlag = false;
				mapFlag = false;
				lineFlag = true;
				serviceFlag = false;
				event.stopPropagation()
				$('#box-3d').fadeIn()
				$('#wxcode').fadeIn()
			}
			//服务
			if(index == 4) {
				$('#search_ipt').val('')
				pinPaiFlag = false;
				eatFlag = false;
				mapFlag = false;
				lineFlag = false;
				serviceFlag = true;
				$('#box-3d').fadeIn()
				$('#service_list').fadeIn()
			}
		})
	});
	//屏幕点击微信二维码消失
	$('body').click(function() {
		$('#wxcode').fadeOut()
	})

	//键盘点击事件
	$.each($('#keyboard .left li'), function() {
		$(this).click(function(event) {
			$('.detail').hide();
			var str = $('#search_ipt').val()
			str += $(this).text()
			$('#search_ipt').val(str)
			str = str.toLowerCase()

			if(serviceFlag) {
				$('#search').fadeIn()
				$('#search_ipt').val(str)
			}
			if(pinPaiFlag) {
				getPinPai(str);
			}
			if(eatFlag) {
				getCanYin(str);
			}
			if(mapFlag) {
				$('#search').fadeIn()
				getMap(str);
			}
		});
		//点击变色
		var that = this;
		getColor(that)
	});

	//键盘删除按钮点击
	$('#keyboard .right span').eq(0).click(function() {
		$('.detail').fadeOut();
		var str = $('#search_ipt').val();
		str = str.substr(0, str.length - 1)
		$('#search_ipt').val(str)
		if(str == '') {
			$('#search').fadeOut()
		}
		getColor(this)
		if(pinPaiFlag) {
			str = str.toLowerCase()
			getPinPai(str);
		}
		if(eatFlag) {
			str = str.toLowerCase()
			getCanYin(str);
		}
		if(mapFlag) {
			str = str.toLowerCase()
			getMap(str);
		}
	})
	//键盘清空按钮点击
	$('#keyboard .right span').eq(1).click(function() {
		$('.detail').fadeOut();
		$('#search_ipt').val('')
		$('#search').fadeOut()
		getColor(this)
		if(pinPaiFlag) {
			getPinPai('');
		}
		if(eatFlag) {
			getCanYin('');
		}
	})
	//添加路线点击
	var exhibitorNames = [];
	var types = [];
	var exNames = [];
	$('.detail_main .bottom dd').eq(2).click(function(event) {
		console.log(event)
		getColor(this)
		$('#addFuHao').css({
			left: event.pageX,
			top: event.pageY,
			'display': 'block'
		})
		console.log($('#way .way_p1').offset().top)
		//加号动画
		$('#addFuHao').stop().animate({
			left: $('#way .way_p1').offset().left + 28,
			top: $('#way .way_p1').offset().top + 28
		}, 1000, 'swing', function() {
			$('#addFuHao').hide()
			var addFlag = true;
			exhibitorNames = [];
			types = [];
			exNames = [];
			console.log(detailData)
			$.each($('#way_list .nav li'), function(index, content) {
				console.log(111111111)
				console.log($(this).find('span').eq(1))
				exhibitorNames.push($(this).find('span').eq(1).attr('exId'))
				types.push($(this).find('span').eq(1).attr('type'))
				exNames.push($(this).find('span').eq(1).text())
				if(detailData.exhibitorsName == $(this).find('span').eq(1).text()) {
					addFlag = false;
				} else if(detailData.restaurantName == $(this).find('span').eq(1).text()) {
					addFlag = false;
				}
			})
			if(addFlag) {
				if(detailData.type==1){
					$('#way_list .nav').append('<li class="clear">' +
						'<span>' + parseInt($("#way_list .nav li").length + 1) + '</span>' +
						'<span type="' + detailData.type + '" exId="'+detailData.exhibitorsId+'">' + detailData.exhibitorsName + '</span>' +
						'<i class="icon iconfont icon-Emptied removeLine"></i>' +
						'</li>')
					exhibitorNames.push(detailData.exhibitorsId)
					types.push(detailData.type)
					exNames.push(detailData.exhibitorsName)
				}else if(detailData.type==3){
					$('#way_list .nav').append('<li class="clear">' +
						'<span>' + parseInt($("#way_list .nav li").length + 1) + '</span>' +
						'<span type="' + detailData.type + '" exId="'+detailData.restaurantId+'">' + detailData.restaurantName + '</span>' +
						'<i class="icon iconfont icon-Emptied removeLine"></i>' +
						'</li>')
					exhibitorNames.push(detailData.restaurantId)
					types.push(detailData.type)
					exNames.push(detailData.restaurantName)
				}

			}
			console.log(types)
		})
	})
	//我的路线删除按钮点击事件
	$('body').on('click','#way_list .nav .removeLine',function(){
		console.log($(this).parent().index())
		if(exhibitorNames[0] == daoshiji) {
			exhibitorNames.shift(daoshiji)
		}
		console.log(exhibitorNames)
		var i = $(this).parent().index();
		exhibitorNames.splice(i, 1);
		exNames.splice(i,1)
		types.splice(i, 1);
		$(this).parent().remove();
		console.log(exhibitorNames)
		$('#way_list .nav').text('')
		$.each(exhibitorNames, function(index1, content1) {
			$('#way_list .nav').append('<li class="clear">' +
				'<span>' + parseInt($("#way_list .nav li").length + 1) + '</span>' +
				'<span type="' + types[index1] + '" exid="'+exhibitorNames[index1]+'">' + exNames[index1] + '</span>' +
				'<i class="icon iconfont icon-Emptied removeLine"></i>' +
				'</li>')
		});
	})
	
	
	var daoshiji = 'box461';
	//快带我去点击
	$('.detail_main .bottom dd').eq(1).click(function(event) {
		var exhibitorNames1 = [];
		var types1 = [];
		if(pinPaiFlag){
			exhibitorNames1.push(detailData.exhibitorsId)
		}else if(eatFlag){
			exhibitorNames1.push(detailData.restaurantId)
		}
		
		types1.push(detailData.type)
		if(exhibitorNames1[0] != 'box461') {
			exhibitorNames1.unshift(daoshiji)
		}
		getColor(this)
		var params = {
			'exhibitionId': 1,
			'exhibitorNames': exhibitorNames1,
			'types': types1
		}
		$.ajax({
			url: sendUrl + "/lujingjilu/queryByExhibitionIdAndKaishixunluIdAndJieshuxunluId",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				if(data.list.length!=0){
					$('#min-detail').hide()
					var lineArr = data.list[0].lujinjihe.split(',')
					$('#bom_nav .nav dl').eq(2).click()
					removeSprite('box461')
					setSp('box461', 20, 20, 10, 'img/here1.png')
					Road(lineArr)
				}
				
			}
		})
	})
	//我的路线导航点击
	$('#way #way_list .p1').click(function(event) {
		console.log(exhibitorNames)
		if(exhibitorNames[0] != 'box461') {
			exhibitorNames.unshift(daoshiji)
		}

		var params = {
			'exhibitionId': 1,
			'exhibitorNames': exhibitorNames,
			'types': types
		}
		$.ajax({
			url: sendUrl + "/lujingjilu/queryByExhibitionIdAndKaishixunluIdAndJieshuxunluId",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				var lineArr = data.list[0].lujinjihe.split(',')
				$('#bom_nav .nav dl').eq(2).click()
				removeSprite('box461')
				setSp('box461', 20, 20, 10, 'img/here1.png')
				Road(lineArr)
			}
		})
	})
	//小详情弹窗,第一个按钮
	var tanBox = ''
	$('#min-detail .detail-box span').eq(0).click(function() {
		$('#min-detail').hide()
		$('#bom_nav .nav dl').eq(2).click()
		removeSprite('box461')
		setSp('box461', 20, 20, 10, 'img/here1.png')
		Road(['box461', tanBox])
	})
	//小详情弹窗,第二个按钮
	$('#min-detail .detail-box span').eq(1).click(function() {
		$('.detail').show()
		$('.detail').css({
			'z-index': 1111
		})
	})
	//小详情关闭按钮
	$('.detail-box .close').click(function() {
		$('#min-detail').fadeOut()

	})
	//按钮点击变色
	function getColor(element) {
		//点击变色
		var that = element;
		$(element).mousedown(function() {
			$(element).css({
				color: '#fff',
				background: '#F5B179'
			})
		})
		$('body').mouseup(function() {
			$(that).css({
				color: '#5f5f5f',
				background: '#fff'
			})
		})
	}

	//获取小详情弹窗信息
	function getMinDetail(modelName) {
		tanBox = modelName;
		var params = {
			'exhibitionId': 1,
			'modelName': modelName
		}
		$.ajax({
			url: sendUrl + "/lujingjilu/queryObjectByModelName",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				if(data.success) {
					detailData = data.list[0].object;
					console.log(detailData)
					$('#min-detail .p1').html(data.list[0].object.exhibitorsName)
					if(data.list[0].object.exhibitorsName) {
						setHeight(tanBox, 0.0005)
						$('#min-detail').fadeIn()
					}
					if(data.list[0].type == 1) {
						$('.detail_main .left img').attr('src', sendImgUrl + data.list[0].object.logo);
						$('.detail .p1').html(data.list[0].object.exhibitorsName)
						$('.detail_main .right .top .p3').html('&nbsp;&nbsp;&nbsp;&nbsp;' + data.list[0].object.chineseSynopsis)
						$('.detail_main .right .center').html('')
						$('.detail_main .right .center').append('<li>' +
							'<span>电话 The phone</span>' +
							'<span>' + data.list[0].object.phone + '</span>' +
							'</li>' +
							'<li>' +
							'<span>传真 fax</span>' +
							'<span>' + data.list[0].object.fax + '</span>' +
							'</li>' +
							'<li>' +
							'<span>邮箱 Email</span>' +
							'<span>' + data.list[0].object.email + '</span>' +
							'</li>' +
							'<li>' +
							'<span>网站 Web site</span>' +
							'<span>' + data.list[0].object.internetSite + '</span>' +
							'</li>');
						$('.detail_main .right .bottom dt img').attr('src', 'http://open.weixin.qq.com/qr/code/?username=' + data.list[0].object.exhibitorsWeixin)
					} else if(data.list[0].type == 2) {
						if(detailData.restaurantType == '1') {
							detailData.style = '中餐'
						} else {
							detailData.style = '西餐'
						}
						$('.detail_main .left img').attr('src', sendImgUrl + detailData.restaurantLogo);
						$('.detail .p1').html(detailData.restaurantName)
						$('.detail_main .right .top .p3').html('&nbsp;&nbsp;&nbsp;&nbsp;' + detailData.introduction)
						$('.detail_main .right .center').html('')
						$('.detail_main .right .center').append('<li>' +
							'<span>电话 The phone</span>' +
							'<span>' + detailData.phone + '</span>' +
							'</li>' +
							'<li>' +
							'<span>地址 address</span>' +
							'<span>' + detailData.address + '</span>' +
							'</li>' +
							'<li>' +
							'<span>公众号 weixin</span>' +
							'<span>' + detailData.weixin + '</span>' +
							'</li>' +
							'<li>' +
							'<span>类型 style</span>' +
							'<span>' + detailData.style + '</span>' +
							'</li>');
						$('.detail_main .right .bottom dt img').attr('src', 'http://open.weixin.qq.com/qr/code/?username=' + detailData.weixin)
					}
				}
			}
		})
	}
	
	//搜索
	$('body').on('click','#search .list li',function(){
		console.log($(this).attr('exhibitorsId'))
		if(tanBox) {
			setHeight(tanBox, 0.000199)
		}
		
		
		
		var params = {
			'exhibitionId': 1,
			'objectId': $(this).attr('exhibitorsId'),
			'type': $(this).attr('type')
		}
		$.ajax({
			url: sendUrl + "/lujingjilu/queryModelAndObjectViewByObjectId",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				if(data.success){
					getMinDetail(data.list[0].modelName)
					// 			var projector = new THREE.Projector();  
						var vector = new THREE.Vector3();  
						var obj = scene.getObjectByName(data.list[0].modelName)
			//			vector = projector.projectVector(vector.setFromMatrixPosition(intersects[0].object.matrixWorld), camera); 
						vector = vector.setFromMatrixPosition(obj.matrixWorld).project(camera)
						  
						var halfWidth = window.innerWidth / 2;  
						var halfHeight = 580;  
						console.log(vector.x * halfWidth + halfWidth)
						var result = {  
						    x: Math.round(vector.x * halfWidth + halfWidth),  
						    y: Math.round(-vector.y * halfHeight + halfHeight)
						};  
						console.log(result)
						$('#min-detail').css({
							left: result.x - 60,
							top: result.y - 160
						})
				}
				
			}
		})
	})
	
	

	//	3D地图
	var container;
	var camera, scene, renderer, controls;
	var loader, loader2, loader3, loader4, loader5;
	var raycaster, container3d;
	var mouse = new THREE.Vector2();
	var clock;
	var timeScale = 1;

	var startMoXins = [];
	var jiBenMoXins = [];
	var ruKouMoXins = [];
	var xunLuMoXins = [];
	var daoShiMoXins = [];
	var jiBen_ruKou = [];
	var ruKou_xunLu = [];
	var daoShi_xunLu = [];

	var box3d = document.getElementById('box-3d')

	init();

	//设置sea参数
	loader = new THREE.SEA3D({
		container: container3d,
		async: true,
		scene: scene,
		runScripts: true,
		autoPlay: false,
		renderer: renderer
	});
	loader2 = new THREE.SEA3D({
		container: container3d,
		async: true,
		scene: scene,
		runScripts: true,
		autoPlay: false,
		renderer: renderer
	});
	loader3 = new THREE.SEA3D({
		container: container3d,
		async: true,
		scene: scene,
		runScripts: true,
		autoPlay: false,
		renderer: renderer
	});
	loader4 = new THREE.SEA3D({
		container: container3d,
		async: true,
		scene: scene,
		runScripts: true,
		autoPlay: false,
		renderer: renderer
	});
	loader5 = new THREE.SEA3D({
		container: container3d,
		async: true,
		scene: scene,
		runScripts: true,
		autoPlay: false,
		renderer: renderer
	});
	//导入sea模型
	loader.load('js/modules/01.sea');
	loader2.load('js/modules/02.sea');
	loader3.load('js/modules/dm.sea');
	loader4.load('js/modules/ml.sea');
	loader5.load('js/modules/Android.sea');
	var tendonsMeshes, organsMeshes, bloodMeshes;
	loader.onComplete = function(e) {
		if(loader.lights == undefined) {
			var p1 = new THREE.PointLight(0xFFFFFF, 1);
			var p2 = new THREE.PointLight(0xFFFFFF, .5);
			var p3 = new THREE.PointLight(0xFFFFFF, .5);
			var p4 = new THREE.PointLight(0xFFFFFF, .5);
			var p5 = new THREE.PointLight(0xFFFFFF, .5);
			var p6 = new THREE.PointLight(0xFFFFFF, .5);
			p1.position.set(-100000, 100000, -100000);
			p2.position.set(100000, 100000, 100000);
			p3.position.set(100000, -100000, 100000);
			p4.position.set(100000, -100000, -100000);
			p5.position.set(-100000, -100000, -100000);
			p6.position.set(-100000, -100000, 100000);
			container3d.add(p1);
			container3d.add(p2);
			container3d.add(p3);
			container3d.add(p4);
			container3d.add(p5);
			container3d.add(p6);
			loader.updateScene();
		}
		if(loader.background) {
			scene.background = loader.background.color || loader.background.texture;
		}
		//更改颜色
		setRgb('box461', {
			r: 250,
			g: 1,
			b: 1
		})
		var objHere = scene.getObjectByName('box461')
		var setp = objHere.position;
		/*导入精灵图片*/
		spName0.scale.set(15, 15);
		spName0.position.set(setp.x, setp.y + 10, setp.z);
		//设置精灵动画
		setInterval(function() {
			var spriteTween = createjs.Tween.get(spName0.position)
				.to({
					x: spName0.position.x,
					y: spName0.position.y + 2,
					z: spName0.position.z
				}, 200)
				.to({
					x: spName0.position.x,
					y: spName0.position.y,
					z: spName0.position.z
				}, 200)
				.to({
					x: spName0.position.x,
					y: spName0.position.y + 2,
					z: spName0.position.z
				}, 200)
				.to({
					x: spName0.position.x,
					y: spName0.position.y,
					z: spName0.position.z
				}, 200)
		}, 2000)
		scene.add(spName0);
		strLoad = loader.meshes

		console.log(loader.meshes)
		focus();
		controls.update();
	};
	loader2.onComplete = function(e) {
		strLoad2 = loader2.meshes
	};
	loader3.onComplete = function(e) {
		bonesMeshes = loader3.meshes;
	};

	loader4.onComplete = function(e) {
		tendonsMeshes = loader4.meshes;
	};

	loader5.onComplete = function(e) {
		organsMeshes = loader5.meshes;
	};

	//贴图相关
	var strLoad = [];
	var strLoad2 = [];
	var flogSp1 = false;
	var flogSp2 = false;
	var flogSp3 = false;

	var spName0 = createSprite('img/here1.png')
	var sP = createSpriteText('南', '', '', 'red');
	var sP2 = createSpriteText('北', '', '', 'red');
	var sP3 = createSpriteText('西', '', '', 'red');
	var sP4 = createSpriteText('东', '', '', 'red');
	sP.scale.set(50, 40, 50);
	sP2.scale.set(50, 40, 50);
	sP3.scale.set(50, 40, 50);
	sP4.scale.set(50, 40, 50);
	sP.position.set(0, 0, 90)
	sP2.position.set(0, 0, -90)
	sP3.position.set(-120, 0, 0)
	sP4.position.set(120, 0, 0)

	scene.add(spName0)
	scene.add(sP)
	scene.add(sP2)
	scene.add(sP3)
	scene.add(sP4)
	//路线初始数据
	var materialTemp = new THREE.LineBasicMaterial({
		color: 0xff0000,
		linewidth: '100',
		linecap: 'round', //ignored by WebGLRenderer
		linejoin: 'round' //ignored by WebGLRenderer
	});

	//新3D
	$('#service').click(function() {
		
//		removeSprite('box461')
//		setSp('box461', 20, 20, 10, 'img/here1.png')
//		Road(['box461', 'box033', 'box1125', 'box134'])
//
//		getShop("js/publicRoad.json")
		
		
		var params = {
			'exhibitionId': 1
		}
		$.ajax({
			url: sendUrl + "/lujingjilu/queryServiceByExhibitionId",
			data: params,
			type: "POST",
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				if(data.success){
					$.each(data.list,function(index,content){
						
						if(content.serviceType == 1){
							var imgFile = 'img/service/s-wc1.png'
						}
						if(content.serviceType == 2){
							var imgFile = 'img/stop.png'
						}
						if(content.serviceType == 3){
							var imgFile = 'img/bus.png'
						}
						if(content.serviceType == 4){
							var imgFile = 'img/atm.png'
						}
						setRgb(content.modelName, {"r":"255","g":"0","b":"1"})
						setSp(content.modelName, 12, 12, 10, imgFile)
						spOpacity('sp' + content.modelName)
						//贴图及文字坐标点
						var ccc = scene.getObjectByName('sp' + content.modelName)
						//贴图及文字动画
						var spriteTween = createjs.Tween.get(ccc.position)
							.to({
								x: ccc.position.x,
								y: ccc.position.y + 2,
								z: ccc.position.z
							}, 200)
							.to({
								x: ccc.position.x,
								y: ccc.position.y,
								z: ccc.position.z
							}, 200)
							.to({
								x: ccc.position.x,
								y: ccc.position.y + 2,
								z: ccc.position.z
							}, 200)
							.to({
								x: ccc.position.x,
								y: ccc.position.y,
								z: ccc.position.z
							}, 200)
						
						
					})
				}
			}
		})

	})
	//底部dl点击事件
	$.each($('#bom_nav .nav dl'), function(index, content) {
		
		$(this).click(function() {
			onWindowResize()
		})
	})

	//创建贴图及文本
	function getShop(url) {
		$.ajax({
			type: "get",
			url: url,
			dateType: "json",
			async: true,
			success: function(date) {
				$('.way-ul').html('');
				$.each(date, function(i) {
					if(i > 0) {
						setRgb(date[i].obj, date[i].num)
						setSp(date[i].obj, date[i].imgSizeX, date[i].imgSizeY, 10, date[i].imgFile)
						createText(date[i].text1, date[i].text2, date[i].obj, date[i].num)
						spOpacity('sp' + date[i].obj)
						spOpacity('text' + date[i].obj)
						//贴图及文字坐标点
						var ccc = scene.getObjectByName('sp' + date[i].obj)
						var ddd = scene.getObjectByName('text' + date[i].obj)
						//贴图及文字动画
						var spriteTween = createjs.Tween.get(ccc.position)
							.to({
								x: ccc.position.x,
								y: ccc.position.y + 2,
								z: ccc.position.z
							}, 200)
							.to({
								x: ccc.position.x,
								y: ccc.position.y,
								z: ccc.position.z
							}, 200)
							.to({
								x: ccc.position.x,
								y: ccc.position.y + 2,
								z: ccc.position.z
							}, 200)
							.to({
								x: ccc.position.x,
								y: ccc.position.y,
								z: ccc.position.z
							}, 200)
						var textTween = createjs.Tween.get(ddd.position)
							.to({
								x: ddd.position.x,
								y: ddd.position.y + 2,
								z: ddd.position.z
							}, 200)
							.to({
								x: ddd.position.x,
								y: ddd.position.y,
								z: ddd.position.z
							}, 200)
							.to({
								x: ddd.position.x,
								y: ddd.position.y + 2,
								z: ddd.position.z
							}, 200)
							.to({
								x: ddd.position.x,
								y: ddd.position.y,
								z: ddd.position.z
							}, 200)
					}
				});
			},
			error: function() {
				console.log(error)
			}
		});
	}

	function Road(lineArr) {
		//判断line
		if(line) {
			//line有值则移除
			scene.remove(line)
		}

		var start = scene.getObjectByName('spbox461')
		console.log(scene.getObjectByName('spbox437'))
		console.log(scene.getObjectByName(lineArr[0]))
		start.position.x = scene.getObjectByName(lineArr[0]).position.x;
		start.position.y = 12;
		start.position.z = scene.getObjectByName(lineArr[0]).position.z;
		console.log(2333)
		spriteTween = createjs.Tween.get(start.position, {
			override: true,
			loop: false,
			_useTicks: true
		})
		var geometry1 = new THREE.Geometry();
		line = new THREE.Line();
		num = 0;
		for(var i = 0; i < lineArr.length; i++) {
			if(lineArr[i] != '') {
				var objA = scene.getObjectByName(lineArr[i])
				//小球显示隐藏
				console.log(objA)
				console.log(objA.geometry.boundingSphere.center)
				geometry1.vertices.push(objA.position);
				spriteTween.to({
					x: objA.position.x,
					y: 12,
					z: objA.position.z
				}, 800)
				console.log(spriteTween)
			}
		}
		line = new THREE.Line(geometry1, materialTemp)
		console.log(line)
		scene.add(line)
	}

	//opacity变化
	function spOpacity(name) {
		var sprite = scene.getObjectByName(name)
		var tween = createjs.Tween.get(sprite.material)
			.to({
				opacity: 0.2
			}, 200)
			.to({
				opacity: 0.4
			}, 200)
			.to({
				opacity: 0.6
			}, 200)
			.to({
				opacity: 0.8
			}, 200)
			.to({
				opacity: 1
			}, 200)
	}

	//路线
	var line = ''

	function wayRoad(lineArr) {
		var geometry = new THREE.Geometry();
		line = new THREE.Line();
		for(var i = 0; i < lineArr.length; i++) {
			var obj = scene.getObjectByName(lineArr[i])
			obj.geometry.computeBoundingSphere();
			obj.material.materials[0].color.setRGB(255, 0, 255)
			geometry.vertices.push(obj.position);
		}

		line = new THREE.Line(geometry, materialTemp)
		//		console.log(line)
		scene.add(line)
	}

	//更改颜色函数
	var num = {
		r: 255,
		g: 0,
		b: 0
	}
	//设置精灵
	function createSprite(imageFile, name) {
		//导入精灵图片
		var texture = new THREE.TextureLoader().load(imageFile);
		var mat = new THREE.SpriteMaterial();
		mat.map = texture; //材质的Map属性用于添加纹理
		mat.needsUpdate = true;
		var sprite = new THREE.Sprite(mat);
		sprite.name = name;
		return sprite;
	}
	//根据obj模型设置精灵
	function setSp(objName, imgSizeX, imgSizeY, height, imgFile) {
		//导入精灵图片
		var texture = new THREE.TextureLoader().load(imgFile);
		var mat = new THREE.SpriteMaterial();
		mat.map = texture; //材质的Map属性用于添加纹理
		mat.needsUpdate = true;
		var sprite = new THREE.Sprite(mat);
		sprite.name = 'sp' + objName;
		var objName = scene.getObjectByName(objName)
		var setp = objName.position;
		console.log(setp)
		sprite.scale.set(imgSizeX, imgSizeY);
		sprite.position.set(setp.x, setp.y + parseInt(height), setp.z);
		sprite.material.transparent = true;
		sprite.material.opacity = 1;
		console.log(sprite)
		scene.add(sprite);
	}
	//移除贴图及文字
	function removeAjax(url){
		$.ajax({
			type:"get",
			url:url,
			dateType:"json",
			async:true,
			success:function(date){
				$.each(date, function(i) {
					if(i>0){
						var num = {r:1,g:1,b:1}
						setRgb(date[i].obj,num)
						removeSprite(date[i].obj)
						removeSphere(date[i].obj)
						removeText(date[i].obj)
					}
				});
				
			},
			error:function(){
				console.log(error)
			}
		});
	}
	//移除贴图
	function removeSprite(objName) {
		scene.getObjectByName('sp' + objName)
		scene.remove(scene.getObjectByName('sp' + objName))
	}
	//移除文本
	function removeText(objName) {
		scene.getObjectByName('text' + objName)
		scene.remove(scene.getObjectByName('text' + objName))
	}
	//移除球体
	function removeSphere(objName) {
		for(var i = 0; i < 15; i++) {
			scene.getObjectByName(objName + i)
			scene.remove(scene.getObjectByName(objName + i))
		}
	}
	//根据obj创建文字贴图
	function createText(text, text2, objName, color) {
		//先用画布将文字画出
		var canvas = document.createElement("canvas");
		canvas.width = 320;
		canvas.height = 256;
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.font = "normal 30px 微软雅黑";
		ctx.lineWidth = 4;
		ctx.textAlign = 'left';
		ctx.fillText(text, 140, 120);
		ctx.font = "normal 22px 微软雅黑";
		ctx.textAlign = 'center';
		ctx.fillText(text2, 180, 150);
		ctx.closePath();

		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;

		//使用Sprite显示文字
		var material = new THREE.SpriteMaterial({
			map: texture
		});
		var textObj = new THREE.Sprite(material);
		//文字缩放比例x,y,z
		textObj.name = 'text' + objName;
		var objName = scene.getObjectByName(objName)
		var setp = objName.position;
		//文字加入场景
		textObj.scale.set(22, 20, 22);
		textObj.position.set(setp.x, setp.y + 10.1, setp.z);
		scene.add(textObj)
	}

	//	更改高度
	function setHeight(name, height) {
		var obj = scene.getObjectByName(name)
		console.log(obj)
		//		obj.material[0].color.setRGB(num.r,num.g,num.b)
		obj.scale.y = height;
	}
	//设置颜色
	function setRgb(name, num) {
		var obj = scene.getObjectByName(name)
		console.log(obj)
		obj.material[0].color.setRGB(num.r,num.g,num.b)
		//赋予新材质改变颜色，有阴影等效果
//		obj.material = new THREE.MeshPhongMaterial({
//			color: 0xff00ff
//		});
	}
	//创建文字贴图
	function createSpriteText(text, text2, name, color) {
		//先用画布将文字画出
		var canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.font = "normal 30px 微软雅黑";
		ctx.lineWidth = 4;
		ctx.fillText(text, 90, 100);

		ctx.font = "normal 20px 微软雅黑";
		ctx.fillText(text2, 125, 130);

		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;

		//使用Sprite显示文字
		var material = new THREE.SpriteMaterial({
			map: texture
		});
		var textObj = new THREE.Sprite(material);
		//文字缩放比例x,y,z
		textObj.scale.set(10, 5, 10);
		textObj.position.set(0, 0, 98);
		textObj.name = name;
		return textObj;
	}
	var bbox;

	function focus() {
		bbox = new THREE.Box3().setFromObject(container3d);
		var cx = bbox.min.x + (bbox.max.x - bbox.min.x) * .5;
		var cy = bbox.min.y + (bbox.max.y - bbox.min.y) * .5;
		var cz = bbox.min.z + (bbox.max.z - bbox.min.z) * .5;
		var sub = new THREE.Vector3().subVectors(bbox.max, bbox.min)
		var dist = Math.max(sub.x, sub.y, sub.z);
		var radius = dist * Math.sqrt(.5);
		camera.near = dist / 1000;
		camera.far = dist * 200;
		camera.updateProjectionMatrix();
		//调整摄像机的位置
		camera.position.set(1.2216374967811707, 100.60354859064611, 168.1973998977555);
		container3d.position.set(-cx, -cy, -cz);
		controls.update();
	}
	//更新
	function update() {
		var delta = clock.getDelta() * timeScale;
		requestAnimationFrame(update);
		THREE.AMMO.update(delta);
		THREE.SEA3D.ScriptHandler.dispatchUpdate(delta);
		THREE.SEA3D.AnimationHandler.update(delta);
		renderer.render(scene, camera);
	}

	//加载渲染
	function init() {
		THREE.AMMO.init();
		scene = new THREE.Scene();
		container = document.createElement('div');

		box3d.appendChild(container);
		camera = new THREE.PerspectiveCamera(55, box3d.clientWidth / box3d.clientHeight, 200, 2000); //模型太大，导致在SEA
		controls = new THREE.OrbitControls(camera, box3d);
		//禁用滚轮放大缩小
		//      controls.enableZoom = false;
		//禁用旋转
		//      controls.enableRotate = false;
		container3d = new THREE.Object3D();
		scene.add(container3d);
		raycaster = new THREE.Raycaster();
		//camera.position.set( 300, 300,300 );
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setPixelRatio(box3d.devicePixelRatio);
		renderer.setSize(box3d.clientWidth, box3d.clientHeight);
		//renderer.setClearColor( 0x4F145F, 1 );
		renderer.setClearColor(0xeeeeee, 1);
		renderer.shadowMap.enabled = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.toneMappingExposure = 3;
		renderer.toneMappingWhitePoint = 5;
		renderer.toneMapping = THREE.Uncharted2ToneMapping;
		container.appendChild(renderer.domElement);
		clock = new THREE.Clock();
		//获取canvas，有效范围canvas
		var can = document.getElementsByTagName('canvas')[0]
		//监听canvas的鼠标按下事件，旋转视角
		can.addEventListener('mousedown', onDocumentMouseDown, false);
		//鼠标弹起停止旋转
		can.addEventListener('mouseup', onDocumentMouseUp, false);
		//		can.addEventListener('mouseleave',onDocumentMouseLeave, false);
		window.addEventListener('resize', onWindowResize, false);
		update();
	}

	//鼠标点击事件渲染函数
	var INTERSECTED = null;

	function render() {
		//		requestAnimationFrame( render );
		camera.updateMatrixWorld();
		//光线碰撞

		//光线碰撞位置正确
		var canvas = document.getElementById('box-3d');
		var width = document.getElementById('box-3d').clientWidth;
		var height = document.getElementById('box-3d').clientHeight;
		var rect = canvas.getBoundingClientRect();
		var x = event.clientX - rect.left; // left offset
		var y = event.clientY - rect.top; //top offset
		mouse.x = (x / width) * 2 - 1;
		mouse.y = -(y / height) * 2 + 1;
		var ray = new THREE.Raycaster();
		ray.setFromCamera(mouse, camera);
		scene.updateMatrixWorld();
		

		//		raycaster.setFromCamera( mouse, camera );
		var intersects = ray.intersectObjects(scene.children, true);
		if(intersects.length > 0) {
			console.log(intersects)
			console.log(intersects[0].object) //捕获鼠标点击的模型
			
			
// 			var projector = new THREE.Projector();  
//			var vector = new THREE.Vector3();  
////			vector = projector.projectVector(vector.setFromMatrixPosition(intersects[0].object.matrixWorld), camera); 
//			vector = vector.setFromMatrixPosition(intersects[0].object.matrixWorld).project(camera)
//			  
//			var halfWidth = window.innerWidth / 2;  
//			var halfHeight = 580;  
//			console.log(vector.x * halfWidth + halfWidth)
//			var result = {  
//			    x: Math.round(vector.x * halfWidth + halfWidth),  
//			    y: Math.round(-vector.y * halfHeight + halfHeight)
//			};  
//			console.log(result)
//			$('#min-detail').css({
//				left: result.x - 60,
//				top: result.y - 160
//			})
			
			//小详情弹窗
			if(intersects[0].object.name.indexOf("box") >= 0) {
				getMinDetail(intersects[0].object.name)
			}

			if(intersects[0].object.name == 'box437') {
				removeSprite('box437')
				removeText('box437')
				setRgb('box437', {
					r: 255,
					g: 1,
					b: 1
				})
				setSp('box437', 24, 12, "img/draw.png")
				createText('艺术中心', 'welcome', 'box437', {
					r: 255,
					g: 1,
					b: 1
				})
				spOpacity('spbox437')
				spOpacity('textbox437')
			} else {
				removeSprite('box437')
				removeText('box437')
				setRgb('box437', {
					r: 1,
					g: 1,
					b: 1
				})
			}
			if(intersects[0].object.type == 'Sprite' && intersects[0].object.name != undefined && intersects[0].object.name != '') {
				if(INTERSECTED != intersects[0].object) {
					INTERSECTED = intersects[0].object
					INTERSECTED.visible = false;

					$('#draw-detail').slideDown()
					//判断line
					if(line) {
						//line有值则移除
						scene.remove(line)
					}
					//移除路线贴图
				}
			}
		} else {
			INTERSECTED = null;
		}
		renderer.render(scene, camera);
	}

	//监听点击事件函数
	function onDocumentMouseDown(event) {
		event.preventDefault();
		console.log(event)
		$('#min-detail').hide()
		if(tanBox) {
			setHeight(tanBox, 0.000199)
		}
		$('#min-detail').css({
			left: event.pageX - 60,
			top: event.pageY - 160
		})
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		console.log(event.pageX)
		//鼠标按下可以旋转
		//      controls.enableRotate = true;
		//      render()
	}

	function onDocumentMouseUp(event) {
		event.preventDefault();
		//鼠标弹起禁止旋转
		//      controls.enableRotate = false;
		//鼠标弹起相机位置
		console.log(camera.position)
		render()
	}

	//监听窗口改变
	function onWindowResize() {
		camera.aspect = box3d.clientWidth / box3d.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(box3d.clientWidth, box3d.clientHeight);
	}
	
})