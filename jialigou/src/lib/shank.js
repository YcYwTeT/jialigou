jQuery.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/,constValue) {
    this.each(function () {
        var jqNode = $(this);
        var cuLeft = jqNode.position().left;
         // jqNode
         for (var x = 1; x <= intShakes; x++) {
             jqNode.stop(true,true).animate({ left: (jqNode.position().left + intDistance * -1) }, (((intDuration / intShakes) / 4)))
             .animate({ left: jqNode.position().left + intDistance }, ((intDuration / intShakes) / 2))
             .animate({ left: constValue }, (((intDuration / intShakes) / 4)));
         }
    });
    return this;
}