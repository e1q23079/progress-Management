// シートのデータを取得

const spred = SpreadsheetApp.getActive();

const sheet = spred.getSheetByName('sheet1');

// 現在のURLを取得

function getNowUrl(){
  return ScriptApp.getService().getUrl();
}

// Getメソッド
function doGet(e,msg="") {

  // パラメータ取得

  let nowPage = e.parameter.page;

  let file = 'index';

  if(nowPage){
    file = nowPage;
  }

  // WEBページ関係
  
  const template = HtmlService.createTemplateFromFile(file);

  template.data = getData();

  template.url = getNowUrl();

  template.msg = msg;

  const html = template.evaluate();

  html.setTitle("進捗管理システム");  // タイトル設定

  html.addMetaTag('viewport','width=device-width, initial-scale=1');  //  スマホ対応

  return html;

}


// POSTメソッド
function doPost(e){

  // POST データ取得
  let postNum = parseInt(e.parameters.post);
  let taksNum = parseInt(e.parameters.task);
  let statusNum = parseInt(e.parameters.status);

  chenge(postNum,taksNum,statusNum);  // データを編集

  return doGet(e,msg="登録に成功しました．");

}

// データを取得
function getData(){
  return sheet.getRange(1,1,5,8).getValues();
}

// データを編集
function chenge(who,task,value){

  const values = ["完了","未着手"];
  const getDt = sheet.getRange(who+1,task+1,1,1);
  getDt.setValue(values[value-1]);
  
}


