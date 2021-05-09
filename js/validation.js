VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);

VeeValidateI18n.loadLocaleFromURL('../json/zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});