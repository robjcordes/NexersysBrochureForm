var $ = jQuery.noConflict();
$(document).ready(function() {
    $("#nex_request_form").validationEngine('attach'); // set up form validation.
    $('#nex_request_form .submit').hover(function(){
        $(this).toggleClass('down');
    });
    $('#nex_request_form .submit').click(function(event){
        var country = $('[name=Country]').val();
        nexReqForm.updateAction(country, nexReqForm.urlType);
        nexReqForm.showTestAlerts();
        return false;
    });

    nexReqForm = {
        /*
         * Instructions:  Enter complete urls in the arrays below for home, commercial and pro models.
         * Any other url will be treated as 'general'.
         *
         */
        homeUrls : [
    'http://form.localhost:8888/home.php',
    'http://nexersysdemo.principlepointdev.com/form/home.php',
    'http://nexersysdemo.principlepointdev.com/NexersysBrochureForm/home.php'
    ],
    commercialUrls : [
        'http://form.localhost:8888/comm.php',
        'http://nexersysdemo.principlepointdev.com/form/comm.php',
        'http://nexersysdemo.principlepointdev.com/NexersysBrochureForm/comm.php'],
    proUrls : [
        'http://form.localhost:8888/pro.php',
        'http://nexersysdemo.principlepointdev.com/form/pro.php',
        'http://nexersysdemo.principlepointdev.com/NexersysBrochureForm/pro.php'],
    hiddenCommInput : "<input type='hidden' name='xnQsjsdp' value='dhOYVrEbdmJthYo*kRl79w$$'><input type='hidden' name='xmIwtLD' value='xxtEl*Hx2ByNU*uyPq3OMHBogz4VdScW'><input type='hidden' name='actionType' value='TGVhZHM='><input type='hidden' name='returnURL' value='http://www.nexersys.com'>",
    hiddenHomeInput : "<input type='hidden' name='xnQsjsdp' value='f1LzxolSe-0$'><input type='hidden' name='xmIwtLD' value='82AfV3HJwjp71g4ILMIYL*GCpUdN*P5O'><input type='hidden' name='actionType' value='TGVhZHM='><input type='hidden' name='returnURL' value='http://www.nexersys.com'>",
    formNameHome: "WebToLeads452985000001485047",
    formNameComm: "WebToLeads582065000000070015",
    showTestAlerts : function(){
        var formValues = 'form name: ' + $('#nex_request_form').attr('name')
            + '\n URL Type: ' + nexReqForm.urlType
            + '\n Model Type: ' + nexReqForm.modelType
            + '\n Country: ' + $('#nex_request form [name=Country]').val()
            + '\n Questions: ' + $('#nex_request form [name=Questions]').val();
        $('#nex_request form input').each(function(){
            formValues += '\n ' + $(this).val();
        });
        alert(formValues);
    },
    checkUrlType : function(){
                       var url = $(location).attr('href');
                       if($.inArray(url, this.homeUrls) != -1){
                           this.urlType = 'home';
                       }else if($.inArray(url, this.commercialUrls) != -1){
                           this.urlType = 'commercial';
                       }else if($.inArray(url, this.proUrls) != -1){
                           this.urlType = 'pro';
                       }else{
                           this.urlType = 'general';
                       }
                   },
    updateAction : function(country, urlType){
                       this.modelType = $('[name=LEADCF3]').val();
                       if(this.urlType == 'general'){
                           if((this.modelType == 'home' || this.modelType == 'pro') && country == 'United States'){
                               //zohoHome
                               $('#nex_request form').attr('name', this.formNameHome);
                               $('#nex_request table').prepend(this.hiddenHomeInput);
                           }else{
                               //zohoCommercial
                               $('#nex_request form').attr('name', this.formNameComm);
                               $('#nex_request table').prepend(this.hiddenCommInput);
                           }
                       }else if(this.urlType == 'home' || this.urlType == 'pro'){
                           if(country == 'United States'){
                               //zohoHome
                               $('#nex_request form').attr('name', this.formNameHome);
                               $('#nex_request table').prepend(this.hiddenHomeInput);
                           }else{
                               //zohoCommercial
                               $('#nex_request form').attr('name', this.formNameComm);
                               $('#nex_request table').prepend(this.hiddenCommInput);
                           }
                       }else if(this.urlType == 'commercial'){
                           //zohoCommercial
                           $('#nex_request form').attr('name', this.formNameComm);
                           $('#nex_request table').prepend(this.hiddenCommInput);
                       }
                       //todo: update hidden inputs
                   },
    formatForm : function(){
                     if(this.urlType == 'home'){
                         $('.model_type').addClass('hidden');
                         $('[name=LEADCF3]').val('home');
                         $('#nex_request .left-top img').attr('src', './img/nex-bro-home.png');
                     }else if(this.urlType == 'commercial'){
                         $('.model_type').addClass('hidden');
                         $('[name=LEADCF3]').val('commercial');
                         $('#nex_request .left-top img').attr('src', './img/nex-bro-comm.png');
                     }else if(this.urlType == 'pro'){
                         $('.model_type').addClass('hidden');
                         $('[name=LEADCF3]').val('pro');
                         $('#nex_request .left-top img').attr('src', './img/nex-bro-pro.png');
                     }else{
                         $('#nex_request .left-top img').attr('src', './img/nex-bro-home.png');
                     }
                 }
    }
    nexReqForm.checkUrlType();
    nexReqForm.formatForm();
});
