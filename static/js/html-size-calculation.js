// Javascript code
/*
 * author: 小小游 --- allen
 * date: 2019.07.29
 * lastUpdateDate: 2019.07.29
 * description: 针对不同分辨率计算font-size，监听浏览器更改 html的font-size，
 *             可以配合css预处理工具计算rem的值。 sass、less 、stylus等等
 */
( function ( doc, win ) {
	let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			let clientWidth = docEl.clientWidth;
			if ( !clientWidth ) return;
			docEl.style.fontSize = 16 * ( clientWidth / 320 ) + 'px';
		};
	if ( !doc.addEventListener ) return;
	win.addEventListener ( resizeEvt, recalc, false );
	doc.addEventListener ( 'DOMContentLoaded', recalc, false );
}) ( document, window );
