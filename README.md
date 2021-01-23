# Dictionary Anywhere
Dictionary extension that helps you stay focused on what you are reading by eliminating the need to search for meaning, Double-clicking any word will view its definition in a small pop-up bubble. Now you never have to leave what you are reading to search meaning for the words you don't know.

Feel free to install extension <a href="https://addons.mozilla.org/en-US/firefox/addon/dictionary-anyvhere/">Dictionary Anywhere</a>, currently available on Mozilla Firefox.

---

给火狐浏览器(firefox)用的字典插件，很优秀。原插件的 API 直接使用谷歌搜索，国内连接不上。神奇的事情是，原作者自己把谷歌搜索封装成了一个[字典 API](https://github.com/meetDeveloper/googleDictionaryAPI) ，虽然速度比较慢，不过可以连上，这个 fork 版本就更换了原作者的 API，已经可以正常使用。

使用方法：  
- firefox  
太小气了，安装前还得到商店注册应用，我没注册，所以暂时没法用……  
- chrome  
把 `web-ext-artifacts` 目录下的 `dictionary_anywhere-1.1.0.zip` 压缩包拖到 chrome 浏览器的插件页面就会自动安装。插件错误信息会报一个警告，可以忽略。(个别音频加载非常慢，建议点击 More> 到 bing 里听。为什么不直接用 bing 当搜索 API 呢？因为 bing 是个小气鬼，没开 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS))  

可以配合键盘触发按键使用。各种说明参考[插件说明页面](https://addons.mozilla.org/en-US/firefox/addon/dictionary-anyvhere/)。  
