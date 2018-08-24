$(window, document, undefined).ready(function() {

    $('input').blur(function() {
        var $this = $(this);
        if ($this.val())
            $this.addClass('used');
        else
            $this.removeClass('used');
    });

    var $ripples = $('.ripples');

    $ripples.on('click.Ripples', function(e) {

        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.ripplesCircle');

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
            top: y + 'px',
            left: x + 'px'
        });

        $this.addClass('is-active');

    });

    $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
        $(this).removeClass('is-active');
    });




    function changeType(x, type) {
        if (x.prop('type') == type)
            return x; //That was easy.
        try {
            return x.prop('type', type); //Stupid IE security will not allow this
        } catch (e) {
            //Try re-creating the element (yep... this sucks)
            //jQuery has no html() method for the element, so we have to put into a div first
            var html = $("<div>").append(x.clone()).html();
            var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
            //If no match, we add the type attribute to the end; otherwise, we replace
            var tmp = $(html.match(regex) == null ?
                html.replace(">", ' type="' + type + '">') :
                html.replace(regex, 'type="' + type + '"'));
            //Copy data from old element
            tmp.data('type', x.data('type'));
            var events = x.data('events');
            var cb = function(events) {
                return function() {
                    //Bind all prior events
                    for (i in events) {
                        var y = events[i];
                        for (j in y)
                            tmp.bind(i, y[j].handler);
                    }
                }
            }(events);
            x.replaceWith(tmp);
            setTimeout(cb, 10); //Wait a bit to call function
            return tmp;
        }
    }


    $('.password_mask').on('click', function() {
        if ($('#login_password').attr('type') == 'password') {
            changeType($('#login_password'), 'text');
            $(this).text("visibility_off");
        } else {
            changeType($('#login_password'), 'password');
            $(this).text("remove_red_eye");
        }
        return false;
    });


    $('#next-reg-2').on('click', function() {

        $('#step2-reg').fadeIn("slow");
        //$('#next-reg-2').fadeOut("slow");
        //alert("jexpert");



    })



    $('#next-reg-3').on('click', function() {

        $('#step3-reg').fadeIn("slow");


    })




    /* form validation */




});