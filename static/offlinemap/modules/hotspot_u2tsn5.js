/**/﻿_jsload&&_jsload('hotspot', 'function db(e){this._map=e;this._enableSpot=true;this.bindMapEvent()}db.prototype.enable=function(){this._enableSpot=true};db.prototype.disable=function(){this._enableSpot=false};db.prototype.bindMapEvent=function(){var hK=this._map;var hI=this;function i(){hI.disable()}function e(){hI.enable()}hK.addEventListener("movestart",i);hK.addEventListener("moveend",e);hK.addEventListener("zoomstart",i);hK.addEventListener("zoomend",function(){setTimeout(e,10)});function T(){hI.reset()}hK.addEventListener("load",T);hK.addEventListener("moveend",T);hK.addEventListener("zoomend",T);hK.addEventListener("dragend",function(){this.temp.__dragged=true});hK.addEventListener("mousemove",function hJ(hU){if(hK.currentOperation!==dO.idle||hI._enableSpot===false){return}if(hU.overlay&&!(hU.overlay instanceof w)||hU.infoWindow){return}var hZ=this.temp;if(hZ.spottimer){clearTimeout(hZ.spottimer);hZ.spottimer=null}if(hK.spotsPool){var hL=hK.temp.curSpots.slice(0);hK.temp.curSpots=[];var hV=hI.getSpotsByScreenPosition(hU.pixel);if(hV.length>0){hK.platform.style.cursor="pointer"}hK.temp.curSpotsArray=[];for(var hS=hK.temp.curSpots.length-1;hS>=0;hS--){if(hK.temp.curSpots[hS]&&hK.temp.curSpots[hS].spots&&hK.temp.curSpots[hS].spots.length>0){hK.temp.curSpotsArray=hK.temp.curSpots[hS].spots;break}}var hW=hK.temp.curSpotsArray.slice(0);var hN=[];var hY=hS;for(var hS=hL.length-1;hS>=0;hS--){if(hS===hY){hN=hL[hY]&&hL[hY].spots||[];for(var hR=0,hP=hN.length;hR<hP;hR++){for(var hQ=0,hM=0,hO=hK.temp.curSpotsArray.length;hQ<hO;hQ++,hM++){if(hN[hR]===hK.temp.curSpotsArray[hQ]){hN.splice(hR,1);hR--;hW.splice(hM,1);hM--}}}}else{if(hL[hS]&&hL[hS].spots&&hL[hS].spots.length>0){for(var hR=0;hR<hL[hS].spots.length;hR++){hN.push(hL[hS].spots[hR])}}}}if(hN.length>0){var hT=new a6("onspotmouseout");hT.spots=hN.slice(0);hK.dispatchEvent(hT)}if(hK.temp.curSpotsArray.length===0){var hX=null;if(hK.getZoom()>=17){hX=hI.checkAreaSpot(hU.point)}if(hX){if(hK.platform.style.cursor!=="pointer"){hK.platform.style.cursor="pointer"}hK.temp.curAreaSpot=hX}else{if(hK.platform.style.cursor!==hK.config.defaultCursor){hK.platform.style.cursor=hK.config.defaultCursor}hK.temp.curAreaSpot=null}}else{if(hW.length>0){var hT=new a6("onspotmouseover");if(hK.temp.curSpots[hK.temp.curSpots.length-1].enableMultiResponse){hT.spots=hW.slice(0)}else{hW.sort(function(h1,h0){return h1._distance-h0._distance});hT.spots=hW.slice(0,1)}if(hU.point){hT.point=new hj(hU.point.lng,hU.point.lat)}hT.pixel=new eb(hU.pixel.x,hU.pixel.y);hK.dispatchEvent(hT)}}}});hK.addEventListener("click",function(hR){var hP=this.temp;if(hR.overlay&&!(hR.overlay instanceof aM)){return}if(!hR.point){return}if(C.Platform.iphone||C.Platform.ipad||C.Platform.android){hP.curSpotsArray=hI.getSpotsByScreenPosition(hR.pixel)}var hQ=new a6("onspotclick");hQ.point=new hj(hR.point.lng,hR.point.lat);hQ.pixel=new eb(hR.pixel.x,hR.pixel.y);if(hP.curSpotsArray.length>0){for(var hO=0,hL=hP.curSpots.length;hO<hL;hO++){if(hP.curSpots[hO].spots&&hP.curSpots[hO].spots.length>0){if(hP.curSpots[hO].enableMultiResponse){hQ.spots=hP.curSpotsArray.slice(0)}else{hP.curSpotsArray.sort(function(hU,hT){return hU._distance-hT._distance});hQ.spots=hP.curSpotsArray.slice(0,1)}break}}}var hN=hQ.spots||[];for(var hO=0;hO<hN.length;hO++){var hM=hN[hO].pt;var hS=hI.checkAreaSpot(hM);if(hS){hP.curAreaSpot=hS}}hQ.curAreaSpot=hP.curAreaSpot;this.dispatchEvent(hQ)});hK.addEventListener("rightclick",function(hM){if(hM.overlay&&!(hM.overlay instanceof aM)){return}if(!hM.point){return}var hL=new a6("onhotspotrightclick");hL.point=new hj(hM.latlng.lng,hM.latlng.lat);hL.mct=new hj(hM.point.lng,hM.point.lat);hL.pixel=new eb(hM.pixel.x,hM.pixel.y);if(f.environment==="customEditor"){hL.styleIds=hI.checkStyleAreaSpot(hM.point)}this.dispatchEvent(hL)})};db.prototype.getSpotsByScreenPosition=function(hK){var hR=[];var e=this._map;var hM=e.getTilt();if(!e.spotsPool){return hR}for(var hI in e.spotsPool){var hP=e.spotsPool[hI];var hN=hP.spots.slice(0);if(hN[0]&&hN[0].userdata&&hN[0].userdata.mapPoi&&e._displayOptions.poi===false){continue}e.temp.curSpots[hP.zIndex]={spots:[],enableMultiResponse:hP.enableMultiResponse};for(var hL=0,hJ=hN.length;hL<hJ;hL++){var hQ=hN[hL];if(hQ.lr&&(e.getZoom()<hQ.lr[0]||e.getZoom()>hQ.lr[1])){continue}var T=hQ.px||e.pointToPixelIn(hQ.pt);if(T.x<e.width&&T.y<e.height){if((hK.x-T.x<hQ.bd[2]&&hK.x-T.x>hQ.bd[0])&&(T.y-hK.y<hQ.bd[3]&&T.y-hK.y>hQ.bd[1])){if(hM>55){var hO=e.pointToOverlayPixelIn(hQ.pt);if(hO.outOfFrustum){continue}}e.temp.curSpots[hP.zIndex].spots.push(hQ);hQ._distance=gN(T,hK);hR.push(hQ)}}}}return hR};db.prototype.checkAreaSpot=function(e){if(!e){return null}var T=this._map;if(T._displayOptions.indoor===false){return null}for(var hI in T.areaSpots){var i=T.areaSpots[hI];if(da([e.lng,e.lat],i.spot)){return hI}}return null};db.prototype.checkStyleAreaSpot=function(T){if(!T){return null}var hJ=this._map;var i=[];for(var hK in hJ.areaSpots){var hI=hJ.areaSpots[hK];var e=hI.userData;if(e.type==="mapstyle"&&da([T.lng,T.lat],hI.spot)){i.push([e.styleId])}}return i};db.prototype.reset=function(){var e=this._map;if(e.temp.__dragged==true){e.temp.__dragged=false}else{e.temp.curSpots=[];e.platform.style.cursor=e.config.defaultCursor}};db.prototype.resetAreaSpot=function(){for(var T in this.areaSpots){var i=this.areaSpots[T];var e=i.userData;if(e.type==="mapstyle"){delete this.areaSpots[T]}}};bj.register(function(e){e._spotsMgr=new db(e)});');
