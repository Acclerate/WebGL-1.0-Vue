/**/﻿_jsload&&_jsload('simpleInfowindow', '(function(i){var kD=i.Utils;var T=kD.format;var e={prefix:"BMap_simple_bubble",windowOffset:[0,0],contentStyle:"display:block",centerStyle:"z-index:3;position:relative;",popStyle:"position:absolute;display:none;cursor:default;;background-color:#fff",bottomStyle:"display:block;z-index:2;position:absolute;width:16px;",tailShadowUrl:E.imgPath+"tail_shadow.png",tailShadowUrlSrcset:E.imgPath+"tail_shadow2x.png 2x",tailShadowStyle:"width:16px;height:10px;position:absolute;",tailShadowWidth:16,tailShadowHeight:10};if(FeBrowser.ie<=8&&FeBrowser.ie>0){e.tailShadowUrl=E.imgPath+"tail_noshadow.png"}e.simpleInfoWindowDomTemplate=T([\'<div class="{prefix}_pop" style="{popStyle}">\',\'<div class="{prefix}_center" style="{centerStyle}">\',\'<div class="{prefix}_content" style="{contentStyle}">\',"</div>","</div>",\'<div class="{prefix}_bottom" style="{bottomStyle}">\',\'<img src="{tailShadowUrl}" srcset="{tailShadowUrlSrcset}" style="{tailShadowStyle}">\',"</div>","</div>"],e);function kC(kH,kF){for(var kG=0,kE=kH.length;kG<kE;++kG){if(kH[kG].className===e.prefix+"_"+kF){return kH[kG]}}}e9.extend(io.prototype,{initialize:function(kF){var kG=this.map=kF.map;this.overlay=kF;this.render();this._bind();this.setContent();this.redraw(null,true);var kE=kG.simpleInfoWindowDoms;if(kE){if(kF.toString()==="Marker"){kE.marker=kF}else{kE.marker=null}}},render:function(){var kH=this.map;var kG=kH.simpleInfoWindowDoms;if(!kG){kG=kH.simpleInfoWindowDoms={};kH.simpleInfoWindow=kH.simpleInfoWindowDoms;var kF=e.simpleInfoWindowDomTemplate;bS(kH.platform,kF);if(kH.platform.lastChild.className===""){kH.platform.removeChild(kH.platform.lastChild)}kG.popDom=kH.platform.lastChild;var kE=kG.popDivs=kG.popDom.getElementsByTagName("DIV");kG.contentMain=kC(kE,"content");kG.contentDiv=kC(kE,"content");kG.centerDiv=kC(kE,"center");kG.bottomDiv=kC(kE,"bottom")}kG.hashCode=kG.popDom.hashCode=this.hashCode},_bind:function(){var kG=this;var kI=kG.map;var kH=kI.simpleInfoWindowDoms;var kE=kH.popDom;var kF=["mousedown","mouseout","mouseover","click","keydown","selectstart"];e9.each(kF,function(kJ){e9.on(kE,kJ,al)});e9.on(kE,"dblclick",hI);e9.on(kE,"contextmenu",hI);if(window.addEventListener){kE.addEventListener("DOMMouseScroll",al,false)}kE=kH=null},_setWinSize:function(kG,kE){var kF=this._config;kG=kG||kF.width;kE=kE||kF.height;if(kE<0){kE=0}this.pShowWidth=kG;this.pShowHeight=kE;this.setPosition()},setWidth:function(kE){kE=kE*1;if(!kE&&kE!==0||isNaN(kE)||kE<0){return}if(kE!==0){if(kE<50){kE=50}if(kE>730){kE=730}}this._config.width=kE;if(this._isMyDom()&&this.isOpen()){var kF=this;this.redraw(function(){kF.setPanToWithDelay()})}},setHeight:function(kE){kE=kE*1;if(!kE&&kE!==0||isNaN(kE)||kE<0){return}if(kE!==0){if(kE<50){kE=50}if(kE>650){kE=650}}this._config.height=kE;var kG=this.map;if(this._isMyDom()&&this.isOpen()){if(this._config.width!==0){kG.simpleInfoWindowDoms.contentDiv.style.width=this._config.width+"px"}var kF=this;this.redraw(function(){kF.setPanToWithDelay()})}},setContent:function(kF){kF=kF||this.content;var kG=this.map;this.content=kF;if(!this._isMyDom()){return}var kE=kG.simpleInfoWindowDoms.contentDiv;kE.innerHTML=kF;if(this._config.width!==0){kE.style.width=this._config.width+"px"}kE.style.display="block"},redraw:function(kL,kJ){if(!this._isMyDom()){return}if(!kJ&&!this.isOpen()){return}kL=kL||function(){};var kG=this;var kI=100;var kH=kG.map.simpleInfoWindow;var kN=kH.contentDiv.style;var kE=kH.contentMain.style;kN.width=kE.width="auto";kN.height=kE.height="auto";kN.whiteSpace="nowrap";if(kH.popDom.style.display==="none"){kH.popDom.style.visibility="hidden";this.show()}var kK=kH.contentMain.scrollWidth||0;kK=kG._config.width===0?kK:kG._config.width;kK=kK<50?50:kK;kK=kK>600?600:kK;kE.width=kK+"px";var kF;kF=kH.contentMain.scrollHeight||0;kF=kG._config.height===0?kF:kG._config.height;kG._setWinSize(kK,kF);if(this.isOpen()){kM()}else{setTimeout(kM,kI)}function kM(){kN.whiteSpace="";kE.overflowX=(kG._config.width===0)?"hidden":"auto";kE.overflowY=(kG._config.height===0)?"hidden":"auto";kF=kH.contentMain.scrollHeight||0;kF=kG._config.height===0?kF:kG._config.height;kF=kF<50?50:kF;kF=kF>440?440:kF;kG._setWinSize(kK,kF);kH.popDom.style.visibility="";kE.height=kF+"px";kH.centerDiv.style.height=kF+"px";kH.bottomDiv.style.width=kK+"px";kH.centerDiv.style.width=kK+"px";kH.popDom.style.width=kK+"px";kG.dispatchEvent(new fW("onresize"));kG.setPanToWithDelay();kL()}},setPosition:function(kI,kJ){if(!this._isMyDom()){return}var kE=this.map.simpleInfoWindowDoms;var kF=this.overlay;var kH=this.map.pointToOverlayPixelIn(kF.getPoint(),{zoom:kJ,center:kI});var kG=kF.getIcon();if(kH.onBack||kH.outOfFrustum){e9.hide(kE.popDom);return}if(this._visible===true){e9.show(kE.popDom)}var kK=new fv(kH.x-kG.offset.width+kG.infoWindowOffset.width+kF.getOffset().width+this._config.offset.width,kH.y-kG.offset.height+kG.infoWindowOffset.height+kF.getOffset().height+this._config.offset.height);kE.popDom.style.left=-this.pShowWidth/2+kK.x+e.windowOffset[0]+"px";kE.popDom.style.top=-this.pShowHeight+kK.y-e.tailShadowHeight+e.windowOffset[1]+"px";kE.bottomDiv.style.left=this.pShowWidth/2-e.tailShadowWidth/2+"px"},setPanToWithDelay:function(kE){var kF=this;setTimeout(function(){kF.setPanTo()},kE||200)},setPanTo:function(){if(!this.overlay||!this.overlay.getPoint()||!this._config.enableAutoPan||!this._isMyDom()){return}var kV=this.map;var kM=kV.simpleInfoWindowDoms;var kG=kM.popDivs;var kW=kM.popDom;if(!kG||!kW){return}var kO;var kH=parseInt(kC(kG,"content").style.width,10)+2;var kS=parseInt(e9.Dom.getComputedStyle(kC(kG,"center"),"height"))+parseInt(e9.Dom.getComputedStyle(kC(kG,"bottom"),"height"));var kQ=parseFloat(kW.style.left,10);var kJ=parseFloat(kW.style.top,10);if(this.map._renderType==="webgl"){kQ+=parseInt(this.map.platform.style.left,10);kJ+=parseInt(this.map.platform.style.top,10)}else{kQ+=this.map.offsetX;kJ+=this.map.offsetY}var kL=new fv(kQ,kJ);var kK=new fv(kH+kQ,kS+kJ);var kT,kR;if(this._config.height!==0&&document.all){if(!kV.temp.infoKey){kV.temp.infoKey=-1}kT=-kV.temp.infoKey;kV.temp.infoKey=-kV.temp.infoKey}kT=0;kR=0;var kE=10;var kF=this._config.margin[0];var kI=this._config.margin[1];var kU=this._config.margin[2];var kN=this._config.margin[3];if(kL.x<kN){kT=-kL.x+kN}if(kL.y<kF){kR=-kL.y+kF}if(kK.x>kV.width-kI){kT=kV.width-kK.x-kI}if(kK.y>kV.height-kU){kR=kV.height-kK.y-kU}this._loadCollisions();var kP=this._config.collisions;if(kL.x<kP[0][0]&&kL.y<kP[0][1]){if(Math.abs(-kL.x+kP[0][0])<Math.abs(-kL.y+kP[0][1])){kT=-kL.x+kP[0][0]}else{if(kV.height-kP[0][1]-kP[3][1]<kS){kT=-kL.x+kP[0][0]}else{kR=-kL.y+kP[0][1]}}if(kV.width-kP[0][0]-kP[1][0]<kH&&kL.y<kP[1][1]){kR=-kL.y+kP[1][1]}}if(kK.x>kV.width-kP[1][0]&&kL.y<kP[1][1]){if(Math.abs(-kK.x+kV.width-kP[1][0])<Math.abs(-kL.y+kP[1][1])&&kV.width-kP[0][0]-kP[1][0]>=kH){kT=-kK.x+kV.width-kP[1][0]}else{kR=-kL.y+kP[1][1];if(kV.width-kP[0][0]-kP[1][0]<kH&&kV.width-kP[0][0]<kH){kT=-kL.x+kP[0][0]}}}if(kL.x<kP[3][0]&&kK.y>kV.height-kP[3][1]){if(Math.abs(-kL.x+kP[3][0])<Math.abs(-kK.y+kV.height-kP[3][1])&&(Math.abs(-kL.x+kP[3][0])<Math.abs(kR)&&kR!==0||kR===0)&&kV.width-kP[3][0]>=kH){kT=-kL.x+kP[3][0]}else{kR=-kK.y+kV.height-kP[3][1]}if(kV.height-kP[0][1]-kP[3][1]<kS&&kL.x<kP[0][0]){kT=-kL.x+kP[0][0]}}if(kK.x>kV.width-kP[2][0]&&kK.y>kV.height-kP[2][1]){if(Math.abs(-kK.x+kV.width-kP[2][0])<Math.abs(-kK.y+kV.height-kP[2][1])&&(Math.abs(-kK.x+kV.width-kP[2][0])<Math.abs(kR)&&kR!==0||kR===0)&&kV.width-kP[0][0]-kP[1][0]>=kH){kT=-kK.x+kV.width-kP[2][0]}else{if(kV.height-kP[1][1]-kP[2][1]>=kS){kR=-kK.y+kV.height-kP[2][1]}else{kR=-kL.y+kP[1][1]}if(kV.width-kP[0][0]-kP[2][0]<kH){kT=-kL.x+kP[0][0]}}}if(kT!==0||kR!==0){kV.panBy(kT,kR,{point:this.getPoint()})}},_loadCollisions:function(){if(!this.map){return}var kF=this.map;this._config.collisions=[[10,10],[10,10],[10,10],[10,10]];var kO=this.map.container;for(var kM=0,kG=kO.children.length;kM<kG;kM++){var kJ,kP,kS=!!(typeof kO.children[kM]._anchor!="undefined"&&kO.children[kM]._offset);if(kO.children[kM]._jsobj&&kO.children[kM]._jsobj instanceof gZ&&kO.children[kM]._jsobj.blockInfoWindow===true){kJ=kO.children[kM]}else{if(kS){kJ=kO.children[kM]}else{continue}}var kQ=kJ.offsetWidth,kN=kJ.offsetHeight,kE=kJ._jsobj,kI,kL;if(!kE||kS){if(typeof kJ._anchor!="undefined"&&kJ._offset&&cq(kJ).display!="none"&&cq(kJ).visibility!="hidden"){kI=kJ._offset;kL=kJ._anchor}else{continue}}else{if(kE.isVisible()===false){continue}kI=kE.getOffset();kL=kE.getAnchor()}switch(kL){case BMAP_ANCHOR_TOP_LEFT:kP=0;break;case BMAP_ANCHOR_TOP_RIGHT:kP=1;break;case BMAP_ANCHOR_BOTTOM_LEFT:kP=3;break;case BMAP_ANCHOR_BOTTOM_RIGHT:kP=2;break;default:break}var kK=kQ+kI.width+10,kH=kN+kI.height+10,kR=this._config.collisions[kP];this._config.collisions[kP]=[kK>kR[0]?kK:kR[0],kH>kR[1]?kH:kR[1]]}},show:function(){this._visible=true;if(!this._isMyDom()){return}var kF=this.map.simpleInfoWindowDoms;if(kF.popDom.style.display!="none"){return}e9.show(kF.popDom);var kE=new fW("onopen");kE.point=this.getPoint();this.dispatchEvent(kE);this.redraw()},hide:function(){this._visible=false;if(!this._isMyDom()){return false}var kF=this.map.simpleInfoWindowDoms;if(kF.popDom.style.display=="none"){return false}if(this._config.onClosing()===false){return false}e9.hide(kF.popDom);var kE=new fW("onclose");kE.point=this.getPoint();this.dispatchEvent(kE);this.map.removeEventListener("click",this.map.temp._clickCloseHandler);this.map.temp._clickCloseBinded=false;this.decontrol();return true},isOpen:function(){if(!this.map){return false}var kE=this.map.temp.infoWin;if(!kE){return false}if(!this._isMyDom()){return false}if(kE&&kE.overlay===this.overlay&&this.map.simpleInfoWindowDoms&&this.map.simpleInfoWindowDoms.popDom.style.display=="none"){return false}else{return true}},_revert:function(){if(!this._isMyDom()){return}var kE=this.map.simpleInfoWindowDoms;kE.contentDiv.innerHTML="";kE.maxContentDiv.innerHTML=""},_setOverflow:function(){var kG=this.map;if(!this._isMyDom()){return}var kF=kG.simpleInfoWindowDoms,kE=kF.contentMain.style;kF._overflowX=kE.overflowX;kF._overflowY=kE.overflowY;kE.overflowX="hidden";kE.overflowY="hidden"},_resetOverflow:function(){var kG=this.map;if(!this._isMyDom()||!kG.simpleInfoWindowDoms._overflowX||!kG.simpleInfoWindowDoms._overflowY){return}var kF=kG.simpleInfoWindowDoms,kE=kF.contentMain.style;kE.overflowX=kF._overflowX;kE.overflowY=kF._overflowY;delete kF._overflowX;delete kF._overflowY},_draw:function(){if(this._visible===true&&this.overlay){this.overlay.openSimpleInfoWindow(this)}},_isMyDom:function(){return(this.map&&this.map.simpleInfoWindowDoms&&this.map.simpleInfoWindowDoms.hashCode==this.hashCode)}});eM.prototype.openSimpleInfoWindow=function(kH){if(this.map&&this.map.temp&&this.map.temp.infoWin instanceof i.InfoWindow){this.map.closeInfoWindow()}var kG=this.map;if(!kH||!this.map||!this.domElement||this.isVisible()===false||kH.toString()!=="SimpleInfoWindow"){return}var kF=kG.temp;if(kF.infoWin&&kF.infoWin.overlay&&kF.infoWin.overlay._fromMap){kG.closeSimpleInfoWindow()}if(kF.infoWin===kH&&kF.infoWin.isOpen()&&kF.infoWin.overlay===this){kH.setPanToWithDelay();return}kG.closeSimpleInfoWindow();this.simpleInfoWindow=kH;if(kF.infoWin===null||kF.infoWin!==kH){kF.infoWin=kH;kH.initialize(this)}else{kH.redraw(null,true)}e9.BaseClass.call(kH,kH.hashCode);if(!kF._clickCloseHandler){kF._clickCloseHandler=function(kI){if(kI.overlay||(kI.spots&&kI.spots.length>0)){return}if(kG.temp.infoWin&&kG.temp.infoWin._config.enableCloseOnClick){kG.closeSimpleInfoWindow();kG.removeEventListener("spotclick",kF._clickCloseHandler);kF._clickCloseBinded=false}}}if(!kF._clickCloseBinded){setTimeout(function(){kG.addEventListener("spotclick",kF._clickCloseHandler);kF._clickCloseBinded=true},200)}if(kF._infoWin){delete kF._infoWin}kH.overlay=this;var kE=kG.simpleInfoWindowDoms;this.map.getPanes().floatPane.appendChild(kE.popDom);kH.setPanToWithDelay();this.dispatchEvent(new fW("oninfowindowopen"))};eM.prototype.closeSimpleInfoWindow=function(){if(!this.map||!this.map.simpleInfoWindowDoms){return}var kF=this;if(kF.simpleInfoWindow&&kF.simpleInfoWindow.hashCode===kF.map.simpleInfoWindowDoms.hashCode){try{if(kF.simpleInfoWindow.hide()===true){kF.dispatchEvent(new fW("oninfowindowclose"));kF.map.temp.infoWin=kF.simpleInfoWindow=null}}catch(kE){}}}})(BMapGL);');
