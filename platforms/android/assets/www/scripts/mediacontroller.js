!function(e){function t(e){var t=e.item;MediaController.getCurrentPlayer().displayContent({ItemName:t.Name,ItemId:t.Id,ItemType:t.Type,Context:e.context})}function a(e){if(e=e||y,e&&MediaController.enableDisplayMirroring()){var a=MediaController.getPlayerInfo();a.isLocalPlayer||-1==a.supportedCommands.indexOf("DisplayContent")||t(e)}}function n(e){Events.on(e,"playbackstart",function(e,t){var a={QueueableMediaTypes:t.NowPlayingItem.MediaType,ItemId:t.NowPlayingItem.Id,NowPlayingItem:t.NowPlayingItem};a=$.extend(a,t.PlayState),ApiClient.reportPlaybackStart(a)}),Events.on(e,"playbackstop",function(e,t){var a={itemId:t.NowPlayingItem.Id,mediaSourceId:t.PlayState.MediaSourceId,positionTicks:t.PlayState.PositionTicks};t.PlayState.LiveStreamId&&(a.LiveStreamId=t.PlayState.LiveStreamId),t.PlayState.PlaySessionId&&(a.PlaySessionId=t.PlayState.PlaySessionId),ApiClient.reportPlaybackStopped(a)})}function r(e){var t=MediaController.getPlayerInfo();return t.isLocalPlayer?(Dashboard.showLoadingMsg(),void MediaController.getTargets().then(function(t){var n=t.map(function(e){var t=e.name;return e.appName&&e.appName!=e.name&&(t+=" - "+e.appName),{name:t,id:e.id,ironIcon:"tablet-android"}});require(["actionsheet"],function(){Dashboard.hideLoadingMsg(),ActionSheetElement.show({title:Globalize.translate("HeaderSelectPlayer"),items:n,positionTo:e,callback:function(e){var n=t.filter(function(t){return t.id==e})[0];MediaController.trySetActivePlayer(n.playerName,n),a()}})})})):void i(t)}function i(e){require(["paper-checkbox","fade-in-animation","fade-out-animation","paper-dialog"],function(){o(e)})}function o(e){var t="dlg"+(new Date).getTime(),a="",n="";if(a+='<paper-dialog id="'+t+'" entry-animation="fade-in-animation" exit-animation="fade-out-animation" with-backdrop style="'+n+'">',a+="<h2>",a+=e.deviceName||e.name,a+="</h2>",a+='<div style="padding:0 2em;">',-1!=e.supportedCommands.indexOf("DisplayContent")){a+="<div>";var r=MediaController.enableDisplayMirroring()?" checked":"";a+='<paper-checkbox class="chkMirror"'+r+">"+Globalize.translate("OptionEnableDisplayMirroring")+"</paper-checkbox>",a+="</div>"}a+="</div>",a+='<div class="buttons">',screen.availWidth>=600&&(a+="<paper-button onclick=\"Dashboard.navigate('nowplaying.html');\" dialog-dismiss>"+Globalize.translate("ButtonRemoteControl")+"</paper-button>"),a+='<paper-button dialog-dismiss onclick="MediaController.disconnectFromPlayer();">'+Globalize.translate("ButtonDisconnect")+"</paper-button>",a+="<paper-button dialog-dismiss>"+Globalize.translate("ButtonCancel")+"</paper-button>",a+="</div>",a+="</paper-dialog>",$(document.body).append(a),setTimeout(function(){var e=document.getElementById(t);$(".chkMirror",e).on("change",l),e.open(),$(e).on("iron-overlay-closed",function(){$(this).remove()})},100)}function l(){MediaController.enableDisplayMirroring(this.checked)}function s(e){var t=this,a={};t.keyBinding=function(e){n()||(Logger.log("keyCode",e.keyCode),a[e.keyCode]&&(e.preventDefault(),a[e.keyCode](e)))},t.keyPrevent=function(e){if(!n()){var t=[32,38,40,37,39,81,77,65,84,83,70];-1!=t.indexOf(e.keyCode)&&e.preventDefault()}},a[32]=function(){var t=e.getCurrentPlayer();t.getPlayerState().then(function(e){var a=e;a.NowPlayingItem&&a.PlayState&&(a.PlayState.IsPaused?t.unpause():t.pause())})};var n=function(){var e=document.activeElement,t=e.type||e.tagName.toLowerCase();return"text"===t||"select"===t||"textarea"===t||"password"==t}}function u(){function t(e,t){Events.trigger(g,"beforeplaybackstart",[t,this])}function i(e,t){Events.trigger(g,"playbackstop",[t,this])}function o(e,t){Events.trigger(g,"playerchange",[e,t])}function l(e,t){return e.isLocalPlayer?void requirejs(["registrationservices"],function(){g.playbackTimeLimitMs=null,RegistrationServices.validateFeature("playback").then(t,function(){g.playbackTimeLimitMs=S,u(),t()})}):void t()}function u(){d(),I=setTimeout(c,S)}function c(){d(),MediaController.stop()}function d(){var e=I;e&&(clearTimeout(e),I=null)}function p(e,t,a,n){return n.SupportsDirectPlay=!0,{MediaSources:[n],PlaySessionId:(new Date).getTime().toString()}}function y(e,t,a,n,r,i,o,l){g.getPlaybackInfoInternal(e,t,a,n,r,i,o).then(function(e){l.resolveWith(null,[e])},function(){l.reject()})}var f,m,g=this,v=[],P=new s(g);e.addEventListener("keydown",P.keyBinding),e.addEventListener("keypress",P.keyPrevent),e.addEventListener("keyup",P.keyPrevent),g.registerPlayer=function(e){v.push(e),e.isLocalPlayer&&n(e),Events.on(e,"playbackstop",i),Events.on(e,"beforeplaybackstart",t)},g.getPlayerInfo=function(){var e=f||{},t=m||{};return{name:e.name,isLocalPlayer:e.isLocalPlayer,id:t.id,deviceName:t.deviceName,playableMediaTypes:t.playableMediaTypes,supportedCommands:t.supportedCommands}},g.setActivePlayer=function(e,t){if("string"==typeof e&&(e=v.filter(function(t){return t.name==e})[0]),!e)throw new Error("null player");b=null,f=e,m=t,Logger.log("Active player: "+JSON.stringify(m)),o(e,t)};var b=null;g.trySetActivePlayer=function(e,t){if("string"==typeof e&&(e=v.filter(function(t){return t.name==e})[0]),!e)throw new Error("null player");b!=t.id&&(b=t.id,e.tryPair(t).then(function(){f=e,m=t,Logger.log("Active player: "+JSON.stringify(m)),o(e,t)}))},g.trySetActiveDeviceName=function(e){function t(e){return e.toLowerCase().replace(" ","")}e=t(e),g.getTargets().then(function(a){var n=a.filter(function(a){return t(a.name)==e})[0];n&&g.trySetActivePlayer(n.playerName,n)})},g.setDefaultPlayerActive=function(){var e=g.getDefaultPlayer(),t=e.getTargets()[0];g.setActivePlayer(e,t)},g.removeActivePlayer=function(e){g.getPlayerInfo().name==e&&g.setDefaultPlayerActive()},g.removeActiveTarget=function(e){g.getPlayerInfo().id==e&&g.setDefaultPlayerActive()},g.disconnectFromPlayer=function(){var e=g.getPlayerInfo();if(-1!=e.supportedCommands.indexOf("EndSession")){var t={callback:function(e){0==e&&MediaController.getCurrentPlayer().endSession(),2!=e&&g.setDefaultPlayerActive()},message:Globalize.translate("ConfirmEndPlayerSession"),title:Globalize.translate("HeaderDisconnectFromPlayer"),buttons:[Globalize.translate("ButtonYes"),Globalize.translate("ButtonNo"),Globalize.translate("ButtonCancel")]};require(["dialog"],function(e){e(t)})}else g.setDefaultPlayerActive()},g.getPlayers=function(){return v},g.getTargets=function(){var e=$.Deferred(),t=v.map(function(e){return e.getTargets()});return Promise.all(t).then(function(t){for(var a=[],n=0;n<t.length;n++)for(var r=t[n],i=0;i<r.length;i++)a.push(r[i]);a=a.sort(function(e,t){var a=e.isLocalPlayer?0:1,n=t.isLocalPlayer?0:1;return a=a.toString()+e.name,n=n.toString()+t.name,a.localeCompare(n)}),e.resolveWith(null,[a])}),e.promise()};var I,S=6e4;g.toggleDisplayMirroring=function(){g.enableDisplayMirroring(!g.enableDisplayMirroring())},g.enableDisplayMirroring=function(e){if(null!=e){var t=e?"1":"0";return appStorage.setItem("displaymirror--"+Dashboard.getCurrentUserId(),t),void(e&&a())}return"0"!=(appStorage.getItem("displaymirror--"+Dashboard.getCurrentUserId())||"")},g.play=function(e){l(f,function(){"string"==typeof e&&(e={ids:[e]}),f.play(e)})},g.shuffle=function(e){l(f,function(){f.shuffle(e)})},g.instantMix=function(e){l(f,function(){f.instantMix(e)})},g.queue=function(e){"string"==typeof e&&(e={ids:[e]}),f.queue(e)},g.queueNext=function(e){"string"==typeof e&&(e={ids:[e]}),f.queueNext(e)},g.canPlay=function(e){return g.canPlayByAttributes(e.Type,e.MediaType,e.PlayAccess,e.LocationType)},g.canPlayByAttributes=function(e,t,a,n){return"Full"!=a?!1:"Virtual"==n?!1:"Program"==e?!1:"MusicGenre"==e||"Season"==e||"Series"==e||"BoxSet"==e||"MusicAlbum"==e||"MusicArtist"==e||"Playlist"==e?!0:-1!=g.getPlayerInfo().playableMediaTypes.indexOf(t)},g.canQueueMediaType=function(e,t){return("MusicAlbum"==t||"MusicArtist"==t||"MusicGenre"==t)&&(e="Audio"),f.canQueueMediaType(e)},g.getLocalPlayer=function(){return f.isLocalPlayer?f:v.filter(function(e){return e.isLocalPlayer})[0]},g.getDefaultPlayer=function(){return f.isLocalPlayer?f:v.filter(function(e){return e.isDefaultPlayer})[0]},g.getCurrentPlayer=function(){return f},g.pause=function(){f.pause()},g.stop=function(){f.stop()},g.unpause=function(){f.unpause()},g.seek=function(e){f.seek(e)},g.currentPlaylistIndex=function(e){return null==e?f.currentPlaylistIndex?f.currentPlaylistIndex():-1:void f.currentPlaylistIndex(e)},g.removeFromPlaylist=function(e){f.removeFromPlaylist(e)},g.nextTrack=function(){f.nextTrack()},g.previousTrack=function(){f.previousTrack()},g.mute=function(){f.mute()},g.unMute=function(){f.unMute()},g.toggleMute=function(){f.toggleMute()},g.volumeDown=function(){f.volumeDown()},g.volumeUp=function(){f.volumeUp()},g.setRepeatMode=function(e){f.setRepeatMode(e)},g.playlist=function(){return f.playlist||[]},g.sendCommand=function(e,t){switch(t=t||g.getLocalPlayer(),Logger.log("MediaController received command: "+e.Name),e.Name){case"SetRepeatMode":t.setRepeatMode(e.Arguments.RepeatMode);break;case"VolumeUp":t.volumeUp();break;case"VolumeDown":t.volumeDown();break;case"Mute":t.mute();break;case"Unmute":t.unMute();break;case"ToggleMute":t.toggleMute();break;case"SetVolume":t.setVolume(e.Arguments.Volume);break;case"SetAudioStreamIndex":t.setAudioStreamIndex(parseInt(e.Arguments.Index));break;case"SetSubtitleStreamIndex":t.setSubtitleStreamIndex(parseInt(e.Arguments.Index));break;case"ToggleFullscreen":t.toggleFullscreen();break;default:t.isLocalPlayer?Dashboard.processGeneralCommand(e):t.sendCommand(e)}},g.getNowPlayingNameHtml=function(e,t){var a=e.Name;"Video"==e.MediaType&&(null!=e.IndexNumber&&(a=e.IndexNumber+" - "+a),null!=e.ParentIndexNumber&&(a=e.ParentIndexNumber+"."+a));var n="";return e.Artists&&e.Artists.length?(n=a,a=e.Artists[0]):e.SeriesName||e.Album?(n=a,a=e.SeriesName||e.Album):e.ProductionYear&&t!==!1&&(n=e.ProductionYear),n?a+"<br/>"+n:a},g.showPlaybackInfoErrorMessage=function(e){setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessagePlaybackError"+e),title:Globalize.translate("HeaderPlaybackError")})},300)},g.getPlaybackInfo=function(e,t,a,n,r,i,o){var l=DeferredBuilder.Deferred();return require(["localassetmanager"],function(){var s=ApiClient.serverInfo();return s.Id?void LocalAssetManager.getLocalMediaSource(s.Id,e).then(function(s){if(s&&(!n||n.Id==s.Id)){var u=p(e,t,a,s);return void l.resolveWith(null,[u])}y(e,t,a,n,r,i,o,l)}):void y(e,t,a,n,r,i,o,l)}),l.promise()},g.getPlaybackInfoInternal=function(e,t,a,n,r,i,o){var l={DeviceProfile:t},s={UserId:Dashboard.getCurrentUserId(),StartTimeTicks:a||0};return null!=r&&(s.AudioStreamIndex=r),null!=i&&(s.SubtitleStreamIndex=i),n&&(s.MediaSourceId=n.Id),o&&(s.LiveStreamId=o),ApiClient.ajax({url:ApiClient.getUrl("Items/"+e+"/PlaybackInfo",s),type:"POST",data:JSON.stringify(l),contentType:"application/json",dataType:"json"})},g.getLiveStream=function(e,t,a,n,r,i,o){var l={DeviceProfile:a,OpenToken:r.OpenToken},s={UserId:Dashboard.getCurrentUserId(),StartTimeTicks:n||0,ItemId:e,PlaySessionId:t};return null!=i&&(s.AudioStreamIndex=i),null!=o&&(s.SubtitleStreamIndex=o),ApiClient.ajax({url:ApiClient.getUrl("LiveStreams/Open",s),type:"POST",data:JSON.stringify(l),contentType:"application/json",dataType:"json"})},g.supportsDirectPlay=function(e){var t=$.Deferred();if(e.SupportsDirectPlay){if("Http"==e.Protocol&&!e.RequiredHttpHeaders.length)if(e.SupportsDirectStream||e.SupportsTranscoding){var a=0==e.Path.toLowerCase().replace("https:","http").indexOf(ApiClient.serverAddress().toLowerCase().replace("https:","http").substring(0,14));t.resolveWith(null,[a])}else t.resolveWith(null,[!0]);"File"==e.Protocol&&require(["localassetmanager"],function(){LocalAssetManager.fileExists(e.Path).then(function(a){Logger.log("LocalAssetManager.fileExists: path: "+e.Path+" result: "+a),t.resolveWith(null,[a])})})}else t.resolveWith(null,[!1]);return t.promise()},g.showPlayerSelection=r}function c(e,t){var a;if("Play"===t.MessageType)a=MediaController.getLocalPlayer(),"PlayNext"==t.Data.PlayCommand?a.queueNext({ids:t.Data.ItemIds}):"PlayLast"==t.Data.PlayCommand?a.queue({ids:t.Data.ItemIds}):a.play({ids:t.Data.ItemIds,startPositionTicks:t.Data.StartPositionTicks});else if("ServerShuttingDown"===t.MessageType)MediaController.setDefaultPlayerActive();else if("ServerRestarting"===t.MessageType)MediaController.setDefaultPlayerActive();else if("Playstate"===t.MessageType)a=MediaController.getLocalPlayer(),"Stop"===t.Data.Command?a.stop():"Pause"===t.Data.Command?a.pause():"Unpause"===t.Data.Command?a.unpause():"Seek"===t.Data.Command?a.seek(t.Data.SeekPositionTicks):"NextTrack"===t.Data.Command?a.nextTrack():"PreviousTrack"===t.Data.Command&&a.previousTrack();else if("GeneralCommand"===t.MessageType){var n=t.Data;a=MediaController.getLocalPlayer(),MediaController.sendCommand(n,a)}}function d(e){$(e).off("websocketmessage",c).on("websocketmessage",c)}function p(){r(this)}var y;e.MediaController=new u,MediaController.init=function(){e.ApiClient&&d(e.ApiClient),$(ConnectionManager).on("apiclientcreated",function(e,t){d(t)})},document.addEventListener("headercreated",function(){$(".btnCast").off("click",p).on("click",p)}),pageClassOn("pagebeforeshow","page",function(){y=null}),pageClassOn("displayingitem","libraryPage",function(e){var t=e.detail;a(t)})}(this);