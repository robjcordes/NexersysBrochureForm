$(document).ready(function() {
    $("#nex_request_form").validationEngine('attach'); // set up form validation.
    $('#nex_request_form .submit').hover(function(){
        $(this).toggleClass('down');
    });
    $('#nex_request_form .submit').click(function(){
        var country = $('[name=Country]').val();
        nexReqForm.updateAction(country, nexReqForm.urlType);
    });

    nexReqForm = {
        /*
         * Instructions:  Enter complete urls in the arrays below for home, commercial and pro models.  
         * Any other url will be treated as 'general'.  Also enter the home and commercial destination urls for zoho CRM.  
         * 
         */
        homeUrls : ['http://form.localhost:8888/home.php', 'http://nexersysdemo.principlepointdev.com/form/home.php'],
        commercialUrls : ['http://form.localhost:8888/comm.php', 'http://nexersysdemo.principlepointdev.com/form/comm.php'],
        proUrls : ['http://form.localhost:8888/pro.php', 'http://nexersysdemo.principlepointdev.com/form/pro.php'],
        zohoHomeUrl : 'http://home.com',
        zohoCommUrl : 'http://commercial.com',
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
                           var modelType = $('[name=ModelType]').val();
                           if(this.urlType == 'general'){
                               if((modelType == 'home' || modelType == 'pro') && country == 'United States'){
                                   this.action = this.zohoHomeUrl;
                               }else{
                                   this.action = this.zohoCommUrl;
                               }
                           }else if(this.urlType == 'home' || this.urlType == 'pro'){
                               if(country == 'United States'){
                                   this.action = this.zohoHomeUrl;
                               }else{
                                   this.action = this.zohoCommUrl;
                               }
                           }else if(this.urlType == 'commercial'){
                               this.action = this.zohoCommUrl;
                           }
                           $('#nex_request_form').attr('action', this.action);
                       },
        formatForm : function(){
                         if(this.urlType == 'home'){
                             $('.model_type').addClass('hidden');
                             $('[name=ModelType]').val('home');
                             $('#nex_request .left-top img').attr('src', './img/nex-bro-home.png');
                         }else if(this.urlType == 'commercial'){
                             $('.model_type').addClass('hidden');
                             $('[name=ModelType]').val('commercial');
                             $('#nex_request .left-top img').attr('src', './img/nex-bro-comm.png');
                         }else if(this.urlType == 'pro'){
                             $('.model_type').addClass('hidden');
                             $('[name=ModelType]').val('pro');
                             $('#nex_request .left-top img').attr('src', './img/nex-bro-pro.png');
                         }else{
                             $('#nex_request .left-top img').attr('src', './img/nex-bro-home.png');
                         }
                     }
    }
    nexReqForm.checkUrlType();
    nexReqForm.formatForm();
});