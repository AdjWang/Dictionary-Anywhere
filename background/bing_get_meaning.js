const DEFAULT_HISTORY_SETTING = {
    enabled: true
};

export function onMessageListener(request, sender, sendResponse) {
    const {
        word,
        lang
    } = request,
    // url = `https://www.bing.com/dict/search?q=${word}`;
    url = `https://cn.bing.com/dict/search?q=${word}&pc=MOZI&form=MOZLBR`;

    fetch(url, {
            method: 'GET',
            credentials: 'omit',
            mode: 'no-cors',
            headers: {
                "Host": "cn.bing.com",
                "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                "Accept-Encoding": "gzip, deflate, br",
                "Referer": url,
                "Connection": "keep-alive",
                "Cookie": "ipv6=hit=1611315016962; MUID=08F6D3D505196E9D1A38DC12045A6F57; MUIDB=08F6D3D505196E9D1A38DC12045A6F57; _EDGE_V=1; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=8EE644FA3D1E4219AE1D0C3C1ECEFC1F&dmnchg=1; SRCHUSR=DOB=20210122&T=1611311013000; SRCHHPGUSR=CW=1920&CH=350&DPR=1&UTC=480&DM=3&HV=1611311415&WTS=63746907813&BRW=W&BRH=S&EXLTT=31; ENSEARCH=BENVER=0; ULC=P=2FBD|1:1&H=2FBD|1:1&T=2FBD|1:1; SNRHOP=I=&TS=; _EDGE_S=SID=0613A318B83A63A4222BACDFB97962E0&mkt=zh-cn; _SS=PC=MOZI&SID=0613A318B83A63A4222BACDFB97962E0; SRCHS=PC=MOZI; _FP=hta=on; ipv6=hit=1611315000378; _tarLang=default=en; _TTSS_IN=hist=WyJlcyIsImF1dG8tZGV0ZWN0Il0=; _TTSS_OUT=hist=WyJlbiJd; dsc=order=News",
                "Upgrade-Insecure-Requests": "1",
                "Cache-Control": "max-age=0",
                "TE": "Trailers"
            }
        })
        .then((response) => {console.log(response.text()); return response.text();})
        .then((text) => {
            const document = new DOMParser().parseFromString(text, 'text/html'),
                content = extractMeaning(document, {
                    word,
                    lang
                });

            sendResponse({
                content
            });

            content && browser.storage.local.get().then((results) => {
                let history = results.history || DEFAULT_HISTORY_SETTING;

                history.enabled && saveWord(content)
            });
        })

    return true;
}

function extractMeaning(document, context) {
    if (!document.querySelector("[id='headword']")) {
        return null;
    }

    var word = document.querySelector("[id='headword']").textContent,
        definitionDiv = document.querySelector("[id='homoid']"),
        meaning = "";

    if (definitionDiv) {
        definitionDiv.querySelectorAll("span").forEach(function (span) {
            if (!span.querySelector("sup"))     // TODO: what does attr "sup" mean in google?
                meaning = meaning + span.textContent;
        });
    }

    meaning = meaning[0].toUpperCase() + meaning.substring(1);

    var audio = document.querySelector("a[class='bigaud']"),
        source = document.querySelector("a[class='bigaud']").getAttribute('onclick').match(/(http.*?)\'/),
        audioSrc = source && source[1];

    if (audioSrc) {
        !audioSrc.includes("http") && (audioSrc = audioSrc.replace("//", "https://"));
    }

    return {
        word: word,
        meaning: meaning,
        audioSrc: audioSrc
    };
};