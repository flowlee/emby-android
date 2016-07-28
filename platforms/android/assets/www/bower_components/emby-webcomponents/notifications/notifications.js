define(["serverNotifications","playbackManager","events","globalize","require"],function(e,t,n,a,i){function o(){document.removeEventListener("click",o),document.removeEventListener("keydown",o),window.Notification&&Notification.requestPermission()}function r(e,t){setTimeout(function(){e.close?e.close():e.cancel&&e.cancel()},t)}function c(){navigator.serviceWorker.ready.then(function(e){g=e})}function l(e,t,n){if(c(),g&&!n)return void g.showNotification(e,t);try{var a=new Notification(e,t);a.show&&a.show(),n&&r(a,n)}catch(i){if(!t.actions)throw i;t.actions=[],l(e,t,n)}}function s(e,t){var n={title:"New "+e.Type,body:e.Name,vibrate:!0,tag:"newItem"+e.Id,data:{}},a=e.ImageTags||{};a.Primary&&(n.icon=t.getScaledImageUrl(e.Id,{width:80,tag:a.Primary,type:"Primary"})),l(n.title,n,15e3)}function d(e,n){var a=e.ItemsAdded;a.length&&window.Notification&&"granted"===Notification.permission&&(t.isPlayingVideo()||n.getItems(n.getCurrentUserId(),{Recursive:!0,Limit:3,IsFolder:!1,SortBy:"DateCreated",SortOrder:"Descending",ImageTypes:"Primary",Ids:a.join(",")}).then(function(e){for(var t=e.Items,a=0,i=t.length;i>a;a++)s(t[a],n)}))}function m(e){return i.toUrl(".").split("?")[0]+"/"+e}function f(e,t,n){e.getCurrentUser().then(function(e){if(e.Policy.IsAdministrator){var i={tag:"install"+t.Id,data:{},icon:m("/notificationicon.png")};if("completed"==n?(i.title=a.translate("sharedcomponents#PackageInstallCompleted").replace("{0}",t.Name+" "+t.Version),i.vibrate=!0):"cancelled"==n?i.title=a.translate("sharedcomponents#PackageInstallCancelled").replace("{0}",t.Name+" "+t.Version):"failed"==n?(i.title=a.translate("sharedcomponents#PackageInstallFailed").replace("{0}",t.Name+" "+t.Version),i.vibrate=!0):"progress"==n&&(i.title=a.translate("sharedcomponents#InstallingPackage").replace("{0}",t.Name+" "+t.Version)),"progress"==n){var o=Math.round(t.PercentComplete||0);i.body=o+"% complete."}var r="cancelled"==n?5e3:0;l(i.title,i,r)}})}document.addEventListener("click",o),document.addEventListener("keydown",o);var g;c(),n.on(e,"LibraryChanged",function(e,t,n){d(n,t)}),n.on(e,"PackageInstallationCompleted",function(e,t,n){f(t,n,"completed")}),n.on(e,"PackageInstallationFailed",function(e,t,n){f(t,n,"failed")}),n.on(e,"PackageInstallationCancelled",function(e,t,n){f(t,n,"cancelled")}),n.on(e,"PackageInstalling",function(e,t,n){f(t,n,"progress")})});