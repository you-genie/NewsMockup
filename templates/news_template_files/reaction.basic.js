reaction.Controller=function(b,a){this._conf=b||reaction.conf();a=a||reaction.message;var c=this._selectMessage(a,this._conf.language);this._reactionButtons=new reaction.Buttons(this._conf,c);this._reactionCaptcha=new reaction.Captcha(this._conf,c);this._reactionFriends=reaction.Friends?new reaction.Friends(this._conf,c):null;this._attachEvent();};reaction.Controller.prototype={constructor:reaction.Controller,_selectMessage:function(a,c){var b={zh_hans:"zh-hans",zh_hant:"zh-hant"};if(b[c]){c=b[c];}return a[c]||a.en;},_attachEvent:function(){var c=jQuery.proxy(function(d,e){this._clicklog(d,e);},this);var b=jQuery(this._reactionButtons);b.on("clickReaction",c).on("captchaReaction",jQuery.proxy(function(e,d){this._reactionCaptcha.load(d);},this));var a=jQuery(this._reactionCaptcha);a.on("requestPreviousReaction",jQuery.proxy(function(){this._reactionButtons.requestPreviousReaction();},this)).on("clearPreviousReaction",jQuery.proxy(function(){this._reactionButtons.clearPreviousReaction();},this));if(this._reactionFriends){b.on("successReaction",jQuery.proxy(function(d,e){if(!e.isNeoid&&e.friendsLayerId){if(e.isAdding){this._reactionFriends.show(e);}else{this._reactionFriends.hide(e);}}},this));jQuery(this._reactionFriends).on("connectLineId",c).on("closeLineIdConnectionWithCache",c).on("closeLineIdConnection",c).on("shareTimelineOnce",c).on("shareTimelineAlways",c).on("closeTimelineShareWithCache",c).on("closeTimelineShare",c).on("setTimelineShare",c).on("launchApp",c);}},_detachEvent:function(){jQuery(this._reactionButtons).off();jQuery(this._reactionFriends).off();},_destroy:function(){this._detachEvent();this._reactionButtons._destroy();},_clicklog:function(b,f){var c=f.event,e=f.target,a=jQuery(e).attr("data-log"),d;if(!a){return;}if(b.type==="clickReaction"){d=a.split("|");a=f.isAdding?d[0]:d[1];}!!(a)&&reaction.clicklog(e,a,c);},update:function(a,b){jQuery("."+this._conf.moduleClassname).css("visibility","visible");this._reactionButtons.update(a,b);return this;}};reaction.templates=function(d){var c={snsIdConnection:"<div class='u_likeit_wrap'><div class='u_linkage'><p class='u_txt'>"+d.linkWithLineLayer.msgInfo+"</p><a href='#' class='u_btn_linkage _connectLineId' data-log='LYE.line'>"+d.linkWithLineLayer.btnLink+"</a><div class='u_chk'><input type='checkbox' id='u_month_hide' checked='checked' class='_closeLineIdConnectionWithCache' data-log='LYE.never'><label for='u_month_hide' onclick='void(0)'>"+d.common.chkboxDontShow+"</label><a href='#' class='u_btn_close _closeLineIdConnection' data-log='LYE.close'>"+d.common.btnClose+"</a></div></div></div>",timelineShare:"<div class='u_likeit_wrap'><div class='u_sharing'><p class='u_txt'>"+d.shareLayer.shareConfirm+"</p><div class='u_btn_area'><a href='#' class='u_btn_one _shareTimelineOnce' data-log='LSE.share'>"+d.shareLayer.btnOnceShare+"</a><a href='#' class='u_btn_auto _shareTimelineAlways' data-log='LSE.auto'>"+d.shareLayer.btnAutoShare+"</a></div><div class='u_chk'><input type='checkbox' id='u_month_hide' checked='checked' class='_closeTimelineShareWithCache' data-log='LSE.never'><label for='u_month_hide' onclick='void(0)'>"+d.common.chkboxDontShow+"</label><a href='#' class='u_btn_close _closeTimelineShare' data-log='LSE.close'>"+d.common.btnClose+"</a></div></div></div>",friendsListError:"<div class='u_likeit_wrap'><p class='u_error'>"+d.friendsLayer.error+"</p><a href='#' class='u_btn_set _setTimelineShare' data-log='LIK.share'>"+d.friendsLayer.btnShareSetting+"</a></div>",friendsListLoading:"<div class='u_likeit_wrap'><div class='u_loading'><p class='u_txt'><span class='u_ico_loading'></span>"+d.friendsLayer.loading+"</p></div><a href='#' class='u_btn_set _setTimelineShare' data-log='LIK.share'>"+d.friendsLayer.btnShareSetting+"</a></div>",friendsList:"<div class='u_likeit_wrap'><div class='u_friends'><div style='overflow: hidden; z-index: 0; position: relative; height: 36px;' class='_scrollview'><div class='_scroller'><ul class='u_list'><% for(var i=0, len=friends.length, friend; i < len; i++){ %><% friend = friends[i]; %><% isMine = (status !== 'FRIENDS' && status !== 'NONE' && i === 0); %><li class='u_thmb'><a href='#' class='_launchApp' <% if(!isMine){ %> data-mid='<%=friend.mid%>' <% } %> data-log='LIK.friends'><img src='<%=friend.smallPictureUrl%>' width='35' height='35' alt='<%=friend.displayName%>' onerror='this.onerror=null;this.src=\"https://ssl.pstatic.net/static/m/likeit/line_noimg.png\"'></a></li><% } %></ul></div></div><% if(status === 'ME'){ %><p class='u_dsc'>"+d.friendsLayer.me+"</p><% }else if(status === 'ME_AND_FRIENDS'){ %><p class='u_dsc'>"+d.friendsLayer.meAndFriends+"</p><% }else if(status == 'FRIENDS'){ %><p class='u_dsc'>"+d.friendsLayer.friends+"</p><% } %><a href='#' class='u_btn_set _setTimelineShare' data-log=LIK.share''>"+d.friendsLayer.btnShareSetting+"</a></div></div>",captchaLayer:"<div class='u_likeit_captcha' style='display:block'><strong class='u_likeit_blind'> "+d.captcha.layer+"</strong><div class='u_likeit_captcha_dimmed'></div><div class='u_likeit_captcha_wrap'><h3 class='u_likeit_captcha_title'>"+d.captcha.title+"</h3><p class='u_likeit_captcha_desc'>"+d.captcha.desc+"</p><div class='u_likeit_captcha_img_area'><div class='u_likeit_captcha_img'><img src='<%=captchaImageUrl%>' width='300' height='99' alt='captcha'></div><a href='#refresh' class='u_likeit_captcha_refresh'>"+d.captcha.refresh+"</a></div><div class='u_likeit_captcha_input_area'><input id='likeit_captcha_defense' class='u_likeit_captcha_input' type='text'><label for='likeit_captcha_defense' class='u_likeit_captcha_label'>"+d.captcha.defense+"</label></div><a href='#submit' class='u_likeit_captcha_submit'>"+d.captcha.submit+"</a><a href='#close' class='u_likeit_captcha_close'><span class='u_likeit_blind'>"+d.captcha.close+"</span></a></div></div>"};var b={};var a=function a(g,f){var e=!/\W/.test(g)?b[g]=b[g]||a(document.getElementById(g).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+g.replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"',$1,'").split("<%").join("');").split("%>").join("p.push('")+"');}return p.join('');");return f?e(f):e;};return{process:function(e,f){return a(c[e],f);}};};reaction.Captcha=function(a,b){this._resources={image:"/v1/captcha/{serviceId}/image",compare:"/v1/captcha/{serviceId}/compare"};this._conf=a;this._messages=b;this._templates=reaction.templates(this._messages.templates);this._key="";this._$elBody=jQuery("body");this._isUseApigw=this._conf.isUseApigw;};reaction.Captcha.prototype={constructor:reaction.Captcha,load:function(a){var b={anmKey:a.anmKey,abuseTypeCode:a.abuseTypeCode};jQuery.ajax({url:(this._isUseApigw?this._conf.apigwInfo.domain:this._conf.domain)+this._resources.image.replace("{serviceId}",a.serviceId),dataType:"jsonp",scriptCharset:"utf-8",timeout:3000,context:this,data:b,success:function(c){this._createLayer(a,c);this._key=c.captchaKey;this._drawImage();},error:function(){alert(this._messages.templates.captcha.err_captcha);}});},_createLayer:function(b,a){this._$elBody.append(this._templates.process("captchaLayer",a));this._attachEvent(b);},_deleteLayer:function(){jQuery(".u_likeit_captcha").remove();},_drawImage:function(b){var a=jQuery(".u_likeit_captcha_img");if(!!b){a.children("img").attr("src",b);}if(this._conf.isMobile){a.children("img").attr("width","244").attr("height","90");}else{a.children("img").attr("width","300").attr("height","99");}},_refresh:function(a){var b={anmKey:a.anmKey,abuseTypeCode:a.abuseTypeCode};jQuery.ajax({url:(this._isUseApigw?this._conf.apigwInfo.domain:this._conf.domain)+this._resources.image.replace("{serviceId}",a.serviceId),dataType:"jsonp",scriptCharset:"utf-8",timeout:3000,context:this,data:b,success:function(c){this._drawImage(c.captchaImageUrl);this._key=c.captchaKey;},error:function(){alert(this._messages.templates.captcha.err_image);}});},_submit:function(b){var a=jQuery("#likeit_captcha_defense");if(!!!a.val()){alert(this._messages.templates.captcha.err_empty);return;}var c={captchaKey:this._key,value:a.val(),anmKey:b.anmKey,abuseTypeCode:b.abuseTypeCode};jQuery.ajax({url:(this._isUseApigw?this._conf.apigwInfo.domain:this._conf.domain)+this._resources.compare.replace("{serviceId}",b.serviceId),dataType:"jsonp",scriptCharset:"utf-8",timeout:3000,context:this,data:c,success:function(d){if(d.result==="OK"){this._requestPreviousReaction();this._close();}else{alert(this._messages.templates.captcha.err_wrong);this._drawImage(d.captchaImageUrl);this._clearTextbox();this._key=d.captchaKey;}},error:function(){alert(this._messages.templates.captcha.err_server);this._close();}});},_clearTextbox:function(){var a=jQuery(".u_likeit_captcha_input_area");var b=jQuery("#likeit_captcha_defense");b.val("");a.removeClass("u_likeit_captcha_focus");},_close:function(){this._deleteLayer();this._detachEvent();this._clearPreviousReaction();},_rotateHandler:function(){var a=jQuery(".u_likeit_captcha_wrap");a.hide();a.show();},_requestPreviousReaction:function(){jQuery(this).trigger("requestPreviousReaction");},_clearPreviousReaction:function(){jQuery(this).trigger("clearPreviousReaction");},_attachEvent:function(a){var b=jQuery(".u_likeit_captcha_input_area");this._$elBody.on("click",".u_likeit_captcha_close",jQuery.proxy(this._close,this)).on("click",".u_likeit_captcha_refresh",jQuery.proxy(function(){this._refresh(a);},this)).on("click",".u_likeit_captcha_submit",jQuery.proxy(function(){this._submit(a);},this)).on("focus",".u_likeit_captcha_input",function(){b.addClass("u_likeit_captcha_focus");}).on("blur",".u_likeit_captcha_input",function(){if(jQuery(this).val()===""){b.removeClass("u_likeit_captcha_focus");}});if("onorientationchange" in window){window.addEventListener("orientationchange",this._rotateHandler);}},_detachEvent:function(){this._$elBody.off("click",".u_likeit_captcha_close").off("click",".u_likeit_captcha_refresh").off("click",".u_likeit_captcha_submit").off("click",".u_likeit_captcha_input");if("onorientationchange" in window){window.removeEventListener("orientationchange",this._rotateHandler);}}};reaction.Buttons=function(a,b){this._resources={content:"/v1/search/contents?suppress_response_codes=true",contentAdd:"/v1/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=POST",contentCancel:"/v1/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=DELETE",contentAddPeriod:"/v1/period/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=POST",contentCancelPeriod:"/v1/period/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=DELETE",contentAddNolimit:"/v1/nolimit/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=POST"};this._conf=a;this._messages=b;this._isNeoid=(this._conf.authType==="neoid");this._isUseApigw=this._conf.isUseApigw;this._isUseApigw&&this._setApigwResource();this._isNeoid&&this._setNeoidResources();this._$body=jQuery(document);this._onButtonHandler=jQuery.proxy(this._onButtonHandler,this);this._onNolimitButtonHandler=jQuery.proxy(this._onNolimitButtonHandler,this);this._onHideHandler=jQuery.proxy(this._onHideHandler,this);this._onFaceButtonHandler=jQuery.proxy(this._onFaceButtonHandler,this);this._attachEvent();this._maxLimitCount=10;this._nolimitHistory=[];this._pollingNolimit();this._previousReaction=null;this._retryCount=0;this._isRetryFinish=false;this._contentsListRetryTimer=null;this._$targetContentsList=null;this._isReactionRequestRetry=true;this._requestReactionTimeout=10000;this._serviceOptionType=null;};reaction.Buttons.prototype={constructor:reaction.Buttons,_setNeoidResources:function(){jQuery.extend(this._resources,{content:this._conf.authInfo.domain+"/v1/search/contents?suppress_response_codes=true&token="+this._conf.authInfo.token+"&consumerKey="+this._conf.authInfo.consumerKey+"&snsCode="+this._conf.authInfo.snsCode+"&pool="+this._conf.authInfo.pool,contentAdd:this._conf.authInfo.domain+"/v1/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=POST&token="+this._conf.authInfo.token+"&consumerKey="+this._conf.authInfo.consumerKey+"&snsCode="+this._conf.authInfo.snsCode+"&pool="+this._conf.authInfo.pool,contentCancel:this._conf.authInfo.domain+"/v1/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=DELETE&token="+this._conf.authInfo.token+"&consumerKey="+this._conf.authInfo.consumerKey+"&snsCode="+this._conf.authInfo.snsCode+"&pool="+this._conf.authInfo.pool});},_setApigwResource:function(){jQuery.extend(this._resources,{content:this._conf.apigwInfo.domain+"/v1/search/contents?suppress_response_codes=true&pool="+this._conf.apigwInfo.pool,contentAdd:this._conf.apigwInfo.domain+"/v1/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=POST&pool="+this._conf.apigwInfo.pool,contentCancel:this._conf.apigwInfo.domain+"/v1/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=DELETE&&pool="+this._conf.apigwInfo.pool,contentAddPeriod:this._conf.apigwInfo.domain+"/v1/period/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=POST&pool="+this._conf.apigwInfo.pool,contentCancelPeriod:this._conf.apigwInfo.domain+"/v1/period/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=DELETE&pool="+this._conf.apigwInfo.pool,contentAddNolimit:this._conf.apigwInfo.domain+"/v1/nolimit/services/{serviceId}/contents/{contentsId}?suppress_response_codes=true&_method=POST&pool="+this._conf.apigwInfo.pool});},_attachEvent:function(){this._$body.on("click",this._onHideHandler).on("click","."+this._conf.moduleClassname+" a._face",this._onFaceButtonHandler).on("click","."+this._conf.moduleClassname+" a._nolimitButton",this._onNolimitButtonHandler).on("click","."+this._conf.moduleClassname+" a._button",this._onButtonHandler);},_onHideHandler:function(a){var b=jQuery(a.target);if(this._conf.isHiddenLayerAfterSelection||(!b.hasClass("_button")&&!b.hasClass("_face"))){this._hideLayers();}},_onFaceButtonHandler:function(b){var c=jQuery(b.currentTarget);if(c){var a=c.parent().find("._faceLayer").first();if(a.is(":visible")){a.hide();}else{this._hideLayers();a.show();}}b.stopPropagation();},_getCountButton:function(a){return a.find("._count").first();},_callClickCallback:function(b){var a=this._conf.callback&&this._conf.callback.click&&this._conf.callback.click(b);return a===undefined||a;},_onButtonHandler:function(a){var c=a.currentTarget,b=!jQuery(c).hasClass(this._conf.iconToggleClassname[0]),d={event:a.originalEvent,target:c,isAdding:b};!jQuery(c).closest("._face + ._faceLayer").length&&this._hideLayers();a.preventDefault();if(!this._callClickCallback(d)){return;}if(b){this.increase(c);}else{this.decrease(c);}jQuery(this).trigger("clickReaction",d);},_onNolimitButtonHandler:function(a){var b=a.currentTarget,c={event:a.originalEvent,target:b,isAdding:true};!jQuery(b).closest("._face + ._faceLayer").length&&this._hideLayers();a.preventDefault();if(!this._callClickCallback(c)){return;}this.increaseNolimit(b);jQuery(this).trigger("clickReaction",c);},_hideLayers:function(){var a;jQuery(jQuery.grep(jQuery("."+this._conf.moduleClassname).find("._faceLayer:visible"),function(b){a=jQuery(b);return a.is(":visible")&&!!a.parent().find("._face").length;})).hide();},_detachEvent:function(){this._$body.off("click",this._onHideHandler).off("click","."+this._conf.moduleClassname+" a._face",this._onFaceButtonHandler).off("click","."+this._conf.moduleClassname+" a._button",this._onButtonHandler).off("click","."+this._conf.moduleClassname+" a._nolimitButton",this._onNolimitButtonHandler);},_isAndroidConfirmBugInApp:function(){return/Android 5.+Chrome\/40.+NAVER.+inapp/.test(navigator.userAgent);},_redirectLogin:function(){if(this._isNeoid){if(this._isAndroidConfirmBugInApp()||confirm(this._messages.login.neoid)){this._conf.authInfo.loginHandler();}}else{if(this._isAndroidConfirmBugInApp()||confirm(this._messages.login.nid)){top.location.href="https://nid.naver.com/nidlogin.login?"+(this._conf.isMobile?"svctype=262144&":"")+"url="+encodeURIComponent(location.href)+"&locale="+(this._conf.language==="ko"?"ko_KR":"en_US");}}},_updateReactionFromClient:function(d,g,c,f,a){var b=[];var e=null;var h="."+this._conf.moduleClassname;d.each(jQuery.proxy(function(l,m){var p=jQuery(m),k=p.closest(h).first(),o=this._isFace(k),n=k.attr("data-duplication")||!!this._conf.isDuplication;n=typeof n==="boolean"?n:(n+"").toLowerCase()==="true";if(!n){if(c){this._cleanReaction(c.get(l),g===false?false:undefined,f);}else{e=k.find((o?"._faceLayer ":"")+"."+this._conf.iconToggleClassname[0]);e=e.is(p)?e.not(p):e;if(!o){var q=p.parent();e=e.filter(function(s,r){var i=jQuery(r);var t=i.parent();return((t.attr("data-sid")!==q.attr("data-sid"))||(t.attr("data-cid")!==q.attr("data-cid"))||(i.attr("data-type")!==p.attr("data-type")));});}this._cleanReaction(e,true,f);}}b.push(e);var j=a?f:this._toNum(this._getCountButton(p).text())+(g?f:-f);this._updateButton(k,p,g,j);o&&this._updateFaceButton(k.find("._face").first());},this));return jQuery(b);},_cleanReaction:function(c,f,e){var a=this,d,b;c.length&&c.each(function(g,h){d=jQuery(h).toggleClass(a._conf.iconToggleClassname.join(" "));b=a._getCountButton(d);b.text(a._formattedCount(a._toNum(b.text())+(typeof f==="undefined"?0:(f?-e:e))));});},_selectApiKey:function(b,a){var c=!!a?a.charAt(0).toUpperCase()+a.substring(1,a.length):"";if(b){return"contentAdd"+c;}else{return"contentCancel"+c;}},_afterNolimitReqeust:function(){clearTimeout(this._nolimitTimer);this._nolimitHistory=[];this._wait=false;this._pollingNolimit();},requestPreviousReaction:function(){if(!this._previousReaction){return;}this._requestReaction(this._previousReaction.buttonElement,this._previousReaction.isAdding);},clearPreviousReaction:function(){this._previousReaction=null;},_setPreviousReaction:function(b,a){this._previousReaction={buttonElement:b,isAdding:a};},_requestReaction:function(q,d){var b=jQuery(q),l=b.closest("."+this._conf.moduleClassname),f=jQuery().add(b),a=l.attr("data-sid"),s=l.attr("data-cid"),e=l.attr("data-pid"),h=l.attr("data-catgid")||"",p=l.attr("data-did")||a,u=l.attr("data-friendslayer-id")||"",t=b.attr("data-type"),i=b.attr("data-viewtype")||"",x=l.attr("data-duplication")||!!this._conf.isDuplication,o=l.attr("data-ccounttype"),j=1,n=[],c=o==="nolimit",g=c?"._nolimitButton":"._button",k="";if(c){j=this._nolimitHistory.length,n=this._nolimitHistory,k=this._conf.runtimeStatus();}var y={displayId:p,reactionType:t,categoryId:h,guestToken:reaction._guestToken,timestamp:reaction._timestamp,_ch:this._conf.isMobile?"mbw":"pcw",isDuplication:typeof x==="boolean"?x:(x+"").toLowerCase()==="true",lang:this._conf.language,countType:o||"default",count:j,history:c?n.join("|"):"",runtimeStatus:k},w={$base:l,$target:b,serviceId:a,contentId:s,displayId:p,friendsLayerId:u,reactionType:t,reactionViewType:i,isAdding:d,isNeoid:this._isNeoid},v=this._selectApiKey(d,o);if(d){y.isPostTimeline=!!(u);}if(!!i){y.viewType=i;}if(!!e){y.parentContentsId=e;}var r=jQuery("."+this._conf.moduleClassname).not(l).filter(function(){var z=jQuery(this);return z.attr("data-sid")===a&&z.attr("data-cid")===s;}).find(g+"[data-type="+t+"]");if(r.length){f=f.add(r);}var m;if(!c){m=this._updateReactionFromClient(f,d,undefined,j,false);}c&&this._afterNolimitReqeust();jQuery.ajax({url:(this._isNeoid||this._isUseApigw?"":this._conf.domain)+this._resources[v].replace("{serviceId}",a).replace("{contentsId}",s),dataType:"jsonp",scriptCharset:"utf-8",timeout:3000,data:y,context:this,success:function(D){if(!D.errorCode||D.errorCode===4042){if(D.snsInfo){w.snsInfo=D.snsInfo;}c&&this._updateReactionFromClient(f,d,undefined,D.count,true);jQuery(this).trigger("successReaction",w);this._conf.callback&&this._conf.callback.clicked&&this._conf.callback.clicked({targets:f.get(),content:D});this._triggerParentCallback(D);}else{if(D.errorCode===4010){!c&&this._updateReactionFromClient(f,!d,m,j,false);this._redirectLogin();}else{if(D.errorCode===4038){this._setPreviousReaction(q,d);D.moreInfos[0].serviceId=a;jQuery(this).trigger("captchaReaction",D.moreInfos[0]);!c&&this._updateReactionFromClient(f,!d,m,j,false);}else{if(D.errorCode===4013&&this._isReactionRequestRetry){this._isReactionRequestRetry=false;this._finishContentsListRetry();this._requestContentList(this._$targetContentsList);this._clearTargetContentsList();var C=1;var z=500;var B=this._requestReactionTimeout/z+2;var A=this;var F=jQuery(q);var E=setInterval(function(){A._requestReactionIntervalId=E;if(C>B){clearInterval(E);!c&&A._updateReactionFromClient(f,!d,m,j,false);alert(D.message);jQuery(A).trigger("errorReaction",w);return;}if(F.parents().attr("data-loaded")==="1"){clearInterval(E);var G=F.attr("aria-pressed")==="true"?false:true;A._requestReaction(q,G);return;}C++;},z);}else{if(typeof this._requestReactionIntervalId!=="undefined"){clearInterval(this._requestReactionIntervalId);}else{!c&&this._updateReactionFromClient(f,!d,m,j,false);}alert(D.message);jQuery(this).trigger("errorReaction",w);}}}}},error:function(){!c&&this._updateReactionFromClient(f,!d,m,j,false);alert(this._messages.error);jQuery(this).trigger("errorReaction",w);}});},_getRequestQueue:function(a){var c=this,e=[],b=[],f=-1,d=-1;a.each(function(){var o=jQuery(this),i=o.attr("data-domain")||c._conf.domain,l=o.attr("data-sid"),g=o.attr("data-cid"),j=o.attr("data-pid"),m=o.attr("data-duplication")||!!c._conf.isDuplication,k=o.attr("data-ccounttype"),h,n;m=typeof m==="boolean"?m:(m+"").toLowerCase()==="true";f=jQuery.inArray(i,b);if(f<0||(e[f].duplication!==m)){b.push(i);f=b.length-1;e[f]={domain:i,duplication:m,services:[]};}d=jQuery.map(e[f].services,function(p){return p.serviceId;}).indexOf(l);if(d<0){e[f].services.push({serviceId:l,contentIds:[],parentIds:[]});d=e[f].services.length-1;}h=e[f].services[d].contentIds;n=e[f].services[d].parentIds;g=!!k?g+"("+k+")":g;(!~jQuery.inArray(g,h))&&h.push(g);j&&(!~jQuery.inArray(j,n))&&n.push(j);});return e;},_convertToParamString:function(c,a){var e=[];for(var b=0,d=c.length;b<d;b++){c[b][a].length&&e.push(c[b].serviceId+"["+c[b][a].join(",")+"]");}return e.join("|");},_convertToMapData:function(a){var b={};jQuery.each(a,function(d,e){var f={};var c=!!("parentReactions" in e);jQuery.each(e[c?"parentReactions":"reactions"],function(g,h){f[h.reactionType]=h;});if(c){b[e.serviceId]=b[e.serviceId]||{};b[e.serviceId][e.parentContentsId]=f;}else{b[e.serviceId+"_"+e.contentsId]=f;}b[e.serviceId+"_reactionTextMap"]=e.reactionTextMap;b[e.serviceId+"_customized"]=e.customized;b[e.serviceId+"_differentPlatform"]=e.differentPlatform;});return b;},_triggerParentCallback:function(a){this._conf.callback&&a.parentContents&&this._conf.callback.updateParent&&this._conf.callback.updateParent(this._convertToMapData(a.parentContents));},_finishContentsListRetry:function(){clearTimeout(this._contentsListRetryTimer);this._isRetryFinish=true;},_contentsListRetry:function(a){this._setTargetContentsList(a);try{var c=3,f=7000;if(this._isRetryFinish){return;}if(this._retryCount>=c){this._finishContentsListRetry();return;}this._retryCount=this._retryCount+1;var b=this;this._contentsListRetryTimer=setTimeout(function(){b._requestContentList(a);},(this._retryCount*f));}catch(d){this._finishContentsListRetry();}},_setTargetContentsList:function(a){this._$targetContentsList=a;},_clearTargetContentsList:function(){this._$targetContentsList=null;},_requestContentList:function(a){var f=this._getRequestQueue(a),h=jQuery.proxy(function(){this._contentsListRetry(a);},this),g=jQuery.proxy(function(i){if(!i.errorCode){this._serviceOptionType=i.serviceOptionType;this._drawButtons(a,this._convertToMapData(i.contents));reaction._guestToken=i.guestToken||"";reaction._timestamp=i.timestamp||"";this._conf.callback&&this._conf.callback.updated&&this._conf.callback.updated({targets:a.get(),contents:i.contents});this._triggerParentCallback(i);}},this);for(var b=0,e,c,d=f.length;b<d;b++){e={q:this._convertToParamString(f[b].services,"contentIds"),isDuplication:f[b].duplication};c=this._convertToParamString(f[b].services,"parentIds");c&&(e.pq=c);jQuery.ajax({url:this._isNeoid||this._isUseApigw?this._resources.content:f[b].domain+this._resources.content,dataType:"jsonp",scriptCharset:"utf-8",timeout:this._requestReactionTimeout,data:e,context:this,success:g,error:h});}},_drawButtons:function(a,c){var b=this;a.each(function(h,k){var f=jQuery(k),d=c[f.attr("data-sid")+"_"+f.attr("data-cid")],l=!!c[f.attr("data-sid")+"_reactionTextMap"]?c[f.attr("data-sid")+"_reactionTextMap"][b._conf.language.replace("_","-")]:null,g=c[f.attr("data-sid")+"_customized"],j=c[f.attr("data-sid")+"_differentPlatform"];if(d){f.find("._button").each(function(o,n){var q=jQuery(n),p=q.attr("data-type"),s=d[p]||{},m=q.attr("data-viewtype")||p,r=!!l?l[m]:b._messages.label[m];if(j){r=b._conf.isMobile?r.m:r.pc;}if(b._isDrawingByTemplate(f,q)){q.html(b._conf.buttonTemplate.replace("{label}",b._messages.label[m]));}else{if(!g&&b._isEmptyButton(f,q)){q.find("._label").html(r);}}b._updateButton(f,q,s.isReacted,s.count);});f.find("._nolimitButton").each(function(o,n){var q=jQuery(n),p=q.attr("data-type"),s=d[p]||{},m=q.attr("data-viewtype")||p,r=!!l?l[m]:b._messages.label[m];if(j){r=b._conf.isMobile?r.m:r.pc;}if(b._isDrawingByTemplate(f,q)){q.html(b._conf.buttonTemplate.replace("{label}",b._messages.label[m]));}else{if(!g&&b._isEmptyButton(f,q)){q.find("._label").html(r);}}b._updateButton(f,q,s.isReacted,s.count);});b._drawFaceButtons(f,d);f.attr("data-loaded","1");var e=f.find("._faceLayer");if(f.attr("data-isOpenFaceLayer")==="true"){f.find("._faceLayer").show();}f.attr("data-facetype",e.length);}});},_drawFaceButtons:function(d,c){var b=d.find("._face").first();if(!b.length){return;}var f=false;var a=0;var e=[];for(var g in c){if(c[g].isReacted){f=true;}a+=c[g].count;e.push({type:g,count:c[g].count});}if(this._isDrawingByTemplate(d,b)){var h=b.attr("data-label")||"default";b.html(this._conf.faceButtonTemplate.replace("{label}",this._messages.face[h]));}this._makeFaceIcons(d,b);this._updateFaceButton(b,f,e,a);},_makeFaceIcons:function(e,g){var a=this._conf.faceButtonMaxIconCount;if(a<=0){return;}if(e.attr("data-loaded")!=="1"){var c=g.find("._icons").first();var d=c.children();var h=a-d.length;if(h>0){var b=d.first();for(var f=0;f<h;f++){b.clone().hide().appendTo(c);}}else{if(h<0){jQuery(d.splice(a)).each(function(k,j){jQuery(j).remove();});}}}},_isEmptyButton:function(a){return a.attr("data-loaded")!=="1";},_isDrawingByTemplate:function(a,b){return a.attr("data-loaded")!=="1"&&!jQuery.trim(b.html());},_updateButton:function(b,e,d,c){if(!e.length){return;}var a=this._getVisibleOptionOfButton(e);this._updateClassButton(e,d,this._isFace(b)?"aria-selected":"aria-pressed");this._updateIconInButton(e,d,a);this._updateLabelInButton(e,c,a);this._updateCountInButton(e,c,a);this._updateHighlightButton(b,e,c);},_updateFaceButton:function(a,f,g,h){if(!a.length){return;}g=g||[];var d;if(typeof f==="undefined"&&typeof count==="undefined"){f=(a.parent().find("._button."+this._conf.iconToggleClassname[0]).length>0);h=0;var i=this;var c=0;var b;a.parent().find("._button ._count").each(function(k,j){d=jQuery(j);b=d.parent().attr("data-type");c=i._toNum(d.text());h+=c;g.push({type:b,count:c});});}g=jQuery.grep(g,function(j){return j.count!==0;}).sort(function(j,k){if(j.count===k.count){if(j.type==="like"){return -1;}else{if(k.type==="like"){return 1;}}return 0;}else{return k.count-j.count;}});var e=a.attr("data-label")||"default";d=this._getCountButton(a);if(h){d.html(this._formattedCount(h,a.attr("data-maxcount"))).addClass("num");}else{d.html(this._messages.face[e]).removeClass("num");}this._updateFaceButtonIcons(a,g);this._updateClassButton(a,f,"aria-pressed");},_updateFaceButtonIcons:function(h,e){var g=h.find("._icons").first();if(!g.length){return;}var f=g.children();var j;var d;for(var b=0,c=this._conf.faceButtonMaxIconCount,a=e.length;b<c;b++){if(a>b){j=f.eq(b).show();d=e[b].type;this._updateIconsByType(j,d);j.css("zIndex",c-b+1).find("span").html(this._messages.label[d]);}else{if(b===0){if(a===0){this._conf.isZeroFace?this._updateIconsByType(f.eq(b),"zeroface"):this._updateIconsByType(f.eq(b),"like");}}else{f.eq(b).hide();}}}},_updateIconsByType:function(b,d){var c=b.get(0);var a=c.className.split(" ");c.className=jQuery.grep(a,function(e){return !/^__reaction__/.test(e);}).join(" ")+" __reaction__"+d;},_updateCountInButton:function(e,d,c){var b=this._getCountButton(e),a=d||0,f=!(c.isHiddenCount||(a===0&&(c.isHiddenZeroCount||c.isUsedLabelAsZeroCount)));b.length&&b.html(this._formattedCount(a,e.attr("data-maxcount"))).toggle(f);},_updateHighlightButton:function(a,c,b){if(!this._serviceOptionType||!this._serviceOptionType[a.attr("data-sid")]||!this._serviceOptionType[a.attr("data-sid")]["012"]){return;}if(this._isFace(a)){return;}if(!this._conf.highlightCount||this._conf.highlightCount<1){return;}if(!b){return;}var d=this._conf.highlightClassname||"";if(b<this._conf.highlightCount){c.removeClass(d);}else{c.addClass(d);}},_formattedCount:function(d,a){var c=0,f=a||this._conf.maxCount,b=Math.max(c,Math.min(d,f)).toString(),e=b.replace(/(\d)(?=(\d{3})+$)/igm,"$1,"),g=(d>f)?"+":"";return e+g;},_getValueOfPrioritizedOption:function(b,c){var e=this._conf[c],a=b.attr("data-"+c),d=e;if(a!==undefined&&a!==null){d=(typeof a==="boolean"&&!!a)||(a==="true")||!!(parseInt(a,10));}return d;},_getVisibleOptionOfButton:function(a){return{isHiddenIcon:this._getValueOfPrioritizedOption(a,"isHiddenIcon"),isHiddenLabel:this._getValueOfPrioritizedOption(a,"isHiddenLabel"),isHiddenCount:this._getValueOfPrioritizedOption(a,"isHiddenCount"),isHiddenZeroCount:this._getValueOfPrioritizedOption(a,"isHiddenZeroCount"),isUsedLabelAsZeroCount:this._getValueOfPrioritizedOption(a,"isUsedLabelAsZeroCount"),isHiddenLabelAsZeroCount:this._getValueOfPrioritizedOption(a,"isHiddenLabelAsZeroCount")};},_updateIconInButton:function(d,c,b){var a=d.find("._icon"),e=!b.isHiddenIcon;a.length&&a.toggle(e);},_updateClassButton:function(d,c,b){var f=this._conf.iconToggleClassname,a=f[0]||"",e=f[1]||"";if(c){d.addClass(a).removeClass(e).attr(b,"true");}else{d.addClass(e).removeClass(a).attr(b,"false");}},_updateLabelInButton:function(f,e,c){var b=e||0,a=f.find("._label"),g=true;if(c.isHiddenLabel){g=false;}else{var d=b===0;if(c.isUsedLabelAsZeroCount){g=d;}else{if(c.isHiddenLabelAsZeroCount){g=!d;}}}a.length&&a.toggle(g);},_update:function(a){var c=a.length,b=this._conf.contentCountPerOnceRequest,d=Math.ceil(c/b),e,g,f;if(!c){return;}for(e=0;e<d;e++){g=Math.max(0,e*b);f=Math.min(g+b,c);this._requestContentList(a.slice(g,f));}},_getFilteredTarget:function(b,d,c){var a=jQuery();if(!b){a=a.add("."+this._conf.moduleClassname);}else{jQuery(b).each(jQuery.proxy(function(e,f){if(jQuery(f).hasClass(this._conf.moduleClassname)){a=a.add(f);}else{a=a.add("."+this._conf.moduleClassname,f);}},this));}if(c){a=a.filter("[data-ccounttype='nolimit']");}if(!d){a=a.filter("[data-loaded!='1']");}return a;},update:function(a,c,b){this._update(this._getFilteredTarget(a,c,b));},increase:function(a){this._requestReaction(a,true);},increaseNolimit:function(b){var a=[];if(this._nolimitHistory.length<this._maxLimitCount){a.push(new Date().getTime());this._conf.runtime()&&a.push(this._conf.runtime());this._nolimitHistory.push(a.join(","));}this._increseNolimitCount(b);if(!this._wait){this._wait=true;this._nolimitTimer=setTimeout(jQuery.proxy(function(){clearInterval(this._nolimitPolling);this._requestReaction(b,true);},this),1000);}},_increseNolimitCount:function(e){var a=jQuery(e),b=jQuery().add(a),d=true,c=1;this._updateReactionFromClient(b,d,undefined,c,false);},_pollingNolimit:function(){if(!this._conf.isUseNolimitCountPolling){return;}clearInterval(this._nolimitPolling);var a=(this._conf.nolimitCountPollingTime<10?10:this._conf.nolimitCountPollingTime)*1000;this._nolimitPolling=setInterval(jQuery.proxy(function(){this.update(undefined,true,true);},this),a);},decrease:function(a){this._requestReaction(a,false);},_isFace:function(a){return a.attr("data-facetype")==="1";},_toNum:function(a){if(!a){return 0;}return Number(a.replace(/[^-\.\d]/g,""));},_destroy:function(){this._detachEvent();}};reaction.instance=(new reaction.Controller(reaction.conf(),reaction.message)).update();