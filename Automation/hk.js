const puppeteer= require('puppeteer');
const { answers } = require('./codes');
const HackerRankLink='https://www.hackerrank.com/auth/login'
const codeFile = require("./codes");
let email='gesif74966@richdn.com'
let password='Cutiee'
let page

let BrowserWillBeOpenedPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:['--start-maximized']
})
BrowserWillBeOpenedPromise.then(function(browserInstance){
    let NewTabPromise=browserInstance.newPage()
    return NewTabPromise
}).then(function(newTab){
    page=newTab
    let WebsiteOpenPromise=page.goto(HackerRankLink)
    return WebsiteOpenPromise
}).then(function(){
    let EmailWillBeOpenedPromise=page.type("input[id='input-1']",email,{delay:200})
    return EmailWillBeOpenedPromise
}).then(function(){
    let PasswordWillBeEnteredPromise=page.type("input[id='input-2']",password,{delay:200})
    return PasswordWillBeEnteredPromise
}).then(function(){
    let LoginButtonBePressedPromise=page.click('button[data-analytics="LoginPassword"]',{delay: 50})
    return LoginButtonBePressedPromise
}).then(function(){
    let AlgoWillBeClickedPromise=WaitAndClick('.topic-card a[data-attr1="algorithms"]',page,{delay: 50})
    return AlgoWillBeClickedPromise
}).then(function(){
    let WarmUpBeClickedPromise=WaitAndClick("input[value='warmup']",page,{delay:50})
    return WarmUpBeClickedPromise
}).then(function(){
  let allChallengesPromise = page.$$(
    ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
    { delay: 50 }
  );
  return allChallengesPromise;

}).then(function(questions){
    let questionWillBeSolvedPromise = questionSolver(page, questions[0],codeFile.answers[0]);

      return questionWillBeSolvedPromise;
    
   
})





function WaitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let WaitForModelPromise=cPage.waitForSelector(selector);
        WaitForModelPromise.then(function(){
            let ClickTheModelPromise=cPage.click(selector)
            return ClickTheModelPromise

        }).then(function(){
            resolve()
        }).catch(function(){
            reject()
        })


    })
}
function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
      let questionWillbeClicked = question.click();
      questionWillbeClicked.then(function () {
          let selectEditorPromise = WaitAndClick('.monaco-editor.no-user-select .vs',page);
          return selectEditorPromise;
        })
        .then(function () {
          return WaitAndClick(".checkbox-input", page);
        })
        .then(function () {
          return page.type(" .text-area.custominput ", answer, { delay: 20 });
        })
        .then(function () {
          let ctrlOnHoldPromise = page.keyboard.down("Control", { delay: 20 });
          return ctrlOnHoldPromise;
        })
        .then(function () {
          let AisPressedPromise = page.keyboard.press("A", { delay: 20 });
          return AisPressedPromise;
        })
        .then(function () {
          let XisPressedPromise = page.keyboard.press("X", { delay: 20 });
          return XisPressedPromise;
        })
        .then(function () {
          let ctrlisReleased = page.keyboard.up("Control", { delay: 20 });
          return ctrlisReleased;
        })
        .then(function () {
          let mainEditorOnFocus = WaitAndClick(
            ".monaco-editor.no-user-select .vs",
            page
          );
          return mainEditorOnFocus;
        })
        .then(function () {
          let ctrlOnHoldPromise = page.keyboard.down("Control", { delay: 20 });
          return ctrlOnHoldPromise;
        })
        .then(function () {
          let AisPressedPromise = page.keyboard.press("A", { delay: 20 });
          return AisPressedPromise;
        })
        .then(function () {
          let VisPressedPromise = page.keyboard.press("V", { delay: 20 });
          return VisPressedPromise;
        })
        .then(function () {
          let ctrlisReleased = page.keyboard.up("Control", { delay: 20 });
          return ctrlisReleased;
        })
        .then(function () {
          return page.click(" .hr-monaco__run-code", { delay: 20 });
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  
}
