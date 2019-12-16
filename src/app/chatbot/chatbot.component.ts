import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatbotComponent implements OnInit {
  title = 'IPM CHAT POC';

  me = { avatar: "assets/images/me.png"};

  bot = { avatar: "assets/images/bot.png" };
  chatMsgs: Array<object> = [];

  constructor() {}
  ngOnInit() {}
  onKey(event: any) { // without type info
    this.insertChat("me", event.target.value, this.formatAMPM(new Date()));
    event.target.value = "";
  }
  chat() {
    $(".chatBox").show(1000);
    $(".hideBot").hide();
    this.resetChat();  
    this.insertChat("bot", "Hello Suneel, Please choos any of the below options.", 1000);
  }
  closeChat() {
    $(".chatBox").hide(1000);
    $(".hideBot").show(100);
  }
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  //-- No use time. It is a javaScript effect.
  requested(who, text, time: any = 0) {
    var that= this;
    this.insertChat(who,text,time);
    if(text==="Your Name?"){
      this.insertChat("bot","I AM your Personal Bot",1000);
    }
    if(text=="Your Profession?"){
      this.insertChat("bot","Helping you.. :-)",1000);
    }
    
  }
  insertChat(who, text, time: any = 0) {
    var control = "";
    var date = this.formatAMPM(new Date());
    let that = this;
    setTimeout(
      function () {
        // $("#msg").append(control);
        if (who == "me") {
          that.chatMsgs.push({ avatar: that.me.avatar, who: "me", text: text, time: date });
        } else {
          that.chatMsgs.push({ avatar: that.bot.avatar, who: "bot", text: text, time: date,questions:["Your Name?","Your Profession?"] });
        }
        that.updateChatWindow();

      }, time);
  }
  resetChat() {
    this.chatMsgs=[];
  }
  updateChatWindow() {
    var height = $('#msg')[0].scrollHeight;
    var dheight = $('#msg').height();
    var scrolling = height - dheight;
    $('#msg').animate({ scrollTop: scrolling }, 500);
  }

}
