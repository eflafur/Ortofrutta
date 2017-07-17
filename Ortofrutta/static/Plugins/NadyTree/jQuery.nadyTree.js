﻿//=========== PlugIn ========================
(function ($) {
    //------------ Begin Clouser -------------------
    $.widget("nady.nadyTree", {
        options: {
            callType: 'url',
            url: '',
            structureObj: [{}],
            zoomer: true,
            afterDropClass: 'contaftrdrop'
        },
        _init: function () {
            //Will Call every time plugin called
        },
        _setOption: function (key, value) {
            if (key === "value") {
                //value = this._constrain(value);
            }
            this._super(key, value);
        },
        _setOptions: function (options) {
            this._super(options);
            this._createUpdate();
        },
        _createUpdate: function () {
            parentthis = this;
            //-----------------------
            if (this.options.callType == 'url') {
                $.getJSON(this.options.url, function (data) {
                    // console.log(data);
                })
                    .done(function (data) {
                        //----------------------
                        //console.log(data);
                        //jsonStructureObject = data;
                        parentthis._constructTree(data);
                        //alert(jsonStructureObject.length);
                        //----------------------
                    })
                    .fail(function (err) {
                        var status = err.status;
                        var statusText = err.statusText;
                        alert('error');
                        //console.log(err);
                    });
            }
            if (this.options.callType == 'obj') {
                //-----------------------
                this._constructTree(this.options.structureObj);
                //-----------------------
            }



        },
        _create: function () {
            this._createUpdate();
        },
        destroy: function () {
            // Call the base destroy function.
            $.Widget.prototype.destroy.call(this);
        },
        //_______________________ Private Functions ___________________________________
        _constructTree: function (jsonStructureObject) {
            //----------- add mainli ------
            var $tree = $(this.element);
            $tree.addClass('tree').append("<ul id='tremainul'>");
            //-----------------------------
            this._walkerCursor(jsonStructureObject, 'tremainul');
            this._prepareNodes();
            this._treeDarg();
            this._treeDrop();
            this._interactionEvents();
            if (this.options.zoomer) this._zoomer($tree);
        },
        //------
        _walkerCursor: function (jsonObjs, parentLiNode) {
            for (var i = 0; i < jsonObjs.length; i++) {
                var node = jsonObjs[i];
                //---------- Create Node -------------------
                this._createNode(node, parentLiNode);
                //------------------------------------------
                if (node.children !== null && typeof node.children === "object") {
                    this._walkerCursor(node.children, node.Id);
                }
            }
        },
        //------
        _createNode: function (node, parentLiNode) {
            var bfrul = '';
            var isTreemainLi = (parentLiNode === "tremainul");
            var beforeDiv = '';
            var afterDiv = '';
            if (node.children) {
                bfrul = '<div class="bfrul"></div>';
            }
            if (!isTreemainLi) {
                beforeDiv = '<div class="before"><div class="funcbtnb ui-state-default ui-corner-all" title="Level Focus" data-func="focus"><span class="ui-icon ui-icon-zoomin"></span></div></div>';
                afterDiv = '<div class="after"><div class="funcbtna ui-state-default ui-corner-all" title="collapse" data-func="clps"><span class="ui-icon ui-icon-triangle-1-n"></span></div></div>';
            }

            var nodeLiElements = '<li id="' + node.Id + '" class="tnode" >' + beforeDiv + '<div class="trcont"><div class="ui-widget-header ui-corner-tl ui-corner-tr">' +
                node.head + '</div><div class="ui-widget-content ui-corner-bl ui-corner-br ' + node.level + '">' +
                node.contents + '</div></div><div class="trchl"><ul>' +
                bfrul + '</ul></div>' + afterDiv + '</li>';

            if (isTreemainLi) {// Firest ul
                $("#" + parentLiNode).append(nodeLiElements);
            }
            else {
                $("> .trchl > ul", "#" + parentLiNode).append(nodeLiElements);
            }
        },
        //------
        _prepareNodes: function () {
            // Get All Childs Containers an for each one Count Number of LI
            $('.trchl').each(function (e, x) {
                var $obj = $(this);
                //-----
                var $li = $($obj).find('> ul>li');
                var count = $li.length;
                //.css("background-color", "red");
                if (count == 1)// Only Child
                {
                    $($li).find('> .before, > .after').css("border-top", "0px");
                }
                if (count > 1) {
                    $li.first().find('> .after').css("border-top", "0px");
                    $li.last().find('> .before').css("border-top", "0px");
                }
                //-------------
                var chldinsidlicount = $li.find('.trchl');

                //-------------
                $obj.find('div[data-func]').each(function (a, o) {
                    var objbtn = $(o);
                    if (objbtn.data('func') == "reset") {
                        objbtn.show();
                        var objfocus = objbtn.parent().closest('li');
                        var objother = objfocus.parent().find('> li');
                        var targetobjs = $(objother).not(objfocus);
                        targetobjs.hide();
                    }

                    if (objbtn.data('func') == "xpnd") {
                        objbtn.show();
                        objbtn.parent().parent().find('.trchl').hide();
                    }


                });

            });
        },
        //------
        _treeDarg: function () {

            $("li", ".tree").draggable({
                //connectToSortable: "#tree2 ul",
                cancel: "a.ui-icon", // clicking an icon won't initiate dragging
                revert: "invalid", // when not dropped, the item will revert back to its initial position
                revertDuration: 600,
                containment: "document",
                //helper: "clone",
                helper: function (event, ui) {

                    var orginalElement = $(this);
                    var header = orginalElement.find('> .trcont').find('.ui-widget-header');
                    var headerCopy = header.text();
                    return $('<div class="ui-state-focus ui-corner-all" />').css("width", header.css("width")).text(headerCopy);
                    //return $('<span style="white-space:nowrap;"/>').text(orginalElement.text() + " Custom helper");

                },
                cursor: "move",
                distance: 20,
                opacity: 0.8,
                snap: '.trcont',
                snapMode: 'inner',
                stack: '.trcont',
                start: function (event, ui) { },
                stop: function (event, ui) { }
            });

        },
        //------
        _treeDrop: function () {
            var thisparent = this;
            $("li", ".tree").droppable({
                //tolerance: 'intersect',
                greedy: true,
                accept: ".tree ul > li",
                activeClass: "dragactive",
                hoverClass: 'drophover',
                drop: function (event, ui) {

                    //-----------------
                    var draggableObj = ui.draggable;
                    var droppableObj = $(this);
                    //-----------------
                    var draggableId = draggableObj.attr("id");
                    var droppableId = droppableObj.attr("id");
                    //-----------------
                    //Check if Target Li contain UL Structure or not
                    var $ItemUL = $("ul:first", droppableObj);

                    if ($ItemUL.length) {// Contain UL

                        //$(draggableObj).effect('fold', { direction: 'up', mode: 'hide' }, 'normal');

                        //$(".target").hide("explode", { pieces: 16 }, 2000);
                        //-----------------
                        //$(draggableObj).hide("explode", { pieces: 20 }, 800);
                        //---------------
                        if (!$ItemUL.find('> .bfrul').length) {
                            $ItemUL.append('<div class="bfrul"></div>');
                        }
                        //---------------
                        $(draggableObj).fadeOut("slow", function () {
                            $(this).appendTo($ItemUL).fadeIn('slow')
                            .effect('shake', { direction: 'down', mode: 'effect' }, 'slow');
                            $(this).find("> .trcont").addClass(thisparent.options.afterDropClass);

                            //$(this).animate({ left: 200 }, { duration: 'slow', easing: 'easeOutElastic' });
                        });
                        //--------------------

                    }
                    else { // Not contain UL

                        //---------------
                        //var $TargetDiv = $(".trchl:first", $(droppableObj));
                        //$TargetDiv.append("<ul><div class='bfrul'></div></ul>").hide().fadeIn('slow');

                        //var $TargetUL = $TargetDiv.find("ul");
                        //$(draggableObj).fadeOut("slow", function () {
                        //    $(this).appendTo($TargetUL).css({
                        //        //'background-color': 'red'
                        //        //,'padding': '20px 5px 0px 5px'
                        //    }).fadeIn('slow');
                        //});
                    }

                    //this._prepareNodesAfterDrop
                    prepareNodesAfterDrop(draggableObj, droppableObj);
                    //---------- Fire Event --------------------------
                    thisparent._trigger("nodeDropComplete", null, { nodeId: draggableId, parentNodeId: droppableId });
                    //------------------------------------------------
                }
            });
            function prepareNodesAfterDrop(movedObj, targetObj) {
                // There is 3 possibilities
                //1- The moved LI is the first LI inside it's UL
                //2- The moved LI is the Last LI inside it's UL
                //3- The moved LI is inthe middle of Last & First LIs
                //-----------------------------
                //----- Indicate the the moved & target LI  --------
                //---------------- A- Refine Source Location -----------------
                var parentUl = $(movedObj).parent();//.find('> li');
                var parentLis = parentUl.find('> li');
                var objIndex = movedObj.index();
                if (parentLis.length == 1)// just Only 1 Child
                {
                    //---1-Remove Coonector from Parent
                    $('.bfrul', parentUl).fadeOut("slow", function () {
                        $(this).remove();// Remove Ul , it created again when add LI
                    });
                }
                if (parentLis.length > 1)// Many li's
                {
                    var $besideLi;
                    // Determine The moved Li Position [First , Middle , Last]
                    if (objIndex == 1)//First LI
                    {
                        //$([beforafterdiv[2], beforafterdiv[3]]).css("border-top", "0px");//.css("border-top", "0px");
                        $besideLi = $(movedObj).next('li');//.css("border", "1px solid red");
                        if (parentLis.length == 2) {//----1-if the count is 2 then the remain is only child then Remove befor & After top border
                            $besideLi.find('> .before ,> .after').css("border-top", "0px");
                        }
                        else// the remain more than 1 li
                        {
                            $besideLi.find('> .after').css("border-top", "0px");
                        }
                    }
                    if (objIndex == parentLis.length)// Last LI
                    {
                        $besideLi = $(movedObj).prev('li');//.css("border", "1px solid red");
                        if (parentLis.length == 2) {//----1-if the count is 2 then the remain is only child then Remove befor & After top border
                            $besideLi.find('> .before ,> .after').css("border-top", "0px");
                        }
                        else// the remain more than 1 li
                        {
                            $besideLi.find('> .before').css("border-top", "0px");
                        }
                    }
                }
                //--------------- B- Refine Target Location -----------------
                //1- Determine the number of Lis inside Target Li
                var $targetlis = $(targetObj).find('> .trchl > ul > li');
                //alert($targetlis.length);
                if ($targetlis.length == 0)//there is no Lis and moved li will be the only li , so remove befor after top border
                {
                    $(movedObj).find('> .before ,> .after').css("border-top", "0px");
                }
                else //always the moved Li will be the last Li So Hide befor border and show after div top border
                {
                    $(movedObj).find('> .before').css("border-top", "0px");
                    $(movedObj).find('> .after').css("border-top", "1px solid #ccc");
                    //Get last Li inside TrgetLI to add after top border
                    var $lastLi = $targetlis.last();
                    $lastLi.find("> .before").css("border-top", "1px solid #ccc");
                }
            }

        },
        //------
        _interactionEvents: function () {
            //_____________________________
            $(".tree").on({
                mouseenter: function () {
                    var parentLi = $(this).parent();
                    //-------------------
                    parentLi.find('> .before,> .after').find('> .funcbtnb,> .funcbtna').show('blind', { direction: 'vertical' });
                    //-------------------
                    //.toggleClass( "big-blue", 1000, "easeOutSine" );
                    parentLi.find('.ui-widget-content').addClass('tfocus');
                    parentLi.find('.ui-widget-header').addClass('ui-state-focus');
                },
                mouseleave: function () {

                    var parentLi = $(this).parent();
                    parentLi.find('.ui-widget-content').removeClass('tfocus');
                    parentLi.find('.ui-widget-header').removeClass('ui-state-focus');
                    //---------------------
                    //var funcbtns = parentLi.find('> .before,> .after').find('div[data-func]');
                    //if ($(funcbtns[0]).data('func') == "focus") {
                    //   // $(funcbtns[0]).hide('blind', { direction: 'vertical' });
                    //}
                    //if ($(funcbtns[1]).data('func') == "clps") {
                    //   // $(funcbtns[1]).hide('blind', { direction: 'vertical' });
                    //}
                    //---------------------
                }
            }, ".trcont,.before,.after");
            //-----------
            $(".tree").on('mouseleave', '.tnode', function () {

                var funcbtns = $(this).find('> .before,> .after').find('div[data-func]');
                if ($(funcbtns[0]).data('func') == "focus") {
                    $(funcbtns[0]).hide('blind', { direction: 'vertical' });
                }
                if ($(funcbtns[1]).data('func') == "clps") {
                    $(funcbtns[1]).hide('blind', { direction: 'vertical' });
                }

            });
            //_____________________________
            $(".tree").on("click", ".trcont > .ui-widget-header", function () {
//                $(this).parent().parent().find('.trchl').slideToggle();
            });
            //_____________________________
            $(".tree").on("click", "div[data-func]", function () {
                var objbtn = $(this);
                var objfocus = objbtn.parent().closest('li');
                var objother = objfocus.parent().find('> li');
                var targetobjs = $(objother).not(objfocus);

                var objfuncattr = objbtn.data("func");
                if (objfuncattr == 'focus' || objfuncattr == 'reset') {

                    //targetobjs.slideToggle('slow', "blind", function () {
                    //    // Animation complete.
                    //});

                    objbtn.find('span').toggleClass('ui-icon-zoomin ui-icon-zoomout');
                    if (objfuncattr == 'focus') {
                        // targetobjs.hide();

                        targetobjs.effect('fold', { direction: 'up', mode: 'hide' }, 'normal');
                        //objfocus.effect('bounce', { easing: 'easeOutBounce', direction: 'horizontal', mode: 'effect' }, 'slow');

                        objbtn.data("func", "reset");
                        objbtn.attr("title", "Level Reset");
                    }
                    else {
                        //targetobjs.effect('blind', { direction: 'vertical', mode: 'show' }, 'normal');
                        targetobjs.effect('fold', { direction: 'up', mode: 'show' }, 'slow');
                        objbtn.data("func", "focus");
                        objbtn.attr("title", "Level Focus");
                    }
                }

                if (objfuncattr == 'clps' || objfuncattr == 'xpnd') {
                    //$(this).parent().parent().find('.trchl').slideToggle('slow', "easeOutBounce", function () {

                    //});
                    //alert('clps');
                    objbtn.find('span').toggleClass("ui-icon-triangle-1-n ui-icon-triangle-1-s");
                    if (objfuncattr == 'clps') {
                        $(this).parent().parent().find('.trchl').effect('fold', { direction: 'up', mode: 'hide' }, 'slow');
                        objbtn.data('func', 'xpnd');
                        objbtn.attr("title", "Expand");
                    } else {
                        // $(this).parent().parent().find('.trchl').effect('shake', { direction: 'down', mode: 'effect' }, 'slow');
                        $(this).parent().parent().find('.trchl').slideDown('slow', "easeOutBounce", function () { });
                        //$(this).parent().parent().find('.trchl').effect('fold', { direction: 'down', mode: 'show' }, 'slow');
                        objbtn.data('func', 'clps');
                        objbtn.attr("title", "Collapse");
                    }
                }
            });
            //_____________________________
        },
        //------
        _zoomer: function (treeDiv) {
            var zmr = '<div class="zmrcntr"><input type="text" id="zmrval" class="zomrval"><div id="zmrslidr" style="height:200px;"></div></div>';
            $(zmr).insertBefore($(treeDiv));
            //--------------------------------
            var brwstp = navigator.userAgent.match(/Mozilla/);
            $("#zmrslidr").slider({
                orientation: "vertical",
                range: "min",
                min: 10,
                animate: 'slow',
                max: 200,
                value: 100,
                slide: function (event, ui) {
                    $("#zmrval").val(ui.value);
                    if (brwstp == true) {

                        $('.tree').css('MozTransform', 'scale(' + ui.value + ')');
                    } else {

                        $('.tree').css('zoom', ' ' + ui.value + '%');
                    }
                }
            });
            $("#zmrval").val($("#zmrslidr").slider("value"));
            //---------------------------------
        }
        //------
        //________________________ End Private Functions _______________________________
    });
    //------------ End Clouser -----------------------
})(jQuery);
//=========== End PlugIn ====================