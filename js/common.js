$(document).ready(function() {
    var outline = 3;


    function init() {
        drawBoard();    // 바닥 그리기
    }

    function drawBoard() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        /* grid image onload */
        var gridImg = new Image();
        gridImg.src = 'images/bg-canvas.gif';

        gridImg.onload = function() {
            ctx.clearRect(0, 0, 0, 0);
            ctx.drawImage(gridImg, 0, 0, 150, 150);
        }
    }

    function drawImg() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        var imgElement = document.getElementById('imgCanvas');
    
        var imgObj = new Image();
        imgObj.src = imgElement.src;
    
        var imgW = imgObj.width;
        var imgH = imgObj.height;
        var imgX = (ctx.canvas.width * .5) - (imgW * .5);
        var imgY = (ctx.canvas.height * .5) - (imgH * .5);
    
        imgObj.onload = function() {
            ctx.clearRect(imgX, imgY, imgW, imgH);
            ctx.drawImage(imgObj, imgX, imgY, imgW, imgH);
        }
    }
    
    $('.lacto').draggable({
        containment: 'document', 
        opacity: 0.3,
        snap: true,
        // revert: true,
        revert: function(dropped) {
            var $this = $(this);
            var hasBeenDropped = $this.data('hasBeenDropped');
            console.log(dropped.data);

            if(hasBeenDropped) {
                console.log('drop 영역 입니다');
                $(this).hide();
                return false;           // 다시 돌아오지 않음
            } else {
                console.log('drop 영역이 아닙니다.');
                return true;            // 다시 돌아옴
            };
        },
        start: function() {
            $('.infoDrag').text('start Drag');
        },
        drag: function() {
            $('.infoDrag').text('on Drag');
        }, 
        stop: function() {
            $('.infoDrag').text('Stop Drag');
            // $(this).css('opacity', '0');        // Drag 후에
        }
    });

    $('#myCanvas').droppable({
        accept: '.lacto',
        hoverClass: 'on-horder',
        tolerance: 'touch',
        drop: function(event, ui) {
            var droppedItem = $(ui.draggable).clone();
            var canvasImg = $(this).find('img');
            var newSrc = droppedItem.attr('src');

            $(ui.draggable).data('hasBeenDropped', true);
            canvasImg.attr('src', newSrc);
            drawImg();
        }
    });

    init();

});