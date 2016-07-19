define(["events","libraryBrowser","imageLoader","listView","emby-itemscontainer"],function(e,t,r,a){return function(e,i,n){function o(e){var r=l(e),a=c[r];return a||(a=c[r]={query:{SortBy:"SeriesSortName,SortName",SortOrder:"Ascending",IncludeItemTypes:"Episode",Recursive:!0,Fields:"PrimaryImageAspectRatio,MediaSourceCount,UserData,SyncInfo",IsMissing:!1,IsVirtualUnaired:!1,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb",StartIndex:0,Limit:S},view:t.getSavedView(r)||t.getDefaultItemsView("Poster","Poster")},a.query.ParentId=i.topParentId,t.loadSavedQueryValues(r,a.query)),a}function s(e){return o(e).query}function l(e){return e.savedQueryKey||(e.savedQueryKey=t.getSavedQueryKey("episodes")),e.savedQueryKey}function u(e){Dashboard.showLoadingMsg();var i=s(e);ApiClient.getItems(Dashboard.getCurrentUserId(),i).then(function(o){function s(){i.StartIndex+=i.Limit,u(n)}function d(){i.StartIndex-=i.Limit,u(n)}window.scrollTo(0,0);var S,c=LibraryBrowser.getQueryPagingHtml({startIndex:i.StartIndex,limit:i.Limit,totalRecordCount:o.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!1,sortButton:!1,filterButton:!1}),y=m.getCurrentViewStyle();S="List"==y?a.getListViewHtml({items:o.Items,sortBy:i.SortBy,showParentTitle:!0}):t.getPosterViewHtml("PosterCard"==y?{items:o.Items,shape:"backdrop",showTitle:!0,showParentTitle:!0,lazy:!0,cardLayout:!0,showDetailsMenu:!0}:{items:o.Items,shape:"backdrop",showTitle:!0,showParentTitle:!0,overlayText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0});var g,f,v=n.querySelectorAll(".paging");for(g=0,f=v.length;f>g;g++)v[g].innerHTML=c;for(v=n.querySelectorAll(".btnNextPage"),g=0,f=v.length;f>g;g++)v[g].addEventListener("click",s);for(v=n.querySelectorAll(".btnPreviousPage"),g=0,f=v.length;f>g;g++)v[g].addEventListener("click",d);var w=n.querySelector(".itemsContainer");w.innerHTML=S,r.lazyChildren(w),t.saveQueryValues(l(e),i),Dashboard.hideLoadingMsg()})}function d(e){e.querySelector(".itemsContainer").addEventListener("needsrefresh",function(){u(e)}),e.querySelector(".btnFilter").addEventListener("click",function(){m.showFilterMenu()}),e.querySelector(".btnSort").addEventListener("click",function(r){t.showSortMenu({items:[{name:Globalize.translate("OptionNameSort"),id:"SeriesSortName,SortName"},{name:Globalize.translate("OptionTvdbRating"),id:"CommunityRating,SeriesSortName,SortName"},{name:Globalize.translate("OptionDateAdded"),id:"DateCreated,SeriesSortName,SortName"},{name:Globalize.translate("OptionPremiereDate"),id:"PremiereDate,SeriesSortName,SortName"},{name:Globalize.translate("OptionDatePlayed"),id:"DatePlayed,SeriesSortName,SortName"},{name:Globalize.translate("OptionParentalRating"),id:"OfficialRating,SeriesSortName,SortName"},{name:Globalize.translate("OptionPlayCount"),id:"PlayCount,SeriesSortName,SortName"},{name:Globalize.translate("OptionRuntime"),id:"Runtime,SeriesSortName,SortName"},{name:Globalize.translate("OptionVideoBitrate"),id:"VideoBitRate,SeriesSortName,SortName"}],callback:function(){u(e)},query:s(e),button:r.target})});var r=e.querySelector(".btnSelectView");r.addEventListener("click",function(e){t.showLayoutMenu(e.target,m.getCurrentViewStyle(),"List,Poster,PosterCard".split(","))}),r.addEventListener("layoutchange",function(r){var a=r.detail.viewStyle;o(e).view=a,t.saveViewSetting(l(e),a),u(e)})}var m=this,S=t.getDefaultPageSize(),c={};m.showFilterMenu=function(){require(["components/filterdialog/filterdialog"],function(e){var t=new e({query:s(n),mode:"episodes"});Events.on(t,"filterchange",function(){u(n)}),t.show()})},m.getCurrentViewStyle=function(){return o(n).view},d(n),m.renderTab=function(){u(n)},m.destroy=function(){}}});