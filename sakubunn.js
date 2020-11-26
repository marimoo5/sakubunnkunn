'use strict';

const userNameInput = document.getElementById('user-name');
const Button = document.getElementById('make');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
var ans = [];

//const は変更不可な変数、要素を取得




/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */

function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }

Button.onclick = function() {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }

    while (resultDivided.firstChild) {
        // 子どもの要素があるかぎり削除
        resultDivided.removeChild(resultDivided.firstChild);
      }

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);

    const paragraph = document.createElement('p');
    const result = make(userName);
    paragraph.innerText = result;
    ans.push(result);
    resultDivided.appendChild(paragraph);

    if (typeof SpeechSynthesisUtterance == "undefined") {return}
    var u = new SpeechSynthesisUtterance();
    u.text = result;
    u.lang = 'ja-JP';
    u.rate = 0.6;
    window.speechSynthesis.speak(u);

    
  };

  userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
      Button.onclick();
    }
  };


//作文のもとをつくる
const sentence1 = [
    '{userName}さんは ','{userName}さんの おともだちは ','{userName}さんの おかあさんは ','{userName}さんの おとうさんは '
]
const sentence2 = [
    'しぶやで ','しんじゅくで ','はらじゅくで ','いけぶくろで ','あきはばらで '
]
const sentence3 = [
    'ひたすらに ','がむしゃらに ','すてきに ','かれいに ','すばやく '
]
const sentence4 = [
    'かいものをした','さんさくした','おしゃべりした','にげた','おどった'
]


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

  function make(userName) {
    var random1 = Math.floor(Math.random()*3);
    var random2 = Math.floor(Math.random()*5);
    var random3 = Math.floor(Math.random()*5);
    var random4 = Math.floor(Math.random()*5);

    var result1 = sentence1[random1];
    var result2 = sentence2[random2];
    var result3 = sentence3[random3];
    var result4 = sentence4[random4];
   
      let result = result1 + result2 + result3 + result4;
      result = result.replace(/\{userName\}/g, userName);

      return result;
  }
    
