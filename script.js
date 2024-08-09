// ==UserScript==
// @name         开发者文档自动英文转中文（官方翻译）
// @version      1.2.1
// @description  自动切换Google和Github的开发者文档。gh_repo: lsyyyy11/tampermonkey-developer_docs-en-to-zh_CN
// @author       lsyyyy11
// @match        https://docs.github.com/en/*
// @match        https://developers.google.com/*
// @match        https://*.developers.google.cn/*
// @match        https://developers.google.com.hk/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    const currentUrl = window.location.href;
    let newUrl;

    // GitHub Docs处理
    if (currentUrl.includes('docs.github.com/en/')) {
        newUrl = currentUrl.replace('/en/', '/zh/');
    }

    // Google Developers Docs处理
    else if (currentUrl.includes('developers.google') && !currentUrl.includes('?hl=')) {
        // 如果当前URL没有语言参数，则添加?hl=zh-CN
        newUrl = currentUrl.includes('?') ? currentUrl + '&hl=zh-CN' : currentUrl + '?hl=zh-CN';
    }

    // 如果找到合适的URL，发送请求检查页面是否存在
    if (newUrl) {
        fetch(newUrl, {
            method: 'HEAD'
        }).then(response => {
            // 如果响应状态不是404，表示目标页面存在，进行跳转
            if (response.status !== 404) {
                window.location.href = newUrl;
            }
        }).catch(error => {
            console.log('Error checking page:', error);
        });
    }

})();