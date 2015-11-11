/*
 * zNice validation plugin
 * version: 0.1 (07.12.2013)
 * by Vitaliy Grozinskiy (zendo@ukr.net) 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * jQuery validation (http://jqueryvalidation.org/) is required for this plugin.
 * 
 ******************************************** */
 (function($){
	/*Adding custom rules*/
	jQuery.validator.addMethod("phoneRU", function(value, element) {
		return this.optional(element) || /^([0-9]){10}$/.test(value);
	}, "10-ти значный номер без пробелов");

	jQuery.validator.addMethod("requiredPhone", function(value, element, param) {
		value = value.replace('+7 (___) ___-__-__');
		
		if ( !this.depend( param, element ) ) {
			return "dependency-mismatch";
		}
		if ( element.nodeName.toLowerCase() === "select" ) {
			var val = $( element ).val();
			return val && val.length > 0;
		}
		if ( this.checkable( element ) ) {
			return this.getLength( value, element ) > 0;
		}
		return $.trim( value ).length > 0;
	}, "Укажите ваш телефон");

	jQuery.validator.addMethod("minlengthPhone", function(value, element, param) {
		value = value.replace('+7 (', '');
		value = value.replace(') ', '');
		value = value.replace(/ - /g, '');
		value = value.replace(/_/g, '');
		
		var length = $.isArray( value ) ? value.length : this.getLength( $.trim( value ), element );
		return this.optional( element ) || length >= param;
	}, "Телефон должен быть не менее {0} символов");



	$.fn.zValidate = function(settings){
		var self=this;
		$(self).each(function(){
			var $form=$(this).is('form') ? $(this) : $(this).find('form');
			if ($form.length!=0){
				$form.validate({
					errorClass : 'zNice-error-text',
					invalidHandler: function(event, validator) {
						console.log(validator);
					},
					errorPlacement: function(error, element) {
						error.appendTo( element.closest(".zNice-wrap,.zNiceInputWrapper,.zNiceSelectWrapper,.jCheckWrapper,.jRadioWrapper"));
					},
					highlight: function(element, errorClass, validClass) {
						$(element).closest('.zNice-wrap,.zNiceInputWrapper,.zNiceSelectWrapper,.jCheckWrapper,.jRadioWrapper').addClass('zNice-error').removeClass('zNice-valid');
					},
					unhighlight: function(element, errorClass, validClass) {
						$(element).closest('.zNice-wrap,.zNiceInputWrapper,.zNiceSelectWrapper,.jCheckWrapper,.jRadioWrapper').removeClass('zNice-error').addClass('zNice-valid');
					}
				});
				$('[required]',$form).each(function(){
					$(this).rules( "add", {
						required: true,
						messages: {
							required: "Заполните поле"
						}
					});
				})
				$('[type="email"]',$form).each(function(){
					$(this).rules( "add", {
						messages: {
							email: "неверный e-mail"
						}
					});
				})
				$('[type="password"]',$form).each(function(){
					$(this).rules( "add", {
						minlength : 3,
						messages: {
							minlength: "мало символов"
						}
					});
				})
				$('[phoneRU]',$form).each(function(){
					$(this).rules( "add", {
						 phoneRU: true,
						 messages: {
							phoneRU: ""
						}
					});
				})
				$('[phone]',$form).each(function(){
					$(this).rules( "add", {
					 	requiredPhone: true,
						minlengthPhone: 12,
						 messages: {
							minlengthPhone: "Телефон должен быть не менее 10 символов"
						}
					});
				})

				$('[code]',$form).each(function(){
					$(this).rules( "add", {
						required: true,
						messages: {
							required: "неверный код"
						}
					});
					if ($form.find('.regForm-bottom>p').length>0)
						$(this).valid();

				})
			}
		})
	}
})(jQuery)