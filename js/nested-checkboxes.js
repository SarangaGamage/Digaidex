/**
  * Nested Checkbox functionality 
 * This functionality should be copied to individual files in order implement custom functionality
 */

$(document).ready(function() {

    var welParent = $('.ibox-title input[type=checkbox]').checkbox();
    var welChild = $('.ibox-content input[type=checkbox]').checkbox();

    welParent.each(function(i, element) {

        var welParentInner = $(element);
        // find the closes ibox-content div
        var closestIboxContent = welParentInner.closest('div.ibox-title').next();

        // get all the child checkboxes from within the ibox-content div           
        var welInnerChild = closestIboxContent.find('div.bootstrap-checkbox');

        console.log('welInnerChild.length', welInnerChild.length);

        // check event on parent checkbox
        welParentInner.on('check', function(e) {
            // remove ambiguous;
            console.log('parent checked', e.checked);

            welParentInner.chbxChecked(e.checked);

            welInnerChild.each(function(i, elem) {
                $(elem).chbxChecked(e.checked);

            });

        });

    });


    welChild.each(function(i, child) {
        var welSingleChild = $(child);

        // find the closes ibox-content div
        var closestIboxContent = welSingleChild.closest('div.ibox-content');
        var welInnerChild = closestIboxContent.find('div.bootstrap-checkbox');

        var welImmediateParent = welSingleChild.closest('div.ibox-content').prev().find('div.bootstrap-checkbox');

        welSingleChild.on('check', function(e) {

            var bAnd = true,
                bOr = false;
            welInnerChild.each(function(i, element) {
                var bChecked = $(element).chbxChecked();
                bAnd = bAnd && bChecked, bOr = bOr || bChecked;
            });

            var bChecked = bAnd === true || (bAnd === false && bOr === false ? false : null);
            console.log('new parent status', bChecked);

            welImmediateParent.chbxChecked(bChecked);
        });

    });


});