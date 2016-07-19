define(["itemShortcuts","connectionManager","layoutManager","browser","dom","loading","registerElement"],function(e,t,n,i,r,o){function a(t){var n=this,i=(t.target,n.multiSelect);i&&i.onContainerClick.call(n,t)===!1||e.onClick.call(n,t)}function l(e){return e.preventDefault(),e.stopPropagation(),!1}function s(t){var n=this,i=t.target,o=r.parentWithAttribute(i,"data-id");return o?(e.showContextMenu(o,{identify:!1,positionTo:i,itemsContainer:n}),t.preventDefault(),t.stopPropagation(),!1):void 0}function u(){return{click:!1}}function c(e,n){var i=n.getAttribute("data-playlistid");o.show();var r=e.item,a=e.newIndex,l=r.getAttribute("data-playlistitemid"),s=r.getAttribute("data-serverid"),u=t.getApiClient(s);u.ajax({url:u.getUrl("Playlists/"+i+"/Items/"+l+"/Move/"+a),type:"POST"}).then(function(){r.setAttribute("data-index",a),o.hide()},function(){o.hide(),n.dispatchEvent(new CustomEvent("needsrefresh",{detail:{},cancelable:!1,bubbles:!0}))})}var d=Object.create(HTMLDivElement.prototype);d.enableHoverMenu=function(e){var t=this.hoverMenu;if(!e)return void(t&&(t.destroy(),this.hoverMenu=null));if(!t){var n=this;require(["itemHoverMenu"],function(e){n.hoverMenu=new e(n)})}},d.enableMultiSelect=function(e){var t=this.multiSelect;if(!e)return void(t&&(t.destroy(),this.multiSelect=null));if(!t){var n=this;require(["multiSelect"],function(e){n.multiSelect=new e({container:n,bindOnClick:!1})})}},d.enableDragReordering=function(e){var t=this.sortable;if(!e)return void(t&&(t.destroy(),this.sortable=null));if(!t){var n=this;require(["sortable"],function(e){n.sortable=new e(n,{draggable:".listItem",handle:".listViewDragHandle",onEnd:function(e){c(e,n)}})})}},d.attachedCallback=function(){this.addEventListener("click",a),i.mobile?this.addEventListener("contextmenu",l):this.addEventListener("contextmenu",s),n.desktop&&this.enableHoverMenu(!0),(n.desktop||n.mobile)&&this.enableMultiSelect(!0),e.on(this,u())},d.detachedCallback=function(){this.enableHoverMenu(!1),this.enableMultiSelect(!1),this.enableDragReordering(!1),this.removeEventListener("click",a),this.removeEventListener("contextmenu",s),this.removeEventListener("contextmenu",l),e.off(this,u())},document.registerElement("emby-itemscontainer",{prototype:d,"extends":"div"})});